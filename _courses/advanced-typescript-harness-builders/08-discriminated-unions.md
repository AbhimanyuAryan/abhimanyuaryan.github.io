---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 8
chapter_id: discriminated-unions
chapter_label: "2"
part_label: "Part 1 — Core Type System"
tab_title: "Discriminated Unions"
title: "2. Discriminated Unions"
description: "A common literal property lets TypeScript narrow a union inside switch/if blocks."
---

A discriminated union uses a common literal property (the "discriminant") to let TypeScript narrow the type inside `switch`/`if` blocks.

**File:** [`packages/ai/src/types.ts` L247-259](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L247-L259)

```typescript
export type AssistantMessageEvent =
  | { type: "start"; partial: AssistantMessage }
  | { type: "text_delta"; contentIndex: number; delta: string; partial: AssistantMessage }
  | { type: "done"; reason: Extract<StopReason, "stop" | "length" | "toolUse">; message: AssistantMessage }
  | { type: "error"; reason: Extract<StopReason, "aborted" | "error">; error: AssistantMessage };
```

The `type` field is the discriminant. Each branch carries different payload shapes.

Another large example — RPC commands with 20+ variants:

**File:** [`packages/coding-agent/src/modes/rpc/rpc-types.ts` L19-68](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/modes/rpc/rpc-types.ts#L19-L68)

```typescript
export type RpcCommand =
  | { id?: string; type: "prompt"; message: string; images?: ImageContent[] }
  | { id?: string; type: "abort" }
  | { id?: string; type: "set_model"; provider: string; modelId: string }
  | { id?: string; type: "bash"; command: string };
// ... 20+ more variants
```
