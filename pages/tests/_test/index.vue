<template>
  <div>
    <div class="display-1 ml-3 pt-4 mb-3 grey--text">
      Test: {{ currentTest.title }}
    </div>
    <div class="overline ml-4 red--text" style="text-transform: uppercase">
      Resumen del test
    </div>
    <v-chip-group column class="ml-3 mb-4">
      <v-chip> {{ currentTest.no_contestadas.length }} preguntas </v-chip>

      <v-chip v-if="currentTest.no_contestadas.length - notAnswered.length > 0">
        {{ currentTest.no_contestadas.length - notAnswered.length }} contestadas
      </v-chip>
    </v-chip-group>
    <div class="overline ml-4 red--text" style="text-transform: uppercase">
      Temas
    </div>
    <v-chip-group column class="ml-3 mb-4">
      <v-chip v-for="subject in getQuestionSubject" :key="subject" small>
        {{ subject }}
      </v-chip>
    </v-chip-group>
    <div class="title ml-4 red--text" style="text-transform: uppercase">
      Instrucciones
    </div>
    <ul class="body-1 ml-4 mt-1 grey--text text--darken-1">
      <li>
        Hola {{ userName }} vas a realizar un examen de
        {{ currentTest.no_contestadas.length }} preguntas. Para lo cual
        dispondrás de {{ currentTest.no_contestadas.length }} minutos.
      </li>
      <li>
        Cuando estés preparado pulsa el botón "Comenzar Test"
      </li>
    </ul>
    <div class="d-flex justify-start ml-4 mt-4">
      <div v-if="notAnswered.length > 0">
        <v-btn
          v-if="notAnswered.length === currentTest.no_contestadas.length"
          outlined
          rounded
          class="red--text text--en-1 ma-2"
          @click="startTest"
          >Comenzar test</v-btn
        >
        <v-btn
          v-else
          outlined
          rounded
          class="red--text text--darken-1 ma-2"
          @click="startTest"
          >Continuar test</v-btn
        >
      </div>
      <div>
        <v-btn
          v-if="currentTest.time_end === null"
          outlined
          rounded
          class="red--text text--darken-1 ma-2"
          @click="endTest"
          >Finalizar Test</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
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
      notAnswered: []
    }
  },
  computed: {
    ...mapGetters(['currentTest', 'currentNotAnswered', 'userName']),
    getQuestionSubject() {
      let questions = this.currentTest.no_contestadas
      let questionsSubject = []
      questions.forEach(q => {
        let tema = this.temas.find(tema => tema.id == q.tema_id)
        if (!questionsSubject.includes(tema.name)) {
          questionsSubject.push(tema.name)
        }
      })
      return questionsSubject
    }
  },
  beforeMount() {
    this.findIfAnswered()
    this.$store.commit('saveNotAnswered', this.notAnswered)
  },
  methods: {
    findIfAnswered() {
      let notAnswered = []
      this.currentTest.respuestas.forEach(res => {
        if (res.answered === false) {
          let idx = this.currentTest.no_contestadas.findIndex(
            q => q._id === res.id
          )
          let q = this.currentTest.no_contestadas[idx]
          notAnswered.push(q)
        }
      })
      this.notAnswered = notAnswered
    },
    startTest() {
      console.log('start')
      this.$router.push(
        `/tests/${this.$store.state.currentTest._id}/${this.notAnswered[0]._id}`
      )
    },
    endTest() {
      let timeNow = new Date()
      const data = {
        time_end: timeNow,
        testId: this.currentTest._id
      }
      this.$store.dispatch('updateTest', data)
      this.$store.commit('saveCurrentTest', this.currentTest)
      this.$router.push(`/tests/${this.currentTest._id}/resumen`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
