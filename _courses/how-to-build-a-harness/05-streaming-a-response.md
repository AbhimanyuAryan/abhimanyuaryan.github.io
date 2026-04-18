---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 5
chapter_id: streaming-a-response
chapter_label: "5"
part_label: "Part 2 — Talking to Claude"
tab_title: "Streaming"
title: "5. Streaming a Response"
description: "Send a prompt, stream text back token-by-token."
---

The core of talking to Claude: build params, call the streaming API, process SSE events.

**File:** [`packages/ai/src/providers/anthropic.ts` L216-467](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/anthropic.ts#L216-L467)

The production code handles thinking blocks, tool call JSON deltas, usage tracking, and error recovery. The minimal version is:

```typescript
const anthropicStream = await client.messages.stream({
  model: "claude-sonnet-4-20250514",
  max_tokens: 8192,
  system: "You are a coding assistant.",
  messages: convertedMessages,
  tools: convertedTools,
  stream: true,
});
```

The stream emits these SSE event types (relevant to a minimal harness):

| Event                                      | Meaning                  |
| ------------------------------------------ | ------------------------ |
| `message_start`                            | New response started     |
| `content_block_start` (type `text`)        | Text block starting      |
| `content_block_start` (type `tool_use`)    | Tool call starting       |
| `content_block_delta` (`text_delta`)       | Text chunk               |
| `content_block_delta` (`input_json_delta`) | Tool arguments streaming |
| `content_block_stop`                       | Block finished           |
| `message_delta`                            | Stop reason revealed     |

**File:** [`packages/ai/src/providers/anthropic.ts` L285-441](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/anthropic.ts#L285-L441)

```typescript
for await (const event of anthropicStream) {
  if (event.type === "content_block_start") {
    if (event.content_block.type === "text") {
      // New text block
    } else if (event.content_block.type === "tool_use") {
      // New tool call -- capture id and name
    }
  } else if (event.type === "content_block_delta") {
    if (event.delta.type === "text_delta") {
      // Append text chunk to current block
    } else if (event.delta.type === "input_json_delta") {
      // Accumulate tool arguments JSON
    }
  } else if (event.type === "message_delta") {
    if (event.delta.stop_reason) {
      // "end_turn" -> stop, "tool_use" -> execute tools
    }
  }
}
```
