---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 7
chapter_id: union-literal-types
chapter_label: "1"
part_label: "Part 1 — Core Type System"
tab_title: "Union & Literal Types"
title: "1. Union & Literal Types"
description: "String literal unions with an (string & {}) escape hatch for autocomplete + extensibility."
---

String literal union types restrict a value to a known set of strings while allowing extensibility via `(string & {})`.

**File:** [`packages/ai/src/types.ts` L5-17](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L5-L17)

```typescript
export type KnownApi =
  | "openai-completions"
  | "mistral-conversations"
  | "openai-responses"
  | "anthropic-messages"
  | "bedrock-converse-stream"
  | "google-generative-ai";

// Allow known strings with autocomplete, but also accept arbitrary strings
export type Api = KnownApi | (string & {});
```

The `(string & {})` trick preserves autocomplete for known values while accepting any string at runtime.

Also see **`ThinkingLevel`** and **`StopReason`**:

**File:** [`packages/ai/src/types.ts` L45, L192](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L45)

```typescript
export type ThinkingLevel = "minimal" | "low" | "medium" | "high" | "xhigh";
export type StopReason = "stop" | "length" | "toolUse" | "error" | "aborted";
```
