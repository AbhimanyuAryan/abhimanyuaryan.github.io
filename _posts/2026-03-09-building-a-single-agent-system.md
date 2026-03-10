---
layout: post
title: "Building a Single Agent System: From Formal Foundations to Working Code"
date: 2026-03-09
description: A walkthrough of formalizing single-agent systems for LLM-powered autonomous task execution, with a complete Python implementation using the GitHub Copilot SDK and a GTA V environment.
tags: agents LLM AI architecture
categories: AI
thumbnail: assets/img/posts/single-agent-cover.png
---

Large language models are increasingly used not just as chatbots, but as the reasoning core of _autonomous agents_ — systems that observe an environment, decide on actions, and execute them in a loop until a goal is reached.

In this post, I walk through the formal foundations of agent systems and then build a concrete single-agent implementation: an LLM-powered agent that navigates and completes missions in a GTA V game environment.

## Formalizing Agent Systems

Building on multi-agent formulations {% cite zhou2024webarena %} {% cite guo2024llmmultiagents %}, an agent system is denoted by:

$$
S = \{A, E, C, \Omega\}
$$

where $A = \{a_1, \ldots, a_n\}$ (with $n \ge 1$) is a set of agents, $E$ is a shared environment, $C$ is a communication topology, and $\Omega$ is an orchestration policy.

Each agent $a_i$ is represented by the tuple:

$$
S_i = (\phi_i, A_i, M_i, \pi_i)
$$

where:

- $\phi_i$ is the **reasoning policy** (typically an LLM)
- $A_i = \{ \mathrm{ToolCall}(t, \theta) \mid t \in T,\ \theta \in \Theta_t \}$ is the **action space** — the set of tool calls the agent can make, where $T$ is the set of available tools (e.g., navigation, shooting, vehicle control) and $\Theta_t$ are valid parameter configurations for tool $t$
- $M_i$ is the **internal memory**
- $\pi_i: H \to A_i$ is the **decision function**, mapping observation histories to actions

The observation history space $H$ contains sequences of action-observation pairs. The decision function $\pi_i$ is instantiated by the reasoning policy $\phi_i$: given a history $h_{i,t}$, the LLM generates a reasoning trace and selects the next action.

For example, a history:

$$
h_{i,t} = \Big[\big(\texttt{navigate\_to}(\text{waypoint}=\text{"Vinewood Hills"}),\ \text{"Arrived at Vinewood Hills"}\big), \ldots\Big]
$$

is processed by $\phi_i$ to produce the next tool call $\alpha_{i,t+1}$.

### The Agent Loop

At timestep $t$, agent $a_i$ selects an action $\alpha_{i,t} \in A_i$ according to:

$$
\alpha_{i,t} = \pi_i(h_{i,t}), \quad o_{i,t} = E(\alpha_{i,t}), \quad h_{i,t+1} = f_i(h_{i,t}, \alpha_{i,t}, o_{i,t})
$$

where $E$ denotes the environment and $h_{i,0} = \{s_0\}$ contains the initial task specification. The history update function $f_i: H \times A_i \times O \to H$ appends the new action-observation pair to the agent's history:

$$
h_{i,t+1} = f_i(h_{i,t}, \alpha_{i,t}, o_{i,t}) = h_{i,t} \oplus (\alpha_{i,t}, o_{i,t})
$$

subject to context window truncation when $\|h_{i,t+1}\| > \text{MAX\_TOKENS}$.

This update mechanism applies uniformly to both single-agent (SAS) and multi-agent (MAS) configurations. In MAS, communication between agents happens through explicit message passing in the orchestration layer.

---

## From Theory to Code

For a single-agent system ($n = 1$), the formalism simplifies: there is no communication topology $C$ and the orchestration policy $\Omega$ reduces to a simple loop. What remains is the core agent loop.

Let's build this concretely. We'll create an agent that operates in a GTA V game environment — receiving observations about the game state (player position, nearby vehicles, NPCs, mission objectives) and issuing actions (move, drive, interact) to complete missions.

### The Base Agent

The base class captures the structure from our formal definition. It holds the reasoning policy (via a Copilot SDK client), maintains conversation history ($M_i$), and defines the `act` interface ($\pi_i$):

