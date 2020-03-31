<template>
  <v-container>
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
      <p :class="answer.correcta ? 'green--text' : 'red--text'">
        {{ answer.respuesta }}
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
export default {
  components: {
    messageVerificacion
  },
  data() {
    return {
      message: false
    }
  },
  computed: {
    ...mapGetters(['pregunta_id', 'test_id'])
  },
  methods: {
    messageOff() {
      this.message = false
    },
    volver() {
      this.$router.push(`/tests/${this.test_id}/resumen`)
    }
  }
}
</script>

<style></style>
