<script setup lang="ts">
import { onContentNotFound } from '~/utils/content.js';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

// Fetching deep learning content based on the slug from the URL
const { page: deepLearningPost } = useContent('deep-learning/' + useRoute().params.slug);

onContentNotFound(deepLearningPost);

// Formatting the creation date to be human-readable
const formattedCreatedAt = computed(() => new Date(deepLearningPost.value.datePublished).toLocaleDateString());
</script>

<template>
  <div class="deep-learning-post-container">
    <h1>{{ deepLearningPost.title }}</h1>
    <p class="published-date">Published at: {{ formattedCreatedAt }}</p>
    <div v-html="deepLearningPost.bodyHtml"></div>
  </div>
</template>
