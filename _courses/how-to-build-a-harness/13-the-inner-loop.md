---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 13
chapter_id: the-inner-loop
chapter_label: "13"
part_label: "Part 4 — The Agent Loop"
tab_title: "Inner Loop"
title: "13. The Inner Loop"
description: "Stream response → check for tool calls → execute → feed results back → repeat."
---

This is the heart of the harness. The agent loop from pi:

**File:** [`packages/agent/src/agent-loop.ts` L155-232](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent-loop.ts#L155-L232)

```typescript
// Simplified from pi's runLoop()
while (true) {
  // 1. Stream assistant response
  const message = await streamAssistantResponse(context, config, signal);

  // 2. Check if LLM wants to use tools
  const toolCalls = message.content.filter((c) => c.type === "toolCall");

  if (toolCalls.length === 0) {
    // No tool calls -- LLM is done, break the loop
    break;
  }

  // 3. Execute each tool call
  for (const toolCall of toolCalls) {
    const tool = context.tools.find((t) => t.name === toolCall.name);
    const result = await tool.execute(toolCall.id, toolCall.arguments);

    // 4. Add tool result to conversation
    context.messages.push({
      role: "toolResult",
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      content: result.content,
      isError: false,
      timestamp: Date.now(),
    });
  }

  // 5. Loop -- the LLM will see the tool results and decide what to do next
}
```

Compare with the Amp blog's loop:

```go
// Amp (Go) -- same structure
for _, content := range message.Content {
    switch content.Type {
    case "tool_use":
        // Execute tool, add result to conversation
    case "text":
        // Print response
    }
}
// If stop_reason == "tool_use", loop again
```

And Mihail Eric's Python version:

```python
# Mihail Eric -- same structure
while True:
    response = execute_llm_call(conversation)
    tool_invocations = extract_tool_invocations(response)
    if not tool_invocations:
        break  # No tools, done
    for name, args in tool_invocations:
        result = TOOL_REGISTRY[name](**args)
        conversation.append({"role": "user", "content": f"tool_result({result})"})
```

All three are the same loop. The LLM decides what to do, you execute it, feed the result back, repeat.
