<template>
  <div>
    <h1>{{ post.title }}</h1>
    <nuxt-content :document="post" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const post = await $content("deep-learning", params.slug).fetch();
    return {
      post,
    };
  },
};
</script>
