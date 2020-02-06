import API from '~/services/api'

export const state = () => ({
  token: '',
  nickName: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  userId: '',
  phone: '',
  img_url: '',
  mensajes: '',
  MensajesTotales: '',
  aprobados: '',
  suspendidos: '',
  total: '',
  suscription_type: '',
  active: '',
  tests: [],
  messages: [],
  currentTest: {},
  question: {},
  position: '',
  updatePregunta: {}
})

export const getters = {
  nickName(state) {
    return state.nickName
  },
  userName(state) {
    return `${state.firstName} ${state.lastName}`
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
  messages(state) {
    return state.messages
  },
  image_url(state) {
    return state.img_url
  },
  email(state) {
    return state.email
  },
  phone(state) {
    return state.phone
  },
  role(state) {
    return state.role
  },
  currentTest(state) {
    return state.currentTest
  },
  question(state) {
    return state.question
  },
  mensajes(state) {
    return state.mensajes
  },
  MensajesTotales(state) {
    return state.MensajesTotales
  },
  aprobados(state) {
    return state.aprobados
  },
  suspendidos(state) {
    return state.suspendidos
  },
  total(state) {
    return state.total
  },
  suscription_type(state) {
    return state.suscription_type
  },
  active(state) {
    return state.active
  },
  position(state) {
    return state.position
  },
  updatePregunta(state) {
    return state.updatePregunta
  }
}

export const mutations = {
  saveToken(
    state,
    {
      nickName,
      firstName,
      lastName,
      email,
      role,
      userId,
      phone,
      img_url,
      token,
      mensajes,
      MensajesTotales,
      aprobados,
      suspendidos,
      total,
      suscription_type,
      active
    }
  ) {
    state.token = token
    state.nickName = nickName
    state.firstName = firstName
    state.lastName = lastName
    state.email = email
    state.role = role
    state.userId = userId
    state.phone = phone
    state.img_url = img_url
    state.mensajes = mensajes
    state.MensajesTotales = MensajesTotales
    state.aprobados = aprobados
    state.suspendidos = suspendidos
    state.total = total
    state.suscription_type = suscription_type
    state.active = active
  },
  saveTests(state, tests) {
    state.tests = tests
  },
  saveMessage(state, mensajes) {
    state.messages = mensajes
  },
  saveCurrentTest(state, test) {
    state.currentTest = test
  },
  saveQuestion(state, question) {
    state.question = question
  },
  clearToken(state) {
    state.token = ''
    state.firstName = ''
    state.lastName = ''
    state.email = ''
    state.role = ''
    state.userId = ''
    state.phone = ''
    state.img_url = ''
    localStorage.clear()
  },
  saveUpdate(
    state,
    {
      nickName,
      name,
      lastName,
      email,
      role,
      _id,
      phone,
      img_url,
      mensajes,
      MensajesTotales,
      aprobados,
      suspendidos,
      total,
      suscription_type
    }
  ) {
    state.nickName = nickName
    state.firstName = name
    state.lastName = lastName
    state.email = email
    state.role = role
    state.userId = _id
    state.phone = phone
    state.img_url = img_url
    state.mensajes = mensajes
    state.MensajesTotales = MensajesTotales
    state.aprobados = aprobados
    state.suspendidos = suspendidos
    state.total = total
    state.suscription_type = suscription_type
  },
  savePosition(state, position) {
    state.position = position
  },
  saveUpdatePregunta(state, pregunta) {
    state.updatePregunta = pregunta
  },
  prueba() {
    console.log('console de prueba')
  }
}

export const actions = {
  async login({ commit, state }, userData) {
    const response = await API.login(userData)
    if (!response.error) {
      commit('saveToken', response)
      const tests = await API.getAllTest(state.userId)
      commit('saveTests', tests)
      const mensajes = await API.getAllMessageById(state.userId)
      commit('saveMessage', mensajes)
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
    const newTest = await API.generateTest(state.token)
    commit('saveCurrentTest', newTest)
    const tests = await API.getAllTest(state.userId)
    commit('saveTests', tests)
  },
  async createTestConfig({ commit, state }, testData) {
    const newTest = await API.generateConfigTest(state.token, testData)
    commit('saveCurrentTest', newTest)
    const tests = await API.getAllTest(state.userId)
    commit('saveTests', tests)
  },

  async updateTest({ commit, state }, testData) {
    let data = testData
    const updatedTest = await API.updateTest(state.token, data)
    commit('saveCurrentTest', updatedTest)
    const tests = await API.getAllTest(state.userId)
    commit('saveTests', tests)
  },
  async verRespuesta({ state }, responseBody) {
    const respuesta =
      state.currentTest.no_contestadas[0].answer_wrong[responseBody.number]
    const correcta = state.currentTest.no_contestadas[0].answers_correct
    const enunciado = state.currentTest.no_contestadas[0].enunciado

    if (responseBody.enunciado === enunciado) {
      if (respuesta === correcta) {
        return console.log(true)
      } else {
        return console.log(false)
      }
    }
    console.log(responseBody, respuesta, enunciado, correcta)
  },
  async updateName({ commit, state }, newName) {
    console.log(state.userId)
    let data = {
      userId: state.userId,
      newName: newName
    }

    const response = await API.updateName(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async updateLastName({ commit, state }, newLastName) {
    console.log(state.userId)
    let data = {
      userId: state.userId,
      newLastName: newLastName
    }

    const response = await API.updateLastName(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async updateNickName({ commit, state }, newNickName) {
    console.log(state.userId)
    let data = {
      userId: state.userId,
      newNickName: newNickName
    }

    const response = await API.updateNickName(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async updateEmail({ commit, state }, newEmail) {
    console.log(state.userId)
    let data = {
      userId: state.userId,
      newEmail: newEmail
    }

    const response = await API.updateEmail(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async updatePhone({ commit, state }, newPhone) {
    console.log(state.userId)
    let data = {
      userId: state.userId,
      newPhone: newPhone
    }

    const response = await API.updatePhone(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async updateSuscription({ commit, state }, newSuscription) {
    let data = {
      userId: state.userId,
      newSuscription: newSuscription
    }

    const response = await API.updateSuscription(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async savePosition({ commit }, position) {
    commit('savePosition', position)
  },
  async saveMessageAdmin({ commit }) {
    const mensajes = await API.getAllMessageAdmin()
    commit('saveMessage', mensajes)
  },
  async reply({ commit }, reply) {
    const response = await API.reply(reply)
    if (!response.error) {
      const mensajes = await API.getAllMessageAdmin()
      commit('saveMessage', mensajes)
    }
  },
  async updateQuestion({ commit }, pregunta) {
    commit('saveUpdatePregunta', pregunta)
  },
  async updateEnunciado({ commit }, body) {
    const response = await API.updateEnunciado(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  },
  async updateOpcion({ commit }, body) {
    const response = await API.updateOpcion(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  },
  async updateCategoria({ commit }, body) {
    const response = await API.updateCategory(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  },
  async updateDifficulty({ commit }, body) {
    const response = await API.updateDifficulty(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  },
  async updateTema({ commit }, body) {
    const response = await API.updateTema(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  }
}
