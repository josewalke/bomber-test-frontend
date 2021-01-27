<template>
  <div>
    <div class="display-1 grey--text pt-2 pb-4">Test:{{ title }}</div>
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
          <span
            v-if="
              (currentTest.testCheck.right -
                currentTest.testCheck.wrong / 3 -
                currentTest.testCheck.blank / 5) /
                Math.floor(currentTest.no_contestadas.length / 10) >
                0
            "
          >
            {{
              (currentTest.testCheck.right -
                currentTest.testCheck.wrong / 3 -
                currentTest.testCheck.blank / 5) /
                Math.floor(currentTest.no_contestadas.length / 10)
            }}
          </span>
          <span v-else>0</span>
        </div>
      </div>
    </div>
    <div v-if="notAnswered.length > 0">
      <div class="grey white--text text-uppercase">
        <div class="subtitle-2 ml-4">Sin Contestar</div>
        <v-divider></v-divider>
      </div>
      <v-list v-for="(item, idx) in notAnswered" :key="item.id" dense flat>
        <v-row @click="prueba(item.id, idx)">
          <v-col cols="8">
            <div class="body-2 pl-4">{{ item.enunciado }}</div>
          </v-col>
          <v-col cols="4">
            <div class="overline text-right pr-5 red--text">
              Sin contestar
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
        <v-row @click="prueba(item.id, idx)">
          <v-col cols="8">
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
        :key="item.id"
        class="green lighten-4 pb-0"
        dense
        flat
      >
        <v-row @click="prueba(item.id, idx)">
          <v-col cols="8">
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
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
import Donut from '~/components/Doughnut.js'
export default {
  components: { Donut },
  async asyncData({ store }) {
    var question = []
    for (let i = 0; i < store.state.currentTest.no_contestadas.length; i++) {
      let body = {
        _id: store.state.currentTest.no_contestadas[i]
      }
      let pregunta = await API.getQuestion(body)
      question.push(pregunta[0])
    }
    // console.log(question)
    const temas = await API.getAllTemasNames()
    return { temas, question }
  },
  computed: {
    ...mapGetters(['userId', 'currentTest', 'tests']),
    getQuestionSubject() {
      let questionSubject = []
      this.questions.forEach(q => {
        let tema = this.temas.find(tema => tema.id == q.tema_id)
        questionSubject.push(tema.name)
      })
      return questionSubject
    }
  },
  mounted() {
    this.questions = this.currentTest.no_contestadas
    this.respuestas = this.currentTest.respuestas
    this.title = this.currentTest.title
    this.findIfAnswered()
    this.evaluarNota()
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
  methods: {
    async evaluarNota() {
      if (!this.currentTest.nota === false) {
        let body = {
          id: this.currentTest._id,
          user_id: this.userId,
          nota:
            (this.currentTest.testCheck.right -
              Math.floor(this.currentTest.testCheck.wrong / 3) -
              Math.floor(this.currentTest.testCheck.blank / 5)) /
            Math.floor(this.currentTest.no_contestadas.length / 10),
          aprobado: 0,
          suspendido: 0
        }

        await this.$store.dispatch('evaluarNota', body)
      }
    },
    findIfAnswered() {
      let correct = []
      let incorrect = []
      let notAnswered = []
      this.currentTest.respuestas.forEach(res => {
        if (res.answered && res.guess === true) {
          for (let i = 0; i < this.question.length; i++) {
            if (res.id === this.question[i]._id) {
              for (let x = 0; x < this.temas.length; x++) {
                if (this.question[i].tema_id === this.temas[x].id) {
                  let body = {
                    id: this.question[i]._id,
                    enunciado: this.question[i].enunciado,
                    tema: this.temas[x].name
                  }
                  correct.push(body)
                }
              }
            }
          }
        } else if (res.answered && res.guess === false) {
          for (let i = 0; i < this.question.length; i++) {
            if (res.id === this.question[i]._id) {
              for (let x = 0; x < this.temas.length; x++) {
                if (this.question[i].tema_id === this.temas[x].id) {
                  let body = {
                    id: this.question[i]._id,
                    enunciado: this.question[i].enunciado,
                    tema: this.temas[x].name
                  }
                  incorrect.push(body)
                }
              }
            }
          }
        } else {
          for (let i = 0; i < this.question.length; i++) {
            if (res.id === this.question[i]._id) {
              for (let x = 0; x < this.temas.length; x++) {
                if (this.question[i].tema_id === this.temas[x].id) {
                  let body = {
                    id: this.question[i]._id,
                    enunciado: this.question[i].enunciado,
                    tema: this.temas[x].name
                  }
                  notAnswered.push(body)
                }
              }
            }
          }
        }
      })
      this.correct = correct
      this.incorrect = incorrect
      this.notAnswered = notAnswered
    },
    prueba(id) {
      var sPaginaURL = window.location.href.split('/')
      let body = {
        test: sPaginaURL[4],
        pregunta: id
      }
      this.$store.dispatch('explicacion', body)

      this.$router.push(`/tests/${sPaginaURL[4]}/verificar/${id}`)
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
