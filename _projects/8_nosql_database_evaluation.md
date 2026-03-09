---
layout: page
title: "Database Migration: Oracle to MongoDB & Neo4j"
description: Comparing Oracle, MongoDB, and Neo4j — migrating a relational database to NoSQL and graph database to understand how concepts translate between different systems.
img: assets/img/projects/nosql_db_eval.png
importance: 8
category: work
---

A practical project demonstrating how to **migrate a SQL database to NoSQL and then to a graph database**, explaining how to translate relational concepts between fundamentally different database systems.

The project takes a hospital management database originally built in **Oracle SQL** and migrates it to both **MongoDB** (document store) and **Neo4j** (graph database), comparing how each system handles the same data and operations.

### What's Covered

- **Schema migration** — translating relational tables and foreign keys into MongoDB documents and Neo4j nodes/relationships
- **Architectural design decisions** — consolidating roles (Doctor, Nurse, Technician → unified Staff), removing unnecessary connector nodes, and simplifying graph structure
- **Triggers** — implementing equivalent trigger logic across all three systems (Oracle PL/SQL, MongoDB Atlas triggers, Neo4j APOC triggers)
- **Queries** — comparing query patterns: SQL joins vs. MongoDB aggregation pipelines vs. Cypher graph traversals (e.g., `shortestPath` between patients)
- **Views** — how relational views translate to MongoDB views (`create_collection` with pipelines) and Neo4j "view nodes" linked via relationships

### Tech Stack

- **Oracle SQL / PL/SQL**
- **MongoDB** (Atlas, aggregation pipelines, triggers)
- **Neo4j** (Cypher, APOC library)
- **Python** (migration scripts, `neo4j` driver)
- **JavaScript** (MongoDB Atlas functions)

### Links

- [GitHub Repository](https://github.com/AbhimanyuAryan/nosql-database-evaluation)
