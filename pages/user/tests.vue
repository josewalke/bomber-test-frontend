<template>
  <div>
    <TestsList :items="users"></TestsList>
  </div>
</template>

<script>
import data from '~/services/data'
import TestsList from '~/components/TestsList.vue'

export default {
  components: {
    TestsList
  },
  async asyncData() {
    const users = await data.Api_getAllUsers()
    const questions = await data.Api_getAllQuestions()
    return { users, questions }
  }
}
</script>

<style lang="scss" scoped></style>
