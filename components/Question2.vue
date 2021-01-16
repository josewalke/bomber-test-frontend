<template>
  <v-container>
    {{ resolucion() }}
    <div class="question-holder">
      <v-row>
        <v-col>
          <div v-show="showQuestion[0].imagen_url.length > 0">
            <div
              class="photo-holder mb-3"
              :style="{
                'background-image': `url(${showQuestion[0].imagen_url})`
              }"
            ></div>
          </div>
          <div class="overline red--text font-weight-black">
            {{ findTemaName }}
          </div>
          <!-- <div class="overline red--text font-weight-black">
            {{ numero }}
          </div> -->
          <div class="headline grey--text text--darken-1">
            <p>{{ showQuestion[0].enunciado }}</p>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="formato === 'ordenador'">
        <v-col
          v-for="(answer, idx) in showQuestion[0].answers"
          :key="idx"
          cols="6"
        >
          <v-card
            v-show="answer.respuesta"
            :id="`${id}-` + idx"
            outlined
            min-height="200"
            @click="selectAnswer(answer, idx)"
          >
            <div class="title">{{ posicion[idx] }}{{ answer.respuesta }}</div>
          </v-card>
          <h4 v-show="answer.respuesta" class="water-mark">
            © Jaime Heras
          </h4>
        </v-col>
        <v-col>
          <div id="under-buttons">
            <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="message = true"
            >
              DUDA / IMPUGNAR
            </v-btn>
            <!-- <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="message = true"
            >
              CORREGIR
            </v-btn> -->
          </div>
        </v-col>
      </v-row>
      <v-row v-if="formato === 'movil'">
        <v-col
          v-for="(answer, idx) in showQuestion[0].answers"
          :key="idx"
          cols="12"
        >
          <v-card
            v-show="answer.respuesta"
            :id="`${id}-` + idx"
            outlined
            @click="selectAnswer(answer, idx)"
          >
            <div class="title2">
              {{ posicion[idx] }}
              {{ answer.respuesta }}
            </div>
          </v-card>
          <h4 v-show="answer.respuesta" class="water-mark">
            © Jaime Heras
          </h4>
        </v-col>
        <v-col>
          <div id="under-buttons">
            <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="message = true"
            >
              DUDA / IMPUGNAR
            </v-btn>
            <!-- <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="message = true"
            >
              CORREGIR
            </v-btn> -->
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="message" max-width="500" class="pa-8 white">
        <Message
          :question-number="questionNumber"
          @status="messageOff"
        ></Message>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from '~/components/Message'

