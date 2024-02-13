<template>
  <div>
    <h1>Deep Learning Posts</h1>
    <p>fuck you nuxt you are horrible. should have used gatsby</p>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <nuxt-link :to="`/deep-learning/${post.slug}`">
          {{ post.title }} (Slug: {{ post.slug }})
        </nuxt-link>
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
  mounted() {
    console.log("Deep Learning page mounted!");
  },
};
</script>
