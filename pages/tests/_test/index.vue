<template>
  <v-row>
    <v-col>
      <h1>{{ $store.state.currentTest.title }}</h1>
      <template>
        <v-carousel hide-delimiters height="200vh">
          <v-carousel-item
            v-for="(question, i) in $store.state.currentTest.no_contestadas"
            :key="i"
          >
            <v-sheet color="white" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <Question2
                  :id="question._id"
                  :enunciado="question.enunciado"
                  :answers="question.answers"
                  :tema="question.tema_id"
                  :numero="i"
                  :temas="temas"
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
import Question2 from '~/components/Question2'

export default {
  layout: 'test',
  components: {
    Question2
  },
  async fetch({ params, store }) {
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
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
