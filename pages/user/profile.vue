<template>
  <v-app>
    {{ usuario }}
  </v-app>
</template>

<script>
import data from '~/services/data'

export default {
  async asyncData({ store }) {
    const prueba = store.state.objectId
    console.log(prueba)
    const user = await data.Api_getUserById(prueba)
    return { usuario: user }
  }
}
</script>
