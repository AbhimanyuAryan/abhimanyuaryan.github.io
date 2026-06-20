---
layout: ai-byte
title: "Your harness is burning your token budget with PDFs"
date: 2026-06-20
description: "That PDF you're feeding your agent? It's walking through two doors at once and you're paying for both. Here's the math and the one-line fix."
tags: [harness, tokens, pdfs, context-window, cost-optimization, markitdown]
source: blog
---

# PDFs are complicated

The creator of OpenClaw — who got acquired speculatively for $1 billion (not true, but hey, huge speculation regardless) — is Peter Steinberger. He founded PSPDFKit, the global B2B PDF framework company. The man mastered the art of PDF.

And here's the thing: context is food for LLMs. Most information lives in documents, and PDFs are among the most popular format out there. So when your harness eats a PDF, it better know how to chew.

A raw PDF goes through two "doors" at once when your harness ingests it: it's **rasterized to an image** (you pay image tokens) and **text-extracted** (you pay text tokens). On Claude, an image costs ~(w×h)/750 ≈ **1,500 tokens/page**; the actual text content is only ~700–900. So a 10-page doc runs you ~23k tokens as a PDF vs ~8k as markdown — and markdown usually reads more accurately too.

That's nearly 3x the cost for _worse_ results.

## The one-line fix nobody uses

Microsoft's [MarkItDown](https://github.com/microsoft/markitdown) — 126k stars on GitHub and somehow still a secret:

```bash
pip install 'markitdown[all]'
markitdown report.pdf -o report.md
```

One line. Your doc takes the cheap door. Token usage drops up to 70%. And because Claude was trained on millions of markdown documents, it reads `.md` the way you read your first language — without effort. Better input, better output.

MarkItDown also ships with an **MCP server**. Connect it to Claude Desktop and every file you upload gets auto-converted to markdown before the model ever touches it. No manual step. Set it up once, save tokens forever.

## When the text door throws away your answer

Don't convert blindly. There are cases where markdown extraction actively hurts you:

- **Scanned PDFs** — MarkItDown won't OCR by default. Add the `markitdown-ocr` plugin or you get hallucinated numbers where real data should be. Personally, I prefer [Mistral OCR 3](https://mistral.ai/news/mistral-ocr-3/) for this — the model is very promising and handles scanned documents with way more fidelity than `pytesseract` ever will.
- **Charts and graphs** — The trend lives in pixels. A linearized description of a chart is not the chart. Keep the image tokens here.
- **Gnarly tables** — MarkItDown's basic extraction can scramble complex tables with merged cells or nested headers. Reach for [Docling](https://github.com/DS4SD/docling) or [Marker](https://github.com/VikParuchuri/marker) when table fidelity matters.

## Even Anthropic's own PDF skill is mid

Don't take my word for it — look at what Anthropic themselves ship as their [default PDF skill](https://github.com/anthropics/skills/blob/main/skills/pdf/SKILL.md). It's a 300-line guide that tells Claude to use `pypdf` for text extraction, `pdfplumber` for tables, `pytesseract` for OCR, and `reportlab` for creation. Basic `page.extract_text()` calls. Basic `page.extract_tables()`. No intelligent routing, no format-aware preprocessing, no token optimization whatsoever.

This is the skill that fires every time Claude touches a `.pdf`. It doesn't convert to markdown first. It doesn't strip repeated headers. It doesn't decide whether a page is text-heavy or image-heavy. It just... extracts text with `pdfplumber` and hopes for the best.

If Anthropic's _own_ default pipeline doesn't optimize for token cost, your harness is cooked too.

## The speculative hot take

I think within 6 months, the winning harnesses will have a **routing layer** in front of every document: "Is this a text-heavy PDF? Convert to markdown. Is it a scanned form? OCR pipeline. Is it a chart-heavy report? Keep the images, extract only surrounding text."

The harnesses that keep doing naive dump-the-whole-PDF will die. Not because they're slow — because their users burn through API credits 3x faster than competitors and get _worse_ answers from a model choking on rendering artifacts, repeated headers, and interleaved column garbage.

Your token budget is finite. Stop paying for the container when you only need the content.
