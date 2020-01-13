<template>
  <div>
    <h1>Enunciado</h1>
    <v-textarea v-model="enunciado" auto-grow solo></v-textarea>
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
      label="Suscripcion"
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

    return { nombre, id }
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
        answer_wrong: [this.opcion1, this.opcion2, this.opcion3, this.correcta],
        answers_correct: this.correcta,
        tema_id: this.id[this.nombre.indexOf(this.seleccion)],
        category: this.seleccion2,
        dificulty: this.seleccion3
      }
      console.log(newQuestion)
    }
  }
}
</script>

<style></style>
