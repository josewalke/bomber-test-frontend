<template>
  <v-row>
    <v-col>
      <template>
        <v-carousel hide-delimiters height="100vh">
          <v-carousel-item
            v-for="(question, i) in $store.state.currentTest.no_contestadas"
            :key="i"
          >
            <v-sheet color="white" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <Question
                  :enunciado="question.enunciado"
                  :answers="question.answer_wrong"
                  :correct="question.answers_correct"
                  @selectAnswer="selectAnswer"
                />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import API from '~/services/api'
import Question from '~/components/Question'

export default {
  layout: 'basic',
  components: {
    Question
  },
  async fetch({ params, store }) {
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
  },
  methods: {
    async selectAnswer(number) {
      console.log(number)
      // await this.$store.dispatch('verRespuesta', responseBody)
    }
  }
}
</script>

<style scoped>
.enunciado {
  margin: 150px auto;
}
.btn-size {
  height: 100%;
}
.question {
  padding: 10px;
}
</style>
