<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
    <p v-if="formError" class="error">
      {{ formError }}
    </p>
    <v-text-field
      v-model="username"
      :counter="20"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn color="error" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="warning" type="submit">
      Login
    </v-btn>
  </v-form>
</template>

<script>
import Cookies from 'universal-cookie'

export default {
  asyncData({ redirect, store }) {
    if (store.getters.user) {
      redirect('/')
    }
    return {
      username: '',
      password: '',
      formError: null,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      show1: false,
      rules: {
        required: value => !!value || 'Required.'
        // min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    async login() {
      const cookies = new Cookies()
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        this.username = ''
        this.password = ''
        this.formError = null
        cookies.set('user', JSON.stringify(this.user))
        this.$router.push('/')
      } catch (e) {
        this.formError = e.message
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
