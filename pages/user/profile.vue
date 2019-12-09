<template>
  <v-app> Hola {{ users }} </v-app>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData() {
    const response = await axios.get('/users')
    return { users: response.data }
  }
}
</script>
