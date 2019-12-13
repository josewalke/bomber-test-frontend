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
          class="question"
          @click="selectAnswer(idx)"
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
    }
  },

  methods: {
    selectAnswer(number) {
      console.log(number)
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
