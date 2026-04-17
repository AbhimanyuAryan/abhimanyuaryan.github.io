---
layout: default
permalink: /courses/
title: Courses
description: Video courses on game development, AI, and programming — free on YouTube.
nav: false
---

<div class="post">
  <div class="header-bar">
    <h1>{{ page.title }}</h1>
    <h2>{{ page.description }}</h2>
  </div>

{% assign all_courses = site.course_catalog %}
{% if all_courses.size > 0 %}
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-1">
{% for course in all_courses %}
{% assign lesson_count = site.courses | where: "course_slug", course.course_slug | size %}
<div class="col">
<a href="{{ course.url | relative_url }}" style="text-decoration: none; color: inherit;">
<div class="card h-100 hoverable" style="border-radius: 12px; overflow: hidden;">

              <div style="position: relative; padding-bottom: 56.25%; background: #000;">
                <img
                  src="https://img.youtube.com/vi/{{ course.thumbnail_youtube_id }}/hqdefault.jpg"
                  alt="{{ course.title }}"
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
                  loading="lazy"
                >
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%);"></div>
                <span style="position: absolute; bottom: 10px; left: 12px;
                             background: rgba(0,0,0,0.75); color: white;
                             font-size: 0.75rem; padding: 3px 8px; border-radius: 4px;">
                  <i class="fa-solid fa-film fa-sm"></i> {{ lesson_count }} lesson{% if lesson_count != 1 %}s{% endif %}
                </span>
                {% if course.level %}
                  <span style="position: absolute; top: 10px; right: 12px;
                               background: var(--global-theme-color); color: white;
                               font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; font-weight: 600;">
                    {{ course.level }}
                  </span>
                {% endif %}
              </div>

              <div class="card-body" style="padding: 1rem;">
                <h5 class="card-title" style="margin-bottom: 0.4rem; font-size: 1rem; line-height: 1.3;">
                  {{ course.title }}
                </h5>
                <p class="card-text" style="font-size: 0.85rem; color: var(--global-text-color-light);
                                             margin-bottom: 0.75rem;
                                             display: -webkit-box; -webkit-line-clamp: 3;
                                             -webkit-box-orient: vertical; overflow: hidden;">
                  {{ course.description }}
                </p>
                {% if course.tags %}
                  <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    {% for tag in course.tags limit: 3 %}
                      <span style="font-size: 0.72rem; padding: 2px 7px; border-radius: 10px;
                                   background: var(--global-divider-color); color: var(--global-text-color-light);">
                        {{ tag }}
                      </span>
                    {% endfor %}
                  </div>
                {% endif %}
              </div>

              <div class="card-footer" style="background: transparent; border-top: 1px solid var(--global-divider-color);
                                              padding: 0.6rem 1rem; font-size: 0.82rem;
                                              color: var(--global-theme-color); font-weight: 500;">
                View Course <i class="fa-solid fa-arrow-right fa-sm"></i>
              </div>

            </div>
          </a>
        </div>
      {% endfor %}
    </div>

{% else %}
<p>No courses available yet. Check back soon.</p>
{% endif %}

</div>
