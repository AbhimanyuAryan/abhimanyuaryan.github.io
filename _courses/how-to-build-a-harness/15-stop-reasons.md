---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 15
chapter_id: stop-reasons
chapter_label: "15"
part_label: "Part 4 — The Agent Loop"
tab_title: "Stop Reasons"
title: "15. Stop Reasons & When to Loop"
description: "stop, toolUse, error, aborted — what each means."
---

The Anthropic API returns a `stop_reason` that tells you why the model stopped generating.

**File:** [`packages/ai/src/providers/anthropic.ts` L934-954](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/anthropic.ts#L934-L954)

```typescript
function mapStopReason(reason: string): StopReason {
  switch (reason) {
    case "end_turn":
      return "stop"; // Model finished naturally
    case "max_tokens":
      return "length"; // Hit token limit
    case "tool_use":
      return "toolUse"; // Wants to call tools
    default:
      throw new Error(`Unhandled: ${reason}`);
  }
}
```

**File:** [`packages/ai/src/types.ts` L192](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L192)

```typescript
export type StopReason = "stop" | "length" | "toolUse" | "error" | "aborted";
```

The loop decision:

| StopReason  | Action                                  |
| ----------- | --------------------------------------- |
| `"toolUse"` | Execute tools, loop again               |
| `"stop"`    | Model is done, break the loop           |
| `"length"`  | Hit token limit, might need to continue |
| `"error"`   | Something went wrong, stop              |
| `"aborted"` | User cancelled, stop                    |

**File:** [`packages/agent/src/agent-loop.ts` L194-198](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent-loop.ts#L194-L198)

```typescript
if (message.stopReason === "error" || message.stopReason === "aborted") {
  await emit({ type: "turn_end", message, toolResults: [] });
  await emit({ type: "agent_end", messages: newMessages });
  return; // Stop the loop
}

const toolCalls = message.content.filter((c) => c.type === "toolCall");
hasMoreToolCalls = toolCalls.length > 0; // Continue if tools requested
```
