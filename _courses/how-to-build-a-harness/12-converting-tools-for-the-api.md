---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 12
chapter_id: converting-tools-for-the-api
chapter_label: "12"
part_label: "Part 4 — The Agent Loop"
tab_title: "Converting Tools"
title: "12. Converting Tools for the API"
description: "Translate your Tool[] into Anthropic's tools parameter."
---

Your internal `Tool[]` must be converted to Anthropic's API format before each call.

**File:** [`packages/ai/src/providers/anthropic.ts` L911-932](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/anthropic.ts#L911-L932)

```typescript
function convertTools(tools: Tool[]): Anthropic.Messages.Tool[] {
  return tools.map((tool) => {
    const schema = tool.parameters as { properties?: unknown; required?: string[] };
    return {
      name: tool.name,
      description: tool.description,
      input_schema: {
        type: "object",
        properties: schema.properties ?? {},
        required: schema.required ?? [],
      },
    };
  });
}
```

This is the bridge between TypeBox schemas (your side) and Anthropic's JSON Schema format (API side). For your minimal harness, this is a direct mapping.
