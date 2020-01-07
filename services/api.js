import axios from '~/plugins/axios'

export default {
  getAllUsers() {
    return axios.get('users').then(response => response.data)
  },
  getUserById(prueba) {
    return axios.get('users/' + prueba).then(response => response.data)
  },
  getAllQuestions() {
    return axios.get('questions').then(response => response.data)
  },
  generateTest(token) {
    return axios
      .post('tests', null, { headers: { token } })
      .then(response => response.data)
  },
  getAllTest(userId) {
    return axios.get('tests/user/' + userId).then(response => response.data)
  },
  getTest(testId) {
    return axios.get('tests/' + testId).then(response => response.data)
  },
  login(user) {
    return axios.post('auth/login', user).then(response => response.data)
  },
  signup(user) {
    return axios.post('auth/signup', user).then(response => response.data)
  },
  updateName(data) {
    let body = {
      name: data.newName
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  }
}
