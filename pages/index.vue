<template>
  <div class="container">
    <h1>Aryan Research Lab (under construction 🎁)</h1>
    <div class="subjects">
      <a
        class="subject"
        v-for="subject in subjects"
        :key="subject"
        :href="`/${subject}`"
      >
        {{ subject.replace("-", " ") }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [
        "deep-learning",
        "multi-agents",
        "databases",
        "big-data",
        "data-mining",
        "data-collection",
      ],
    };
  },
};
</script>

<style>
.container {
  text-align: center;
}
.subjects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.subject {
  margin: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  text-decoration: none;
  color: black;
}
</style>
