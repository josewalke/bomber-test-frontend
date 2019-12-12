import axios from '~/plugins/axios'

export default {
  getAllUsers() {
    return axios.get('users').then(response => response.data)
  },
  getUserById(prueba) {
    return axios.get('users/' + prueba).then(response => response.data)
  },
  getAllQuestions() {
    return axios
      .get(process.env.API_URL + 'questions')
      .then(response => response.data)
  },
  generateTest(token) {
    return axios
      .post('tests', null, { headers: { token } })
      .then(response => response.data)
  }
}
