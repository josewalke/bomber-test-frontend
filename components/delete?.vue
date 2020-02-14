<template>
  <v-container>
    <div class="infoQ">
      <div>
        <h2>{{ $store.state.currentTest.no_contestadas.length }}</h2>
        <h2>{{ $store.state.currentTest.aciertos }}</h2>
        <h2>{{ $store.state.currentTest.fallos }}</h2>
        <h1>temas</h1>
        <h2>{{ temas }}</h2>
      </div>
      <v-spacer />
      <h2>
        Pregunta {{ numero + 1 }}/{{
          $store.state.currentTest.no_contestadas.length
        }}&nbsp;&nbsp;
      </h2>
      <v-btn color="#da3e3e" to="/tests"><v-icon>mdi-close</v-icon></v-btn>
    </div>
    <v-row>
      <v-col>
        <h1>{{ enunciado }}</h1>
        <h4>{{ findTemaName }}</h4>
        <h2>{{ id }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(answer, idx) in answers" :key="idx" cols="6">
        <v-card
          shaped
          min-height="200"
          :color="colores[idx]"
          :class="solucion[idx]"
          @click="selectAnswer(answer, idx)"
        >
          <h3>{{ answer.respuesta }}</h3>
          <h3>{{ id }}</h3>
        </v-card>
      </v-col>
    </v-row>
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
      colores: ['grey', 'grey', 'grey', 'grey'],
      answered: false,
      solucion: ['none', 'none', 'none', 'none']
    }
  },
  computed: {
    findTemaName() {
      var temaName = this.temas.filter(elem => elem.id == this.tema)
      return temaName[0].name
    }
  },

  methods: {
    selectAnswer(answer, idx) {
      if (!this.answered) {
        this.colores.splice(idx, 1, answer.correcta === true ? 'green' : 'red')
        this.solucion.splice(
          idx,
          1,
          answer.correcta === true ? 'correct' : 'error'
        )
        this.answered = true
      }
      this.testUpdate(answer)
    },
    async testUpdate(answer) {
      console.log('this is answer 1')
      console.log(answer)
      let goodAnswer = []
      let badAnswer = []
      let questionId = this.id
      answer.correcta === true
        ? (goodAnswer = questionId)
        : (badAnswer = [questionId, answer])
      console.log(goodAnswer)
      console.log(badAnswer)
      const test = {
        correct: goodAnswer,
        incorrect: badAnswer
      }
      await this.$store.dispatch('updateTest', test)
      console.log(test)
    }
  }
}
</script>

<style scoped>
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
