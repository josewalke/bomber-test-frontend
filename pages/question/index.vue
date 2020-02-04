<template>
  <div>
    <v-container>
      <div v-if="crear">
        <h1>Enunciado</h1>
        <v-textarea v-model="enunciado" auto-grow solo></v-textarea>
        <h1>Posibles respuestas</h1>
        <v-checkbox
          v-model="checkbox1"
          label="Respuesta correcta"
          color="primary"
        ></v-checkbox>
        <v-textarea
          v-model="opcion1"
          auto-grow
          solo
          label="Opcion1"
        ></v-textarea>
        <v-checkbox
          v-model="checkbox2"
          label="Respuesta correcta"
          color="primary"
        ></v-checkbox>
        <v-textarea
          v-model="opcion2"
          auto-grow
          solo
          label="Opcion2"
        ></v-textarea>
        <v-checkbox
          v-model="checkbox3"
          label="Respuesta correcta"
          color="primary"
        ></v-checkbox>
        <v-textarea
          v-model="opcion3"
          auto-grow
          solo
          label="Opcion3"
        ></v-textarea>
        <v-checkbox
          v-model="checkbox4"
          label="Respuesta correcta"
          color="primary"
        ></v-checkbox>
        <v-textarea
          v-model="opcion4"
          auto-grow
          solo
          label="Opcion4"
        ></v-textarea>
        <!-- <h1>Respuesta correcta</h1>
        <v-textarea
          v-model="correcta"
          auto-grow
          solo
          label="Correcta"
        ></v-textarea> -->
        <v-row>
          <v-col cols="4">
            <v-overflow-btn
              v-model="seleccion3"
              class="my-2"
              :items="dificultad"
              label="Dificultad"
            ></v-overflow-btn>
          </v-col>
          <v-col cols="4">
            <v-overflow-btn
              v-model="seleccion2"
              class="my-2"
              :items="categoria"
              label="Categoria"
            ></v-overflow-btn>
          </v-col>
          <v-col cols="4">
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
          </v-col>
          <v-col cols="4">
            <br />
            <v-btn @click="crearQuestion">Crear</v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="f_categoria" label="Categoria"></v-text-field>
        </v-col>
        <v-col cols="6">
          <br />
          <v-btn @click="filtrar">Filtrar</v-btn>
          <v-btn @click="change_crear">Crear Pregunta</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
          <tr
            v-for="(item, idx) in preguntas"
            :key="idx"
            @click="goToQuestion(item._id, item)"
          >
            <td class="text-truncate" style="max-width: 150px;">
              <p>{{ item.enunciado }}</p>
            </td>

            <td class="text-truncate" style="max-width: 150px;">
              <p v-for="(tema, index) in temas" :key="index">
                <span v-if="tema._id === item.tema_id">{{ tema.name }}</span>
              </p>
            </td>
            <td>{{ item.category }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(item, idx) in preguntas"
            :key="idx"
            @click="goToQuestion(item._id, item)"
          >
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
      opcion4: '',
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      correcta: '',
      seleccion: '',
      categoria: ['bomberil', 'legislacion'],
      seleccion2: '',
      dificultad: ['Facil', 'Medio', 'Dificil'],
      seleccion3: '',
      seleccion4: '',
      f_tema: '',
      f_categoria: '',
      filtro: true,
      crear: false
    }
  },
  methods: {
    crearQuestion() {
      if (this.seleccion.length > 0) {
        const newQuestion = {
          enunciado: this.enunciado,
          answers: [
            {
              respuesta: this.opcion1,
              correcta: this.checkbox1
            },
            {
              respuesta: this.opcion2,
              correcta: this.checkbox2
            },
            {
              respuesta: this.opcion3,
              correcta: this.checkbox3
            },
            {
              respuesta: this.opcion4,
              correcta: this.checkbox4
            }
          ],
          tema_id: this.id[this.nombre.indexOf(this.seleccion)],
          category: this.seleccion2,
          difficulty: this.seleccion3
        }
        console.log(newQuestion)
        API.crearQuestion(newQuestion)
      }
      // if (this.seleccion > 0) {
      //   const newQuestion = {
      //     enunciado: this.enunciado,
      //     answers_wrong: [
      //       this.opcion1,
      //       this.opcion2,
      //       this.opcion3,
      //       this.correcta
      //     ],
      //     answers_correct: this.correcta,
      //     tema_id: this.id[this.nombre.indexOf(this.seleccion)],
      //     category: this.seleccion2,
      //     difficulty: this.seleccion3
      //   }
      //   API.crearQuestion(newQuestion)
      //   location.reload()
      // } else {
      //   const newQuestion = {
      //     enunciado: this.enunciado,
      //     answers_wrong: [
      //       this.opcion1,
      //       this.opcion2,
      //       this.opcion3,
      //       this.correcta
      //     ],
      //     answers_correct: this.correcta,
      //     tema_id: this.id2[this.nombre2.indexOf(this.seleccion4)],
      //     category: this.seleccion2,
      //     difficulty: this.seleccion3
      //   }
      //   API.crearQuestion(newQuestion)
      //   location.reload()
      // }
    },
    goToQuestion(question) {
      this.$router.push(`/question/${question}`)
    },
    filtrar() {
      this.filtro = false
    },
    change_crear() {
      this.crear = true
    }
  }
}
</script>

<style>
.box {
  width: 600px;
}
</style>
