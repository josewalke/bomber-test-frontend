<template>
  <v-container>
    <div class="question-holder">
      <v-row>
        <v-col>
          <div v-if="imagenUrl.length > 0">
            <div
              class="photo-holder"
              :style="{ 'background-image': `url(${imagenUrl})` }"
            ></div>
          </div>
          <div class="overline red--text font-weight-black mt-3">
            {{ findTemaName }}
          </div>
          <div class="display-1">{{ enunciado }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(answer, idx) in answers" :key="idx" cols="6">
          <v-card
            :id="`${id}-` + idx"
            min-height="200"
            @click="selectAnswer(answer, idx)"
          >
            <div class="title">{{ answer.respuesta }}</div>
          </v-card>
          <h4 class="water-mark">© Jaime Heras</h4>
        </v-col>
        <v-col>
          <div id="under-buttons">
            <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="dialog = true"
            >
              DUDA / IMPUGNAR
              <!-- <v-icon>mdi-help</v-icon> -->
            </v-btn>
            <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="dialog = true"
            >
              CORREGIR
              <!-- <v-icon>mdi-check-bold</v-icon> fab -->
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500" class="pa-8 white">
        <Message @status="changeStatus"></Message>
      </v-dialog>
    </div>
    <h2>
      <!-- <h2>respuesta: {{ respuesta }}</h2> -->
    </h2>
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
    enunciado: {
      type: String,
      default: ''
    },
    answers: {
      type: Array,
      default: () => {
        return []
      }
    },
    numero: {
      type: Number,
      default: () => {
        return 0
      }
    },
    correct: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: () => {
        return 0
      }
    },
    tema: {
      type: String,
      default: () => {
        return []
      }
    },
    temas: {
      type: Array,
      default: () => {
        return []
      }
    },
    imagenUrl: {
      type: String,
      default: ''
    },
    notAnswered: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      respuesta: [],
      respuestas: [],
      corrected: false,
      guess: 'blank',
      counter: 0,
      answered: [],
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['currentTest', 'currentTestQuestion']),
    findTemaName() {
      var temaName = this.temas.filter(elem => elem.id == this.tema)
      return temaName[0].name
    }
  },

  mounted() {
    let response = this.currentTest.respuestas[this.numero]
    if (response.answered === true) {
      this.respuesta = response.respuestas
      this.showCorrection = this.currentTest.mostrar_solucion
      for (let i = 0; i < response.respuestas.length; i++) {
        if (response.respuestas[i] !== '') {
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-answer')
        }
      }
      this.correction()
      if (this.showCorrection === true) {
        this.paintCorrection()
      }
    }
    if (response.answered === false && this.currentTest.time_end !== null) {
      console.log('pendiente')
      console.log(this.answers.length)
      for (let i = 0; i < this.answers.length; i++) {
        console.log(this.answers[i])
        document.getElementById(`${this.id}-` + i).classList.add('no-click')
        if (this.answers[i].correcta === true)
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-circle')
      }
    }
  },

  methods: {
    selectAnswer(answer, idx) {
      //initialize respuesta array
      if (this.respuesta.length === 0) {
        for (let i = 0; i < this.answers.length; i++) {
          this.respuesta.push('')
        }
      }
      //respuesta selection
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
        this.respuesta[idx] = this.answers[idx]
        this.counter++
      }
      //reset respuesta empty object
      if (this.counter === 0) {
        this.respuesta = []
        this.guess = 'blank'
      }
      this.correction()
    },

    paintCorrection() {
      for (let i = 0; i < this.answers.length; i++) {
        document.getElementById(`${this.id}-` + i).classList.add('no-click')

        if (
          this.respuesta[i].respuesta === this.answers[i].respuesta &&
          this.answers[i].correcta === true
        ) {
          document
            .getElementById(`${this.id}-` + i)
            .classList.remove('selected-answer')
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-green')
        }
        if (
          this.respuesta[i].respuesta === this.answers[i].respuesta &&
          this.answers[i].correcta === false
        ) {
          document
            .getElementById(`${this.id}-` + i)
            .classList.remove('selected-answer')
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-red')
        }
        if (this.respuesta[i] === '' && this.answers[i].correcta === true) {
          document
            .getElementById(`${this.id}-` + i)
            .classList.remove('selected-answer')
          document
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-circle')
        }
      }
    },

    correction() {
      if (this.respuesta.length > 0) {
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
        this.answers.forEach(element =>
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

          this.testUpdate(respuesta)
          if (this.currentTest.mostrar_solucion === true) {
            this.paintCorrection()
          }

          this.autoNext()
          // this.$router.push(`/tests/${this.currentTest._id}/`)
          // this.$router.push(`/tests/${this.currentTest._id}/`)
        }
      }
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

    autoNext() {
      let counter = 0
      if (this.notAnswered.length === 0) {
        this.$router.push(`/tests/${this.currentTest._id}/`)
      } else {
        counter++
        this.$router.push(
          `/tests/${this.currentTest._id}/${this.notAnswered[counter].id}`
        )
      }
    },
    changeStatus() {
      console.log('uyesssssss')
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.photo-holder {
  height: 500px;
  width: 750px;
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
}
.v-card:hover {
  transform: scale(1.01, 1.01);
  transform-origin: left;
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
.v-icon {
  color: rgb(68, 68, 68);
}
.error {
  animation: move_error 0.5s;
}
.correct {
  animation: move_correct 1s;
}
.infoQ {
  display: flex;
}
#under-buttons {
  display: flex;
}
@keyframes move_error {
  0% {
    transform: rotateZ(0deg);
  }
  10% {
    transform: rotateZ(-1deg);
  }
  20% {
    transform: rotateZ(1deg);
  }
  30% {
    transform: rotateZ(-1deg);
  }
  40% {
    transform: rotateZ(1deg);
  }
  50% {
    transform: rotateZ(-1deg);
  }
  60% {
    transform: rotateZ(1deg);
  }
  70% {
    transform: rotateZ(-1deg);
  }
  80% {
    transform: rotateZ(1deg);
  }
  90% {
    transform: rotateZ(-1deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
@keyframes move_correct {
  0% {
    transform: scale(1, 1);
    transform-origin: left;
  }
  50% {
    transform: scale(1.1, 1.1);
    transform-origin: left;
  }
  100% {
    transform: scale(1, 1);
    transform-origin: left;
  }
}
</style>
