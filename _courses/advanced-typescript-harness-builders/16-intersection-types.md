---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 16
chapter_id: intersection-types
chapter_label: "10"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "Intersections &"
title: "10. Intersection Types"
description: "The & operator merges two types — all properties from both sides must be present."
---

The `&` operator merges two types. All properties from both sides must be present.

**File:** [`packages/ai/src/types.ts` L118](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L118)

```typescript
export type ProviderStreamOptions = StreamOptions & Record<string, unknown>;
```

This creates a type that has all `StreamOptions` fields **plus** accepts arbitrary extra keys. Used when providers need custom options beyond the base interface.

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L872](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L872)

```typescript
): event is ToolCallEvent & { toolName: TName; input: TInput };
```

Intersection narrows `ToolCallEvent` to a specific tool name and input shape.
