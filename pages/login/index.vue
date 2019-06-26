<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <p>
        <i
          >To login, use <b>demo</b> as username and <b>demo</b> as password.</i
        >
      </p>
      <p>
        Username:
        <input v-model="formUsername" type="text" name="username" />
      </p>
      <p>
        Password:
        <input v-model="formPassword" type="password" name="password" />
      </p>
      <button type="submit">
        Login
      </button>
    </form>
    <div v-else>
      Hello {{ $store.state.user }}!
      <pre>
I am the secret content, I am shown only when the user is connected.</pre
      >
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p>
      <NuxtLink to="/secret">
        Super secret page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import Cookies from 'universal-cookie'

export default {
  asyncData({ redirect, store }) {
    if (store.getters.user) {
      redirect('/')
    }
    return {
      formUsername: '',
      formPassword: '',
      formError: ''
    }
  },
  methods: {
    async login() {
      const cookies = new Cookies()
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        cookies.set('user', JSON.stringify(this.user))
        this.$router.push('/')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
