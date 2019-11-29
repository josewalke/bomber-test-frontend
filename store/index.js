export const state = () => ({
  token: '',
  username: '',
  email: ''
})

export const getters = {
  userName(state) {
    return state.username
  }
}
export const mutations = {
  saveToken(state, { username, email, token }) {
    state.token = token
    state.username = username
    state.email = email
  },
  clearToken(state) {
    state.token = ''
    state.username = ''
    state.email = ''
  }
}
