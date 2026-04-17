---
layout: ai-byte
title: "OpenCode cost optimization that pissed Anthropic"
date: 2026-04-11
description: "OpenCode promises open-source AI coding assistance, but the reality falls short. Here's why I'm sticking with alternatives."
tags: [opencode, openai, coding-assistants, agents, alternatives]
source: blog
---

# How OpenCode handles context "A beautiful mess"

## Prompt Caching

Model prompts often contain repetitive content, like system prompts and common instructions. Usually requrests are routed to servers that recently processed the same prompts, making it cheaper and faster than processing the entire prompt from scratch.

> _"Reduce latency and cost with prompt caching... Cache Routing: Usually requests are routed to servers that recently processed the same prompts, making it cheaper and faster than processing the entire prompt from scratch."_
>
> \- [OpenAI Prompt Caching Documentation](https://developers.openai.com/api/docs/guides/prompt-caching#:~:text=Reduce%20latency%20and%20cost%20with,Cache%20Routing)

Now Opencode has something

```javascript
// Called after EVERY user message, not just on context overflow
SessionCompaction.prune({ sessionID });

// Silently erases tool outputs beyond last 40k tokens
export const PRUNE_PROTECT = 40_000;
```

Which actively trims the conversation history so the model only keeps what still matters. This is done for cost optimization.

## 🧠 Simple mental model

Without pruning, your prompt looks like this over time:

```
[system prompt]
[user message 1]
[assistant response 1]
[tool output: HUGE]
[user message 2]
[assistant response 2]
[tool output: HUGE]
[user message 3]
...
```

OpenCode's `SessionCompaction.prune()` keeps the prompt clean by removing old tool outputs, but this breaks Anthropic's prompt caching mechanism.

## Why This Matters

- **Prompt caching** needs consistent prompts to work efficiently
- **OpenCode's pruning** changes the prompt structure after every message
- **Result**: No cache hits = higher costs and slower responses

The cost optimization that saves OpenCode money actually increases costs for users on Anthropic's platform as it prevents the model from caching repeated content.

## Further Reading

- [OpenCode Compaction Implementation](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/session/compaction.ts) - See the actual code behind the pruning mechanism

---

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">OpenCode is silently pruning your conversation history to save costs, but this breaks prompt caching and actually makes things more expensive for users on Anthropic</p>&mdash; TRQ (@trq212) <a href="https://twitter.com/trq212/status/2009802192484741181?ref_src=twsrc%5Etfw">March 21, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
