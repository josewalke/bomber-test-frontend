<template>
  <div>
    <div>
      <div class="header-wraper">
        <h1>Mis Tests</h1>
        <v-btn
          class="ma-2"
          outlined
          fab
          small
          color="#DA3E3E"
          @click="testGeneration"
        >
          <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
      </div>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="tests"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import API from '~/services/api'

export default {
  async asyncData({ store }) {
    const userId = store.getters.userId
    // const tests = await API.getAllUsers()
    const tests = await API.getAllTest(userId).then(response => response)
    const questions = await API.getAllQuestions()
    return { questions, tests }
  },
  data() {
    return {
      headers: [
        {
          text: 'Titulo',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Aciertos', value: 'aciertos_num' },
        { text: 'Fallos', value: 'fallos_num' },
        { text: 'Nota', value: 'nota' }
      ]
    }
  },
  methods: {
    async testGeneration() {
      const token = this.$store.getters.token
      await API.generateTest(token)
      this.$router.push('exam')
    }
  }
}
</script>

<style lang="scss" scoped></style>
