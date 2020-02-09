<template>
  <div class="main-div">
    <div class="question-title">
      <h1>{{ $store.state.currentTest.title }}</h1>
      <h1>{{ $store.state.question }}</h1>
      <h2>{{ $store.state.currentTest.no_contestadas.length }}</h2>
      <v-btn color="#da3e3e" to="/tests">
        <v-icon class="white--text">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <template>
          <v-carousel hide-delimiters height="100vh">
            <v-carousel-item
              v-for="(question, i) in $store.state.currentTest.no_contestadas"
              :key="i"
            >
              <v-sheet color="white" height="100%" tile>
                <v-row align="center" justify="center">
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
  </div>
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
.main-div {
  background-color: white;
}
.question-title {
  margin-top: 5%;
  margin-left: 6%;
}
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
