<template>
  <v-container>
    <div>
      <h1>Enunciado</h1>
      <hr class="divisor" />
      <br />
      <v-card class="carta-enunciado">
        <p>{{ question.enunciado }}</p>
      </v-card>
    </div>
    <div>
      <h1>Opciones</h1>
      <hr class="divisor" />
    </div>
    <v-row>
      <v-col cols="5">
        <v-card
          class="carta-opciones"
          :color="question.answers[0].correcta ? 'green' : 'red'"
        >
          {{ question.answers[0].respuesta }}<br />
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          class="carta-opciones"
          :color="question.answers[1].correcta ? 'green' : 'red'"
        >
          {{ question.answers[1].respuesta }}
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          class="carta-opciones"
          :color="question.answers[2].correcta ? 'green' : 'red'"
        >
          {{ question.answers[2].respuesta }}
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          class="carta-opciones"
          :color="question.answers[3].correcta ? 'green' : 'red'"
        >
          {{ question.answers[3].respuesta }}
        </v-card>
      </v-col>
    </v-row>

    <div v-if="question.explicacion">
      <h1>Explicación de la respuesta</h1>
      <hr class="divisor" />
      <br />
      <v-card class="carta-opciones">
        {{ question.explicacion }}
      </v-card>
    </div>
    <div>
      <h1>Pregunta del estudiante</h1>
      <hr class="divisor" />
      <br />
      <v-card class="carta-opciones">
        {{ messages[position].pregunta }}
      </v-card>
    </div>
    <div v-if="role === 'cliente'">
      <h1>Respuesta del profesor</h1>
      <hr class="divisor" />
      <br />
      <v-card class="carta-opciones">
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
      respuesta: ''
    }
  },
  computed: {
    ...mapGetters(['question', 'messages', 'position', 'role'])
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.divisor {
  width: 800px;
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
</style>