```python
from abc import ABC, abstractmethod
from copilot import CopilotClient
import re


class GTABaseAgent(ABC):
    """
    Abstract base class for LLM-powered GTA V agents.
    Maps directly to the formal agent tuple S_i = (φ_i, A_i, M_i, π_i).
    """
    def __init__(self, model_name: str, client: CopilotClient):
        self.model_name = model_name       # φ_i: reasoning policy
        self.client = client               # SDK client for φ_i
        self.conversation = []             # M_i: internal memory
        self.step_count = 0
        self.mission_id = None
        self.objective = None

    def reset(self, mission_id: str, objective: str):
        """Reset agent state for a new mission episode."""
        self.conversation = []
        self.step_count = 0
        self.mission_id = mission_id
        self.objective = objective

    @abstractmethod
    async def act(self, observation_text: str) -> str:
        """
        π_i: H -> A_i
        Receives an observation string, returns an action string.
        """
        pass

    def _lookup_location(self, query: str) -> str:
        """Look up known locations and waypoints in the game world."""
        match = re.search(r"lookup:\s*(.+)", query)
        if match:
            location = match.group(1).strip().lower()
            return lookup_game_location(location)
        return "Location not found."

    def log(self, msg: str):
        print(f"[{self.__class__.__name__}] {msg}")
```

Notice how the class mirrors our formal tuple:
- `self.client` + `self.model_name` → $\phi_i$ (reasoning policy)
- Actions are defined by the system prompt → $A_i$ (action space)
- `self.conversation` → $M_i$ (internal memory)
- `act()` → $\pi_i$ (decision function)

### The LLM Wrapper

The reasoning policy $\phi_i$ is implemented via the GitHub Copilot SDK. The key function handles retries, rate limiting, and prompt construction:

```python
import asyncio
from copilot import CopilotClient, SessionConfig, MessageOptions

MAX_RETRIES = 5
INITIAL_RETRY_DELAY = 5
INTER_REQUEST_DELAY = 2.0
DEFAULT_MODEL = "gpt-5-mini"


async def get_copilot_client() -> CopilotClient:
    """Create and start a CopilotClient."""
    client = CopilotClient()
    await client.start()
    return client


async def call_copilot_with_retry(
    client: CopilotClient,
    model_name: str,
    messages: list[dict],
    system_prompt: str,
    temperature: float = 0.0,
) -> str:
    """
    Calls φ_i (the LLM) via the Copilot SDK with rate limiting and retries.
    """
    await asyncio.sleep(INTER_REQUEST_DELAY)

    full_prompt = _build_prompt(system_prompt, messages)

    retries = 0
    delay = INITIAL_RETRY_DELAY
    last_error = None

    while retries < MAX_RETRIES:
        session = None
        try:
            session = await client.create_session(
                SessionConfig(model=model_name)
            )
            response = await session.send_and_wait(
                MessageOptions(prompt=full_prompt),
                timeout=60.0,
            )
            if response and response.data and response.data.content:
                return response.data.content.strip()
            else:
                raise Exception("Empty response from Copilot SDK")
        except TimeoutError:
            last_error = TimeoutError("Request timed out")
        except Exception as e:
            last_error = e
        finally:
            if session:
                try:
                    await session.destroy()
                except Exception:
                    pass

        retries += 1
        if retries < MAX_RETRIES:
            await asyncio.sleep(delay)
            delay *= 2

    raise Exception(
        f"Failed after {MAX_RETRIES} retries. Last error: {last_error}"
    )
```

The prompt builder serializes the conversation history $h_{i,t}$ into a single string — because each Copilot SDK session takes a flat prompt rather than a structured message list:

```python
def _build_prompt(system_prompt: str, messages: list[dict]) -> str:
    """
    Serialize system instructions + history into a single prompt.
    This is h_{i,t} formatted for the LLM.
    """
    parts = [f"[System Instructions]\n{system_prompt}\n"]

    for msg in messages:
        role = msg["role"]
        content = msg["content"]
        if role == "user":
            parts.append(f"[Observation]\n{content}\n")
        elif role in ("model", "assistant"):
            parts.append(f"[Your Previous Action]\n{content}\n")

    parts.append("[Your Action]\nRespond with exactly one action:")
    return "\n".join(parts)
```

### The Single Agent

With the base class and LLM wrapper in place, the single agent is straightforward. It implements the agent loop: observe → reason → act → update history → repeat:

