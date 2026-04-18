---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 8
chapter_id: the-read-tool
chapter_label: "8"
part_label: "Part 3 — Tools: Giving the LLM Hands"
tab_title: "read Tool"
title: "8. The `read` Tool"
description: "Let Claude read files from disk."
---

Lets Claude see file contents. This is the most important tool — without it, the LLM is blind.

**File:** [`packages/coding-agent/src/core/tools/read.ts` L17-21](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/tools/read.ts#L17-L21)

```typescript
const readSchema = Type.Object({
  path: Type.String({ description: "Path to the file to read (relative or absolute)" }),
  offset: Type.Optional(Type.Number({ description: "Line number to start reading from (1-indexed)" })),
  limit: Type.Optional(Type.Number({ description: "Maximum number of lines to read" })),
});
```

The execute function reads from disk, adds line numbers, and truncates large files:

```typescript
// Minimal read tool implementation
async execute(_toolCallId, { path, offset, limit }) {
  const absolutePath = resolve(cwd, path);
  const buffer = await readFile(absolutePath);
  const content = buffer.toString("utf-8");
  // Add line numbers, truncate if needed
  return { content: [{ type: "text", text: numberedContent }] };
}
```

The Amp blog's `read_file` is identical in spirit: read from disk, return as string. The pi version adds line numbering and truncation for production use.
