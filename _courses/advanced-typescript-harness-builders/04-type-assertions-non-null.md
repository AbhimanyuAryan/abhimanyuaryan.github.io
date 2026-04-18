---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 4
chapter_id: type-assertions-non-null
chapter_label: "0d"
part_label: "Part 0 — Bridge: JavaScript to TypeScript"
tab_title: "Assertions & !"
title: "0d. Type Assertions & Non-Null Assertions"
description: "Escape hatches: when you know more about a value than TypeScript does."
---

Sometimes you know more than TypeScript about a value's type. These are escape hatches.

**`as` keyword (type assertion):**

**File:** [`packages/ai/src/env-api-keys.ts` L16](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/env-api-keys.ts#L16)

```typescript
_existsSync = (m as typeof import("node:fs")).existsSync;
```

`m` is typed as `unknown` (from a dynamic import). We assert it's the `node:fs` module because we know what we imported.

**`as unknown as T` (double assertion for incompatible types):**

**File:** [`packages/ai/src/providers/openai-codex-responses.ts` L455](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/openai-codex-responses.ts#L455)

```typescript
yield event as unknown as ResponseStreamEvent;
```

When types are too far apart for a direct assertion, go through `unknown` first. This is a smell — use sparingly.

**`!` non-null assertion:**

**File:** [`packages/ai/src/utils/event-stream.ts` L39](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/event-stream.ts#L39)

```typescript
yield this.queue.shift()!;
```

`Array.shift()` returns `T | undefined`. We checked `this.queue.length > 0` on the line above, so we **know** it won't be undefined. The `!` tells TypeScript "trust me, this isn't null/undefined."

**Rule of thumb:** Prefer narrowing (chapter 0e) over assertions. Use `!` only when you've provably checked the condition but TypeScript can't see it.
