import axios from 'axios'

export default axios.create({
  baseURL: 'https://reboot-nuxt-template.herokuapp.com/api/'
})
