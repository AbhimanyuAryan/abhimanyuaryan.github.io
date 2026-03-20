---
layout: post
title: "Agent Architectures: From Single Agent to Hybrid MAS"
date: 2026-03-20
description: A formal treatment of five agent architectural paradigms — single agent, independent, centralized, decentralized, and hybrid multi-agent systems — with mathematical foundations and implementation walkthroughs.
tags: agents LLM AI architecture multi-agent-systems
categories: AI
---

This post is rendered directly from a Jupyter notebook. It covers five distinct agent architectural paradigms for benchmarking planning, from a baseline single-agent system to various multi-agent systems (MAS).

{::nomarkdown}
{% assign jupyter_path = 'assets/jupyter/agent-architectures.ipynb' | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/agent-architectures.ipynb %}{% endcapture %}
{% if notebook_exists == 'true' %}
  {% jupyter_notebook jupyter_path %}
{% else %}
  <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
