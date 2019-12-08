<template>
  <div>
    <h1>{{ users[1].name }}</h1>
  </div>
</template>

<script>
import data from '../services/data'
export default {
  data() {
    return {
      users: ['hola']
    }
  },
  methods: {
    alert() {},
    getAllUsers() {
      console.log('hola')
      data.Api_getAllUsers().then(users => {
        users.forEach(user => this.users.push(user))
      })
      console.log(this.users[0])
    }
  },
  mounted() {
    this.getAllUsers()
  }
}
</script>
<style lang="scss" scoped></style>
