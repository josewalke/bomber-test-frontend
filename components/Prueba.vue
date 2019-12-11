<template>
  <div>
    <h1>hola</h1>
    <pre>{{ jose }}</pre>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'Prueba',
  async asyncData() {
    const users = await axios.get('/users')
    return { jose: users }
  }
}
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  border: solid 2px black;
  margin: auto;
}
</style>
