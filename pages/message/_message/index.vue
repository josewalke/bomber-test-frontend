<template>
  <div>
    <div>
      <h1>Enunciado</h1>
      {{ question.enunciado }}
    </div>
    <div>
      <h1>Opciones</h1>
      {{ question.answer_wrong[0] }}<br />
      {{ question.answer_wrong[1] }}<br />
      {{ question.answer_wrong[2] }}<br />
      {{ question.answer_wrong[3] }}<br />
    </div>
    <div>
      <h1>Respuesta correcta</h1>
      {{ question.answers_correct }}
    </div>
    <div>
      <h1>Pregunta del estudiante</h1>
      {{ messages[position].pregunta }}
    </div>
    <div>
      <h1>Respuesta del profesor</h1>
      {{ messages[position].respuesta }}
    </div>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  async fetch({ params, store }) {
    // console.log(params.message)
    const response = await API.getQuestionById(params.message)
    if (!response.error) {
      store.commit('saveQuestion', response)
    } else {
      console.log('mal')
    }
  },
  computed: {
    ...mapGetters(['question', 'messages', 'position'])
  }
}
</script>

<style></style>
