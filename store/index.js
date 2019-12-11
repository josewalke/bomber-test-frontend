export const state = () => ({
  token: '',
  username: '',
  email: '',
  role: '',
  objectId: ''
})

export const getters = {
  userName(state) {
    return state.username
  },
  token(state) {
    return state.token
  }
}

export const mutations = {
  saveToken(state, { username, email, role, objectId, token }) {
    state.token = token
    state.username = username
    state.email = email
    state.role = role
    state.objectId = objectId
  },
  clearToken(state) {
    state.token = ''
    state.username = ''
    state.email = ''
    state.role = ''
    state.objectId = ''
  }
}
