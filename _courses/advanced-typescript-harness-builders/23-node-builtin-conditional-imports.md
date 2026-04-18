---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 23
chapter_id: node-builtin-conditional-imports
chapter_label: "17"
part_label: "Part 5 — Project Patterns"
tab_title: "node: & Conditional Imports"
title: "17. Node.js Built-in Imports & Conditional Loading"
description: "The node: protocol plus dynamic imports for isomorphic (browser + Node) code."
---

The `node:` protocol for Node.js built-in modules, and conditional dynamic imports for isomorphic code.

**Standard `node:` import:**

**File:** [`packages/coding-agent/src/modes/rpc/rpc-client.ts` L7](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/modes/rpc/rpc-client.ts#L7)

```typescript
import { type ChildProcess, spawn } from "node:child_process";
```

**Conditional loading for browser compatibility:**

**File:** [`packages/ai/src/env-api-keys.ts` L1-23](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/env-api-keys.ts#L1-L23)

```typescript
// NEVER convert to top-level imports - breaks browser/Vite builds (web-ui)
let _existsSync: typeof import("node:fs").existsSync | null = null;
let _homedir: typeof import("node:os").homedir | null = null;
let _join: typeof import("node:path").join | null = null;

type DynamicImport = (specifier: string) => Promise<unknown>;
const dynamicImport: DynamicImport = (specifier) => import(specifier);
const NODE_FS_SPECIFIER = "node:" + "fs"; // String concat defeats static bundler analysis

if (typeof process !== "undefined" && (process.versions?.node || process.versions?.bun)) {
  dynamicImport(NODE_FS_SPECIFIER).then((m) => {
    _existsSync = (m as typeof import("node:fs")).existsSync;
  });
}
```

Key patterns:

- `typeof import("node:fs").existsSync` — type-level import for variable typing
- `"node:" + "fs"` — defeats bundler static import resolution
- Runtime check `process.versions?.node` for environment detection

**File:** [`packages/ai/src/providers/openai-codex-responses.ts` L1-21](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/openai-codex-responses.ts#L1-L21)

```typescript
import type * as NodeOs from "node:os";

let _os: typeof NodeOs | null = null;
const NODE_OS_SPECIFIER = "node:" + "os";

if (typeof process !== "undefined" && (process.versions?.node || process.versions?.bun)) {
  dynamicImport(NODE_OS_SPECIFIER).then((m) => {
    _os = m as typeof NodeOs;
  });
}
```

Uses `import type * as NodeOs` for the type, then conditionally loads the runtime module.
