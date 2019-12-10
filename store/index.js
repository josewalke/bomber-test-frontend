export const state = () => ({
  token: '',
  username: '',
  email: '',
  role: '',
  objectId: ''
})

export const getters = {
  email(state) {
    return state.email
  },
  userName(state) {
    return state.username
  },
  objectId(state) {
    return state.objectId
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
