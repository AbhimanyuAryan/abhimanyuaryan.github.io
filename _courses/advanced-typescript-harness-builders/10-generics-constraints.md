---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 10
chapter_id: generics-constraints
chapter_label: "4"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "Generics & Constraints"
title: "4. Generics & Constraints"
description: "`extends` clauses ensure type parameters meet a minimum shape, plus default type parameters."
---

Generics with `extends` constraints ensure type parameters meet a minimum shape.

**File:** [`packages/ai/src/types.ts` L135-139](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L135-L139)

```typescript
export type StreamFunction<TApi extends Api = Api, TOptions extends StreamOptions = StreamOptions> = (
  model: Model<TApi>,
  context: Context,
  options?: TOptions
) => AssistantMessageEventStream;
```

- `TApi extends Api` — constraint: must be an API type
- `= Api` — default: falls back to the base `Api` when not specified
- `TOptions extends StreamOptions` — the options must at least satisfy `StreamOptions`

**File:** [`packages/ai/src/api-registry.ts` L66-68](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/api-registry.ts#L66-L68)

```typescript
export function registerApiProvider<TApi extends Api, TOptions extends StreamOptions>(
  provider: ApiProvider<TApi, TOptions>,
  sourceId?: string,
): void { ... }
```

Multi-parameter generics with constraints on both type parameters.
