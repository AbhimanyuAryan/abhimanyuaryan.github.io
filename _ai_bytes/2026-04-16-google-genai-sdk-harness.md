---
layout: ai-byte
title: "How to use Google GenAI SDK to build the world's best harness"
date: 2026-04-16
description: "How to use Google GenAI SDK to build the world's best harness"
tags: [google, genai, sdk, harness, agents]
source: blog
---

# Don't dump SDK docs into your Agents.md

Google published codegen instructions for their GenAI SDK here:

[googleapis/js-genai codegen_instructions.md](https://raw.githubusercontent.com/googleapis/js-genai/refs/heads/main/codegen_instructions.md)

This is gold. It tells you the correct imports, the right model names, how to stream, how to do function calling — everything your agent needs to write correct GenAI code.

But here's the mistake people make: they copy-paste the whole thing into `Agents.md` or their system prompt.

## Why that's wrong

- **Token waste** — you're burning context on instructions the model only needs when writing GenAI code
- **Noise** — `Agents.md` should describe _how your agent behaves_, not SDK reference docs
- **Staleness** — SDK docs change, your `Agents.md` won't keep up

## What to do instead

Use **prompt references**. Keep SDK instructions in a separate file like `docs/gemini-sdk.md` and reference it only when the task needs it.

```
docs/
  gemini-sdk.md       ← SDK codegen instructions live here
AGENTS.md             ← agent behavior, personality, guardrails
```

Your harness should pull `docs/gemini-sdk.md` into context **only** when the agent is about to write GenAI code. Not on every turn.

## The pattern

1. **AGENTS.md** → who the agent is, what it can do, rules of engagement
2. **docs/\*.md** → reference material, injected on demand
3. **Harness** → the thing that decides _when_ to inject _what_

That's how you build a harness that doesn't choke on its own context. Keep instructions close, but only pull them in when needed.
