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
  currentTestQuestion: {},
  question: {},
  position: '',
  updatePregunta: {},
  negativos: '',
  suscripciones: '',
  pregunta_id: '',
  test_id: '',
  provincia: '',
  f_categoria: '',
  f_tema: ''
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
  currentTestQuestion(state) {
    return state.currentTestQuestion
  },
  currentNotAnswered(state) {
    return state.currentNotAnswered
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
  },
  negativos(state) {
    return state.negativos
  },
  suscripciones(state) {
    return state.suscripciones
  },
  suscription_end_active(state) {
    return state.suscription_end_active
  },
  pregunta_id(state) {
    return state.pregunta_id
  },
  test_id(state) {
    return state.test_id
  },
  V_categoria(state) {
    return state.f_categoria
  },
  V_tema(state) {
    return state.f_tema
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
      active,
      negativos,
      suscription_end_active,
      provincia
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
    state.negativos = negativos
    state.suscription_end_active = suscription_end_active
    state.provincia = provincia
  },
  saveTests(state, tests) {
    let testById = []
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].user_id === state.userId) {
        testById.push(tests[i])
      }
    }
    state.tests = testById
  },
  saveMessage(state, mensajes) {
    for (let i = 0; i < mensajes.length; i++) {
      if (mensajes[i].respuesta_leida) {
        if (!mensajes[i].verificada) {
          state.mensajes++
        }
      }
    }
    state.messages = mensajes.reverse()
  },
  saveCurrentTest(state, test) {
    console.log('mostrar SAVECURRENTTEST')
    console.log(test.testCheck)
    state.currentTest = test
  },
  saveCurrentQuestion(state, question) {
    state.currentTestQuestion = question
  },
  saveQuestion(state, question) {
    state.question = question
  },
  saveNotAnswered(state, currentNotAnswered) {
    state.currentNotAnswered = currentNotAnswered
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
    state.nickName = ''
    state.mensajes = ''
    state.MensajesTotales = ''
    state.aprobados = ''
    state.suspendidos = ''
    state.total = ''
    state.suscription_type = ''
    state.active = ''
    state.tests = []
    state.messages = []
    state.currentTest = {}
    state.question = {}
    state.position = ''
    state.updatePregunta = {}
    state.negativos = ''
    state.suscription_end_active = ''
    state.pregunta_id = ''
    state.test_id = ''
    state.provincia = ''
    localStorage.clear()
  },
  clearMessage(state) {
    state.mensajes = 0
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
  prueba() {},
  evaluar(state) {
    for (let i = 0; i < state.tests.length; i++) {
      if (state.tests[i].nota >= 5) {
        state.aprobados++
      } else {
        state.suspendidos++
      }
    }
  },
  deleteDesafio() {
    var f = new Date()
    var diasSemana = new Array(
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    )
    if (diasSemana[f.getDay()] === 'Domingo') {
      API.deleteDesafio()
    }
  },
  saveSuscription(state, suscripciones) {
    state.suscripciones = suscripciones
  },
  suscription_end_active(state) {
    state.active = true
    state.suscription_end_active = new Date().getTime() + 2629750000
  },
  explicacion(state, body) {
    state.test_id = body.test
    state.pregunta_id = body.pregunta
  },
  reload(state) {
    state.currentTest.testCheck = {
      blank: state.currentTest.no_contestadas.length,
      right: 0,
      wrong: 0
    }
  },
  filtro_search(state, data) {
    if (data.f_categoria.length > 0) {
      state.f_categoria = data.f_categoria
    }
    if (data.f_tema.length > 0) {
      state.f_tema = data.f_tema
    }
  }
}

