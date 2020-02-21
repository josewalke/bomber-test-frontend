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
      <h1>Titulo: {{ currentTest.title }}</h1>
      <div clas="question-title d-flex justify-space-between">
        <h1>
          Pregunta {{ questionNumber }}/
          {{ currentTest.no_contestadas.length }}
        </h1>
        <v-btn color="#da3e3e" @click="goToTest">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <v-row>
      <v-col>
        <template>
          <Question2
            :id="currentTestQuestion._id"
            :enunciado="currentTestQuestion.enunciado"
            :answers="currentTestQuestion.answers"
            :tema="currentTestQuestion.tema_id"
            :numero="questionNumber - 1"
            :temas="temas"
          />
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
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
    store.commit(
      'saveCurrentQuestion',
      test.no_contestadas[params.question - 1]
    )
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
  },

  computed: {
    ...mapGetters(['currentTest', 'question', 'currentTestQuestion']),
    questionNumber() {
      let idx = 0
      let q = this.currentTest.no_contestadas
      for (let i = 0; i < q.length; i++) {
        if (q[i].enunciado === this.currentTestQuestion.enunciado) {
          idx = i + 1
        }
      }
      return idx
    }
  },
  methods: {
    goToTest() {
      this.$router.push(`/tests/${this.currentTest._id}`)
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
