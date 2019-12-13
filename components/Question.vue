<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ enunciado }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(answer, idx) in answers" :key="idx" cols="5">
        <v-card
          rounded
          tile
          min-height="200"
          :color="colores[idx]"
          class="question"
          @click="selectAnswer(answer, idx)"
        >
          <h3>{{ answer }}</h3>
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
    correct: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colores: ['grey', 'grey', 'grey', 'grey'],
      answered: false
    }
  },

  methods: {
    selectAnswer(answer, idx) {
      if (!this.answered) {
        this.colores.splice(idx, 1, answer === this.correct ? 'green' : 'red')
        this.answered = true
      }
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
