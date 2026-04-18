---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 20
chapter_id: as-const-satisfies
chapter_label: "14"
part_label: "Part 3 — Advanced Patterns"
tab_title: "as const / satisfies"
title: "14. `as const` Assertions & `satisfies`"
description: "Preserve literal types and validate shape without widening."
---

### `as const satisfies`

**File:** [`packages/coding-agent/src/core/keybindings.ts` L50-137](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/keybindings.ts#L50-L137)

```typescript
export const KEYBINDINGS = {
  "app.interrupt": { defaultKeys: "escape", description: "Cancel or abort" },
  "app.clear": { defaultKeys: "ctrl+c", description: "Clear editor" },
  // ... 30+ entries
} as const satisfies KeybindingDefinitions;
```

- `as const` preserves the exact literal types of every key and value
- `satisfies KeybindingDefinitions` validates the shape without widening

**File:** [`packages/coding-agent/src/core/keybindings.ts` L139-199](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/keybindings.ts#L139-L199)

```typescript
const KEYBINDING_NAME_MIGRATIONS = {
  cursorUp: "tui.editor.cursorUp",
  // ...
} as const satisfies Record<string, Keybinding>;
```

### `satisfies` without `as const` (for runtime values)

**File:** [`packages/ai/src/providers/mistral.ts` L129](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/mistral.ts#L129)

```typescript
return streamMistral(model, context, {
  ...base,
  promptMode: shouldUseReasoning ? "reasoning" : undefined,
  reasoningEffort: shouldUseReasoning ? mapReasoningEffort(reasoning) : undefined,
} satisfies MistralOptions);
```

Validates the object literal matches `MistralOptions` without changing the inferred type.
