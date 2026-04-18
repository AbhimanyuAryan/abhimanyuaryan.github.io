---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 20
chapter_id: putting-it-all-together
chapter_label: "20"
part_label: "Part 6 — From Loop to Agent"
tab_title: "Putting It All Together"
title: "20. Putting It All Together"
description: "A working minimal harness in ~400 lines."
---

Here's the architecture map from pi-mono's packages to a minimal harness:

| pi-mono Package         | Role                                  | Minimal Equivalent               |
| ----------------------- | ------------------------------------- | -------------------------------- |
| `packages/ai`           | LLM abstraction (multi-provider)      | Direct `@anthropic-ai/sdk` calls |
| `packages/agent`        | Agent loop, tool execution            | Your ~100-line loop              |
| `packages/coding-agent` | Tools, system prompt, TUI, extensions | Your 4 tools + simple prompt     |

**Dependencies for your minimal harness:**

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.52.0",
    "@sinclair/typebox": "^0.34.0"
  }
}
```

**The minimal harness in ~400 lines:**

1. **Model config** (~10 lines) — hardcoded Claude model object
2. **Tool schemas** (~40 lines) — TypeBox schemas for read, edit, write, bash
3. **Tool implementations** (~120 lines) — fs operations, child_process
4. **API glue** (~50 lines) — convert tools/messages to Anthropic format
5. **Agent loop** (~80 lines) — stream → check tools → execute → repeat
6. **System prompt** (~20 lines) — tell Claude what it can do
7. **CLI wrapper** (~80 lines) — readline, print responses, handle ctrl-c

The key files to study in pi-mono:

| File                                                                                                                                               | Why                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| [`packages/ai/src/types.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts)                                               | All type definitions       |
| [`packages/ai/src/providers/anthropic.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/anthropic.ts)                   | How pi talks to Claude     |
| [`packages/ai/src/utils/event-stream.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/event-stream.ts)                     | The streaming abstraction  |
| [`packages/agent/src/agent-loop.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent-loop.ts)                               | The agent loop             |
| [`packages/agent/src/agent.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent.ts)                                         | Stateful agent wrapper     |
| [`packages/coding-agent/src/core/tools/`](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/tools/)                     | Tool implementations       |
| [`packages/coding-agent/src/core/system-prompt.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/system-prompt.ts) | System prompt construction |

## Summary

| Concept           | Blog Equivalent                                   | pi-mono Reference                                       |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------- |
| The Loop          | Amp's `Run()`, Mihail's `run_coding_agent_loop()` | `packages/agent/src/agent-loop.ts` `runLoop()`          |
| Message types     | Anthropic SDK types                               | `packages/ai/src/types.ts` `Message` union              |
| Tool definition   | `ToolDefinition` struct / dict                    | `packages/ai/src/types.ts` `Tool` interface             |
| Tool execution    | `switch content.Type` / `TOOL_REGISTRY[name]`     | `packages/agent/src/agent-loop.ts` `executeToolCalls()` |
| Read file         | `ReadFile()` / `read_file()`                      | `packages/coding-agent/src/core/tools/read.ts`          |
| Edit file         | `EditFile()` / `edit_file()`                      | `packages/coding-agent/src/core/tools/edit.ts`          |
| Stop reason check | `message.StopReason == "tool_use"`                | `mapStopReason()` in `providers/anthropic.ts`           |
| System prompt     | Hardcoded string                                  | `buildSystemPrompt()` in `core/system-prompt.ts`        |
| Streaming         | `client.Messages.New(...stream: true)`            | `streamAnthropic()` in `providers/anthropic.ts`         |
| Stateful agent    | Not covered in blogs                              | `Agent` class in `packages/agent/src/agent.ts`          |
