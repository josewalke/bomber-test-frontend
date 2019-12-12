export const state = () => ({
  token: '',
  lastName: '',
  email: '',
  role: '',
  userId: '',
  phone: '',
  img_url: '',
  tests: []
})

export const getters = {
  username(state) {
    return state.username
  },
  userProfile(state) {
    return { usename: state.username }
  },
  token(state) {
    return state.token
  },
  userId(state) {
    return state.userId
  },
  tests(state) {
    return state.tests
  },
  image_url(state) {
    return state.image_url
  },
  email(state) {
    return state.email
  },
  phone(state) {
    return state.phone
  }
}

export const mutations = {
  saveToken(
    state,
    { firstName, lastName, email, role, userId, phone, img_url, token }
  ) {
    state.token = token
    state.firstName = firstName
    state.lastName = lastName
    state.email = email
    state.role = role
    state.userId = userId
    state.phone = phone
    state.img_url = img_url
  },
  saveTests(state, tests) {
    state.tests = tests
  },
  clearToken(state) {
    state.token = ''
    state.username = ''
    state.email = ''
    state.role = ''
    state.userId = ''
  }
}
import API from '~/services/api'

export const actions = {
  async login({ commit, state }, userData) {
    const response = await API.login(userData)
    if (!response.error) {
      commit('saveToken', response)
      const tests = await API.getAllTest(state.userId)
      commit('saveTests', tests)
    }
    return response
  },
  async signup({ commit, state }, userData) {
    const response = await API.signup(userData)
    if (!response.error) {
      commit('saveToken', response)
      const tests = await API.getAllTest(state.userId)
      commit('saveTests', tests)
    }
    return response
  },
  async createTest({ commit, state }) {
    // Creo el test
    await API.generateTest(state.token)
    const tests = await API.getAllTest(state.userId)
    commit('saveTests', tests)
  }
  // async loadTest({ commit, state }) {
  //   const tests = await API.getAllTest(state.userId)
  //   commit('saveTests', tests)
  //   ESTO ESTA MEJOR
  // }
}
