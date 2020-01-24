<template>
  <StudentsList :student="users"></StudentsList>
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
    return { users }
  }
}
</script>
<style lang="scss" scoped></style>
