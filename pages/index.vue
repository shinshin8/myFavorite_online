<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="post in posts" :key="post.article_id">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ post.title }}</h3>
            <div>{{ post.content }}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ app }) {
    const items = await app.$axios.$get('http://localhost:8080')
    if (items.status) {
      const posts = items.posts
      console.log(items.posts)
      return {
        posts
      }
    }
  }
}
</script>
