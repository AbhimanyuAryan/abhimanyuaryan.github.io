---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 27
chapter_id: bonus-patterns
chapter_label: "Bonus"
part_label: "Bonus Patterns"
tab_title: "Bonus Patterns"
title: "Bonus Patterns"
description: "Generic handlers, Static<TSchema>, and interface inheritance chains — four extra patterns worth internalizing."
---

### Generic Handler Type with `void` Return

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L1001](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L1001)

```typescript
export type ExtensionHandler<E, R = undefined> = (event: E, ctx: ExtensionContext) => Promise<R | void> | R | void;
```

Allows handlers to return the result type, `void`, or a `Promise` of either.

### `Static<TSchema>` — TypeBox Runtime Validation

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L399-405](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L399-L405)

```typescript
execute(
  toolCallId: string,
  params: Static<TParams>,  // Infers TS type from TypeBox schema
  signal: AbortSignal | undefined,
  onUpdate: AgentToolUpdateCallback<TDetails> | undefined,
  ctx: ExtensionContext,
): Promise<AgentToolResult<TDetails>>;
```

`Static<TParams>` converts a TypeBox schema into its TypeScript type at compile time, bridging runtime validation and static types.

### Interface Inheritance

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L301](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L301)

```typescript
export interface ExtensionCommandContext extends ExtensionContext {
  waitForIdle(): Promise<void>;
  newSession(options?: { /* ... */ }): Promise<{ cancelled: boolean }>;
  fork(entryId: string): Promise<{ cancelled: boolean }>;
  // ...
}
```

### Interface Inheritance Chains (Tool Events)

**File:** [`packages/coding-agent/src/core/extensions/types.ts` L699-758](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/types.ts#L699-L758)

```typescript
interface ToolCallEventBase {
  type: "tool_call";
  toolCallId: string;
}

export interface BashToolCallEvent extends ToolCallEventBase {
  toolName: "bash";
  input: BashToolInput;
}

export interface ReadToolCallEvent extends ToolCallEventBase {
  toolName: "read";
  input: ReadToolInput;
}

// Union of all specialized tool events
export type ToolCallEvent = BashToolCallEvent | ReadToolCallEvent | EditToolCallEvent | WriteToolCallEvent | CustomToolCallEvent;
```

Base interface + specialized extensions + union = type-safe event handling with shared structure.

---

## Summary

| Pattern                      | Key Takeaway                             |
| ---------------------------- | ---------------------------------------- |
| `(string & {})`              | Autocomplete-friendly open string unions |
| Discriminated unions         | `type` field enables `switch` narrowing  |
| `never` exhaustive check     | Compiler catches missing cases           |
| `T extends U ? X : Y`        | Type-level conditionals                  |
| `DistributiveOmit`           | Preserves union members through `Omit`   |
| `infer`                      | Extracts types from structural positions |
| `as const satisfies`         | Exact literal types + shape validation   |
| `declare module`             | Extends third-party types non-invasively |
| `AsyncIterable` + generators | Lazy async streams                       |
| `Pick` facades               | Read-only API surfaces from full classes |
| Function overloads           | One name, many typed signatures          |
| Type guards with `is`        | Runtime checks that narrow types         |
