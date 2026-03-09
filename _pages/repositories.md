---
layout: page
permalink: /repositories/
title: repositories
description: Open source projects I have built or contributed to — from multi-agent systems to Julia web frameworks.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

## GitHub Profile

<div class="d-flex align-items-center gap-4 p-3 mb-4 border rounded shadow-sm" style="max-width:480px;">
  <img src="{{ '/assets/img/repos/abhimanyu.png' | relative_url }}" alt="AbhimanyuAryan" style="width:80px;height:80px;border-radius:50%;object-fit:cover;flex-shrink:0;">
  <div>
    <h5 class="mb-1"><a href="https://github.com/AbhimanyuAryan" target="_blank" rel="noopener">AbhimanyuAryan</a></h5>
    <p class="text-muted small mb-0">Senior FullStack Engineer &amp; Educator. Building multi-agent systems, web frameworks, and AR/VR experiences.</p>
  </div>
</div>

---

{% endif %}

## GitHub Repositories

<div class="row row-cols-1 row-cols-md-2 g-4 mt-1">

  <!-- MassGen -->
  <div class="col">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex align-items-start gap-3">
        <img src="{{ '/assets/img/repos/massgen.png' | relative_url }}" alt="MassGen" style="width:56px;height:56px;object-fit:cover;border-radius:8px;flex-shrink:0;">
        <div>
          <h5 class="card-title mb-1"><a href="https://github.com/massgen/MassGen" target="_blank" rel="noopener">massgen/MassGen</a></h5>
          <p class="card-text text-muted small">🚀 Open-source multi-agent scaling system — orchestrates frontier models to collaborate, reason, and produce high-quality results in your terminal.</p>
          <span class="badge bg-secondary">Python</span>
          <span class="badge bg-light text-dark border ms-1">⭐ 828</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Genie.jl -->
  <div class="col">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex align-items-start gap-3">
        <img src="{{ '/assets/img/repos/genie.png' | relative_url }}" alt="GenieFramework" style="width:56px;height:56px;object-fit:cover;border-radius:8px;flex-shrink:0;">
        <div>
          <h5 class="card-title mb-1"><a href="https://github.com/GenieFramework/Genie.jl" target="_blank" rel="noopener">GenieFramework/Genie.jl</a></h5>
          <p class="card-text text-muted small">🧞 The highly productive Julia web framework — built features for routing, middleware, and the plugin ecosystem.</p>
          <span class="badge bg-secondary">Julia</span>
          <span class="badge bg-light text-dark border ms-1">⭐ 2393</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Stipple.jl -->
  <div class="col">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex align-items-start gap-3">
        <div style="width:56px;height:56px;border-radius:8px;background:#9558b2;display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;">⚡</div>
        <div>
          <h5 class="card-title mb-1"><a href="https://github.com/GenieFramework/Stipple.jl" target="_blank" rel="noopener">GenieFramework/Stipple.jl</a></h5>
          <p class="card-text text-muted small">Reactive UI library for building interactive data applications in pure Julia — Vue.js powered frontend with Julia backend.</p>
          <span class="badge bg-secondary">Julia</span>
          <span class="badge bg-light text-dark border ms-1">⭐ 352</span>
        </div>
      </div>
    </div>
  </div>

  <!-- StippleUI.jl -->
  <div class="col">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex align-items-start gap-3">
        <div style="width:56px;height:56px;border-radius:8px;background:#9558b2;display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;">🎨</div>
        <div>
          <h5 class="card-title mb-1"><a href="https://github.com/GenieFramework/StippleUI.jl" target="_blank" rel="noopener">GenieFramework/StippleUI.jl</a></h5>
          <p class="card-text text-muted small">Library of reactive UI components for Stipple.jl — buttons, forms, tables, charts, and more powered by Quasar.</p>
          <span class="badge bg-secondary">Julia</span>
          <span class="badge bg-light text-dark border ms-1">⭐ 88</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SearchLight.jl -->
  <div class="col">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex align-items-start gap-3">
        <div style="width:56px;height:56px;border-radius:8px;background:#9558b2;display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;">🔍</div>
        <div>
          <h5 class="card-title mb-1"><a href="https://github.com/GenieFramework/SearchLight.jl" target="_blank" rel="noopener">GenieFramework/SearchLight.jl</a></h5>
          <p class="card-text text-muted small">ORM layer for Genie.jl — database-agnostic models, migrations, and queries for Julia web applications.</p>
          <span class="badge bg-secondary">Julia</span>
          <span class="badge bg-light text-dark border ms-1">⭐ 147</span>
        </div>
      </div>
    </div>
  </div>

  <!-- StipplePlotly.jl -->
  <div class="col">
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex align-items-start gap-3">
        <div style="width:56px;height:56px;border-radius:8px;background:#9558b2;display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;">📊</div>
        <div>
          <h5 class="card-title mb-1"><a href="https://github.com/GenieFramework/StipplePlotly.jl" target="_blank" rel="noopener">GenieFramework/StipplePlotly.jl</a></h5>
          <p class="card-text text-muted small">Plotly integration for Stipple.jl — reactive, interactive charts and graphs for Julia data apps.</p>
          <span class="badge bg-secondary">Julia</span>
          <span class="badge bg-light text-dark border ms-1">⭐ 27</span>
        </div>
      </div>
    </div>
  </div>

</div>
