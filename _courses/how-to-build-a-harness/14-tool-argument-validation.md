---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 14
chapter_id: tool-argument-validation
chapter_label: "14"
part_label: "Part 4 — The Agent Loop"
tab_title: "Argument Validation"
title: "14. Tool Argument Validation"
description: "Validate LLM-provided arguments against your JSON schema."
---

The LLM generates JSON arguments. They might be malformed. Validate before executing.

**File:** [`packages/ai/src/utils/validation.ts` L64-93](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/utils/validation.ts#L64-L93)

```typescript
export function validateToolArguments(tool: Tool, toolCall: ToolCall): any {
  const validate = ajv.compile(tool.parameters);
  const args = structuredClone(toolCall.arguments);

  if (validate(args)) {
    return args; // Valid -- AJV may have coerced types
  }

  const errors = validate.errors?.map((err) => `  - ${err.instancePath || "root"}: ${err.message}`).join("\n");

  throw new Error(
    `Validation failed for tool "${toolCall.name}":\n${errors}\n\n` + `Received arguments:\n${JSON.stringify(toolCall.arguments, null, 2)}`
  );
}
```

pi uses [AJV](https://ajv.js.org/) to compile TypeBox schemas into validators. When validation fails, the error message is sent back to the LLM as a `ToolResultMessage` with `isError: true`, so Claude can try again.

**File:** [`packages/agent/src/agent-loop.ts` L491-493](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent-loop.ts#L491-L493)

```typescript
const preparedToolCall = prepareToolCallArguments(tool, toolCall);
const validatedArgs = validateToolArguments(tool, preparedToolCall);
```
