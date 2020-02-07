<template>
  <v-container>
    <div class="infoQ">
      <div>
        <h2>{{ $store.state.currentTest.respuestas[numero] }}</h2>
        <h2>{{ $store.state.currentTest._id }}</h2>
        <h2>{{ $store.state.currentTest.no_contestadas.length }}</h2>
      </div>
      <v-spacer />
      <h2>
        Pregunta {{ numero + 1 }}/{{
          $store.state.currentTest.no_contestadas.length
        }}&nbsp;&nbsp;
      </h2>
      <v-btn color="#da3e3e" to="/tests">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <h1>{{ enunciado }}</h1>
        <h4>{{ findTemaName }}</h4>
        <h2>{{ id }}</h2>
      </v-col>
    </v-row>
    <h1>hola</h1>
    <v-row>
      <v-col v-for="(answer, idx) in answers" :key="idx" cols="6">
        <v-card
          :id="'answer-' + idx"
          shaped
          min-height="200"
          @click="selectAnswer(answer, idx)"
        >
          <h3>{{ answer.respuesta }}</h3>
          <h3>{{ id }}</h3>
          <!-- <h3>{{ selected }}</h3> -->
        </v-card>
      </v-col>
    </v-row>
    <h2>
      {{ answers }}
    </h2>
    <v-btn @click="correction">Corregir</v-btn>
  </v-container>
</template>

<script>
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
  data() {
    return {
      answered: false,
      respuesta: [],
      check: { true: 0, false: 0 },
      corrected: false
    }
  },
  computed: {
    findTemaName() {
      var temaName = this.temas.filter(elem => elem.id == this.tema)
      return temaName[0].name
    }
  },
  mounted() {
    this.respuesta = []
    this.answered = false
    let response = this.$store.state.currentTest.respuestas[this.numero]
    if (response.answered === true) {
      this.respuesta = response.respuestas
      this.answered = true
      this.corrected = true
      for (let i = 0; i < response.respuestas.length; i++) {
        if (response.respuestas[i] !== '') {
          document
            .getElementById('answer-' + i)
            .classList.add('selected-answer')
        }
      }
      this.correction()
    }
  },

  methods: {
    selectAnswer(answer, idx) {
      if (!this.corrected) {
        if (this.respuesta.length === 0) {
          for (let i = 0; i < this.answers.length; i++) {
            this.respuesta.push('')
          }
        }
        if (
          document
            .getElementById('answer-' + idx)
            .classList.contains('selected-answer')
        ) {
          document
            .getElementById('answer-' + idx)
            .classList.remove('selected-answer')
          if (this.respuesta[idx].correcta === true) {
            this.check.true--
          } else if (this.respuesta[idx].correcta === false) {
            this.check.false--
          }
          this.respuesta[idx] = ''

          if (this.check.true === 0 && this.check.false === 0) {
            this.answered = false
            this.respuesta = []
          }
        } else {
          document
            .getElementById('answer-' + idx)
            .classList.add('selected-answer')
          this.respuesta[idx] = this.answers[idx]
          if (this.respuesta[idx].correcta === true) {
            this.check.true++
          } else if (this.respuesta[idx].correcta === false) {
            this.check.false++
          }
        }
      } else {
        alert('answered')
      }
    },
    correction() {
      if (this.respuesta.length > 0) {
        let res = this.respuesta
        let cor = this.answers
        for (let i = 0; i < cor.length; i++) {
          if (
            res[i].respuesta === cor[i].respuesta &&
            cor[i].correcta === true
          ) {
            document
              .getElementById('answer-' + i)
              .classList.remove('selected-answer')
            document
              .getElementById('answer-' + i)
              .classList.add('selected-green')
          }
          if (
            res[i].respuesta === cor[i].respuesta &&
            cor[i].correcta === false
          ) {
            document
              .getElementById('answer-' + i)
              .classList.remove('selected-answer')
            document.getElementById('answer-' + i).classList.add('selected-red')
          }
          if (res[i] === '' && cor[i].correcta === true) {
            document
              .getElementById('answer-' + i)
              .classList.remove('selected-answer')
            document
              .getElementById('answer-' + i)
              .classList.add('selected-circle')
            res[i]
          }
        }
        this.corrected = true
        let obj = { id: this.id, answered: true, respuestas: this.respuesta }
        if (
          this.$store.state.currentTest.respuestas[this.numero].answered ===
          false
        ) {
          let respuesta = this.$store.state.currentTest.respuestas
          respuesta[this.numero] = obj
          console.log(obj)
          console.log(respuesta)
          this.testUpdate(respuesta)
        }
      }
    },
    async testUpdate(answer) {
      const data = {
        testId: this.$store.state.currentTest._id,
        respuesta: answer
      }
      await this.$store.dispatch('updateTest', data)
      // this.$router.push(`/tests/${data.testId}`)
    }
  }
}
</script>

<style scoped>
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
.enunciado {
  margin: 150px auto;
}
.btn-size {
  height: 100%;
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
