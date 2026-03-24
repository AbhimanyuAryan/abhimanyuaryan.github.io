---
layout: ai-byte
title: "Vercel's agent-browser: Why I Prefer It Over Playwright MCP"
date: 2026-03-24
description: "A Rust-powered browser automation CLI built for AI agents — no Node.js, no Playwright, just CDP and a clever 'skills' system that teaches your AI assistant how to use it."
tags: [vercel, browser-automation, agents, rust, testing]
source: github.com
source_url: https://github.com/vercel-labs/agent-browser
---

I've been testing [agent-browser](https://github.com/vercel-labs/agent-browser) from Vercel Labs and it's replaced Playwright MCP in my workflow. Here's why — and how they built it.

## What it does

`agent-browser` is a headless browser automation CLI designed specifically for AI agents. You install it globally (`npm i -g agent-browser`) and any AI coding assistant can drive a real Chrome browser through simple shell commands:

```bash
agent-browser open localhost:8080
agent-browser snapshot -i --json    # get accessibility tree with refs
agent-browser click @e2             # click element by ref
agent-browser fill @e3 "test@example.com"
```

Here's me asking an AI agent to inspect the submenu on my local site — it navigated, took a snapshot, and reported back the dropdown contents:

<div class="row mt-3 mb-3">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/ai-bytes/agent-browser-submenu.png" title="Submenu dropdown on my site" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/ai-bytes/agent-browser-terminal.png" title="agent-browser inspecting localhost" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

## Why I prefer it over Playwright MCP

| | **agent-browser** | **Playwright MCP** |
|---|---|---|
| **Runtime** | Pure Rust daemon, direct CDP — no Node.js needed | Requires Node.js + Playwright runtime |
| **Interface** | Simple CLI commands any LLM can call | MCP protocol — needs a compatible client |
| **Element selection** | Snapshot → ref workflow (`@e1`, `@e2`) — deterministic | CSS selectors or accessibility tree |
| **Speed** | Daemon persists between commands, sub-millisecond dispatch | Cold start on each MCP tool call |
| **Portability** | Works with *any* AI assistant that can run shell commands | Only works with MCP-compatible clients |

The killer advantage: **any agent that can run a shell command can use it**. No special protocol, no SDK, no integration layer. Claude Code, Cursor, Windsurf, Gemini CLI, GitHub Copilot — they all work out of the box.

## How they built it: The "Skills" pattern

The most interesting architectural decision is the **skills system**. Instead of building an MCP server or a custom integration for every AI tool, they created a single `SKILL.md` file that teaches any AI assistant how to use agent-browser.

```bash
npx skills add vercel-labs/agent-browser
```

This command drops a `SKILL.md` into your project (e.g., `.claude/skills/agent-browser/SKILL.md` for Claude Code). The skill file contains:

- The **snapshot → ref interaction pattern** (the core workflow)
- All available commands and their syntax
- Session management and timeout handling
- Best practices for chaining commands

The AI reads this file as context and *learns* how to drive the browser. No custom code, no API wrappers — just a well-written instruction document that gets injected into the model's context.

This is a brilliant pattern: **documentation as integration**. The skill stays up to date because it's fetched from the repo, not copy-pasted.

## Architecture

The project is pure Rust with a client-daemon design:

```
┌─────────────┐      ┌──────────────┐      ┌─────────┐
│  Rust CLI   │ ───► │ Rust Daemon  │ ───► │ Chrome  │
│ (commands)  │      │ (pure CDP)   │      │  (CDP)  │
└─────────────┘      └──────────────┘      └─────────┘
```

1. **Rust CLI** — Parses commands, sends them to the daemon
2. **Rust Daemon** — Starts automatically on first command, persists between commands, talks to Chrome via CDP (Chrome DevTools Protocol)
3. **Chrome** — Downloaded from Chrome for Testing (Google's official automation channel)

No Playwright. No Puppeteer. No Node.js in the daemon at all. The daemon auto-starts and stays alive, so subsequent commands are near-instant.

## Security features worth noting

For production agent deployments:
- **Authentication Vault** — Encrypted credential storage; the LLM never sees passwords
- **Domain Allowlist** — Restrict navigation to trusted domains only
- **Action Policy** — Gate destructive actions with a policy file
- **Content Boundaries** — Wrap output in delimiters so LLMs distinguish tool output from untrusted page content

## Bottom line

If you're building or testing with AI agents and need browser automation, try `agent-browser` before reaching for Playwright MCP. The snapshot-ref workflow is cleaner, the Rust daemon is faster, and the skills pattern means zero integration effort.

```bash
npm i -g agent-browser && agent-browser install
```
