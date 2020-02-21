<template>
  <div>
    <div class="display-1">Nota 5,9</div>
    <div class="display-1">{{ currentTest.title }}</div>
    <v-container fluid>
      <v-row cols="12" style="height: 400px">
        <v-row
          cols="3"
          align="start"
          justify="start"
          class="grey lighten-5"
          style="height: 200px"
        >
          <v-card style="height: 200px width: 200px">
            <Donut
              class="donut"
              :right="currentTest.testCheck.right"
              :wrong="currentTest.testCheck.wrong"
              :blank="currentTest.testCheck.blank"
              :total="currentTest.no_contestadas.length"
            ></Donut>
          </v-card>
        </v-row>

        <v-row
          cols="4"
          align="start"
          justify="start"
          class="grey lighten-5"
          style="height: 200px"
        >
          <v-card style="height: 200px width: 200px">
            <Donut
              class="donut"
              :right="currentTest.testCheck.right"
              :wrong="currentTest.testCheck.wrong"
              :blank="currentTest.testCheck.blank"
              :total="currentTest.no_contestadas.length"
            ></Donut>
          </v-card>
        </v-row>
        <v-row
          cols="4"
          align="start"
          justify="start"
          class="grey lighten-5"
          style="height: 200px"
        >
          <v-card style="height: 200px width: 200px">
            <Donut
              class="donut"
              :right="currentTest.testCheck.right"
              :wrong="currentTest.testCheck.wrong"
              :blank="currentTest.testCheck.blank"
              :total="currentTest.no_contestadas.length"
            ></Donut>
          </v-card>
        </v-row>
      </v-row>
    </v-container>
    <v-list
      v-for="(item, idx) in currentTest.no_contestadas"
      :key="item.id"
      dense
      flat
    >
      <v-row @click="goToQuestion(item._id, idx)">
        <v-col cols="8">
          <div class="overline text-uppercase red--text pl-4">
            {{ getQuestionSubject[idx] }}
          </div>
          <div class="body-2 pl-4">{{ idx + 1 }}. {{ item.enunciado }}</div>
        </v-col>
        <v-col cols="4">
          <div
            v-if="currentTest.respuestas[idx].answered === true"
            class="overline text-right pr-5 green--text"
          >
            contestada
          </div>
          <div v-else class="overline text-right pr-5 red--text">
            sin contestar
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-list>
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
    console.log(params)
    store.commit('saveCurrentTest', test)
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
  },
  data() {
    return {
      estado: [],
      sections: [],
      total: 10,
      legend: ''
    }
  },
  computed: {
    ...mapGetters(['currentTest', 'question']),
    getQuestionSubject() {
      let questionSubject = []
      this.currentTest.no_contestadas.forEach(q => {
        let tema = this.temas.find(tema => tema.id == q.tema_id)
        questionSubject.push(tema.name)
      })
      return questionSubject
    },
    findIfAnswered() {
      let status = []
      this.currentTest.respuestas.forEach(res => {
        res.answered ? status.push('Contestada') : status.push('No contestada')
      })
      return status
    }
  },
  methods: {
    goToQuestion(id, idx) {
      this.$router.push(`/tests/${this.currentTest._id}/${idx + 1}`)
      console.log(this.sections)
    }
  }
}
</script>

<style lang="scss" scoped>
.pruebas {
  height: 200px;
  width: 200px;
  background-color: blue;
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
</style>
