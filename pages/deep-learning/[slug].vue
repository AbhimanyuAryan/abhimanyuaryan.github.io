<template>
  <article>
    <h1>{{ post.title }}</h1>
    <div v-html="post.body" />
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from 'nuxt/app';

const route = useRoute();

const { data: post } = useAsyncData('post', () => {
  return useContent(`deep-learning/${route.params.slug}`);
});
</script>
