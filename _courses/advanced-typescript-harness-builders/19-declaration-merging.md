---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 19
chapter_id: declaration-merging
chapter_label: "13"
part_label: "Part 3 — Advanced Patterns"
tab_title: "Declaration Merging"
title: "13. Declaration Merging & Module Augmentation"
description: "Extend third-party interfaces without forking them — the plugin pattern done right."
---

Extend interfaces from external packages without modifying their source code.

**Extensible interface (the hook):**

**File:** [`packages/agent/src/types.ts` L236-238](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/types.ts#L236-L238)

```typescript
export interface CustomAgentMessages {
  // Empty by default - apps extend via declaration merging
}
```

**Consumer augmentation (the extension):**

**File:** [`packages/coding-agent/src/core/messages.ts` L70-77](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/messages.ts#L70-L77)

```typescript
declare module "@mariozechner/pi-agent-core" {
  interface CustomAgentMessages {
    bashExecution: BashExecutionMessage;
    custom: CustomMessage;
    branchSummary: BranchSummaryMessage;
    compactionSummary: CompactionSummaryMessage;
  }
}
```

After this augmentation, `AgentMessage` (which is `Message | CustomAgentMessages[keyof CustomAgentMessages]`) automatically includes all four new message types, with full type safety in `switch` statements.
