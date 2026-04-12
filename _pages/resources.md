---
layout: default
permalink: /resources/
title: Learning Resources
description: Personal collection of learning resources and tutorials.
nav: false
---

<style>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--global-card-bg-color);
  border-radius: 8px;
}
.filter-btn {
  padding: 0.4rem 1rem;
  border: 2px solid var(--global-theme-color);
  border-radius: 20px;
  background: transparent;
  color: var(--global-theme-color);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}
.filter-btn:hover, .filter-btn.active {
  background: var(--global-theme-color);
  color: white;
}
.resource-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.tag-video { background: #ef4444; color: white; }
.tag-blog { background: #6366f1; color: white; }
.tag-docs { background: #10b981; color: white; }
.tag-paper { background: #f59e0b; color: white; }
.tag-github { background: #1f2937; color: white; }
.tag-course { background: #8b5cf6; color: white; }
.resource-card {
  transition: all 0.3s ease;
}
.resource-card.hidden {
  display: none !important;
}
.resource-count {
  font-size: 0.85rem;
  color: var(--global-text-color-light);
  margin-bottom: 1rem;
}
</style>

<div class="filter-container">
  <button class="filter-btn active" onclick="filterResources('all')">All</button>
  <button class="filter-btn" onclick="filterResources('video')">📺 Video</button>
  <button class="filter-btn" onclick="filterResources('course')">🎓 Course</button>
  <button class="filter-btn" onclick="filterResources('blog')">📝 Blog</button>
  <button class="filter-btn" onclick="filterResources('docs')">📚 Docs</button>
  <button class="filter-btn" onclick="filterResources('paper')">📄 Paper</button>
  <button class="filter-btn" onclick="filterResources('github')">💻 GitHub</button>
</div>

<div class="resource-count">Showing <span id="visible-count">11</span> of <span id="total-count">11</span> resources</div>

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="video">
      <div class="card-body">
        <span class="resource-tag tag-video">Video</span>
        <h5 class="card-title">OpenAI Build Hours</h5>
        <p class="card-text">Comprehensive series covering advanced AI development concepts including prompt caching, memory management, and integration patterns.</p>
        <ul class="card-text">
          <li><strong>Prompt Caching</strong> - Optimize API costs and latency</li>
          <li><strong>Memory Management</strong> - Maintain context in long conversations</li>
          <li><strong>Advanced Prompting</strong> - Complex multi-step tasks</li>
          <li><strong>Integration Patterns</strong> - Production deployment best practices</li>
        </ul>
        <a href="https://www.youtube.com/playlist?list=PLOXw6I10VTv9zUbhqqaT62O9AFjlndmjn" class="btn btn-primary btn-sm">Watch Playlist</a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="blog">
      <div class="card-body">
        <span class="resource-tag tag-blog">Blog</span>
        <h5 class="card-title">Mario Zechner's Blog</h5>
        <p class="card-text">Independent developer with deep expertise in ML, compilers, and coding agents. Essential reading for understanding agent architecture.</p>
        <ul class="card-text">
          <li><a href="https://mariozechner.at/posts/2025-11-30-pi-coding-agent/">Pi Coding Agent</a> - Building focused coding agents</li>
          <li><a href="https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/">MCP Alternatives</a> - Tool integration approaches</li>
          <li><a href="https://mariozechner.at/posts/2025-08-15-mcp-vs-cli/">MCP vs CLI</a> - Performance benchmarking</li>
        </ul>
        <a href="https://mariozechner.at/" class="btn btn-primary btn-sm">Visit Blog</a>
        <a href="https://mariozechner.at/rss.xml" class="btn btn-outline-primary btn-sm ms-2">RSS Feed</a>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="video">
      <div class="card-body">
        <span class="resource-tag tag-video">Video</span>
        <h5 class="card-title">BAML Podcast: "AI That Works"</h5>
        <p class="card-text">Weekly interactive sessions with @hellovai & @dexhorthy building real AI applications. Live code, Q&A, and production techniques.</p>
        <ul class="card-text">
          <li><strong>Claude Agent Skills</strong> - Deep dive + PII redaction</li>
          <li><strong>Agentic Backpressure</strong> - Production patterns</li>
          <li><strong>Bash vs MCP</strong> - Token-efficient tooling</li>
          <li><strong>SSE Streaming</strong> - Real-time AI applications</li>
        </ul>
        <a href="https://boundaryml.com/podcast" class="btn btn-primary btn-sm">Listen Now</a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="docs">
      <div class="card-body">
        <span class="resource-tag tag-docs">Docs</span>
        <h5 class="card-title">OpenClaw Architecture</h5>
        <p class="card-text">Production-ready agent gateway with advanced session management, streaming, and multi-agent routing capabilities.</p>
        <ul class="card-text">
          <li><strong>Streaming & Chunking</strong> - Real-time response streaming</li>
          <li><strong>Session Pruning</strong> - Efficient memory management</li>
          <li><strong>Session Management</strong> - Long-lived agent sessions</li>
          <li><strong>Multi-agent Routing</strong> - Intelligent agent orchestration</li>
        </ul>
        <a href="https://docs.openclaw.ai/concepts/architecture" class="btn btn-primary btn-sm">Read Docs</a>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="blog">
      <div class="card-body">
        <span class="resource-tag tag-blog">Blog</span>
        <h5 class="card-title">Anthropic Engineering</h5>
        <p class="card-text">Daily technical blog from Anthropic's engineering team. Essential reading for production AI systems and agent development.</p>
        <ul class="card-text">
          <li><strong>Agent Infrastructure</strong> - Scaling managed agents</li>
          <li><strong>Claude Code</strong> - Auto mode and security patterns</li>
          <li><strong>Tool Design</strong> - Writing effective tools for agents</li>
          <li><strong>Evals & Testing</strong> - Infrastructure noise quantification</li>
        </ul>
        <a href="https://www.anthropic.com/engineering" class="btn btn-primary btn-sm">Read Daily</a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="blog">
      <div class="card-body">
        <span class="resource-tag tag-blog">Blog</span>
        <h5 class="card-title">LangChain Blog</h5>
        <p class="card-text">Deep insights into agent evaluation, harness engineering, and skills development from the LangChain team building Deep Agents.</p>
        <ul class="card-text">
          <li><strong>Evaluating Skills</strong> - Building skills for coding agents</li>
          <li><strong>Deep Agents Evals</strong> - How to build effective evaluations</li>
          <li><strong>Harness Engineering</strong> - Improving agents with Terminal Bench 2.0</li>
          <li><strong>Agent Behavior</strong> - Measuring and improving reliability</li>
        </ul>
        <a href="https://blog.langchain.com/" class="btn btn-primary btn-sm">Read Blog</a>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="course">
      <div class="card-body">
        <span class="resource-tag tag-course">Course</span>
        <h5 class="card-title">Efficient Inference with SGLang</h5>
        <p class="card-text">DeepLearning.AI course on LLM inference optimization. Learn caching optimizations, KV cache, and RadixAttention for faster text and image generation.</p>
        <ul class="card-text">
          <li><strong>Inference Fundamentals</strong> - How LLM inference works under the hood</li>
          <li><strong>KV Cache Optimization</strong> - Reduce memory usage and latency</li>
          <li><strong>RadixAttention</strong> - Advanced attention mechanism optimization</li>
          <li><strong>Text & Image Generation</strong> - Multi-modal inference techniques</li>
        </ul>
        <a href="https://learn.deeplearning.ai/courses/efficient-inference-with-sglang-text-and-image-generation/lesson/uzfnvt/overview-of-inference" class="btn btn-primary btn-sm">Take Course</a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="paper">
      <div class="card-body">
        <span class="resource-tag tag-paper">Paper</span>
        <h5 class="card-title">Meta-Harness</h5>
        <p class="card-text">End-to-end optimization of model harnesses. Automatically optimizes code determining what to store, retrieve, and present to LLMs.</p>
        <ul class="card-text">
          <li><strong>TerminalBench-2</strong> - Harness evolution and optimization</li>
          <li><strong>Text Classification</strong> - Surpasses hand-designed systems</li>
          <li><strong>Math Reasoning</strong> - Advanced problem-solving capabilities</li>
          <li><strong>Agentic Coding</strong> - TerminalBench-2 evaluation results</li>
        </ul>
        <a href="https://yoonholee.com/meta-harness/" class="btn btn-primary btn-sm">Read Paper</a>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="course">
      <div class="card-body">
        <span class="resource-tag tag-course">Course</span>
        <h5 class="card-title">NeMo Agent Toolkit</h5>
        <p class="card-text">DeepLearning.AI course on making agents reliable with NVIDIA's NeMo Agent Toolkit. Turn proof-of-concept demos into production-ready systems.</p>
        <ul class="card-text">
          <li><strong>Agent Observability</strong> - Monitor and debug agent behavior</li>
          <li><strong>Evaluation Framework</strong> - Comprehensive agent testing</li>
          <li><strong>Deployment Tools</strong> - Production-ready agent deployment</li>
          <li><strong>Reliability Patterns</strong> - From demo to production systems</li>
        </ul>
        <a href="https://learn.deeplearning.ai/courses/nvidia-nat-making-agents-reliable/lesson/rmy8gb/introduction?startTime=0" class="btn btn-primary btn-sm">Take Course</a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="github">
      <div class="card-body">
        <span class="resource-tag tag-github">GitHub</span>
        <h5 class="card-title">Deep Agents GitHub</h5>
        <p class="card-text">Agent harness built with LangChain and LangGraph. Equipped with planning tool, filesystem backend, and sub-agent spawning capabilities.</p>
        <ul class="card-text">
          <li><strong>Agent Harness</strong> - Core tool calling loop with built-in tools</li>
          <li><strong>Planning Tool</strong> - Plan before task execution</li>
          <li><strong>Filesystem Backend</strong> - Shell and filesystem access</li>
          <li><strong>Sub-agent Delegation</strong> - Isolated task execution</li>
        </ul>
        <a href="https://github.com/langchain-ai/deepagents" class="btn btn-primary btn-sm">View Repo</a>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="card h-100 resource-card" data-tags="video">
      <div class="card-body">
        <span class="resource-tag tag-video">Video</span>
        <h5 class="card-title">Criticism of Coding Harnesses</h5>
        <p class="card-text">A must-watch critique of current coding agent harnesses. Exposes fundamental limitations and blind spots in how we build and evaluate coding agents today.</p>
        <ul class="card-text">
          <li><strong>Harness Limitations</strong> - What current harnesses get wrong</li>
          <li><strong>Evaluation Gaps</strong> - Blind spots in agent benchmarks</li>
          <li><strong>Design Flaws</strong> - Architectural weaknesses exposed</li>
          <li><strong>Better Approaches</strong> - Paths forward for improvement</li>
        </ul>
        <a href="https://youtu.be/Dli5slNaJu0?t=987" class="btn btn-primary btn-sm">Watch Video</a>
      </div>
    </div>
  </div>
</div>

<script>
function filterResources(tag) {
  const cards = document.querySelectorAll('.resource-card');
  const buttons = document.querySelectorAll('.filter-btn');
  let visibleCount = 0;
  
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  cards.forEach(card => {
    if (tag === 'all' || card.dataset.tags.includes(tag)) {
      card.classList.remove('hidden');
      card.closest('.col-sm-6').style.display = '';
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.closest('.col-sm-6').style.display = 'none';
    }
  });
  
  document.getElementById('visible-count').textContent = visibleCount;
  localStorage.setItem('resource-filter', tag);
}

document.addEventListener('DOMContentLoaded', function() {
  const total = document.querySelectorAll('.resource-card').length;
  document.getElementById('total-count').textContent = total;
  document.getElementById('visible-count').textContent = total;
  
  const savedFilter = localStorage.getItem('resource-filter');
  if (savedFilter && savedFilter !== 'all') {
    const btn = document.querySelector(`.filter-btn[onclick*="'${savedFilter}'"]`);
    if (btn) btn.click();
  }
});
</script>
