<template>
  <v-container>
    <div class="infoQ">
      <v-spacer />
      <h2>
        <!-- {{ $store.state.question }} -->
        Pregunta {{ numero + 1 }}/{{
          currentTest.no_contestadas.length
        }}&nbsp;&nbsp;
      </h2>
      <!-- <v-btn color="#da3e3e" to="/tests">
        <v-icon>mdi-close</v-icon>
      </v-btn> -->
    </div>
    <div class="question-holder">
      <v-row>
        <v-col>
          <h1>{{ enunciado }}</h1>
          <h4>{{ findTemaName }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(answer, idx) in answers" :key="idx" cols="6">
          <v-card
            :id="`${id}-` + idx"
            shaped
            min-height="200"
            @click="selectAnswer(answer, idx)"
          >
            <h3>{{ answer.respuesta }}</h3>
            <!-- <h3>{{ selected }}</h3> -->
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
              @click="correction"
            >
              DUDA / IMPUGNAR
              <!-- <v-icon>mdi-help</v-icon> -->
            </v-btn>
            <v-btn
              class="ma-2"
              outlined
              small
              color="#DA3E3E"
              @click="correction"
            >
              CORREGIR
              <!-- <v-icon>mdi-check-bold</v-icon> fab -->
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <h2>
      <!-- <h2>respuesta: {{ respuesta }}</h2> -->
    </h2>
  </v-container>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
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
    }
  },
  async fetch({ params, store }) {
    console.log(params)
    const question = await API.getQuestionById(params.question)
    store.commit('saveCurrentTestQuestion', question)
  },
  data() {
    return {
      answered: false,
      respuesta: [],
      corrected: false,
      guess: 'blank',
      counter: 0
    }
  },
  computed: {
    findTemaName() {
      var temaName = this.temas.filter(elem => elem.id == this.tema)
      return temaName[0].name
    },
    ...mapGetters(['currentTest'])
  },
  mounted() {
    let response = this.currentTest.respuestas[this.numero]
    if (response.answered === true) {
      this.respuesta = response.respuestas
      this.answered = true
      this.corrected = true
      for (let i = 0; i < response.respuestas.length; i++) {
        if (response.respuestas[i] !== '') {
          document
            // .getElementById(`${this.id}-` + i)
            .getElementById(`${this.id}-` + i)
            .classList.add('selected-answer')
        }
      }
      this.correction()
    }
  },

  methods: {
    selectAnswer(answer, idx) {
      if (!this.corrected) {
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
      } else {
        alert('answered')
      }
    },
    correction() {
      if (this.respuesta.length > 0) {
        let check = { true: 0, false: 0 }
        let res = this.respuesta
        let cor = this.answers
        let correctAnswers = 0

        this.guess = false

        res.forEach(element => {
          if (element.correcta === true) {
            check.true++
          }
          if (element.correcta === false) {
            check.false++
          }
        })
        cor.forEach(element =>
          element.correcta === true ? correctAnswers++ : null
        )

        if (check.true === correctAnswers && check.false === 0) {
          this.guess = true
        }

        for (let i = 0; i < cor.length; i++) {
          document.getElementById(`${this.id}-` + i).classList.add('no-click')

          if (
            res[i].respuesta === cor[i].respuesta &&
            cor[i].correcta === true
          ) {
            document
              .getElementById(`${this.id}-` + i)
              .classList.remove('selected-answer')
            document
              .getElementById(`${this.id}-` + i)
              .classList.add('selected-green')
          }
          if (
            res[i].respuesta === cor[i].respuesta &&
            cor[i].correcta === false
          ) {
            document
              .getElementById(`${this.id}-` + i)
              .classList.remove('selected-answer')
            document
              .getElementById(`${this.id}-` + i)
              .classList.add('selected-red')
          }
          if (res[i] === '' && cor[i].correcta === true) {
            document
              .getElementById(`${this.id}-` + i)
              .classList.remove('selected-answer')
            document
              .getElementById(`${this.id}-` + i)
              .classList.add('selected-circle')
          }
        }
        this.corrected = true
        let obj = {
          id: this.id,
          answered: true,
          respuestas: this.respuesta,
          guess: this.guess
        }
        if (this.currentTest.respuestas[this.numero].answered === false) {
          let respuesta = this.currentTest.respuestas
          respuesta[this.numero] = obj
          this.testUpdate(respuesta)
        }
      }
    },
    testUpdate(answer) {
      const data = {
        testId: this.currentTest._id,
        respuesta: answer
      }
      this.$store.dispatch('updateTest', data)
    }
  }
}
</script>

<style scoped>
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
