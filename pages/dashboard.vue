<template>
  <StudentsList :items="users"></StudentsList>
</template>

<script>
import data from '~/services/data'
import StudentsList from '~/components/StudentsList.vue'
export default {
  components: {
    StudentsList
  },
  async asyncData() {
    const users = await data.Api_getAllUsers()
    console.log(users[0])
    return { users }
  },
  layout: 'admin'
}
</script>
<style lang="scss" scoped></style>
