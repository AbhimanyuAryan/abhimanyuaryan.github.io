---
layout: post
title: "Context Graphs Are the Future of AI Infrastructure"
date: 2026-01-15 10:00:00
description: From reducing LLM hallucinations with knowledge graphs, to migrating between database paradigms, to ontology-driven AI — how two years of work led me to context graphs as the next frontier.
tags: knowledge-graphs ontologies AI
categories: AI
thumbnail: assets/img/projects/nosql_db_eval.png
---

When Jaya Gupta published [How Do You Build a Context Graph?](https://www.linkedin.com/pulse/how-do-you-build-context-graph-jaya-gupta-xicwe/) in late December 2025, I felt something click into place. Not because the ideas were new to me — but because she articulated, under a single term, a vision I'd been building toward for over two years across seemingly different projects.

Knowledge graphs. Ontologies. Database migration. LLM hallucination reduction. Multi-agent systems. Relational databases vs. graph databases. These weren't separate interests — they were all pieces of the same puzzle. **Context graphs** is the name for what emerges when you put them together.

Let me walk through how I got here.

## It Started with Hallucinations (November 2023)

I started working seriously with knowledge graphs in late 2023. The problem that pulled me in was deceptively simple: **LLMs hallucinate**, and no amount of prompt engineering fully fixes it.

The insight was that if you ground LLM outputs in structured, verifiable knowledge — a graph of entities and their real relationships — the model has something to reason _from_ rather than just generating plausible-sounding text. Knowledge graphs become a source of truth that constrains generation.

This became the foundation of my [talk at the Voxel51 AI Meetup in September 2024](/news/announcement_10/), where I demonstrated using **LangChain and Neo4j** to reduce hallucinations in ChatGPT-style systems. The [code is on GitHub](https://github.com/AbhimanyuAryan/voxel51). The core approach: instead of retrieving flat text chunks, retrieve _graph-structured knowledge_ — entities, relationships, and their context — so the LLM has structured facts to anchor its response.

But this raised a deeper question: where does the graph come from? How do you build and maintain it? And how do you make sure the _structure itself_ is right?

## Understanding Database Paradigms (The Migration Project)

Around the same time, I was working on [migrating a hospital management database](/projects/8_nosql_database_evaluation/) across three fundamentally different paradigms: **Oracle SQL → MongoDB → Neo4j**.

This project taught me something that textbooks don't emphasize enough: **the way you store data shapes the way you can reason about it.**

A relational database (Oracle) captures state beautifully — normalized tables, foreign keys, constraints. Clean and precise. But relationships are implicit, buried in JOIN operations.

A document store (MongoDB) captures context — all the information about an entity lives together in a rich, nested document. Great for retrieval. But relationships between documents are second-class citizens.

A graph database (Neo4j) makes relationships first-class. Suddenly you can ask questions like "what's the shortest path between Patient A and Patient B?" — traversals that would require recursive JOINs in SQL become single Cypher queries.

The migration forced me to confront hard design decisions: consolidating Doctor, Nurse, and Technician into unified Staff nodes, removing unnecessary connector entities (Episode), rethinking how triggers and views translate across paradigms. Each database enforced a different worldview on the same underlying reality.

**This is the ontology problem in miniature.** Every database schema is an implicit ontology — a claim about what entities exist, how they relate, and what matters. Migrating between schemas is really migrating between ontologies.

## Ontologies as the Foundation (September 2024)

Two things happened in September 2024 that sharpened this thinking.

First, my [Voxel51 talk](/news/announcement_10/) — demonstrating that knowledge graphs concretely reduce LLM hallucinations when used as retrieval infrastructure.

Then, days later, I had [a conversation with Jérémy Ravenel](/news/announcement_8/) about using **ontologies as the base of next-generation AI systems**. This was the conversation where it all started coming together.

Jérémy and I discussed how ontologies could:

- **Enhance knowledge representation** in LLMs — giving models structured priors about what kinds of things exist and how they can relate
- **Improve reasoning** — moving from pattern matching to structured inference over formally defined relationships
- **Enable accurate retrieval** — using ontological relationships to return contextually grounded results
- **Map entity relations across domains** — the same entity can play different roles in different contexts

We spent a lot of time on **framework selection** — which tools and standards to use for building ontologies. OWL? SKOS? Custom schemas? The choice shapes everything downstream. As we agreed: "a good beginning is half done."

This conversation planted a seed: what if you combined the _grounding power_ of knowledge graphs (reducing hallucinations), the _structural flexibility_ of different database paradigms (relational, document, graph), and the _formal precision_ of ontologies (defining what entities and relationships are possible)?

## The World Model Connection (September 2025)

Then Meta released [Code World Models (CWM)](https://huggingface.co/facebook/cwm) in September 2025, and the transfer learning potential was immediately obvious to me.

CWM learns compressed representations of how environments work by observing trajectories through them. Not static snapshots — **dynamics**. How does state change? What happens when you take an action? What are the causal relationships?

The connection to knowledge graphs:

- **Knowledge graphs** capture static structure — what exists and how it's connected
- **World models** capture dynamics — how the system _behaves_
- **Ontologies** provide the schema — what _kinds_ of structures and dynamics are possible

Mix them and you get something that doesn't just store what's true — it models how things work and can predict what happens next. That's not a database anymore. That's **infrastructure for intelligence**.

## Jaya Gupta's Context Graph Framework (December 2025)

When Jaya Gupta's [context graph article](https://www.linkedin.com/pulse/how-do-you-build-context-graph-jaya-gupta-xicwe/) landed, I read it as someone who'd been living every dimension of the problem she described. Her framework brought together ideas I'd been working on separately under one coherent vision.

### The Two Clocks Problem

Gupta identifies that we've built trillion-dollar infrastructure for the **state clock** (what's true now) and almost nothing for the **event clock** (what happened, in what order, with what reasoning).

I've seen this firsthand. The Oracle database in my migration project captures state perfectly — current patients, current staff, current bills. The MongoDB version captures richer context per entity. The Neo4j version captures relationships. **But none of them capture _why_ the data looks the way it does** — the decisions, the reasoning, the traces that produced the current state.

That's exactly the gap. The reasoning connecting observations to actions was never treated as data.

### Agents as Informed Walkers

Gupta draws on **node2vec** and graph representation learning: you don't need to predefine the ontology. Agent trajectories through problem space discover structure through use. The schema isn't the starting point — it's the output.

This resonates with everything I've built. When I migrated the hospital database to Neo4j, I had to _manually_ discover which entities mattered and how they related. I consolidated Doctor, Nurse, and Technician into Staff. I debated whether to keep Episode as a node or remove it. These were ontology design decisions that required deep understanding of how the system is actually used.

Agents could do this automatically. An agent traversing a system — investigating issues, completing tasks, making decisions — implicitly discovers the ontology through its trajectory. Accumulate enough trajectories and the structure emerges.

This is also why **reducing hallucinations matters** at this level. If agents are the walkers discovering ontology, they need to be grounded in reality — not hallucinating entities and relationships that don't exist. The knowledge graph grounding I demonstrated at Voxel51 is prerequisite infrastructure for reliable agent-driven ontology discovery.

### Context Graphs as World Models

The most powerful idea: a context graph with enough accumulated structure becomes a **world model**. It encodes not just what exists, but how the system behaves. It enables simulation — "what if?" rather than "what happened?"

This is where CWM's approach and Gupta's vision converge. Facebook showed world models can be learned from code trajectories. Gupta argues they can be learned from organizational agent trajectories. The principle is identical: observe enough dynamics and a predictive model emerges.

And the world model needs all the layers I've been building:

- **Relational databases** for clean, normalized state
- **Graph databases** for rich, traversable relationships
- **Ontologies** for structural priors about what's possible
- **Knowledge graphs** for grounding agents in verified facts
- **LLM hallucination reduction** for trustworthy agent behavior
- **Agent trajectories** for discovering dynamics and building the event clock

## Where This Is Going

I fully agree with Gupta's framing: context graphs are not just a better retrieval system — they're **organizational intelligence that compounds**.

The convergence I see across my own work:

1. **Knowledge graphs** provide the grounding layer — concrete entities, relationships, verified facts. They keep agents honest and reduce hallucinations.
2. **Database paradigm fluency** is essential — you need to understand how relational, document, and graph models each capture different aspects of reality, because context graphs need all three perspectives.
3. **Ontologies** provide the structural layer — formal definitions that constrain what the graph can represent, learned and refined through use.
4. **World models** (à la CWM) provide the dynamics layer — how the system behaves, learned from agent trajectories.
5. **Context graphs** are the synthesis — capturing not just state but reasoning, not just data but decision traces, not just structure but dynamics.

Three problems need solving:

- **The two clocks problem** — building event clock infrastructure alongside state infrastructure, across relational and graph paradigms
- **Schema as output** — letting grounded, non-hallucinating agents discover ontology through informed traversal
- **World models, not retrieval** — context graphs that simulate futures, not just retrieve pasts

Every project I've touched in the last two years — from [reducing LLM hallucinations with Neo4j](https://github.com/AbhimanyuAryan/voxel51), to [migrating databases across paradigms](/projects/8_nosql_database_evaluation/), to [exploring ontologies with Jérémy Ravenel](/news/announcement_8/) — was building toward this. Not because I planned it that way, but because these problems are deeply connected.

Context graphs are where knowledge graphs, ontologies, database design, agent systems, and world models converge. I believe this is where AI infrastructure is heading — and I intend to help build it.
