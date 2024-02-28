---
title: "WTH are agents"
date: "2024-02-27"
author: "Aryan"
---

# Introduction to Agents

An agent is a computer program or an entity that is capable of acting autonomously in an environment to meet its designed objectives

### Setting up openfire

1) Download and install Java JDK
2) Downloading openfire: https://www.igniterealtime.org/downloads/#openfire
3) Install spade inside conda: https://spade-mas.readthedocs.io/en/latest/installation.html


#### Spade Agents Model - Behavior
-----------

1. <u>OneShotBehaviour and TimeoutBehaviour</u>: These behaviors are designed for tasks that are executed just once or tasks that have a specific time limit for execution. They are useful for implementing actions that do not need to be repeated, such as sending a single message or performing a one-time computation.
2. <u>PeriodicBehaviour and CyclicBehaviour</u>: These are used for tasks that need to be performed repeatedly. While `PeriodicBehaviour` allows for the execution of tasks at regular intervals, `CyclicBehaviour` is intended for continuous repetition of tasks without any delay between iterations. These behaviors are ideal for monitoring activities or continuously checking for new data or messages.
3. <u>Finite State Machine (FSMBehaviour)</u>: This behavior is applied to more complex scenarios where the task involves multiple states and transitions. A finite state machine can be used to model sophisticated behaviors that depend on the current state of the agent and its environment, allowing for decision-making processes that can adapt based on previous actions and external conditions.

#### Spade code overview
------

1. <u>Agent Class (spade.agent.Agent)</u>


#### Writing Simple Agent with spade


```python
from spade.agent import Agent
from spade.behaviour import CyclicBehaviour
from spade.message import Message

class SenderAgent(Agent):
    class InformBehav(CyclicBehaviour):
        async def run(self):
            print("Sending a message...")
            msg = Message(to="receiver@yourserver.com")  # Change to the receiver's JID
            msg.set_metadata("performative", "inform")  # Set the type of message
            msg.body = "Hello, this is a greeting from the sender agent."

            await self.send(msg)
            print("Message sent!")

    async def setup(self):
        print("Sender Agent started")
        self.add_behaviour(self.InformBehav())

# Create the agent
sender = SenderAgent("sender@yourserver.com", "senderpassword")  # Change to your sender agent's JID and password
sender.start()

# Stop the agent after some time
import time
time.sleep(10)  # Waits for 10 seconds
sender.stop()
```

#### Lifecycle of this program

1. <u>Initialization</u>: When a behavior is added to an agent, it's initialized with any necessary setup parameters. This is where you can prepare the behavior for execution, such as configuring initial states or loading resources.

2. <u>Start</u>: The behavior is started either immediately when the agent starts or later, based on conditions or events. The starting of a behavior might involve preliminary actions before entering its main execution loop.

3. <u>run</u>: `run` is called repeatedly based on the behavior 


### Project startup for (macos)

1. starting openfire

```bash
$ sudo su
sh-3.2# cd /usr/local/openfire/bin
sh-3.2# export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home
sh-3.2# ./openfire.sh
```
