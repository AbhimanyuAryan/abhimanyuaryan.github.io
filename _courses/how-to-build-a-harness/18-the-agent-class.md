---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 18
chapter_id: the-agent-class
chapter_label: "18"
part_label: "Part 6 — From Loop to Agent"
tab_title: "Agent Class"
title: "18. The Agent Class"
description: "Stateful wrapper: owns transcript, emits events, handles abort."
---

The raw loop is stateless. The `Agent` class wraps it with state: transcript history, streaming state, abort handling, event listeners.

**File:** [`packages/agent/src/agent.ts` L158-207](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent.ts#L158-L207)

```typescript
export class Agent {
  private _state: MutableAgentState;
  private readonly listeners = new Set<(event: AgentEvent) => Promise<void> | void>();
  private readonly steeringQueue: PendingMessageQueue;
  private readonly followUpQueue: PendingMessageQueue;
  private activeRun?: ActiveRun;

  constructor(options: AgentOptions = {}) {
    this._state = createMutableAgentState(options.initialState);
    this.convertToLlm = options.convertToLlm ?? defaultConvertToLlm;
    this.streamFn = options.streamFn ?? streamSimple;
    // ...
  }

  /** Start a new prompt */
  async prompt(input: string): Promise<void> {
    if (this.activeRun) throw new Error("Already processing");
    const messages = this.normalizePromptInput(input);
    await this.runPromptMessages(messages);
  }

  /** Abort the current run */
  abort(): void {
    this.activeRun?.abortController.abort();
  }

  /** Subscribe to agent events */
  subscribe(listener: (event: AgentEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
```

The key design: `Agent` owns the message array and exposes it via `state.messages`. It creates an `AbortController` per run so you can cancel mid-stream. Event listeners let the UI react to streaming updates.
