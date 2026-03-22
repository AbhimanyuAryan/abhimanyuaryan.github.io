---
layout: ai-byte
title: "AG2: Why I switched from AutoGen to its community fork"
date: 2026-03-15
description: "AG2 (the community continuation of AutoGen) is what I'm using to build the PulseOS agentic framework at CEGID — here's why."
tags: [agents, ag2, autogen, multi-agent]
source: ag2.ai
source_url: https://ag2.ai/
---

When Microsoft paused development on the original AutoGen, the community forked it as **AG2**. I've been running it in production at CEGID for several months now. Quick notes:

**What's good:**
- `ConversableAgent` is a solid primitive — flexible enough for most orchestration patterns
- Human-in-the-loop is first class: you can pause any agent turn for human review
- Group chat with `GroupChatManager` handles most multi-agent topologies
- Active maintenance from the community — bugs get fixed fast

**What still needs work:**
- Long-running conversations can get expensive — context management needs explicit attention
- Debugging agent chains is still harder than it should be (working on tooling for this)
- State persistence across sessions requires rolling your own

For my MSc thesis on Census Mechanisms, I'm using AG2 as the execution backbone for MassGen while exploring what orchestration pattern to use *for what goal*. More on that soon.
