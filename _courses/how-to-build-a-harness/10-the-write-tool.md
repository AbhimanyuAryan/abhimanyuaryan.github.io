---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 10
chapter_id: the-write-tool
chapter_label: "10"
part_label: "Part 3 — Tools: Giving the LLM Hands"
tab_title: "write Tool"
title: "10. The `write` Tool"
description: "Let Claude create new files."
---

Creates new files or overwrites existing ones.

**File:** [`packages/coding-agent/src/core/tools/write.ts`](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/tools/write.ts)

```typescript
const writeSchema = Type.Object({
  path: Type.String({ description: "Path to the file to write (relative or absolute)" }),
  content: Type.String({ description: "Content to write to the file" }),
});
```

The Amp blog combines write into `edit_file` (empty `old_str` = create file). pi separates them for clarity.
