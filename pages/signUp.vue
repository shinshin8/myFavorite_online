<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="signUp">
    <p v-if="formError" class="error">
      {{ formError }}
    </p>
    <v-text-field
      v-model="username"
      :counter="20"
      :rules="nameRules"
      label="User name"
      required
    ></v-text-field>

    <v-text-field
      v-model="emailAddress"
      :rules="emailRules"
      :counter="20"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      username="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      username="input-10-1"
      label="Confirm password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" type="submit">
      Sign Up
    </v-btn>

    <v-btn color="error" @click="reset">
      Reset Form
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
      valid: true,
      username: '',
      password: '',
      emailAddress: '',
      confirmPassword: '',
      formError: null,
      nameRules: [
        v => !!v || 'User name is required',
        v =>
          (v && v.length <= 10) || 'User name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      checkbox: false,
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        // min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match"
      }
    }
  },
  methods: {
    async signUp() {
      const cookies = new Cookies()
      try {
        await this.$store.dispatch('signUp', {
          username: this.username,
          emailAddress: this.emailAddress,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        this.username = ''
        this.emailAddress = ''
        this.password = ''
        this.confirmPassword = ''
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
