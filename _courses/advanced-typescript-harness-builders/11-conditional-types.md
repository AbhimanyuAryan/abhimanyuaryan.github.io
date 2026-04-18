---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 11
chapter_id: conditional-types
chapter_label: "5"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "Conditional Types"
title: "5. Conditional Types"
description: "`T extends U ? X : Y` evaluates types at the type level — often nested to pick between shapes."
---

Conditional types evaluate types at the type level: `T extends U ? X : Y`.

**File:** [`packages/ai/src/types.ts` L407-411](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L407-L411)

```typescript
export interface Model<TApi extends Api> {
  // ...
  compat?: TApi extends "openai-completions" ? OpenAICompletionsCompat : TApi extends "openai-responses" ? OpenAIResponsesCompat : never;
}
```

The `compat` field's type changes based on the `TApi` type parameter — nested conditional types select the correct compatibility interface.
