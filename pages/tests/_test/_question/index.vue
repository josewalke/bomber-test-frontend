<template>
  <div class="main-div">
    <!-- {{ cronometro() }} -->
    <!-- <div class="buttons-box-left">
      <div>
        <v-btn class="text--white" color="#DA3E3E" @click="previousQuestion">
          <v-icon color="white">mdi-arrow-left-circle</v-icon>
        </v-btn>
      </div>
    </div> -->
    <!-- <div class="buttons-box-right">
      <div>
        <v-btn color="#DA3E3E" @click="nextQuestion">
          <v-icon color="white">mdi-arrow-right-circle</v-icon>
        </v-btn>
      </div>
    </div> -->
    <div class="question-title d-flex justify-space-between">
      <v-spacer></v-spacer>
      <div class="headline">
        <div class="d-inline-flex">
          Pregunta {{ questionNumber }}/
          {{ currentTest.no_contestadas.length }}
        </div>
        <v-btn class="ma-2" outlined small color="#DA3E3E" @click="goToTest">
          CERRAR
        </v-btn>
        <v-btn
          class="ma-2"
          outlined
          small
          color="#DA3E3E"
          @click="nextQuestion"
        >
          <v-icon color="red">mdi-arrow-right-circle</v-icon>
        </v-btn>

        <v-btn
          v-if="currentTest.time_end === null"
          class="ma-2"
          outlined
          small
          color="#DA3E3E"
          @click="endTest"
        >
          Finalizar
        </v-btn>
        <h3>{{ minutos }}:{{ segundos }}</h3>
      </div>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col>
        <Question2
          :id="id"
          ref="q"
          :show-question="showQuestion"
          :temas="temas"
          :numero="numero"
          :paint="paint"
          @answering="answering"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="blankAlert" max-width="500" class="pa-8 white">
      <BlankAlert @blank="manageBlankAlert"></BlankAlert>
    </v-dialog>
  </div>
</template>

<script>
import API from '~/services/api'
import Question2 from '~/components/Question2'
import BlankAlert from '~/components/BlankAlert'
import { mapGetters } from 'vuex'

export default {
  layout: 'test',

  components: {
    Question2,
    BlankAlert
  },
  async fetch({ params, store }) {
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
      segundos: 59,
      minutos: 0,
      notAnswered: [],
      showQuestion: [],
      paint: false,
      paint2: false,
      id: '',
      enunciado: '',
      answers: [],
      tema: '',
      imagenUrl: '',
      numero: '',
      title: '',
      blankAlert: false,
      notAgainAlert: false,
      response: false,
      cronos: ''
    }
  },

  computed: {
    ...mapGetters(['currentTest', 'question', 'currentTestQuestion']),
    questionNumber() {
      const qs = this.currentTest.no_contestadas
      const idx = qs.findIndex(q => q._id === this.showQuestion[0]._id)
      return idx + 1
    }
  },

  beforeMount() {
    if (this.currentTest.time_end === null) {
      this.findNotAnswered()
      this.showThisQuestion()
    } else {
      this.currentTest.no_contestadas.forEach(q => this.notAnswered.push(q))
      this.showThisQuestion()
    }
  },
  mounted() {
    this.cronometro()
  },
  methods: {
    findNotAnswered() {
      let notAnswered = []
      this.currentTest.respuestas.forEach(res => {
        if (res.answered === false) {
          let idx = this.currentTest.no_contestadas.findIndex(
            q => q._id === res.id
          )
          let q = this.currentTest.no_contestadas[idx]
          notAnswered.push(q)
        }
      })
      this.notAnswered = notAnswered
    },
    showThisQuestion() {
      this.showQuestion = []
      if (this.currentTest.time_end2 !== null) {
        this.numero = this.notAnswered.findIndex(
          q => q._id === this.$route.params.question
        )
        this.showQuestion.push(this.notAnswered[this.numero])
        this.id = this.showQuestion[0]._id
        this.paint = true
      } else {
        this.showQuestion.push(this.notAnswered[0])
        this.id = this.showQuestion[0]._id
        this.numero = this.currentTest.no_contestadas.findIndex(
          q => q._id === this.id
        )
      }
      // this.$router.push(`/tests/${this.currentTest._id}/${this.id}`)
    },
    goToTest() {
      if (this.currentTest.time_end2 === null) {
        this.$router.push(`/tests`)
        clearInterval(this.cronos)
      } else {
        this.$router.push(`/tests/${this.$route.params.test}/resumen`)
      }
    },
    previousQuestion() {
      let previous = this.questionNumber - 1
      previous > 0
        ? this.$router.push(`/tests/${this.currentTest._id}/${previous}`)
        : this.$router.push(`/tests/${this.currentTest._id}/`)
    },
    nextQuestion() {
      if (this.notAgainAlert === false) {
        this.blankAlert = true
      } else {
        this.answering()
      }
    },
    endTest() {
      let timeNow = new Date()
      const data = {
        time_end: timeNow,
        testId: this.currentTest._id
      }

      this.$store.dispatch('updateTest', data)
      this.$store.commit('saveCurrentTest', this.currentTest)
      this.$router.push(`/tests/${this.currentTest._id}/resumen`)
    },
    answering() {
      if (this.currentTest.time_end2 === null) {
        this.notAnswered = this.notAnswered.splice(1, this.notAnswered.length)
        if (this.notAnswered.length === 0) {
          this.endTest()
          this.$router.push(`/tests/${this.currentTest._id}/resumen`)
        } else {
          this.$refs.q.cleanAnswers()
          this.showThisQuestion()
        }
      }
    },
    manageBlankAlert(status, again) {
      console.log(again === true)
      console.log(status)
      console.log('again')
      console.log(again)
      if (again === true) {
        this.notAgainAlert = true
      }
      if (status === true) {
        this.answering()
        this.blankAlert = false
      } else {
        this.blankAlert = false
      }
    },
    cronometro() {
      this.minutos = this.currentTest.no_contestadas.length - 1
      this.cronos = setInterval(() => {
        if (this.minutos > 0) {
          this.segundos--
          // console.log('restando')
          if (this.segundos === 0 && this.minutos > 0) {
            this.segundos = 59
            this.minutos--
          }
        }
        if (this.minutos === 0 && this.segundos > 0) {
          this.segundos--
          if (this.minutos === 0 && this.segundos === 0) {
            // console.log('funcionoo ')
            this.endTest()
            clearInterval(this.cronos)
          }
        }
        console.log('minutos: ' + this.minutos)
        console.log('segundos: ' + this.segundos)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.buttons-box-left {
  position: fixed;
  margin-top: 50vh;
  left: 5%;
  z-index: 1;
}
.buttons-box-right {
  position: fixed;
  margin-top: 50vh;
  right: 5%;
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
