---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 4
chapter_id: api-key-client-setup
chapter_label: "4"
part_label: "Part 2 — Talking to Claude"
tab_title: "API Key & Client"
title: "4. API Key & Client Setup"
description: "Read ANTHROPIC_API_KEY, create the SDK client."
---

The simplest path: read `ANTHROPIC_API_KEY` from the environment.

**File:** [`packages/ai/src/env-api-keys.ts` L63-73](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/env-api-keys.ts#L63-L73)

```typescript
export function getEnvApiKey(provider: string): string | undefined {
  if (provider === "anthropic") {
    return process.env.ANTHROPIC_OAUTH_TOKEN || process.env.ANTHROPIC_API_KEY;
  }
  // ...other providers
}
```

Then create the Anthropic SDK client:

**File:** [`packages/ai/src/providers/anthropic.ts` L622-637](https://github.com/badlogic/pi-mono/blob/main/packages/ai/src/providers/anthropic.ts#L622-L637)

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey,
  baseURL: model.baseUrl,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    accept: "application/json",
    "anthropic-dangerous-direct-browser-access": "true",
    "anthropic-beta": "fine-grained-tool-streaming-2025-05-14",
  },
});
```

For your minimal harness, this is just:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY automatically
```
