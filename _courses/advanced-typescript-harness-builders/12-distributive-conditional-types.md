---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 12
chapter_id: distributive-conditional-types
chapter_label: "6"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "Distributive Omit"
title: "6. Distributive Conditional Types"
description: "Naked type parameters distribute over unions — critical for Omit on discriminated unions."
---

When `T` is a naked type parameter, conditional types distribute over unions. This is critical for `Omit` on union types.

**File:** [`packages/coding-agent/src/modes/rpc/rpc-client.ts` L21-24](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/modes/rpc/rpc-client.ts#L21-L24)

```typescript
/** Distributive Omit that works with union types */
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

/** RpcCommand without the id field (for internal send) */
type RpcCommandBody = DistributiveOmit<RpcCommand, "id">;
```

**Why this matters:** Standard `Omit<RpcCommand, "id">` collapses the union into a single type with only shared keys. `DistributiveOmit` preserves each union member individually by using `T extends unknown` to trigger distribution.
