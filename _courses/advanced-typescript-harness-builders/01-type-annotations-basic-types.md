---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 1
chapter_id: type-annotations-basic-types
chapter_label: "0a"
part_label: "Part 0 — Bridge: JavaScript to TypeScript"
tab_title: "Type Annotations"
title: "0a. Type Annotations & Basic Types"
description: "How TypeScript annotates parameters, return types, and variables — the gap that separates JS from TS."
---

In JavaScript, types are implicit. In TypeScript, you annotate parameters, return types, and variables.

**Function parameters and return types:**

**File:** [`packages/mom/src/tools/read.ts` L22-25](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/tools/read.ts#L22-L25)

```typescript
// JS: function isImageFile(filePath) { ... }
// TS: parameter type and return type are explicit
function isImageFile(filePath: string): string | null {
  const ext = extname(filePath).toLowerCase();
  return IMAGE_MIME_TYPES[ext] || null;
}
```

- `filePath: string` — parameter annotation
- `: string | null` — return type (can return a string OR null)

**Variable annotations:**

**File:** [`packages/mom/src/main.ts` L115-118](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/main.ts#L115-L118)

```typescript
let messageTs: string | null = null;
const threadMessageTs: string[] = [];
let accumulatedText = ""; // TS infers: string (no annotation needed)
let isWorking = true; // TS infers: boolean
```

**Key insight:** You don't always need annotations. TypeScript **infers** types from initial values. Annotate when:

- A function parameter has no default
- The type is ambiguous (e.g., `null` initial value)
- You want to be explicit for readability

**Async functions with Promise return types:**

**File:** [`packages/mom/src/sandbox.ts` L51-66](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/sandbox.ts#L51-L66)

```typescript
function execSimple(cmd: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    child.stdout?.on("data", (d) => {
      stdout += d;
    });
    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`Exit code ${code}`));
    });
  });
}
```

`Promise<string>` — the function returns a Promise that resolves to a string.

**`void` return type:**

**File:** [`packages/mom/src/log.ts` L72-73](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/log.ts#L72-L73)

```typescript
export function logUserMessage(ctx: LogContext, text: string): void {
  console.log(chalk.green(`${timestamp()} ${formatContext(ctx)} ${text}`));
}
```

`void` means "this function doesn't return anything useful." In JS you'd just omit the return statement; in TS you declare that intent.
