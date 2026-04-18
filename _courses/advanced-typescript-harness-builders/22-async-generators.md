---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 22
chapter_id: async-generators
chapter_label: "16"
part_label: "Part 4 — Async TypeScript"
tab_title: "Async Generators"
title: "16. Async Generators"
description: "async function* yields values lazily over time — perfect for SSE parsing and WebSocket streams."
---

Async generators produce values lazily over time. Used extensively for SSE parsing and WebSocket streams.

**SSE Parser:**

**File:** [`packages/ai/src/providers/openai-codex-responses.ts` L469-510](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/openai-codex-responses.ts#L469-L510)

```typescript
async function* parseSSE(response: Response): AsyncGenerator<Record<string, unknown>> {
  if (!response.body) return;
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      // Parse and yield JSON events from buffer...
      yield JSON.parse(data);
    }
  } finally {
    await reader.cancel();
    reader.releaseLock();
  }
}
```

**Composing generators (piping output of one into another):**

**File:** [`packages/ai/src/providers/openai-codex-responses.ts` L431-457](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/openai-codex-responses.ts#L431-L457)

```typescript
async function* mapCodexEvents(events: AsyncIterable<Record<string, unknown>>): AsyncGenerator<ResponseStreamEvent> {
  for await (const event of events) {
    // Transform and yield...
    yield event as unknown as ResponseStreamEvent;
  }
}
```

**Consuming with `for await`:**

**File:** [`packages/ai/src/providers/openai-responses-shared.ts` L286-298](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/openai-responses-shared.ts#L286-L298)

```typescript
export async function processResponsesStream<TApi extends Api>(
  openaiStream: AsyncIterable<ResponseStreamEvent>,
  output: AssistantMessage,
  stream: AssistantMessageEventStream,
  model: Model<TApi>
): Promise<void> {
  for await (const event of openaiStream) {
    // Process each event...
  }
}
```
