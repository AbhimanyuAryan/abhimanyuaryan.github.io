---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 15
chapter_id: utility-types
chapter_label: "9"
part_label: "Part 2 — Generics & Type Manipulation"
tab_title: "Utility Types"
title: "9. Utility Types in Practice"
description: "Record, Pick, Omit, Partial, Extract — the built-in utility types used across pi-mono."
---

### `Record<K, V>`

**File:** [`packages/ai/src/types.ts` L61-63](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L61-L63)

```typescript
export interface ProviderResponse {
  status: number;
  headers: Record<string, string>;
}
```

### `Pick<T, K>`

**File:** [`packages/coding-agent/src/core/footer-data-provider.ts` L336-339](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/footer-data-provider.ts#L336-L339)

```typescript
export type ReadonlyFooterDataProvider = Pick<
  FooterDataProvider,
  "getGitBranch" | "getExtensionStatuses" | "getAvailableProviderCount" | "onBranchChange"
>;
```

Creates a narrow read-only facade from a larger class.

### `Omit<T, K>`

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L1063](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L1063)

```typescript
registerCommand(name: string, options: Omit<RegisteredCommand, "name" | "sourceInfo">): void;
```

### `Partial<Record<...>>`

**File:** [`packages/ai/src/types.ts` L273](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L273)

```typescript
reasoningEffortMap?: Partial<Record<ThinkingLevel, string>>;
```

### `Extract<T, U>`

**File:** [`packages/ai/src/types.ts` L258](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L258)

```typescript
| { type: "done"; reason: Extract<StopReason, "stop" | "length" | "toolUse">; message: AssistantMessage }
| { type: "error"; reason: Extract<StopReason, "aborted" | "error">; error: AssistantMessage };
```

Restricts `StopReason` to only the relevant subset for each event variant.
