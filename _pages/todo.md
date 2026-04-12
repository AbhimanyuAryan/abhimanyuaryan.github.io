---
layout: default
permalink: /todo/
title: Todo
description: Personal task tracker for blog posts and projects.
nav: false
---

<style>
.todo-container {
  max-width: 900px;
  margin: 0 auto;
}
.todo-section {
  margin-bottom: 2rem;
}
.todo-section h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--global-divider-color);
}
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.todo-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 8px;
  transition: all 0.2s ease;
}
.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.todo-item.completed {
  opacity: 0.6;
}
.todo-item.completed .todo-title {
  text-decoration: line-through;
}
.todo-checkbox {
  width: 22px;
  height: 22px;
  min-width: 22px;
  border: 2px solid var(--global-theme-color);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.todo-checkbox:hover {
  background: var(--global-theme-color);
  color: white;
}
.todo-checkbox.checked {
  background: var(--global-theme-color);
  color: white;
}
.todo-content {
  flex: 1;
}
.todo-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.todo-title a {
  color: inherit;
  text-decoration: none;
}
.todo-title a:hover {
  color: var(--global-theme-color);
}
.todo-meta {
  font-size: 0.85rem;
  color: var(--global-text-color-light);
}
.todo-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  background: var(--global-theme-color);
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
}
.todo-tag.blog { background: #6366f1; }
.todo-tag.eval { background: #10b981; }
.todo-tag.docs { background: #f59e0b; }
.progress-bar {
  height: 6px;
  background: var(--global-divider-color);
  border-radius: 3px;
  margin-top: 0.5rem;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--global-theme-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}
.stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--global-card-bg-color);
  border-radius: 8px;
}
.stat {
  text-align: center;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--global-theme-color);
}
.stat-label {
  font-size: 0.85rem;
  color: var(--global-text-color-light);
}
</style>

<div class="todo-container">
  <div class="stats">
    <div class="stat">
      <div class="stat-value" id="total-count">0</div>
      <div class="stat-label">Total</div>
    </div>
    <div class="stat">
      <div class="stat-value" id="completed-count">0</div>
      <div class="stat-label">Completed</div>
    </div>
    <div class="stat">
      <div class="stat-value" id="pending-count">0</div>
      <div class="stat-label">Pending</div>
    </div>
  </div>

  <div class="todo-section">
    <h3>📝 Blog Posts</h3>
    <div class="todo-list" id="blog-posts">
      <div class="todo-item" data-id="control-room">
        <div class="todo-checkbox" onclick="toggleTodo(this)"></div>
        <div class="todo-content">
          <div class="todo-title"><a href="/blog/2026/how-to-build-the-control-room-for-your-agent/">How to Build the Control Room for Your Agent</a></div>
          <div class="todo-meta"><span class="todo-tag blog">Blog</span>Needs rewrite/improvement</div>
        </div>
      </div>
      <div class="todo-item" data-id="agent-arch">
        <div class="todo-checkbox" onclick="toggleTodo(this)"></div>
        <div class="todo-content">
          <div class="todo-title"><a href="/blog/2026/agent_architectures/">Agent Architectures</a></div>
          <div class="todo-meta"><span class="todo-tag blog">Blog</span>Needs proper content</div>
        </div>
      </div>
      <div class="todo-item" data-id="harness">
        <div class="todo-checkbox" onclick="toggleTodo(this)"></div>
        <div class="todo-content">
          <div class="todo-title"><a href="/blog/2026/how-to-build-the-harness/">How to Build the Harness</a></div>
          <div class="todo-meta"><span class="todo-tag blog">Blog</span>Coming soon placeholder</div>
        </div>
      </div>
      <div class="todo-item" data-id="pos-invoicing">
        <div class="todo-checkbox" onclick="toggleTodo(this)"></div>
        <div class="todo-content">
          <div class="todo-title"><a href="/blog/2026/developing-cloud-based-invoicing-pos-agentic-software/">Developing Cloud-Based Invoicing and POS Agentic Software</a></div>
          <div class="todo-meta"><span class="todo-tag blog">Blog</span>Add engineering section from Vendus.pt</div>
        </div>
      </div>
    </div>
  </div>

  <div class="todo-section">
    <h3>🔬 Evaluations & Research</h3>
    <div class="todo-list" id="eval-tasks">
      <div class="todo-item" data-id="nemo-eval">
        <div class="todo-checkbox" onclick="toggleTodo(this)"></div>
        <div class="todo-content">
          <div class="todo-title">Finish Nemo Agent Toolkit eval</div>
          <div class="todo-meta"><span class="todo-tag eval">Eval</span>Next week</div>
        </div>
      </div>
      <div class="todo-item" data-id="accuracy-recall">
        <div class="todo-checkbox" onclick="toggleTodo(this)"></div>
        <div class="todo-content">
          <div class="todo-title">Write about accuracy, recall, etc.</div>
          <div class="todo-meta"><span class="todo-tag docs">Docs</span>Take eval content from thesis and Avido</div>
        </div>
      </div>
    </div>
  </div>

  <div class="progress-bar">
    <div class="progress-fill" id="progress-fill"></div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const stored = JSON.parse(localStorage.getItem('todo-state') || '{}');
  document.querySelectorAll('.todo-item').forEach(item => {
    const id = item.dataset.id;
    if (stored[id]) {
      item.classList.add('completed');
      item.querySelector('.todo-checkbox').classList.add('checked');
      item.querySelector('.todo-checkbox').innerHTML = '✓';
    }
  });
  updateStats();
});

function toggleTodo(checkbox) {
  const item = checkbox.closest('.todo-item');
  const id = item.dataset.id;
  const stored = JSON.parse(localStorage.getItem('todo-state') || '{}');
  
  if (item.classList.contains('completed')) {
    item.classList.remove('completed');
    checkbox.classList.remove('checked');
    checkbox.innerHTML = '';
    delete stored[id];
  } else {
    item.classList.add('completed');
    checkbox.classList.add('checked');
    checkbox.innerHTML = '✓';
    stored[id] = true;
  }
  
  localStorage.setItem('todo-state', JSON.stringify(stored));
  updateStats();
}

function updateStats() {
  const total = document.querySelectorAll('.todo-item').length;
  const completed = document.querySelectorAll('.todo-item.completed').length;
  const pending = total - completed;
  
  document.getElementById('total-count').textContent = total;
  document.getElementById('completed-count').textContent = completed;
  document.getElementById('pending-count').textContent = pending;
  document.getElementById('progress-fill').style.width = (total > 0 ? (completed / total) * 100 : 0) + '%';
}
</script>
