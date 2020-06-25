<template>
  <v-container id="cp">
    {{ resolucion() }}
    <div>
      <h1>Enunciado</h1>
      <hr class="divisor" />
      <br />
      <v-card
        class="carta-enunciado"
        :width="formato === 'movil' ? '350px' : '100%'"
      >
        <p>{{ question.enunciado }}</p>
      </v-card>
    </div>
    <div>
      <h1>Opciones</h1>
      <hr class="divisor" />
    </div>
    <v-row>
      <v-col cols="11">
        <div
          :id="resaltar === question.answers[0].respuesta ? 'resaltar' : 'none'"
        >
          <v-card
            id="respuestas"
            class="carta-opciones2"
            :color="question.answers[0].correcta ? 'green' : 'red'"
          >
            {{ question.answers[0].respuesta }}<br />
          </v-card>
        </div>
      </v-col>
      <v-col cols="11">
        <div
          :id="resaltar === question.answers[1].respuesta ? 'resaltar' : 'none'"
        >
          <v-card
            id="respuestas"
            class="carta-opciones2"
            :color="question.answers[1].correcta ? 'green' : 'red'"
          >
            {{ question.answers[1].respuesta }}
          </v-card>
        </div>
      </v-col>
      <!-- <v-icon :color="question.answers[1].correcta ? 'green' : 'red'"
        >mdi-check</v-icon
      > -->
      <v-col cols="11">
        <div
          :id="resaltar === question.answers[2].respuesta ? 'resaltar' : 'none'"
        >
          <v-card
            id="respuestas"
            class="carta-opciones2"
            :color="question.answers[2].correcta ? 'green' : 'red'"
          >
            {{ question.answers[2].respuesta }}
          </v-card>
        </div>
      </v-col>
      <v-col cols="11">
        <div
          :id="resaltar === question.answers[3].respuesta ? 'resaltar' : 'none'"
        >
          <v-card
            id="respuestas"
            class="carta-opciones2"
            :color="question.answers[3].correcta ? 'green' : 'red'"
          >
            {{ question.answers[3].respuesta }}
          </v-card>
        </div>
      </v-col>
    </v-row>

    <div v-if="question.explicacion">
      <h1>Explicación de la respuesta</h1>
      <hr class="divisor" />
      <br />
      <v-card
        class="carta-opciones"
        :width="formato === 'movil' ? '350px' : '100%'"
      >
        {{ question.explicacion }}
      </v-card>
    </div>
    <div>
      <h1>Pregunta del estudiante</h1>
      <hr class="divisor" />
      <br />
      <v-card>
        {{ messages[position].pregunta }}
      </v-card>
    </div>
    <div v-if="role === 'cliente'">
      <h1>Respuesta del profesor</h1>
      <hr class="divisor" />
      <br />
      <v-card>
        {{ messages[position].respuesta }}
      </v-card>
    </div>
    <div v-if="role === 'admin'">
      <div>
        <h1>Responder duda</h1>
        <hr class="divisor" />
        <br />
        <v-textarea v-model="respuesta" auto-grow solo></v-textarea>
        <v-btn @click="reply(messages[position])">Enviar</v-btn>
        <v-btn @click="goToQuestion(question._id)">Modificar Pregunta</v-btn>
      </div>
    </div>
    {{ resaltar }}
  </v-container>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ params, store }) {
    // console.log(params.message)
    const response = await API.getQuestionById(params.message)
    if (!response.error) {
      store.commit('saveQuestion', response)
    } else {
      console.log('mal')
    }
  },
  data() {
    return {
      respuesta: '',
      formato: '',
      resaltar: '',
      test: ''
    }
  },
  computed: {
    ...mapGetters(['question', 'messages', 'position', 'role'])
  },
  mounted() {
    this.mostrar_seleccionada()
  },
  methods: {
    resolucion() {
      if (window.screen.width < 600) {
        this.formato = 'movil'
      } else {
        this.formato = 'ordenador'
      }
    },
    reply(message) {
      const reply = {
        id: message._id,
        respuesta: this.respuesta
      }
      this.$store.dispatch('reply', reply)
      this.$router.push('/message')
    },
    goToQuestion(id) {
      this.$router.push(`/question/${id}`)
    },
    async mostrar_seleccionada() {
      this.messages.forEach(async x => {
        // console.log(x)
        if (x.pregunta_id === this.question._id) {
          let body = {
            _id: x.test_id
          }
          var test = await API.getByTest(body)

          for (let i = 0; i < this.question.answers.length; i++) {
            for (let x = 0; x < test.respuestas.length; x++) {
              // console.log(test.respuestas[x].respuestas[0].respuesta)
              for (let z = 0; z < 4; z++) {
                if (
                  this.question.answers[i].respuesta ===
                  test.respuestas[x].respuestas[z].respuesta
                ) {
                  this.resaltar = test.respuestas[x].respuestas[z].respuesta
                }
              }
            }
          }
        }
      })
      // console.log(this.messages)
    }
  }
}
</script>

<style scoped>
.divisor {
  width: 50%;
  border: 2px solid;
  border-radius: 5px;
}

.carta-enunciado {
  max-width: 800px;
  max-height: 200px;
}
.carta-opciones {
  max-width: 800px;
  max-height: 200px;
}
.carta-opciones2 {
  max-width: 800px;
  max-height: 200px;
  /* border: solid 240px black; */
}
#cp {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}
#resaltar {
  border: solid 5px blue;
  border-radius: 5px;
}
</style>
