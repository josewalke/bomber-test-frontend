import axios from '~/plugins/axios'

export default {
  getAllUsers() {
    return axios.get('users').then(response => response.data)
  },
  getAllTemas() {
    return axios.get('temario').then(response => response.data)
  },
  getUserById(prueba) {
    return axios.get('users/' + prueba).then(response => response.data)
  },
  getQuestionById(pregunta_id) {
    return axios.get('questions/' + pregunta_id).then(response => response.data)
    // console.log(pregunta_id)
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
  getAllMessageById(userId) {
    return axios.get('messages/' + userId).then(response => response.data)
  },
  getAllMessageAdmin() {
    return axios.get('messages/').then(response => response.data)
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
  },
  updateLastName(data) {
    let body = {
      lastName: data.newLastName
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateNickName(data) {
    let body = {
      nickName: data.newNickName
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateEmail(data) {
    let body = {
      email: data.newEmail
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updatePhone(data) {
    let body = {
      phone: data.newPhone
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  updateSuscription(data) {
    let body = {
      suscription_type: data.newSuscription
    }
    return axios
      .put('users/' + data.userId, body)
      .then(response => response.data)
  },
  newTema(titulo) {
    var body = {
      name: titulo
    }
    return axios.post('temario', body).then(response => response.data)
  },
  deleteTema(temaId) {
    return axios.delete(`temario/${temaId}`).then(response => response.data)
  }
}
