<template>
  <v-app>
    {{ usuario }}
  </v-app>
</template>

<script>
import config from '~/.config.js'
// import axios from '~/plugins/axios'

const API_URL = config.API_URL
// import data from '~/services/data'

export default {
  async asyncData({ app, store }) {
    console.log('store.state.token')
    console.log(store.state.token)
    const response = await app.$axios.get(API_URL + 'users/me', {
      headers: { token: store.state.token }
    })

    return { usuario: response.data }
  },
  data() {
    return {
      usuario: {}
    }
  }
  // mounted() {
  //   console.log({ front: this.$store.state.localStorage.objectId })
  //   console.log('token', window.localStorage.getItem('UserMe'))
  // },
  // methods: {
  //   onClick() {
  //     data
  //       .Api_getUserById(
  //         JSON.parse(window.localStorage.getItem('token').objectId)
  //       )
  //       .then(data => (this.usuario = data))
  //   }
  // }
}
</script>
