---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 13
chapter_id: infer-keyword
chapter_label: "7"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "infer Keyword"
title: "7. The `infer` Keyword"
description: "Extract a type from a structural position inside a conditional type."
---

`infer` extracts a type from a structural position inside a conditional type.

**File:** [`packages/ai/src/models.ts` L15-18](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/models.ts#L15-L18)

```typescript
type ModelApi<TProvider extends KnownProvider, TModelId extends keyof (typeof MODELS)[TProvider]> = (typeof MODELS)[TProvider][TModelId] extends {
  api: infer TApi;
}
  ? TApi extends Api
    ? TApi
    : never
  : never;
```

This extracts the `api` field's type from a specific model entry in the generated models object, then validates it extends `Api`.

**Using `Parameters<>` and `ReturnType<>`:**

**File:** [`packages/agent/src/types.ts` L24-26](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/types.ts#L24-L26)

```typescript
export type StreamFn = (...args: Parameters<typeof streamSimple>) => ReturnType<typeof streamSimple> | Promise<ReturnType<typeof streamSimple>>;
```

`Parameters` and `ReturnType` use `infer` internally to extract function signatures.
