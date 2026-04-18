---
layout: course-chapter
course: "Advanced TypeScript for Harness Builders"
course_slug: advanced-typescript-harness-builders
order: 24
chapter_id: type-only-imports-re-exports
chapter_label: "18"
part_label: "Part 5 — Project Patterns"
tab_title: "Type-Only Re-exports"
title: "18. Type-Only Imports & Re-exports"
description: "Barrel files and selective re-exports control the public API surface."
---

Barrel files and selective re-exports control the public API surface.

**File:** [`packages/ai/src/index.ts` L1-35](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/index.ts#L1-L35)

```typescript
// Re-export everything from these modules
export * from "./api-registry.js";
export * from "./types.js";
export * from "./models.js";

// Type-only re-exports -- no runtime code from provider modules
export type { BedrockOptions } from "./providers/amazon-bedrock.js";
export type { AnthropicOptions } from "./providers/anthropic.js";
export type { GoogleOptions } from "./providers/google.js";
export type { MistralOptions } from "./providers/mistral.js";

// Re-export from external package
export type { Static, TSchema } from "@sinclair/typebox";
export { Type } from "@sinclair/typebox";
```

**Re-export with renaming in extension index:**

**File:** [`packages/coding-agent/src/core/extensions/index.ts` L77-79](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/extensions/index.ts#L77-L79)

```typescript
export type { ExecOptions, ExecResult } from "../exec.js";
export type { AgentToolResult, AgentToolUpdateCallback, ToolExecutionMode };
export type { AppKeybinding, KeybindingsManager } from "../keybindings.js";
```
