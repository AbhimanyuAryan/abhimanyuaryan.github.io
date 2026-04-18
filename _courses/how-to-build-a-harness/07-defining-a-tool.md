---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 7
chapter_id: defining-a-tool
chapter_label: "7"
part_label: "Part 3 — Tools: Giving the LLM Hands"
tab_title: "Defining a Tool"
title: "7. Defining a Tool"
description: "The Tool interface: name, description, JSON schema."
---

Both reference blogs agree: you need **3–4 tools** to build a working coding agent: `read`, `edit`/`write`, and optionally `bash`. pi ships 7 tools; the core 4 are `read`, `bash`, `edit`, `write`.

**File:** [`packages/coding-agent/src/core/tools/index.ts` L110](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/tools/index.ts#L110)

```typescript
export const codingTools: Tool[] = [readTool, bashTool, editTool, writeTool];
```

A tool is a name, a description (tells the LLM when/how to use it), and a JSON schema for its arguments.

**File:** [`packages/ai/src/types.ts` L227-231](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/types.ts#L227-L231)

```typescript
export interface Tool<TParameters extends TSchema = TSchema> {
  name: string;
  description: string;
  parameters: TParameters;
}
```

The agent layer adds `execute`:

**File:** [`packages/agent/src/types.ts` L291-306](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/types.ts#L291-L306)

```typescript
export interface AgentTool<TParameters extends TSchema = TSchema, TDetails = any> extends Tool<TParameters> {
  label: string;
  execute: (toolCallId: string, params: Static<TParameters>, signal?: AbortSignal) => Promise<AgentToolResult<TDetails>>;
}
```

pi uses [TypeBox](https://github.com/sinclairzx81/typebox) (`@sinclair/typebox`) for JSON Schema generation. The schema is defined as a TypeBox `Type.Object`, which is both a runtime JSON Schema object and a compile-time TypeScript type.
