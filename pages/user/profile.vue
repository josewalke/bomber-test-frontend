<template>
  <v-app>
    <div>
      <h1>Perfil</h1>
      <hr />
    </div>
    <div>
      <h3>
        Nombre:
      </h3>
      <span>
        {{ usuario.name }}
      </span>
      <h3>
        Apellido:
      </h3>
      <span>
        {{ usuario.lastName }}
      </span>
      <h3>
        Email:
      </h3>
      <span>
        {{ usuario.email }}
      </span>
      <h3>
        Numero de Telefono:
      </h3>
      <span>
        {{ usuario.phone }}
      </span>
    </div>
  </v-app>
</template>

<script>
// import config from '~/.config.js'
// import axios from '~/plugins/axios'

// const API_URL = config.API_URL
import data from '~/services/data'

export default {
  // async asyncData({ app, store }) {
  //   console.log('store.state.token')
  //   console.log(store.state.token)
  //   const response = await app.$axios.get(API_URL + 'users/me', {
  //     headers: { token: store.state.token }
  //   })

  //   return { usuario: response.data }
  // },
  data() {
    return {
      usuario: {}
    }
  },
  mounted() {
    // console.log({ front: this.$store.state.localStorage.objectId })
    console.log('token', window.localStorage.getItem('vuex'))
    data
      .Api_getUserById(JSON.parse(window.localStorage.getItem('vuex')).token)
      .then(data => (this.usuario = data))
  },
  methods: {
    onClick() {
      data
        .Api_getUserById(JSON.parse(window.localStorage.getItem('vuex')))
        .then(data => (this.usuario = data))
    }
  }
}
</script>

<style scoped>
div {
  margin-left: 20px;
  margin-top: 20px;
}
hr {
  border: solid 4px;
  border-radius: 3px;
  color: #da3e3e;
  width: 100px;
}
</style>
