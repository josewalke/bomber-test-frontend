<template>
  <div>
    <TestsList :items="users"></TestsList>
  </div>
</template>

<script>
import API from '~/services/api'
import TestsList from '~/components/TestsList.vue'

export default {
  components: {
    TestsList
  },
  async asyncData() {
    const users = await API.getAllUsers()
    const questions = await API.getAllQuestions()
    return { users, questions }
  }
}
</script>

<style lang="scss" scoped></style>
