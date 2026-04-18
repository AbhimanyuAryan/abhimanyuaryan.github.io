---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 16
chapter_id: building-the-system-prompt
chapter_label: "16"
part_label: "Part 5 — The System Prompt"
tab_title: "System Prompt"
title: "16. Building the System Prompt"
description: "Tell Claude what tools it has, how to behave, what directory it's in."
---

The system prompt tells Claude what it is, what tools it has, and how to behave.

**File:** [`packages/coding-agent/src/core/system-prompt.ts` L28-172](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/system-prompt.ts#L28-L172)

```typescript
export function buildSystemPrompt(options: BuildSystemPromptOptions = {}): string {
  // Build tools list
  const tools = selectedTools || ["read", "bash", "edit", "write"];
  const toolsList = tools
    .filter((name) => !!toolSnippets?.[name])
    .map((name) => `- ${name}: ${toolSnippets![name]}`)
    .join("\n");

  let prompt = `You are an expert coding assistant operating inside pi, a coding agent harness.

Available tools:
${toolsList}

Guidelines:
${guidelines}`;

  // Add date and working directory
  prompt += `\nCurrent date: ${date}`;
  prompt += `\nCurrent working directory: ${promptCwd}`;

  return prompt;
}
```

For your minimal harness:

```typescript
const systemPrompt = `You are a coding assistant. You can read, edit, and create files.

Available tools:
- read: Read a file from disk
- edit: Edit a file using string replacement
- write: Create or overwrite a file
- bash: Run a shell command

Current directory: ${process.cwd()}
Current date: ${new Date().toISOString().split("T")[0]}`;
```
