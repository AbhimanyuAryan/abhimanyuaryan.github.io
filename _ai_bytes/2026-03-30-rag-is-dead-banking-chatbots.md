---
layout: ai-byte
title: "RAG Is Dead. Most Banking Apps Have Shitty Chatbots"
date: 2026-03-30
description: "Traditional RAG can't handle real-world complexity — especially multilingual users navigating foreign banking systems. Agentic RAG is the fix."
tags: [rag, agentic-rag, banking, chatbots, multilingual]
---

If you've ever tried using a bank's chatbot while living abroad, you already know the problem. You type a perfectly reasonable question — maybe in slightly different phrasing, maybe mixing languages, maybe asking something that spans two different products — and you get a canned response that has nothing to do with what you asked.

That's vanilla RAG in production. And it's everywhere in banking.

## Why traditional RAG fails at banking

Traditional RAG systems take the user's raw query, throw it at a vector database, pull back whatever chunks score highest on cosine similarity, and shove them into an LLM. No query understanding. No planning. No awareness of what the user _actually_ needs.

This breaks down fast when:

- A user asks a **compound question** ("What's the fee for international transfers and do I need to notify you before sending over €10K?")
- The query is in **a different language** or uses local financial terminology the system was never trained on
- The user is an **expat or outsider** navigating a banking system designed for locals — different tax rules, different residency requirements, different product eligibility

Most banks didn't build their chatbots for these users. The knowledge base is monolingual, the retrieval is single-hop, and the response is "I didn't understand that. Would you like to speak to an agent?" — at 2 AM when no agent is available.

## Multilingual support: still an afterthought

Here's what's wild — global banks serve customers in dozens of countries, yet their RAG systems typically:

- Index documents in **one language only**
- Have **no cross-lingual retrieval** (your German query won't match English policy docs)
- Offer "translation" that's just a GPT wrapper on top of the same broken retrieval
- **Ignore cultural context** — the way you ask about overdraft protection in Japan is fundamentally different from how you'd ask in Brazil

If you're a foreigner banking in a country where you don't speak the primary language fluently, the chatbot experience is actively hostile.

## Agentic RAG: what actually works

Agentic RAG fixes this by adding reasoning, planning, and iteration on top of retrieval. Three key differences:

### 1. Deep query understanding and planning

Instead of firing off a raw query, an agentic system analyzes intent and orchestrates a plan:

- **Subquery generation** — figures out what unstated information you actually need
- **Query routing** — directs parts of your question to the right knowledge bases (product docs vs. compliance vs. pricing)
- **Query expansion** — adds related terms, constraints, and concepts to improve retrieval

### 2. Dynamic, multi-source retrieval

Traditional RAG chokes when information lives across multiple databases. An agentic system acts as an orchestrator — deciding which tools, workflows, and databases to hit, in what order, and how to reconcile the results. When those databases have clean schemas and proper context ("ergonomic" data sources), the agent can navigate them intelligently.

### 3. Iterative generation and self-evaluation

Vanilla RAG retrieves once and returns whatever the LLM generates. No verification. No quality check. Agentic RAG loops — it can re-retrieve, gather additional context, and evaluate its own output against strict criteria before responding.

For banking, this matters enormously. A wrong answer about transfer limits, tax implications, or account eligibility isn't just annoying — it can cost someone money or get them into regulatory trouble.

## The trade-off

Agentic RAG is slower. It explicitly trades latency for relevance — taking time to plan, route, retrieve, and evaluate. For a chatbot answering "what are your branch hours," that's overkill. For a non-native speaker trying to understand mortgage eligibility requirements in a foreign country, that extra second is worth it.

The banks that figure this out first win the expat and international customer segment. The rest keep shipping chatbots that reply "I'm sorry, I didn't understand that" in one language only.
