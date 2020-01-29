<template>
  <div>
    <v-card>
      <v-card-title>
        Bomberil
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search_question"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="select_question"
        :search="search"
        :headers="headers_question"
        :items="bomberil"
        :single-select="singleSelect"
        item-key="enunciado"
        show-select
        class="elevation-1"
      >
      </v-data-table>
      <v-card-title>
        Legislacion
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        v-model="select_question"
        :search="search_question"
        :headers="headers_question"
        :items="legislacion"
        :single-select="singleSelect"
        item-key="enunciado"
        show-select
        class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  async asyncData() {
    const student = await API.getAllUsers()
    const temas = await API.getAllTemas()
    const preguntas = await API.getAllQuestions()
    const bomberil = []
    const legislacion = []

    for (let i = 0; i < preguntas.length; i++) {
      for (let x = 0; x < temas.length; x++) {
        if (preguntas[i].tema_id === temas[x]._id) {
          preguntas[i].tema_id = temas[x].name
          if (preguntas[i].category === 'bomberil') {
            bomberil.push(preguntas[i])
          } else {
            legislacion.push(preguntas[i])
          }
        }
      }
    }

    return { student, temas, bomberil, legislacion }
  },
  data() {
    return {
      search_question: '',
      singleSelect: false,
      selected: [],
      headers_question: [
        {
          text: 'Enunciado',
          align: 'left',
          sortable: false,
          value: 'enunciado'
        },
        { text: 'Tema', value: 'tema_id' }
      ]
    }
  },
  methods: {
    prueba() {
      console.log('funciona')
    }
  }
}
</script>

<style scoped></style>
