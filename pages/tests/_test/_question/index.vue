<template>
  <div class="main-div">
    <h1>aqui {{ $store.state.currentTest._id }}</h1>
    <h1>aqui {{ currentTest._id }}</h1>

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
      <div class="headline">{{ currentTest.title }}</div>
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
          :id="currentTestQuestion._id"
          :enunciado="currentTestQuestion.enunciado"
          :answers="currentTestQuestion.answers"
          :tema="currentTestQuestion.tema_id"
          :numero="questionNumber - 1"
          :temas="temas"
          :imagen-url="currentTestQuestion.imagen_url"
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
  key: '_question',
  components: {
    Question2
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

  watch: {
    $route(to, from) {
      console.log('watcher here')
      console.log(this.$router)
      console.log(to, from)
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