export const actions = {
  async login({ commit, state }, userData) {
    const response = await API.login(userData)
    if (!response.error) {
      commit('saveToken', response)
      const tests = await API.getAllTestById(state.userId)
      commit('saveTests', tests)
      commit('evaluar')
      const mensajes = await API.getAllMessageById(state.userId)
      commit('saveMessage', mensajes)
      const suscripciones = await API.getAllSuscription()
      commit('saveSuscription', suscripciones)
    }
    return response
  },
  async signup({ commit, state }, userData) {
    const response = await API.signup(userData)
    if (!response.error) {
      commit('saveToken', response)
      const tests = await API.getAllTestById(state.userId)
      commit('saveTests', tests)
    }
    return response
  },
  async newMessage({ commit, state }, message) {
    await API.newMessage(state.token, message)
    const mensajes = await API.getAllMessageById(state.userId)
    commit('saveMessage', mensajes)
  },
  async createTest({ commit, state }) {
    // let body = {
    //   _id: state.userId
    // }
    // const newTest = await API.generateTest(body)
    // commit('saveCurrentTest', newTest)
    const newTest = await API.generateTest(state.token)
    commit('saveCurrentTest', newTest)
    const tests = await API.getAllTestById(state.userId)
    commit('saveTests', tests)
  },
  async createTest2({ commit, state }) {
    let body = {
      _id: state.userId
    }
    const newTest = await API.generateTest2(body)
    commit('saveCurrentTest', newTest)
    const tests = await API.getAllTestById(state.userId)
    commit('saveTests', tests)
  },
  async createTestConfig({ commit, state }, testData) {
    const newTest = await API.generateConfigTest(state.token, testData)
    commit('saveCurrentTest', newTest)
    const tests = await API.getAllTestById(state.userId)
    commit('saveTests', tests)
  },
  async updateTest({ commit, state }, testData) {
    let data = testData
    const updatedTest = await API.updateTest(state.token, data)
    if (!updatedTest.error) {
      const tests = await API.getAllTest(state.userId)
      commit('saveTests', tests)
    }
  },
  // async verRespuesta({ state }, responseBody) {
  //   const respuesta =
  //     state.currentTest.no_contestadas[0].answer_wrong[responseBody.number]
  //   const correcta = state.currentTest.no_contestadas[0].answers_correct
  //   const enunciado = state.currentTest.no_contestadas[0].enunciado

  //   if (responseBody.enunciado === enunciado) {
  //     if (respuesta === correcta) {
  //       return console.log(true)
  //     } else {
  //       return console.log(false)
  //     }
  //   }
  // },
  async updateName({ commit, state }, newName) {
    let data = {
      userId: state.userId,
      newName: newName
    }
    console.log(data)
    const response = await API.updateName(data)
    console.log(response)
    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        await commit('saveUpdate', response2)
      }
    }
  },
  async updateLastName({ commit, state }, newLastName) {
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
  async updatePhoto({ commit, state }, newPhoto) {
    let data = {
      userId: state.userId,
      newPhoto: newPhoto
    }

    const response = await API.updatePhoto(data)

    if (!response.error) {
      const response2 = await API.getUserById(state.userId)
      if (!response2.error) {
        commit('saveUpdate', response2)
      }
    }
  },
  async updateNickName({ commit, state }, newNickName) {
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
  async updateQuestionPhoto({ commit }, body) {
    const response = await API.updateQuestionPhoto(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  },
  async updateOpcion({ commit }, body) {
    console.log('lolo2')
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
  },
  async updateVerificada({ commit, state }, id) {
    const response = await API.updateVerificada(id)
    if (!response.error) {
      commit('clearMessage')
      const mensajes = await API.getAllMessageById(state.userId)
      commit('saveMessage', mensajes)
    }
  },
  async updateExplicacion({ commit }, body) {
    const response = await API.updateExplicacion(body)
    if (!response.error) {
      const pregunta = await API.getQuestionById(body.id)
      if (!pregunta.error) {
        commit('saveUpdatePregunta', pregunta)
      }
    }
  },
  async cambiarTemas({ commit }, tema) {
    const pregunta = await API.getAllQuestions()
    commit('prueba')

    if (!pregunta.error) {
      const temario = await API.getAllTemas()
      if (!temario.error) {
        for (let i = 0; i < pregunta.length; i++) {
          for (let x = 0; x < temario.length; x++) {
            if (pregunta[i].tema_id === tema._id) {
              if (
                temario[x].category === pregunta[i].category &&
                temario[x].name === 'Sin Tema'
              ) {
                pregunta[i].tema_id = temario[x]._id
                const newQuestion = await API.updateQuestionById(pregunta[i])
                if (!newQuestion.error) {
                  console.log('actualizado')
                }
              }
            }
          }
        }
        const deleteT = await API.deleteTema(tema._id)
        if (!deleteT.error) {
          location.reload()
        }
      }
    } else {
      const deleteT = await API.deleteTema(tema._id)
      if (!deleteT.error) {
        location.reload()
      }
    }
  },
  async putSuscription({ commit }, body) {
    const response = await API.putSuscription(body)
    if (!response.error) {
      const suscripciones = await API.getAllSuscription()
      commit('saveSuscription', suscripciones)
    }
  },
  async suscription_end_active({ commit }, body) {
    commit('suscription_end_active')
    API.suscription_end_active(body)
  },
  async explicacion({ commit }, body) {
    let pregunta = await API.getQuestionById(body.pregunta)
    if (!pregunta.error) {
      body.pregunta = pregunta
      commit('explicacion', body)
    }
  },
  async getByTestId({ commit }, id) {
    let test = await API.getByTestId(id)
    if (!test.error) {
      commit('saveCurrentTest', test)
      return true
    }
  },
  async updateDeberes({ commit, state }, id) {
    await API.updateDeberes(id)
    let test = await API.getByTestId(id)
    commit('saveCurrentTest', test)
    let tests = await API.getAllTestById(state.userId)
    commit('saveTests', tests)
  },
  async evaluarNota({ commit }, datos) {
    commit('prueba')
    let response = await API.updateNota(datos)

    if (response) {
      const tests = await API.getAllTestById(datos.user_id)
      commit('saveTests', tests)
    }
  },
  async reload({ commit }, data) {
    commit('reload')
    API.reload(data)
  },
  async filtro_search({ commit }, data) {
    commit('filtro_search', data)
  },
  async getAllTemas({ commit }) {
    commit('prueba')
    let temas = await API.AllTemas()
    console.log(temas)
  },
  async prueba() {
    console.log('FUCK')
    // const currentTest = await API.getByTestId(.testId)
  }
}
