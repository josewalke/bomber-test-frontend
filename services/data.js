import config from '../.config.js'
import axios from '~/plugins/axios'

const API_URL = config.API_URL

export default {
  Api_getAllUsers() {
    return axios.get(API_URL + 'users').then(response => response.data)
  },
  Api_getUserById(prueba) {
    return axios
      .get(API_URL + 'users/' + prueba)
      .then(response => response.data)
  }
}
