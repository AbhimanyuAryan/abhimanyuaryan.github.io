---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 25
chapter_id: accessor-properties-interfaces
chapter_label: "19"
part_label: "Part 5 — Project Patterns"
tab_title: "Accessors in Interfaces"
title: "19. Accessor Properties in Interfaces"
description: "Interfaces can define get/set signatures, not just data properties."
---

TypeScript interfaces can define getter/setter signatures, not just data properties.

**File:** [`packages/agent/src/types.ts` L253-277](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/types.ts#L253-L277)

```typescript
export interface AgentState {
  systemPrompt: string;
  model: Model<any>;
  thinkingLevel: ThinkingLevel;

  /** Assigning a new array copies the top-level array. */
  set tools(tools: AgentTool<any>[]);
  get tools(): AgentTool<any>[];

  /** Assigning a new array copies the top-level array. */
  set messages(messages: AgentMessage[]);
  get messages(): AgentMessage[];

  /** Read-only properties */
  readonly isStreaming: boolean;
  readonly streamingMessage?: AgentMessage;
  readonly pendingToolCalls: ReadonlySet<string>;
}
```

- `set`/`get` in an interface means implementing classes can intercept assignment (e.g., to copy arrays)
- `readonly` fields cannot be assigned from outside
- `ReadonlySet<string>` prevents external mutation of the set
