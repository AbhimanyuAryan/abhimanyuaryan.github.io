---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 1
chapter_id: what-is-a-harness
chapter_label: "1"
part_label: "Part 1 — The Mental Model"
tab_title: "What Is a Harness?"
title: "1. What Is a Harness?"
description: "Understand the loop: prompt → LLM → tool calls → results → repeat."
---

A harness is a program that:

1. Sends a user message to an LLM
2. The LLM replies — sometimes with text, sometimes with **tool calls**
3. Your program **executes** those tool calls (read a file, edit code, run a command)
4. The results are sent back to the LLM
5. Repeat until the LLM says "I'm done" (no more tool calls)

That's the whole architecture. The LLM never touches your filesystem. It only _asks_ for things to happen, and your code makes them happen.

Both reference blogs emphasize this: the core loop is ~100 lines. Everything else is tooling around it.

**File:** [`packages/agent/src/agent-loop.ts` L155-232](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent-loop.ts#L155-L232)

```typescript
async function runLoop(
  currentContext: AgentContext,
  newMessages: AgentMessage[],
  config: AgentLoopConfig,
  signal: AbortSignal | undefined,
  emit: AgentEventSink,
  streamFn?: StreamFn
): Promise<void> {
  let hasMoreToolCalls = true;

  while (hasMoreToolCalls || pendingMessages.length > 0) {
    // Stream assistant response
    const message = await streamAssistantResponse(currentContext, config, signal, emit, streamFn);
    newMessages.push(message);

    // Check for tool calls
    const toolCalls = message.content.filter((c) => c.type === "toolCall");
    hasMoreToolCalls = toolCalls.length > 0;

    if (hasMoreToolCalls) {
      const toolResults = await executeToolCalls(currentContext, message, config, signal, emit);
      for (const result of toolResults) {
        currentContext.messages.push(result);
        newMessages.push(result);
      }
    }
  }
}
```

The key insight: **the inner loop continues while `hasMoreToolCalls` is true**. Each iteration streams a response, checks if the LLM wants to use tools, executes them, and loops again.
