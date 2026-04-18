---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 26
chapter_id: readonly-immutable-apis
chapter_label: "20"
part_label: "Part 5 — Project Patterns"
tab_title: "ReadonlyArray & Pick Facades"
title: "20. `ReadonlyArray`, `Pick` Facades & Immutable APIs"
description: "Expose read-only views to prevent mutation of internal state."
---

Expose read-only views to prevent mutation of internal state.

**File:** [`packages/coding-agent/src/core/slash-commands.ts` L17-38](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/slash-commands.ts#L17-L38)

```typescript
export const BUILTIN_SLASH_COMMANDS: ReadonlyArray<BuiltinSlashCommand> = [
  { name: "settings", description: "Open settings menu" },
  { name: "model", description: "Select model" },
  // ...
];
```

**`Pick` for read-only facades:**

**File:** [`packages/coding-agent/src/core/session-manager.ts` L184-199](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/session-manager.ts#L184-L199)

```typescript
export type ReadonlySessionManager = Pick<
  SessionManager,
  | "getCwd"
  | "getSessionDir"
  | "getSessionId"
  | "getSessionFile"
  | "getLeafId"
  | "getLeafEntry"
  | "getEntry"
  | "getLabel"
  | "getBranch"
  | "getHeader"
  | "getEntries"
  | "getTree"
  | "getSessionName"
>;
```

Extensions receive `ReadonlySessionManager` instead of the full `SessionManager`, blocking access to mutation methods.

**File:** [`packages/coding-agent/src/core/agent-session.ts` L846-857](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/agent-session.ts#L846-L857)

```typescript
get scopedModels(): ReadonlyArray<{ model: Model<any>; thinkingLevel?: ThinkingLevel }> {
  return this._scopedModels;
}

get promptTemplates(): ReadonlyArray<PromptTemplate> {
  return this._resourceLoader.getPrompts().prompts;
}
```