export default {
  components: {
    Message
  },
  props: {
    showQuestion: {
      type: Array,
      default: () => {
        return []
      }
    },
    numero: {
      type: Number,
      default: 0
    },
    paint: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: () => {
        return 0
      }
    },
    temas: {
      type: Array,
      default: () => {
        return []
      }
    },

    notAnswered: {
      type: Array,
      default: () => {
        return []
      }
    },
    questionNumber: {
      type: Number,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      respuesta: [],
      response: false,
      guess: 'blank',
      counter: 0,
      message: false,
      formato: '',
      posicion: ['a)', 'b)', 'c)', 'd)']
    }
  },
  computed: {
    ...mapGetters(['currentTest', 'currentTestQuestion']),
    findTemaName() {
      var temaName = this.temas.filter(
        elem => elem.id == this.showQuestion[0].tema_id
      )
      return temaName[0].name
    }
  },

  methods: {
    responder() {
      this.$emit('answering')
    },
    selectAnswer(answer, idx) {
      //initialize respuesta array
      if (this.respuesta.length === 0) {
        for (let i = 0; i < this.showQuestion[0].answers.length; i++) {
          this.respuesta.push('')
        }
      }
      if (
        document
          .getElementById(`${this.id}-` + idx)
          .classList.contains('selected-answer')
      ) {
        document
          .getElementById(`${this.id}-` + idx)
          .classList.remove('selected-answer')
        this.respuesta[idx] = ''
        this.counter--
      } else {
        document
          .getElementById(`${this.id}-` + idx)
          .classList.add('selected-answer')
        this.respuesta[idx] = this.showQuestion[0].answers[idx]
        this.counter++
      }
      //reset respuesta empty object
      if (this.counter === 0) {
        this.respuesta = []
        this.guess = false
      }
      this.correction()
      if (this.currentTest.mostrar_solucion === false) {
        this.$emit('answering')
        this.cleanAnswers()
      }
    },
    cleanAnswers() {
      for (let i = 0; i < 4; i++) {
        let clase = document.getElementById(`${this.id}-${i}`)
        if (clase) {
          clase.classList.remove(
            'selected-answer',
            'selected-circle',
            'selected-red',
            'selected-green',
            'no-click'
          )
        }
      }
    },

    paintCorrection() {
      for (let i = 0; i < this.showQuestion[0].answers.length; i++) {
        document.getElementById(`${this.id}-` + i).classList.add('no-click')

        if (
          this.respuesta[i].respuesta ===
            this.showQuestion[0].answers[i].respuesta &&
          this.showQuestion[0].answers[i].correcta === true
        ) {
          document
            .getElementById(`${this.id}-` + i)
            .classList.remove('selected-answer')
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-green')
        }
        if (
          this.respuesta[i].respuesta ===
            this.showQuestion[0].answers[i].respuesta &&
          this.showQuestion[0].answers[i].correcta === false
        ) {
          document
            .getElementById(`${this.id}-` + i)
            .classList.remove('selected-answer')
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-red')
        }
        if (
          this.respuesta[i] === '' &&
          this.showQuestion[0].answers[i].correcta === true
        ) {
          document
            .getElementById(`${this.id}-` + i)
            .classList.remove('selected-answer')
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-green')
        }
      }
    },

    correction() {
      // if (this.respuesta.length > 0) {
      let check = { true: 0, false: 0 }
      let correctAnswers = 0

      this.respuesta.forEach(element => {
        if (element.correcta === true) {
          check.true++
        }
        if (element.correcta === false) {
          check.false++
        }
      })
      this.showQuestion[0].answers.forEach(element =>
        element.correcta === true ? correctAnswers++ : null
      )

      if (check.true === correctAnswers && check.false === 0) {
        this.guess = true
      } else {
        this.guess = false
      }

      let obj = {
        id: this.id,
        answered: true,
        respuestas: this.respuesta,
        guess: this.guess
      }
      if (this.currentTest.respuestas[this.numero].answered === false) {
        let respuesta = obj
        // console.log(respuesta)
        this.testUpdate(respuesta)
        if (this.currentTest.mostrar_solucion === true) {
          this.paintCorrection()
        }

        this.respuesta = []
        this.counter = 0
      }
      // }
    },

    testUpdate(answer) {
      const data = {
        testId: this.currentTest._id,
        numero: this.numero,
        respuesta: answer
      }
      this.$store.dispatch('updateTest', data)
      this.$store.commit('saveCurrentTest', this.currentTest)
    },
    messageOff() {
      this.message = false
    },
    resolucion() {
      if (window.screen.width < 600) {
        this.formato = 'movil'
      } else {
        this.formato = 'ordenador'
      }
    }
  }
}
</script>

<style scoped>
.photo-holder {
  height: 400px;
  width: 650px;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
}
.buttons-box {
  z-index: 1;
  position: absolute;
}
.water-mark {
  color: rgb(158, 158, 158);
}
.question-holder {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
}
.no-click {
  pointer-events: none;
}
.selected-answer {
  background-color: white;
  color: #2f89f0;
  border-style: solid;
  border-color: #2f89f0;
}
.selected-red {
  background-color: red;
  color: white;
}
.selected-green {
  background-color: green;
  color: white;
}
.selected-circle {
  background-color: white;
  color: orange;
  border-style: solid;
  border-color: orange;
}
h4,
h5,
h6 {
  color: red;
}

.v-card {
  padding: 10px;
  border: solid 1px rgb(136, 136, 136) !important;
}
.v-card:hover {
  transform: scale(1.01, 1.01);
  transform-origin: left;
  border: solid 1px red !important;
}
h1 {
  color: black;
}
h2 {
  color: rgb(68, 68, 68);
}
h3 {
  font-size: 1.5rem;
  font-weight: 300;
}
.title2 {
  font-size: 1rem;
}
p {
  font-size: 1.25rem;
}
</style>
