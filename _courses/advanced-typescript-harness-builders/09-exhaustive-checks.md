---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 9
chapter_id: exhaustive-checks
chapter_label: "3"
part_label: "Part 1 — Core Type System"
tab_title: "Exhaustive never"
title: "3. Exhaustive Checks with `never`"
description: "Compile-time completeness: the compiler errors at the default branch when a new union member is added."
---

Assign the switch default to a `never`-typed variable. If a new union member is added, the compiler raises an error here.

**File:** [`packages/ai/src/providers/google-shared.ts` L307-310](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/google-shared.ts#L307-L310)

```typescript
default: {
  const _exhaustive: never = reason;
  throw new Error(`Unhandled stop reason: ${_exhaustive}`);
}
```

**File:** [`packages/coding-agent/src/core/messages.ts` L188-191](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/messages.ts#L188-L191)

```typescript
default:
  const _exhaustiveCheck: never = m;
  return undefined;
```

This pattern guarantees at compile time that every branch of a discriminated union is handled.
