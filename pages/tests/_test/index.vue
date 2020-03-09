<template>
  <div
    v-if="
      currentTest.time_end !== null || currentTest.mostrar_solucion === true
    "
  >
    <div>
      <div class="display-1 grey--text pt-2 pb-4">{{ title }}</div>
      <div class="grid-wrap mb-4">
        <div class="grid">
          <div style="height: 200px width: 200px background-color: #DEDEDE">
            <Donut
              class="donut"
              stle="background-color:#DEDEDE"
              :right="currentTest.testCheck.right"
              :wrong="currentTest.testCheck.wrong"
              :blank="currentTest.testCheck.blank"
              :total="currentTest.no_contestadas.length"
            ></Donut>
          </div>
        </div>
        <div class="grid display-2" style="background-color: #DEDEDE">
          {{ currentTest.no_contestadas.length }} Preguntas
        </div>
        <div
          class="grid display-2 ml-3 rounded"
          style="background-color: #ffffff"
        >
          <div class="text--red">
            Nota
          </div>
          <div>
            8
          </div>
        </div>
      </div>
      <div
        v-if="
          currentTest.time_end !== null || currentTest.mostrar_solucion === true
        "
      >
        <div
          v-if="notAnswered.length > 0"
          class="grey white--text text-uppercase"
        >
          <div class="subtitle-2 ml-4">Sin Contestar</div>
          <v-divider></v-divider>
        </div>
        <v-list
          v-for="(item, idx) in notAnswered"
          :key="item._id"
          dense
          flat
          class="pb-0"
        >
          <v-row @click="goToQuestion(item._id, idx)">
            <v-col cols="8">
              <div class="overline text-uppercase red--text pl-4">
                {{ getQuestionSubject[idx] }}
              </div>
              <div class="body-2 pl-4">{{ item.enunciado }}</div>
            </v-col>
            <v-col cols="4">
              <div class="overline text-right pr-5 red--text">
                sin contestar
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-list>
      </div>
      <div v-if="incorrect.length > 0">
        <div class="red white--text text-uppercase">
          <div class="subtitle-2 ml-4">Incorrectas</div>
          <v-divider></v-divider>
        </div>
        <v-list
          v-for="(item, idx) in incorrect"
          :key="item._id"
          class="red lighten-4 pb-0"
          dense
          flat
        >
          <v-row @click="goToQuestion(item._id, idx)">
            <v-col cols="8">
              <div class="overline text-uppercase red--text pl-4">
                {{ getQuestionSubject[idx] }}
              </div>
              <div class="body-2 pl-4">{{ item.enunciado }}</div>
            </v-col>
            <v-col cols="4">
              <div class="overline text-right pr-5 red--text">
                incorrecta
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-list>
      </div>
      <div v-if="correct.length > 0">
        <div class="green white--text">
          <div class="subtitle-2 ml-4 text">Correctas</div>
          <v-divider></v-divider>
        </div>
        <v-list
          v-for="(item, idx) in correct"
          :key="item._id"
          class="green lighten-4 pb-0"
          dense
          flat
        >
          <v-row @click="goToQuestion(item._id, idx)">
            <v-col cols="8">
              <div class="overline text-uppercase red--text pl-4">
                {{ getQuestionSubject[idx] }}
              </div>
              <div class="body-2 pl-4">{{ item.enunciado }}</div>
            </v-col>
            <v-col cols="4">
              <div class="overline text-right pr-5 green--text">
                correcta
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
import Donut from '~/components/Doughnut.js'

export default {
  components: { Donut },
  async fetch({ params, store }) {
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
  },
  data() {
    return {
      questions: [],
      title: '',
      respuestas: [],
      correct: [],
      incorrect: [],
      notAnswered: []
    }
  },
  computed: {
    ...mapGetters(['currentTest', 'question', 'tests']),
    getQuestionSubject() {
      let questionSubject = []
      this.questions.forEach(q => {
        let tema = this.temas.find(tema => tema.id == q.tema_id)
        questionSubject.push(tema.name)
      })
      return questionSubject
    }
  },
  beforeMount() {
    this.questions = this.currentTest.no_contestadas
    this.respuestas = this.currentTest.respuestas
    this.title = this.currentTest.title
    this.findIfAnswered()
    if (
      this.currentTest.time_end === null &&
      this.currentTest.mostrar_solucion === false
    ) {
      if (this.notAnswered.length > 0) {
        this.$router.push(
          `/tests/${this.currentTest._id}/${this.notAnswered[0]._id}`
        )
      } else {
        this.endTest()
        this.$router.push(`/tests/${this.currentTest._id}/`)
      }
    }
  },
  mounted() {},
  methods: {
    goToQuestion(item_id) {
      this.$router.push(`/tests/${this.currentTest._id}/${item_id}`)
    },
    goToQuestion2(idx) {
      let q = this.currentTest.no_contestadas[idx]._id
      this.$router.push(`/tests/${this.currentTest._id}/${q}`)
    },
    questionNumber(id) {
      const qNum = this.questions.findIndex(q => q._id === id)
      return qNum + 1
    },
    findIfAnswered() {
      let correct = []
      let incorrect = []
      let notAnswered = []
      this.currentTest.respuestas.forEach(res => {
        if (res.answered && res.guess === true) {
          let idx = this.questions.findIndex(q => q._id === res.id)
          let q = this.questions[idx]
          correct.push(q)
        } else if (res.answered && res.guess === false) {
          let idx = this.questions.findIndex(q => q._id === res.id)
          let q = this.questions[idx]
          incorrect.push(q)
        } else {
          let idx = this.questions.findIndex(q => q._id === res.id)
          let q = this.questions[idx]
          notAnswered.push(q)
        }
      })
      this.correct = correct
      this.incorrect = incorrect
      this.notAnswered = notAnswered
    },
    endTest() {
      let timeNow = new Date()
      const data = {
        time_end: timeNow,
        testId: this.currentTest._id
      }
      this.$store.dispatch('updateTest', data)
      this.$store.commit('saveCurrentTest', this.currentTest)
      this.$router.push(`/tests/${this.currentTest._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-wrap {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
}
.grid {
  padding: 1rem;
  height: 4rem;
  min-height: 240px;
  min-width: 300px;
}
.donut {
  height: 250px;
  width: 250px;
  margin-top: -40px;
}

.resume {
  height: 140px;
  width: 100%;
  display: flex;
  align-content: center;
  vertical-align: center;
}

.questions-display {
  min-height: 140px;
  min-width: 140px;
  max-height: 140px;
  max-width: 140px;
  border: 1px solid red;
  border-radius: 8px;
  text-align: center;
  position: relative;
}

@media (min-width: 600px) {
  .grid-wrap {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
