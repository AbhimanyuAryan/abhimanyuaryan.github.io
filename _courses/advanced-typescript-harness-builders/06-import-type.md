---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 6
chapter_id: import-type
chapter_label: "0f"
part_label: "Part 0 — Bridge: JavaScript to TypeScript"
tab_title: "import type"
title: "0f. `import type` & the Type System at Compile Time"
description: "TypeScript types are erased at runtime. The compiled JavaScript has no types at all — that has consequences."
---

TypeScript types are **erased** at runtime. The compiled JavaScript has no types at all. This has important consequences.

**Regular import (value + type):**

**File:** [`packages/mom/src/tools/bash.ts` L1-4](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/tools/bash.ts#L1-L4)

```typescript
import { randomBytes } from "node:crypto"; // value -- exists at runtime
import { createWriteStream } from "node:fs"; // value -- exists at runtime
import { tmpdir } from "node:os"; // value -- exists at runtime
import { join } from "node:path"; // value -- exists at runtime
```

**Type-only import (erased at runtime):**

**File:** [`packages/mom/src/tools/bash.ts` L5](https://github.com/badlogic/pi-mono/blob/main/packages/mom/src/tools/bash.ts#L5)

```typescript
import type { AgentTool } from "@mariozechner/pi-agent-core"; // type only -- gone at runtime
```

**Why this matters:**

1. **Bundle size** — `import type` is completely removed, so it doesn't pull in unused modules
2. **Circular dependencies** — type-only imports can't cause runtime circular dependency issues
3. **Isomorphic code** — you can import Node.js types in browser code if they're type-only

**File:** [`packages/ai/src/providers/openai-codex-responses.ts` L1](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/openai-codex-responses.ts#L1)

```typescript
import type * as NodeOs from "node:os"; // Type only -- no runtime import of node:os
let _os: typeof NodeOs | null = null; // Variable typed using that type-only import
```

This file runs in browsers too. The `import type` gives TypeScript the shape of `node:os` for type checking, but emits no `require("node:os")` call in the output.
