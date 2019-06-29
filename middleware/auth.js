import Cookies from 'universal-cookie'

export default ({ req, store }) => {
  if (process.browser) {
    return
  }
  const cookies = new Cookies(req.headers.cookie)
  const user = cookies.get('user')
  store.commit('setUser', { user: user })
}
