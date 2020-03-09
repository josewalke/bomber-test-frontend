import axios from '~/plugins/axios'

export default {
  getAllUsers() {
    return axios.get('users').then(response => response.data)
  },
  getAllTemas() {
    return axios.get('temario').then(response => response.data)
  },
  getAllTest() {
    return axios.get('tests/').then(response => response.data)
  },
  getUserById(prueba) {
    return axios.get('users/' + prueba).then(response => response.data)
  },
  getQuestionById(pregunta_id) {
    return axios.get('questions/' + pregunta_id).then(response => response.data)
  },
  getAllQuestions() {
    return axios.get('questions').then(response => response.data)
  },
  getAllTestById(userId) {
    return axios.get('tests/user/' + userId).then(response => response.data)
  },
  generateTest(token) {
    return axios.post('tests', null, { headers: { token } }).then(response => {
      return response.data
    })
  },
  generateConfigTest(token, test) {
    return axios
      .post('tests/config', test, { headers: { token } })
      .then(response => {
        return response.data
      })
  },
  updateTest(token, data) {
    return axios
      .put('tests/' + data.testId, data, { headers: { token } })
      .then(response => {
        return response.data
      })
  },
  getAllMessageById(userId) {
    return axios.get('messages/' + userId).then(response => response.data)
  },
  getAllMessageAdmin() {
    return axios.get('messages/').then(response => response.data)
  },
  newMessage(token, data) {
    return axios
      .post('messages/', data, { headers: { token } })
      .then(response => {
        return response.data
      })
  },
  getTest(testId) {
    return axios.get('tests/' + testId).then(response => response.data)
  },
  getAllTemasNames() {
    return axios
      .get('temario')
      .then(response => response.data)
      .then(temas => {
        var temaName = []
        temas.forEach(tema => {
          let temaData = { name: tema.name, id: tema._id }
          temaName.push(temaData)
        })
        return temaName.sort()
      })
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
  updatePhoto(data) {
    let body = {
      img_url: data.newPhoto
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
  newTema(body) {
    return axios.post('temario', body).then(response => response.data)
  },
  deleteTema(temaId) {
    return axios.delete(`temario/${temaId}`).then(response => response.data)
  },
  reply(reply) {
    const body = {
      respuesta_leida: true,
      respuesta: reply.respuesta
    }
    return axios
      .put(`messages/${reply.id}`, body)
      .then(response => response.data)
  },
  crearQuestion(newQuestion) {
    return axios.post(`questions/`, newQuestion).then(response => response.data)
  },
  updateEnunciado(newEnunciado) {
    const body = {
      enunciado: newEnunciado.enunciado
    }

    return axios
      .put('questions/' + newEnunciado.id, body)
      .then(response => response.data)
  },
  updateQuestionPhoto(photo) {
    const body = {
      imagen_url: photo.imagen_url
    }

    return axios
      .put('questions/' + photo.id, body)
      .then(response => response.data)
  },
  updateOpcion(newOpcion) {
    const body = {
      answers: newOpcion.answers
    }
    return axios
      .put('questions/' + newOpcion.id, body)
      .then(response => response.data)
  },
  updateExplicacion(explicacion) {
    const body = {
      explicacion: explicacion.explicacion
    }
    return axios
      .put('questions/' + explicacion.id, body)
      .then(response => response.data)
  },
  updateCorrect(correct) {
    const body = {
      answers_correct: correct.answers_correct
    }
    return axios
      .put('questions/' + correct.id, body)
      .then(response => response.data)
  },
  updateCategory(category) {
    const body = {
      category: category.category
    }
    return axios
      .put('questions/' + category.id, body)
      .then(response => response.data)
  },
  updateDifficulty(difficulty) {
    const body = {
      difficulty: difficulty.difficulty
    }
    return axios
      .put('questions/' + difficulty.id, body)
      .then(response => response.data)
  },
  updateTema(tema) {
    const body = {
      tema_id: tema.tema_id
    }
    return axios
      .put('questions/' + tema.id, body)
      .then(response => response.data)
  },
  change_active(change) {
    const body = {
      active: change.active
    }

    return axios.put('users/' + change.id, body).then(response => response.data)
  },
  change_suscription(change) {
    const body = {
      suscription_type: change.suscription_type
    }

    return axios.put('users/' + change.id, body).then(response => response.data)
  },
  updateVerificada(id) {
    const body = { verificada: true }

    return axios.put(`messages/${id}`, body).then(response => response.data)
  },
  crearExamen(test) {
    return axios.post('tests/exam', test).then(response => {
      return response.data
    })
  },
  deleteDesafio() {
    return axios.delete('tests/desafio').then(response => {
      return response.data
    })
  },
  prueba() {},
  updateQuestionById(newQuestion) {
    return axios
      .put('questions/' + newQuestion._id, newQuestion)
      .then(response => response.data)
  },
  testPremium() {
    return axios.get(`tests/premium`).then(response => response.data)
  }
}
