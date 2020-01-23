<template>
  <div>
    <!-- <v-container>
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
      v-model="seleccion2"
      class="my-2"
      :items="categoria"
      label="Categoria"
    ></v-overflow-btn>
    <v-overflow-btn
      v-if="seleccion2 === 'bomberil'"
      v-model="seleccion"
      class="my-2"
      :items="nombre"
      label="Tema"
    ></v-overflow-btn>
    <v-overflow-btn
      v-if="seleccion2 === 'legislacion'"
      v-model="seleccion4"
      class="my-2"
      :items="nombre2"
      label="Tema"
    ></v-overflow-btn>
    <v-overflow-btn
      v-model="seleccion3"
      class="my-2"
      :items="dificultad"
      label="Dificultad"
    ></v-overflow-btn>

    <v-btn @click="crearQuestion">pulsame</v-btn> -->

    <v-text-field v-model="f_categoria" label="Categoria"></v-text-field>
    <v-btn @click="filtrar">Filtrar</v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Enunciado</th>
            <th class="text-left">Temario</th>
            <th class="text-left">Categoria</th>
          </tr>
        </thead>
        <tbody v-if="filtro">
          <tr v-for="(item, idx) in preguntas" :key="idx">
            <td
              class="text-truncate"
              style="max-width: 150px;"
              @click="goToQuestion(item._id, item)"
            >
              <p>{{ item.enunciado }}</p>
            </td>

            <td
              class="text-truncate"
              style="max-width: 150px;"
              @click="goToQuestion(item._id, item)"
            >
              <p v-for="(tema, index) in temas" :key="index">
                <span v-if="tema._id === item.tema_id">{{ tema.name }}</span>
              </p>
            </td>
            <td @click="goToQuestion(item._id, item)">{{ item.category }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item, idx) in preguntas" :key="idx">
            <td
              v-if="item.category === f_categoria"
              class="text-truncate"
              style="max-width: 150px;"
            >
              <p>{{ item.enunciado }}</p>
            </td>
            <td
              v-if="item.category === f_categoria"
              class="text-truncate"
              style="max-width: 150px;"
              @click="goToQuestion(item._id, item)"
            >
              <p v-for="(tema, index) in temas" :key="index">
                <span v-if="tema._id === item.tema_id">{{ tema.name }}</span>
              </p>
            </td>
            <td v-if="item.category === f_categoria" class="text-truncate">
              {{ item.category }}
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
    const nombre2 = []
    const id2 = []
    for (let i = 0; i < temas.length; i++) {
      if (temas[i].category === 'bomberil') {
        nombre.push(temas[i].name)
        id.push(temas[i]._id)
      } else {
        nombre2.push(temas[i].name)
        id2.push(temas[i]._id)
      }
    }
    const preguntas = await API.getAllQuestions()

    return { nombre, id, preguntas, temas, nombre2, id2 }
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
      seleccion3: '',
      seleccion4: '',
      f_tema: '',
      f_categoria: '',
      filtro: true
    }
  },
  methods: {
    crearQuestion() {
      if (this.seleccion > 0) {
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
      } else {
        const newQuestion = {
          enunciado: this.enunciado,
          answers_wrong: [
            this.opcion1,
            this.opcion2,
            this.opcion3,
            this.correcta
          ],
          answers_correct: this.correcta,
          tema_id: this.id2[this.nombre2.indexOf(this.seleccion4)],
          category: this.seleccion2,
          difficulty: this.seleccion3
        }
        API.crearQuestion(newQuestion)
        location.reload()
      }
    },
    goToQuestion(question) {
      this.$router.push(`/question/${question}`)
    },
    filtrar() {
      this.filtro = false
    }
  }
}
</script>

<style>
.box {
  width: 600px;
}
</style>
