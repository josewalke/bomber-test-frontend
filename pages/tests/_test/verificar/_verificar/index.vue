<template>
  <v-container id="cp">
    <h1>Enunciado</h1>
    <p>{{ pregunta_id.enunciado }}</p>

    <div
      v-if="pregunta_id.imagen_url"
      class="photo-holder mb-3"
      :style="{
        'background-image': `url(${pregunta_id.imagen_url})`
      }"
    ></div>

    <h1>Respuesta correcta</h1>
    <div v-for="(answer, idx) in pregunta_id.answers" :key="idx">
      <p :class="answer.correcta ? 'green--text' : 'red--text '">
        <span
          :class="
            respuesta.respuesta === answer.respuesta
              ? 'pa-2 secondary text-no-wrap rounded-pill'
              : ''
          "
        >
          {{ answer.respuesta }}
        </span>
      </p>
    </div>

    <h1>Explicacion del profesor</h1>
    <p>{{ pregunta_id.explicacion }}</p>

    <v-btn class="ma-2" outlined small color="#DA3E3E" @click="message = true">
      DUDA / IMPUGNAR
    </v-btn>

    <v-btn class="ma-2" outlined small color="#DA3E3E" @click="volver">
      Volver
    </v-btn>
    <v-dialog v-model="message" max-width="500" class="pa-8 white">
      <messageVerificacion
        :id-question="pregunta_id._id"
        @status="messageOff"
      ></messageVerificacion>
    </v-dialog>
  </v-container>
</template>

<script>
import messageVerificacion from '~/components/messageVerificacion'
import { mapGetters } from 'vuex'
import API from '~/services/api'

export default {
  components: {
    messageVerificacion
  },
  async asyncData({ params }) {
    let body = {
      _id: params.test
    }
    let body2 = {
      _id: params.verificar
    }
    let respuesta = ''
    const test = await API.getByTest(body)
    const question = await API.getQuestion(body2)

    for (let i = 0; i < test.respuestas.length; i++) {
      if (test.respuestas[i].id === question[0]._id) {
        for (let x = 0; x < 4; x++) {
          if (test.respuestas[i].respuestas === undefined) {
            console.log(false)
          } else {
            if (test.respuestas[i].respuestas[x] != '') {
              respuesta = test.respuestas[i].respuestas[x]
            }
          }
        }
      }
    }

    return { respuesta }
  },
  data() {
    return {
      message: false
    }
  },
  computed: {
    ...mapGetters(['pregunta_id', 'test_id', 'currentTest'])
  },
  methods: {
    messageOff() {
      this.message = false
    },
    volver() {
      this.$router.push(`/tests/${this.test_id}/resumen2`)
    }
  }
}
</script>

<style scoped>
#cp {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}
</style>
