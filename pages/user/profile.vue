<template>
  <v-app>{{ usuario }}</v-app>
</template>

<script>
import API from '~/services/api'

export default {
  async asyncData({ store }) {
    const prueba = store.state.objectId
    console.log(prueba)
    const user = await API.getUserById(prueba)
    return { usuario: user }
  }
}
</script>
