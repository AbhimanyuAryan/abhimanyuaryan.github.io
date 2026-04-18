---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 9
chapter_id: the-edit-tool
chapter_label: "9"
part_label: "Part 3 — Tools: Giving the LLM Hands"
tab_title: "edit Tool"
title: "9. The `edit` Tool"
description: "Let Claude edit files with string replacement."
---

The blog posts converge on the same design: **string replacement**. Find `oldText`, replace with `newText`.

**File:** [`packages/coding-agent/src/core/tools/edit.ts` L31-51](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/tools/edit.ts#L31-L51)

```typescript
const replaceEditSchema = Type.Object({
  oldText: Type.String({
    description: "Exact text for one targeted replacement. Must be unique in the file.",
  }),
  newText: Type.String({ description: "Replacement text for this targeted edit." }),
});

const editSchema = Type.Object({
  path: Type.String({ description: "Path to the file to edit (relative or absolute)" }),
  edits: Type.Array(replaceEditSchema, {
    description: "One or more targeted replacements.",
  }),
});
```

pi's `edit` tool supports **batched edits** (multiple replacements in one call), which is more powerful than the single-replacement version in the blog posts. The core logic is the same: read file → replace strings → write file.
