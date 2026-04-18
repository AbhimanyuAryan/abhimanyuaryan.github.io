---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 2
chapter_id: the-message-protocol
chapter_label: "2"
part_label: "Part 1 — The Mental Model"
tab_title: "Message Protocol"
title: "2. The Message Protocol"
description: "UserMessage, AssistantMessage, ToolResultMessage — the conversation wire format."
---

Every conversation is a flat array of three message types. This is the wire format between your harness and the LLM.

**File:** [`packages/ai/src/types.ts` L194-223](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L194-L223)

```typescript
export interface UserMessage {
  role: "user";
  content: string | (TextContent | ImageContent)[];
  timestamp: number;
}

export interface AssistantMessage {
  role: "assistant";
  content: (TextContent | ThinkingContent | ToolCall)[];
  api: Api;
  provider: Provider;
  model: string;
  usage: Usage;
  stopReason: StopReason;
  errorMessage?: string;
  timestamp: number;
}

export interface ToolResultMessage<TDetails = any> {
  role: "toolResult";
  toolCallId: string;
  toolName: string;
  content: (TextContent | ImageContent)[];
  isError: boolean;
  timestamp: number;
}

export type Message = UserMessage | AssistantMessage | ToolResultMessage;
```

A typical conversation flows: `user` → `assistant(toolCall)` → `toolResult` → `assistant(toolCall)` → `toolResult` → `assistant(text)`.

The `AssistantMessage.content` array is the critical piece. It can contain:

- **`TextContent`** — the model's text response
- **`ThinkingContent`** — extended thinking / reasoning (Claude's chain-of-thought)
- **`ToolCall`** — a request to execute a tool

**File:** [`packages/ai/src/types.ts` L169-175](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L169-L175)

```typescript
export interface ToolCall {
  type: "toolCall";
  id: string;
  name: string;
  arguments: Record<string, any>;
}
```

Each `ToolCall` has an `id` (unique per call), a `name` (which tool), and `arguments` (JSON the LLM generated). Your harness must match each `ToolResultMessage.toolCallId` back to the original `ToolCall.id`.