```python
from .gta_base import GTABaseAgent
from .copilot_llm import call_copilot_with_retry
from copilot import CopilotClient

SYSTEM_PROMPT = """\
You are an autonomous agent operating inside GTA V. Your goal is to complete \
missions by navigating the open world, interacting with NPCs, driving vehicles, \
and executing objectives.

## Actions
Respond with EXACTLY ONE action per turn (no extra text):

1. **move** – walk/run to a location
   `move: to <location_or_coordinates>`

2. **drive** – enter and drive a vehicle
   `drive: to <destination> via <route_preference>`

3. **interact** – interact with an NPC or object
   `interact: <target> with action <action_type>`

4. **shoot** – engage a target
   `shoot: <target> with <weapon>`

5. **wait** – wait for a condition
   `wait: until <condition>`

6. **lookup** – look up a location or mission intel
   `lookup: <query>`

7. **impossible** – declare the mission cannot be completed
   `impossible: <reason>`

## Environment
- You receive observations about: player position, health, nearby entities \
(NPCs, vehicles, objects), current objective, and minimap waypoints.
- The world is persistent — NPCs remember interactions, police respond to crimes, \
and time passes.

## Strategy
- First, assess your current position relative to the objective.
- If you don't know where to go, use `lookup: <destination>`.
- Use vehicles for long distances.
- Avoid unnecessary combat — it attracts police attention.
- Complete objectives in order. Multi-step missions require sequential actions.

## Important
- Respond with ONLY the action, nothing else.
- One action per turn. No explanations.
"""


class GTASingleAgent(GTABaseAgent):
    """
    Single Agent for GTA V missions.
    Implements the agent loop: π_i(h_{i,t}) -> α_{i,t}
    """
    def __init__(self, model_name: str, client: CopilotClient):
        super().__init__(model_name, client)

    async def act(self, observation_text: str) -> str:
        # 1. Update history: h_{i,t} = h_{i,t-1} ⊕ (o_{i,t})
        if observation_text:
            self.conversation.append({
                "role": "user",
                "content": observation_text
            })

        # 2. Query φ_i: α_{i,t} = π_i(h_{i,t})
        action_text = await call_copilot_with_retry(
            self.client,
            self.model_name,
            self.conversation,
            SYSTEM_PROMPT,
        )

        # 3. Append action to memory: h_{i,t+1}
        self.conversation.append({
            "role": "model",
            "content": action_text
        })

        # 4. Handle lookup action (oracle tool call)
        if "lookup:" in action_text.lower():
            result = self._lookup_location(action_text)
            if result:
                self.log(f"📍 {action_text} -> {result[:60]}...")
                self.conversation.append({
                    "role": "user",
                    "content": result
                })
                return await self.act(None)

        return action_text
```

### Running the Agent

Putting it all together — here's how you'd run a mission episode:

```python
import asyncio
from gta_agent import GTASingleAgent
from copilot_llm import get_copilot_client


async def run_mission():
    client = await get_copilot_client()
    agent = GTASingleAgent(model_name="gpt-5-mini", client=client)
    agent.reset(
        mission_id="heist_01",
        objective="Drive to the Vanilla Unicorn, meet Trevor, "
                  "then escape the police in a getaway vehicle."
    )

    # Initial observation from the environment
    obs = (
        "Position: Downtown Vinewood (x=248, y=1024). "
        "Health: 100%. Armor: 50%. "
        "Nearby: 1 parked Kuruma (unlocked), 3 pedestrians. "
        "Objective: Go to the Vanilla Unicorn. "
        "Distance to objective: 2.4 km NW."
    )

    max_steps = 50
    for step in range(max_steps):
        action = await agent.act(obs)
        print(f"Step {step}: {action}")

        if "impossible:" in action.lower():
            print("Agent declared mission impossible.")
            break

        # In a real setup, you'd send the action to the
        # GTA V environment and get back the next observation.
        # obs = env.step(action)
        break  # demo: single step


asyncio.run(run_mission())
```

## Key Design Decisions

A few things worth noting about this architecture:

**Flat prompt construction.** The Copilot SDK uses a single-prompt-per-session model. We serialize the entire conversation history $h_{i,t}$ into one string. This means the full context is visible to the LLM on every call, but we pay the token cost of replaying history. In practice, you'd truncate when approaching the context window limit — exactly the $\|h_{i,t+1}\| > \text{MAX\_TOKENS}$ constraint from the formalism.

**Exponential backoff.** LLM APIs are rate-limited. The retry wrapper doubles the delay on each failure (5s → 10s → 20s → 40s → 80s). This is important for any production agent that runs for dozens or hundreds of steps.

**Tool calls as actions.** The `lookup` action demonstrates how $A_i$ includes tool calls. When the agent outputs `lookup: Vanilla Unicorn`, we intercept it, query an oracle, inject the result as a new observation, and re-enter the agent loop. The agent doesn't see this as a special case — it's just another action-observation pair in the history.

**Stateless sessions, stateful history.** Each LLM call creates a fresh Copilot SDK session (stateless), but the agent maintains its own conversation history (stateful). This separation means session failures don't corrupt the agent's memory.

## From Single to Multi-Agent

The formal framework makes it clear how to extend this to multi-agent systems. You'd add:

- **More agents** in $A$ with different specializations (a driver agent, a combat agent, a negotiation agent)
- **Communication topology** $C$ defining which agents can message each other
- **Orchestration policy** $\Omega$ deciding which agent acts at each timestep

But the single-agent case is where you get the fundamentals right. Get the agent loop, memory management, and tool integration working reliably for one agent before scaling to many.

---

## References

{% bibliography --cited %}
