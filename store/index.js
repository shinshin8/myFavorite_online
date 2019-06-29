export const state = () => ({
  isLoggedIn: false,
  user: null
})

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user
    state.isLoggedIn = true
  }
}

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const res = await this.$axios.$post('/login', {
        username,
        password
      })
      if (res.status && res.error_code === 0) {
        const user = res.token
        commit('setUser', { user })
      } else {
        throw new Error('Username or password is invalid.')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async signUp(
    { commit },
    { username, emailAddress, password, confirmPassword }
  ) {
    try {
      const res = await this.$axios.$post('/signUp', {
        username,
        emailAddress,
        password,
        confirmPassword
      })
      if (!res.status && res.error_code === 3) {
        throw new Error('Invalid Username')
      }
      if (!res.status && res.error_code === 4) {
        throw new Error('Invalid mail address')
      }
      if (!res.status && res.error_code === 5) {
        throw new Error('Invalid password')
      }
      if (!res.status && res.error_code === 6) {
        throw new Error('Password does not match with comfirmed password  ')
      }
      if (res.status && res.error_code === 0) {
        const user = res.token
        commit('setUser', { user })
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  }
}
