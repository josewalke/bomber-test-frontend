<template>
  <div class="main-div">
    <div class="buttons-box d-flex justify-space-between">
      <div>
        <v-btn @click="previousQuestion">
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn @click="nextQuestion">
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="question-title d-flex justify-space-between">
      <div class="headline">{{ title }}</div>
      <div class="headline">
        <div class="d-inline-flex">
          Pregunta {{ questionNumber }}/
          {{ currentTest.no_contestadas.length }}
        </div>
        <v-btn color="#da3e3e" @click="goToTest">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col>
        <Question2
          :id="id"
          :enunciado="enunciado"
          :answers="answers"
          :tema="tema"
          :numero="numero - 1"
          :temas="temas"
          :imagen-url="imagenUrl"
        />
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
    console.log('palomero')
    console.log(params)
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
    const question = await API.getQuestionById(params.question)
    store.commit('saveCurrentQuestion', question)
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
  },
  data() {
    return {
      id: '',
      enunciado: '',
      answers: [],
      tema: '',
      imagenUrl: '',
      numero: '',
      title: '',
      casa: 'hola'
    }
  },

  computed: {
    ...mapGetters(['currentTest', 'question', 'currentTestQuestion']),
    questionNumber() {
      const qs = this.currentTest.no_contestadas
      const idx = qs.findIndex(q => q._id === this.id)
      return idx + 1
    },
    notAnswered() {
      let notAnswered = []
      this.currentTest.respuestas.forEach(res =>
        !res.answered ? notAnswered.push(res) : null
      )
      return notAnswered
    }
  },

  beforeMount() {
    this.id = this.currentTestQuestion._id
    this.enunciado = this.currentTestQuestion.enunciado
    this.answers = this.currentTestQuestion.answers
    this.tema = this.currentTestQuestion.tema_id
    this.imagenUrl = this.currentTestQuestion.imagen_url
    this.numero = this.questionNumber
    this.title = this.currentTest.title
  },

  methods: {
    goToTest() {
      this.$router.push(`/tests/${this.$route.params.test}`)
    },
    previousQuestion() {
      let previous = this.questionNumber - 1
      previous > 0
        ? this.$router.push(`/tests/${this.currentTest._id}/${previous}`)
        : this.$router.push(`/tests/${this.currentTest._id}/`)
    },
    nextQuestion() {
      let next = this.questionNumber + 1
      next <= this.currentTest.no_contestadas.length
        ? this.$router.push(`/tests/${this.currentTest._id}/${next}`)
        : this.$router.push(`/tests/${this.currentTest._id}`)
    }
  }
}
</script>

<style scoped>
.buttons-box {
  position: absolute;
  margin-top: 50vh;
  z-index: 1;
}
.main-div {
  margin: 0 auto;
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
