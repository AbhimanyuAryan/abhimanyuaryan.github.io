---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 11
chapter_id: the-bash-tool
chapter_label: "11"
part_label: "Part 3 — Tools: Giving the LLM Hands"
tab_title: "bash Tool"
title: "11. The `bash` Tool"
description: "Let Claude run shell commands."
---

Lets Claude run arbitrary shell commands. This is optional but dramatically increases capability.

**File:** [`packages/mom/src/tools/bash.ts` L18-34](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/tools/bash.ts#L18-L34)

```typescript
const bashSchema = Type.Object({
  label: Type.String({ description: "Brief description of what this command does" }),
  command: Type.String({ description: "Bash command to execute" }),
  timeout: Type.Optional(Type.Number({ description: "Timeout in seconds (optional)" })),
});
```

The execute function spawns a child process and captures stdout/stderr:

```typescript
execute: async (_toolCallId, { command, timeout }, signal?) => {
  const result = await exec(command, { timeout, signal });
  return {
    content: [{ type: "text", text: result.stdout + result.stderr }],
  };
};
```

With `bash`, the LLM can install packages, run tests, check git status — anything you can do in a terminal.
