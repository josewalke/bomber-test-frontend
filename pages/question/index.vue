<template>
  <div>
    <v-container>
      <h1>Enunciado</h1>
      <div class="box">
        <v-textarea v-model="enunciado" auto-grow solo></v-textarea>
      </div>
    </v-container>
    <h1>Posibles respuestas</h1>
    <v-textarea v-model="opcion1" auto-grow solo label="Opcion1"></v-textarea>
    <v-textarea v-model="opcion2" auto-grow solo label="Opcion2"></v-textarea>
    <v-textarea v-model="opcion3" auto-grow solo label="Opcion3"></v-textarea>
    <h1>Respuesta correcta</h1>
    <v-textarea v-model="correcta" auto-grow solo label="Correcta"></v-textarea>
    <v-overflow-btn
      v-model="seleccion"
      class="my-2"
      :items="nombre"
      label="Tema"
    ></v-overflow-btn>
    <v-overflow-btn
      v-model="seleccion2"
      class="my-2"
      :items="categoria"
      label="Categoria"
    ></v-overflow-btn>
    <v-overflow-btn
      v-model="seleccion3"
      class="my-2"
      :items="dificultad"
      label="Dificultad"
    ></v-overflow-btn>

    <v-btn @click="crearQuestion">pulsame</v-btn>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Enunciado</th>
            <th class="text-left">Temario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in preguntas" :key="idx">
            <td
              class="text-truncate"
              style="max-width: 150px;"
              @click="goToQuestion(item._id, item)"
            >
              <p>{{ item.enunciado }}</p>
            </td>

            <td class="text-truncate" style="max-width: 150px;">
              <p v-for="(tema, index) in temas" :key="index">
                <span v-if="tema._id === item.tema_id">{{ tema.name }}</span>
              </p>
            </td>
            <td v-if="item.respuesta_leida === false">
              <v-icon>mdi-check</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  async asyncData() {
    const temas = await API.getAllTemas()
    const nombre = []
    const id = []
    for (let i = 0; i < temas.length; i++) {
      nombre.push(temas[i].name)
      id.push(temas[i]._id)
    }
    const preguntas = await API.getAllQuestions()
    return { nombre, id, preguntas, temas }
  },
  data() {
    return {
      enunciado: '',
      opcion1: '',
      opcion2: '',
      opcion3: '',
      correcta: '',
      seleccion: '',
      categoria: ['bomberil', 'legislacion'],
      seleccion2: '',
      dificultad: ['Facil', 'Medio', 'Dificil'],
      seleccion3: ''
    }
  },
  methods: {
    crearQuestion() {
      const newQuestion = {
        enunciado: this.enunciado,
        answers_wrong: [
          this.opcion1,
          this.opcion2,
          this.opcion3,
          this.correcta
        ],
        answers_correct: this.correcta,
        tema_id: this.id[this.nombre.indexOf(this.seleccion)],
        category: this.seleccion2,
        difficulty: this.seleccion3
      }
      API.crearQuestion(newQuestion)
      location.reload()
    },
    goToQuestion(question) {
      this.$router.push(`/question/${question}`)
    }
  }
}
</script>

<style>
.box {
  width: 600px;
}
</style>
