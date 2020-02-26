<template>
  <v-container>
    <StudentsList :student="users" :movil="movil"></StudentsList>
  </v-container>
</template>

<script>
import API from '~/services/api'
import StudentsList from '~/components/StudentsList.vue'
export default {
  components: {
    StudentsList
  },
  async asyncData() {
    const users = await API.getAllUsers()
    let movil = false
    if (window.screen.width < 600) {
      movil = true
    }
    return { users, movil }
  }
}
</script>
<style lang="scss" scoped></style>
