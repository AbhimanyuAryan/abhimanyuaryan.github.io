<template>
  <main>
    <ContentList path="/agents" v-slot="{ list }">
      <div class="cards">
        <nuxt-link
          v-for="item in list"
          :key="item._id"
          :to="`/agents/${item._path?.split('/').pop() || 'fallback-path'}`"
          class="card-link"
        >
          <div class="card">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <p>Author: {{ item.author }}, Date: {{ new Date(item.date).toLocaleDateString() }}</p>
          </div>
        </nuxt-link>
      </div>
    </ContentList>
  </main>
</template>

<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
}
</style>
