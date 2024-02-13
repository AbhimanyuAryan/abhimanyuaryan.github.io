<template>
  <section>
    <h1>Deep Learning Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="`/deep-learning/${post.slug}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';

const { data: posts } = useAsyncData('posts', () => {
  return useContent('deep-learning', { deep: true }).sortBy('date', 'desc');
});
</script>
