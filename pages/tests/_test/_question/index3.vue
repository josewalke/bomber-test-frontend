<template>
  <div class="main-div">
    <div class="question-title">
      <h1>Titulo: {{ currentTest.title }}</h1>
      <h1>Pregunta / {{ currentTest.no_contestadas.length }}</h1>
      <v-btn color="#da3e3e" to="/tests">
        <v-icon class="white--text">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <template>
          <v-carousel hide-delimiters height="100vh">
            <v-carousel-item
              v-for="(question, i) in currentTest.no_contestadas"
              :key="i"
            >
              <h1>Aquí esta el {{ i + 1 }}</h1>
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
import { mapGetters } from 'vuex'

export default {
  layout: 'test',
  components: {
    Question2
  },
  async fetch({ params, store }) {
    console.log(params)
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
  },
  computed: {
    ...mapGetters(['currentTest', 'question'])
  },
  methods: {
    async selectAnswer(number) {
      console.log(number)
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
