---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 2
chapter_id: interfaces-type-aliases
chapter_label: "0b"
part_label: "Part 0 — Bridge: JavaScript to TypeScript"
tab_title: "Interfaces & Types"
title: "0b. Interfaces & Type Aliases"
description: "Two ways to name an object shape — and when to reach for which."
---

These are the two ways to name an object shape. JavaScript has neither.

**Interface — defines an object shape:**

**File:** [`packages/mom/src/sandbox.ts` L79-101](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/sandbox.ts#L79-L101)

```typescript
export interface Executor {
  exec(command: string, options?: ExecOptions): Promise<ExecResult>;
  getWorkspacePath(hostPath: string): string;
}

export interface ExecOptions {
  timeout?: number;
  signal?: AbortSignal;
}

export interface ExecResult {
  stdout: string;
  stderr: string;
  code: number;
}
```

An `interface` describes what an object must look like. Any object that has these fields with these types is compatible — no `implements` keyword needed for plain objects.

**Type alias — names any type:**

**File:** [`packages/mom/src/sandbox.ts` L3](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/sandbox.ts#L3)

```typescript
export type SandboxConfig = { type: "host" } | { type: "docker"; container: string };
```

**When to use which:**

- **`interface`** for object shapes that might be extended or implemented by classes
- **`type`** for unions, intersections, mapped types, or anything that isn't just an object shape
- This project uses `interface` for data contracts and `type` for unions consistently

**Class implementing an interface:**

**File:** [`packages/mom/src/sandbox.ts` L104-106](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/sandbox.ts#L104-L106)

```typescript
class HostExecutor implements Executor {
  async exec(command: string, options?: ExecOptions): Promise<ExecResult> { ... }
  getWorkspacePath(hostPath: string): string { return hostPath; }
}
```
