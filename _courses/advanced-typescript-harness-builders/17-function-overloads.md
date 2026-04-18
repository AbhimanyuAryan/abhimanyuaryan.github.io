---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 17
chapter_id: function-overloads
chapter_label: "11"
part_label: "Part 3 — Advanced Patterns"
tab_title: "Function Overloads"
title: "11. Function Overloads"
description: "Multiple call signatures let one name accept different argument types and return corresponding types."
---

Multiple call signatures let a single function name accept different argument types and return corresponding types.

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L862-874](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L862-L874)

```typescript
// Overload signatures for built-in tools
export function isToolCallEventType(toolName: "bash", event: ToolCallEvent): event is BashToolCallEvent;
export function isToolCallEventType(toolName: "read", event: ToolCallEvent): event is ReadToolCallEvent;
export function isToolCallEventType(toolName: "edit", event: ToolCallEvent): event is EditToolCallEvent;
// ... more overloads ...

// Generic overload for custom tools
export function isToolCallEventType<TName extends string, TInput extends Record<string, unknown>>(
  toolName: TName,
  event: ToolCallEvent
): event is ToolCallEvent & { toolName: TName; input: TInput };

// Implementation signature
export function isToolCallEventType(toolName: string, event: ToolCallEvent): boolean {
  return event.toolName === toolName;
}
```

**Event subscription overloads (26 overloads on `on()`):**

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L1011-1047](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L1011-L1047)

```typescript
on(event: "session_start", handler: ExtensionHandler<SessionStartEvent>): void;
on(event: "agent_start", handler: ExtensionHandler<AgentStartEvent>): void;
on(event: "tool_call", handler: ExtensionHandler<ToolCallEvent, ToolCallEventResult>): void;
// ... each event name maps to its specific event & result type
```
