---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 3
chapter_id: optional-properties-parameters
chapter_label: "0c"
part_label: "Part 0 — Bridge: JavaScript to TypeScript"
tab_title: "Optional ? Syntax"
title: "0c. Optional Properties & Parameters"
description: "The ? after a name says: this can be undefined, or omitted entirely."
---

The `?` after a property or parameter name means it can be `undefined` (or omitted entirely).

**Optional interface properties:**

**File:** [`packages/coding-agent/src/modes/rpc/rpc-client.ts` L26-34](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/modes/rpc/rpc-client.ts#L26-L34)

```typescript
export interface RpcClientOptions {
  cliPath?: string; // can be omitted -- defaults handled in code
  cwd?: string;
  env?: Record<string, string>;
  provider?: string;
  model?: string;
  args?: string[];
}
```

Every field is optional. You can call `new RpcClient({})` or `new RpcClient({ cwd: "/tmp" })`.

**Optional function parameters:**

**File:** [`packages/mom/src/tools/bash.ts` L35-38](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/tools/bash.ts#L35-L38)

```typescript
execute: async (
  _toolCallId: string,
  { command, timeout }: { label: string; command: string; timeout?: number },
  signal?: AbortSignal,
) => { ... }
```

`timeout?: number` means timeout can be a number or `undefined`. `signal?: AbortSignal` can be omitted entirely.

**Difference from JS:** In JavaScript, all parameters are implicitly optional. In TypeScript, required parameters must be passed or you get a compile error.
