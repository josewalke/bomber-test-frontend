export const state = () => ({
  token: '',
  username: '',
  email: '',
  role: '',
  userId: ''
})

export const getters = {
  userName(state) {
    return state.username
  },
  token(state) {
    return state.token
  },
  userId(state) {
    return state.userId
  }
}

export const mutations = {
  saveToken(state, { username, email, role, userId, token }) {
    state.token = token
    state.username = username
    state.email = email
    state.role = role
    state.userId = userId
  },
  clearToken(state) {
    state.token = ''
    state.username = ''
    state.email = ''
    state.role = ''
    state.userId = ''
  }
}
