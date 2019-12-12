<template>
  <div>
    <TestsList :items="tests"></TestsList>
  </div>
</template>

<script>
import API from '~/services/api'
import TestsList from '~/components/TestsList.vue'

export default {
  components: {
    TestsList
  },
  async asyncData({ store }) {
    const userId = store.getters.userId
    // const tests = await API.getAllUsers()
    const tests = await API.getAllTest(userId).then(response => response)
    const questions = await API.getAllQuestions()
    return { questions, tests }
  }
}
</script>

<style lang="scss" scoped></style>
