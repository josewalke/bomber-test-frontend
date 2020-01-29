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
        <v-card class="carta-opciones">
          {{ question.answers_wrong[0] }}<br />
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="carta-opciones">
          {{ question.answers_wrong[1] }}
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="carta-opciones">
          {{ question.answers_wrong[2] }}
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="carta-opciones">
          {{ question.answers_wrong[3] }}
        </v-card>
      </v-col>
    </v-row>

    <div>
      <h1>Respuesta correcta</h1>
      <hr class="divisor" />
      <br />
      <v-card class="carta-opciones">
        {{ question.answers_correct }}
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
