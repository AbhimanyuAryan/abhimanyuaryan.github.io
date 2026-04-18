---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 5
chapter_id: type-narrowing-runtime
chapter_label: "0e"
part_label: "Part 0 — Bridge: JavaScript to TypeScript"
tab_title: "Type Narrowing"
title: "0e. Type Narrowing (Runtime)"
description: "TypeScript's killer feature: it tracks runtime checks and narrows types automatically."
---

TypeScript tracks runtime checks and narrows types automatically. This is its killer feature.

**`typeof` checks:**

**File:** [`packages/ai/src/env-api-keys.ts` L14](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/env-api-keys.ts#L14)

```typescript
if (typeof process !== "undefined" && (process.versions?.node || process.versions?.bun)) {
  // Inside here, TypeScript knows `process` exists
}
```

**`instanceof` checks:**

**File:** [`packages/mom/src/log.ts` L167](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/log.ts#L167)

```typescript
err instanceof Error ? err.message : String(err);
```

After `instanceof Error`, TypeScript knows `err` has `.message`.

**Truthiness narrowing:**

**File:** [`packages/mom/src/sandbox.ts` L36-38](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/sandbox.ts#L36-L38)

```typescript
const result = await execSimple("docker", ["inspect", "-f", "...", config.container]);
if (result.trim() !== "true") {
  // TypeScript still knows result is string here
  console.error(`Error: Container '${config.container}' is not running.`);
}
```

**Optional chaining (`?.`) narrows to `undefined`:**

**File:** [`packages/ai/src/env-api-keys.ts` L14](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/env-api-keys.ts#L14)

```typescript
process.versions?.node || process.versions?.bun;
```

`?.` returns `undefined` if the left side is null/undefined. Combined with `||`, this is a safe way to check nested properties.

**These are all JavaScript features, but TypeScript is the one that tracks them for type safety.** In JS, `typeof` is just a runtime check. In TS, it also changes what the compiler thinks the type is inside the `if` block.
