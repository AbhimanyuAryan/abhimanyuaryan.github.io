---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 3
chapter_id: the-model-object
chapter_label: "3"
part_label: "Part 1 — The Mental Model"
tab_title: "Model Object"
title: "3. The Model Object"
description: "How to describe a Claude model to your harness."
---

Before calling the API you need a Model object that describes which Claude model to use, its capabilities, and pricing.

**File:** [`packages/ai/src/types.ts` L389-412](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L389-L412)

```typescript
export interface Model<TApi extends Api> {
  id: string; // e.g., "claude-sonnet-4-20250514"
  name: string; // e.g., "Claude Sonnet 4"
  api: TApi; // "anthropic-messages"
  provider: Provider; // "anthropic"
  baseUrl: string; // "https://api.anthropic.com"
  reasoning: boolean; // true if model supports extended thinking
  input: ("text" | "image")[]; // input modalities
  cost: {
    input: number; // $/million tokens
    output: number;
    cacheRead: number;
    cacheWrite: number;
  };
  contextWindow: number; // e.g., 200000
  maxTokens: number; // e.g., 64000
}
```

For a minimal harness you hardcode one model:

```typescript
const model: Model<"anthropic-messages"> = {
  id: "claude-sonnet-4-20250514",
  name: "Claude Sonnet 4",
  api: "anthropic-messages",
  provider: "anthropic",
  baseUrl: "https://api.anthropic.com",
  reasoning: true,
  input: ["text", "image"],
  cost: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
  contextWindow: 200000,
  maxTokens: 64000,
};
```
