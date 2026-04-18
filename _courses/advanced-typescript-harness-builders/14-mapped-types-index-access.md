---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 14
chapter_id: mapped-types-index-access
chapter_label: "8"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "Mapped Types"
title: "8. Mapped Types & Index Access"
description: "Access nested types with [keyof T] and typeof to derive types from runtime objects."
---

Access nested types with `[keyof T]` and `typeof` to derive types from runtime objects.

**File:** [`packages/agent/src/types.ts` L245](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/types.ts#L245)

```typescript
export type AgentMessage = Message | CustomAgentMessages[keyof CustomAgentMessages];
```

This creates a union of all value types in the `CustomAgentMessages` interface using indexed access.

**Deeply nested access:**

**File:** [`packages/ai/src/models.ts` L32-36](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/models.ts#L32-L36)

```typescript
export function getModels<TProvider extends KnownProvider>(provider: TProvider): Model<ModelApi<TProvider, keyof (typeof MODELS)[TProvider]>>[] {
  // ...
}
```

Chains `typeof MODELS` → index by `TProvider` → `keyof` to get all model IDs for a given provider.

Also see `Extract` on union content types:

**File:** [`packages/agent/src/types.ts` L38](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/types.ts#L38)

```typescript
export type AgentToolCall = Extract<AssistantMessage["content"][number], { type: "toolCall" }>;
```

`[number]` indexes into an array type to get the element type, then `Extract` filters to the specific union member.
