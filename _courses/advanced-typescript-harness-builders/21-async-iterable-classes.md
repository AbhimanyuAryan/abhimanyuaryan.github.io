---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 21
chapter_id: async-iterable-classes
chapter_label: "15"
part_label: "Part 4 — Async TypeScript"
tab_title: "AsyncIterable Class"
title: "15. Generic Classes with `AsyncIterable`"
description: "Build a push-based event stream that works with for await...of."
---

Building a push-based event stream that implements `AsyncIterable` for `for await...of` consumption.

**File:** [`packages/ai/src/utils/event-stream.ts` L4-66](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/event-stream.ts#L4-L66)

```typescript
export class EventStream<T, R = T> implements AsyncIterable<T> {
  private queue: T[] = [];
  private waiting: ((value: IteratorResult<T>) => void)[] = [];
  private done = false;
  private finalResultPromise: Promise<R>;
  private resolveFinalResult!: (result: R) => void;

  constructor(
    private isComplete: (event: T) => boolean,
    private extractResult: (event: T) => R
  ) {
    /* ... */
  }

  push(event: T): void {
    /* ... */
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

  result(): Promise<R> {
    return this.finalResultPromise;
  }
}
```

Key patterns:

- **Two type parameters**: `T` for events, `R` for the final result
- **`Symbol.asyncIterator`**: makes the class work with `for await...of`
- **`async *`**: generator syntax inside a class method
- **Non-null assertion `!`**: `this.queue.shift()!` when we've checked `length > 0`

**Specialized subclass:**

**File:** [`packages/ai/src/utils/event-stream.ts` L68-82](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/event-stream.ts#L68-L82)

```typescript
export class AssistantMessageEventStream extends EventStream<AssistantMessageEvent, AssistantMessage> {
  constructor() {
    super(
      (event) => event.type === "done" || event.type === "error",
      (event) => {
        if (event.type === "done") return event.message;
        else if (event.type === "error") return event.error;
        throw new Error("Unexpected event type for final result");
      }
    );
  }
}
```
