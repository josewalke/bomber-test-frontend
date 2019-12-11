import axios from '~/plugins/axios'

export default {
  getAllUsers() {
    return axios.get('users').then(response => response.data)
  },
  getUserById(prueba) {
    return axios.get('users/' + prueba).then(response => response.data)
  }
}
