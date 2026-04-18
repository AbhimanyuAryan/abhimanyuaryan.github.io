---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 17
chapter_id: project-context-and-skills
chapter_label: "17"
part_label: "Part 5 — The System Prompt"
tab_title: "Project Context"
title: "17. Project Context & Skills"
description: "Load AGENTS.md, skill files, and inject them into the prompt."
---

pi loads project-specific instructions from `AGENTS.md` files and skill files.

**File:** [`packages/coding-agent/src/core/system-prompt.ts` L154-165](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/system-prompt.ts#L154-L165)

```typescript
// Append project context files
if (contextFiles.length > 0) {
  prompt += "\n\n# Project Context\n\n";
  for (const { path: filePath, content } of contextFiles) {
    prompt += `## ${filePath}\n\n${content}\n\n`;
  }
}
```

**File:** [`packages/coding-agent/src/core/skills.ts` L339-364](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/skills.ts#L339-L364)

```typescript
export function formatSkillsForPrompt(skills: Skill[]): string {
  const lines = [
    "\n\nThe following skills provide specialized instructions.",
    "Use the read tool to load a skill's file when the task matches.",
    "",
    "<available_skills>",
  ];
  for (const skill of skills) {
    lines.push("  <skill>");
    lines.push(`    <name>${skill.name}</name>`);
    lines.push(`    <description>${skill.description}</description>`);
    lines.push(`    <location>${skill.filePath}</location>`);
    lines.push("  </skill>");
  }
  lines.push("</available_skills>");
  return lines.join("\n");
}
```

For a minimal harness, you can skip skills entirely and just read `AGENTS.md` from the working directory if it exists.
