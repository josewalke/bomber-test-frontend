import config from '../.config.js'
import axios from '~/plugins/axios'

const API_URL = config.API_URL

export default {
  Api_getAllUsers() {
    return axios
      .get(API_URL + 'users')
      .then(response => response.data)
      .then(users => console.log(users[0]))
  }
}

// export default {
//   Api_getAllUsers() {
//     console.log('me cago en la puta')
//   }
// }
