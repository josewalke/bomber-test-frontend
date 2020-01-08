import API from '~/services/api'

export const state = () => ({
  token: '',
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
  tests: [],
  currentTest: {}
})

export const getters = {
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
  image_url(state) {
    return state.img_url
  },
  email(state) {
    return state.email
  },
  phone(state) {
    return state.phone
  },
  currentTest(state) {
    return state.currentTest
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
  }
}

export const mutations = {
  saveToken(
    state,
    {
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
      suscription_type
    }
  ) {
    state.token = token
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
  },
  saveTests(state, tests) {
    state.tests = tests
  },
  saveCurrentTest(state, test) {
    state.currentTest = test
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
  }
}

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
    const newTest = await API.generateTest(state.token)
    commit('saveCurrentTest', newTest)
    const tests = await API.getAllTest(state.userId)
    commit('saveTests', tests)
  },
  // async loadTest({ commit, state }) {
  //   const tests = await API.getAllTest(state.userId)
  //   commit('saveTests', tests)
  //   ESTO ESTA MEJOR
  // }
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
    // console.log(responseBody, respuesta, enunciado, correcta)
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
    console.log(state.userId)
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
  }
}
