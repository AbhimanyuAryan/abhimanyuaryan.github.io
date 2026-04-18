---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 6
chapter_id: the-eventstream-class
chapter_label: "6"
part_label: "Part 2 — Talking to Claude"
tab_title: "EventStream Class"
title: "6. The EventStream Class"
description: "A generic push-based AsyncIterable for streaming events."
---

pi wraps all streaming in a generic `EventStream<T, R>` that implements `AsyncIterable`. This lets any consumer use `for await...of`.

**File:** [`packages/ai/src/utils/event-stream.ts` L4-66](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/event-stream.ts#L4-L66)

```typescript
export class EventStream<T, R = T> implements AsyncIterable<T> {
  private queue: T[] = [];
  private waiting: ((value: IteratorResult<T>) => void)[] = [];
  private done = false;

  push(event: T): void {
    if (this.done) return;
    const waiter = this.waiting.shift();
    if (waiter) {
      waiter({ value: event, done: false });
    } else {
      this.queue.push(event);
    }
  }

  end(result?: R): void {
    this.done = true;
    while (this.waiting.length > 0) {
      this.waiting.shift()!({ value: undefined as any, done: true });
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    while (true) {
      if (this.queue.length > 0) {
        yield this.queue.shift()!;
      } else if (this.done) {
        return;
      } else {
        const result = await new Promise<IteratorResult<T>>((resolve) => this.waiting.push(resolve));
        if (result.done) return;
        yield result.value;
      }
    }
  }
}
```

The pattern: producer calls `push()` to emit events, consumer uses `for await (const event of stream)`. If the consumer is slower than the producer, events queue up. If the consumer is faster, it awaits via a Promise.

The specialized `AssistantMessageEventStream` extends this:

**File:** [`packages/ai/src/utils/event-stream.ts` L68-82](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/event-stream.ts#L68-L82)

```typescript
export class AssistantMessageEventStream extends EventStream<AssistantMessageEvent, AssistantMessage> {
  constructor() {
    super(
      (event) => event.type === "done" || event.type === "error",
      (event) => {
        if (event.type === "done") return event.message;
        if (event.type === "error") return event.error;
        throw new Error("Unexpected event type");
      }
    );
  }
}
```
