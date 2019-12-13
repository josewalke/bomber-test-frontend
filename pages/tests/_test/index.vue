<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Bienvenido al test</h1>
        <template>
          <v-carousel>
            <v-carousel-item
              v-for="(question, i) in $store.state.currentTest.no_contestadas"
              :key="i"
            >
              <v-sheet height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <Question
                    :enunciado="question.enunciado"
                    :answers="question.answer_wrong"
                  />>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-col>
    </v-row>
  </v-container>
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
    selectAnswer(number) {
      console.log(number)
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
