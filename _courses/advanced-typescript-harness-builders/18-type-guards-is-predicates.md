---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 18
chapter_id: type-guards-is-predicates
chapter_label: "12"
part_label: "Part 3 — Advanced Patterns"
tab_title: "Type Guards"
title: "12. Type Guards & `is` Predicates"
description: "Runtime narrowing: functions whose return type is a type predicate."
---

Type guards narrow a type at runtime using the `is` return type annotation.

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L820-840](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L820-L840)

```typescript
export function isBashToolResult(e: ToolResultEvent): e is BashToolResultEvent {
  return e.toolName === "bash";
}
export function isReadToolResult(e: ToolResultEvent): e is ReadToolResultEvent {
  return e.toolName === "read";
}
export function isEditToolResult(e: ToolResultEvent): e is EditToolResultEvent {
  return e.toolName === "edit";
}
```

**Structural type guard (no discriminant field):**

**File:** [`packages/coding-agent/src/core/keybindings.ts` L201-206](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/keybindings.ts#L201-L206)

```typescript
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLegacyKeybindingName(key: string): key is keyof typeof KEYBINDING_NAME_MIGRATIONS {
  return key in KEYBINDING_NAME_MIGRATIONS;
}
```
