---
layout: post
title: "How to Redesign the Dyad Agent"
date: 2026-04-06
description:
tags:
thumbnail: assets/img/posts/dyad-agent.png
giscus_comments: true
---

I've been following Dyad's work closely, particularly through people I deeply respect like Dr. Chris Rackauckas. I had the opportunity to meet them at JuliaCon Paris, where I helped organize the event.

After watching their recent developments ([Agentic AI with Dyad](https://juliahub.com/blog/agentic-ai-dyad)) and having conversations with Avik Sengupta (VP of Engineering at JuliaHub), I'm convinced that Dyad represents the future of AI modeling.

## Why AI Modeling is the Future

Everything around us starts with modeling:

- **Planes** - Aerodynamic simulations and stress testing
- **Cars** - Crash simulations and performance optimization
- **Buildings** - Structural analysis and environmental modeling

Even the [Hindu temple built in Paris](https://youtu.be/shazte3R52k?t=93) began with 3D modeling before becoming a physical structure.

AI modeling is poised to become a multi-trillion dollar industry, and Dyad is positioned exactly where the future of agentic AI is heading.

### How are agents improving over time

Agents are suppose to be more and more autonomous on long term tasks. But imagine if you have to monitor every step of the agent and intervene when it fails. Then you are the bottleneck and the agent is not really autonomous.

{% include figure.liquid loading="eager" path="assets/img/posts/dyad-agent/dyad_agent_now.png" title="Dyad Agent Current State" class="img-fluid rounded z-depth-1 mx-auto d-block" style="max-width: 30%;" %}

### Why JuliaHub has what nobody has (openai/anthropic/cursor etc.)

JuliaHub has access to the Julia compiler and a team comprising some of the smartest people in the world—researchers and engineers from top universities like MIT, IIT, and others—who have spent years building a programming language that runs like C yet remains as easy to use as Python.

How this translates to Dyad:

- **Compiler** - The ability to understand and optimize code at a deep level
- **Type System** - The ability to reason about data structures and types
- **MCP/Plugin/Skill Store** - Julia has rich user base and ecosystem in geospatial, scientific computing, bioinformatics, data science, etc. Now imagine if you could leverage this ecosystem through Dyad by building a skill store. A truly unique value proposition. Something that openai/anthropic/cursor etc. can't do or atleast trying to replicate. Recently they have started hiring scientists and engineers from these fields: [Anthropic Science](https://www.anthropic.com/research/introducing-anthropic-science)

How can all of this be leveraged to build a truly unique agent/harness?

{% include figure.liquid loading="eager" path="assets/img/posts/dyad-agent/dyad_agent_after.png" title="Dyad Agent Future State" class="img-fluid rounded z-depth-1 mx-auto d-block" style="max-width: 30%;" %}

### How to redesign the harness

{% include figure.liquid loading="eager" path="assets/img/posts/dyad-agent/harness.png" title="Harness Architecture Diagram" class="img-fluid rounded z-depth-1 mx-auto d-block" style="max-width: 30%;" %}

| Component   | Implementation                                        |
| ----------- | ----------------------------------------------------- |
| **Harness** | Dyad (the evaluation and execution framework)         |
| **Model**   | Claude Opus 4.6/4.5 (frontier reasoning)              |
| **Context** | Julia Compiler + Type System + MCP/Plugin/Skill Store |

### The Meta-Harness Pattern

{% include figure.liquid loading="eager" path="assets/img/posts/dyad-agent/harness_loop.png" title="Harness Loop Diagram" class="img-fluid rounded z-depth-1 mx-auto d-block" style="max-width: 30%;" %}

From the paper: [Meta-Harness](https://yoonholee.com/meta-harness/)

The key insight is to continuously improve the harness itself through a feedback loop:

1. **Run** the harness on diverse tasks
2. **Evaluate** outcomes manually (success/failure patterns)
3. **Log** what worked and what didn't
4. **Use** a coding agent to analyze the log and improve the harness code

This creates a self-improving system, similar to how OpenCLAW maintains a `SOUL.md` that evolves over time with lessons learned.

### Memory Architecture

Context sits outside the harness, but the agent has persistent memory. Learning can be captured in the harness itself through a layered memory system.

**Claude Code's Memory Pattern:**

Memory is central to any agent. It has three layers:

- **User Memory** - Persists across future runs (user role, feedback, preferences)
- **Session Memory** - Captures everything in the current session (state, task specs, work log)
- **Sync Memory** - Team memory and patterns (shared knowledge, org-level patterns)

**Storage Structure:**

```
~/.agent/
  user-memory/.../*.md
  session-memory/.../*.md
  sync-memory/.../*.md
```

This mirrors how learning happens at user, organization, and team levels.

### Memory Improvement Patterns

Memory can be improved in two ways:

1. **Continuous Learning** - After each user-agent feedback loop
2. **Dreaming Pattern** - OpenCLAW's approach of offline memory consolidation and improvement

[OpenCLAW Dreaming Documentation](https://docs.openclaw.ai/concepts/dreaming)

### What future holds for Dyad

Limitations of text-based models in building complex 3D structures. Coming soon...

### Food for thought

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">World models and partnership with Yann LeCun for AMI Paris</p>&mdash; Abhimanyu Aryan (@theabhimanyu) <a href="https://twitter.com/theabhimanyu/status/2033303935612559555?ref_src=twsrc%5Etfw">March 31, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
