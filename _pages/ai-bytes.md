---
layout: default
permalink: /ai-bytes/
title: AI Bytes
description: Quick takes on what's moving in AI — models, papers, tools, and industry news.
nav: false
pagination:
  enabled: true
  collection: ai_bytes
  permalink: /page/:num/
  per_page: 8
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post">

  <div class="header-bar">
    <h1>{{ page.title }}</h1>
    <h2>{{ page.description }}</h2>
  </div>

  <ul class="post-list">
    {% if page.pagination.enabled %}
      {% assign bytelist = paginator.posts %}
    {% else %}
      {% assign bytelist = site.ai_bytes | sort: 'date' | reverse %}
    {% endif %}

    {% for byte in bytelist %}
    {% assign year = byte.date | date: '%Y' %}

    <li>
      <h3>
        {% assign byte_content = byte.content | strip %}
        {% if byte.source_url and byte_content == "" %}
          <a class="post-title" href="{{ byte.source_url }}" target="_blank" rel="noopener noreferrer">{{ byte.title }}</a>
          <a href="{{ byte.source_url }}" target="_blank" rel="noopener noreferrer">
            <svg width="1.2rem" height="1.2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: 4px;">
              <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </a>
        {% elsif byte.source_url %}
          <a class="post-title" href="{{ byte.url | relative_url }}">{{ byte.title }}</a>
          <a href="{{ byte.source_url }}" target="_blank" rel="noopener noreferrer">
            <svg width="1.2rem" height="1.2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: 4px;">
              <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </a>
        {% else %}
          <a class="post-title" href="{{ byte.url | relative_url }}">{{ byte.title }}</a>
        {% endif %}
      </h3>

      <p>{{ byte.description }}</p>

      <p class="post-meta">
        {{ byte.date | date: '%B %d, %Y' }}
        {% if byte.source %}
          &nbsp; &middot; &nbsp; <i class="fa-solid fa-link fa-sm"></i> {{ byte.source }}
        {% endif %}
      </p>

      <p class="post-tags">
        <a href="{{ year | prepend: '/ai-bytes/' | relative_url }}">
          <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}
        </a>
        {% if byte.tags and byte.tags.size > 0 %}
          &nbsp; &middot; &nbsp;
          {% for tag in byte.tags %}
            <i class="fa-solid fa-hashtag fa-sm"></i> {{ tag }}
            {% unless forloop.last %}&nbsp;{% endunless %}
          {% endfor %}
        {% endif %}
      </p>
    </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}

</div>
