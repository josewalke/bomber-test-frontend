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
    console.log('my users')
    const users = await axios.get('/users')
    console.log(users)
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
