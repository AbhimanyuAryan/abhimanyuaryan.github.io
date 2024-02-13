<template>
  <div>
    <h1>Deep Learning Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <nuxt-link :to="`/deep-learning/${post.slug}`">{{
          post.title
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    console.log("Fetching posts...");
    const posts = await $content("deep-learning").fetch();
    console.log("Posts:", posts);
    return {
      posts,
    };
  },
};
</script>
