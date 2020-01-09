<template>
  <div>
    <div>
      <h1>Enunciado</h1>
      {{ question.enunciado }}
    </div>
    <div>
      <h1>Respuesta correcta</h1>
      {{ question.answers_correct }}
    </div>
    <div>
      {{ messages }}
    </div>
    <div>
      <h1>Pregunta del estudiante</h1>
      {{ messages }}
    </div>
  </div>
</template>

<script>
// import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  async fetch({ params }) {
    console.log(params.message)
    // const response = await API.getQuestionById(params.message)
    // if (!response.error) {
    //   store.commit('saveQuestion', response)
    // } else {
    //   this.prueba = 'error'
    // }
  },
  computed: {
    ...mapGetters(['question', 'messages'])
  }
}
</script>

<style></style>
