<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import { definePageMeta } from 'nuxt/app';

// Specifying the query for fetching deep learning content, sorted by modification and publication dates
const query: QueryBuilderParams = { path: '/deep-learning', sort: [{ dateModified: -1, datePublished: -1 }] }

// Setting page metadata
definePageMeta({
  title: 'Deep Learning Posts',
  description: 'Explore my deep learning posts, covering a range of topics from fundamentals to advanced techniques.'
});
</script>

<template>
  <section class="deep-learning-posts-list">
    <h1>Deep Learning Posts</h1>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="post in list" :key="post._path" class="deep-learning-post-preview">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <!-- Link to the detailed view of the deep learning post -->
        <nuxt-link :to="`/deep-learning/${post.slug}`">Read more</nuxt-link>
      </div>
    </ContentList>
  </section>
</template>
