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
        <h1>Explicacion de la respuesta</h1>
        <v-textarea
          v-model="explicacion"
          auto-grow
          solo
          label="Escriba la explicacion de la respuesta"
        ></v-textarea>
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
              v-if="seleccion2 === 'legislación'"
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
        <v-col cols="4">
          <v-select
            v-model="f_categoria"
            :items="categoria"
            label="Categoria"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <span v-if="f_categoria.length === 0 || f_categoria === 'N/A'">
            <v-select v-model="f_tema" :items="temario" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'bomberil'">
            <v-select v-model="f_tema" :items="nombre" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'legislación'">
            <v-select v-model="f_tema" :items="nombre2" label="Tema"></v-select>
          </span>
        </v-col>
        <v-col cols="4">
          <br />
          <v-btn @click="filtrar">Filtrar</v-btn>
          <v-btn @click="change_crear">Crear Pregunta</v-btn>
        </v-col>
        <v-col cols="8">
          <v-textarea
            v-model="searchText"
            label="Introduzca parte del enunciado con exactitud"
            auto-grow
            solo
            @keyup="buscarText"
          ></v-textarea>
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
              {{ item.enunciado }}
            </td>

            <td class="text-truncate" style="max-width: 150px;">
              {{ item.tema_id }}
            </td>
            <td>{{ item.category }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(item, idx) in filtrado"
            :key="idx"
            @click="goToQuestion(item._id, item)"
          >
            <td class="text-truncate" style="max-width: 150px;">
              {{ item.enunciado }}
            </td>
            <td class="text-truncate" style="max-width: 150px;">
              {{ item.tema_id }}
            </td>
            <td class="text-truncate">
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
    const temario = []
    for (let i = 0; i < temas.length; i++) {
      temario.push(temas[i].name)
      if (temas[i].category === 'bomberil') {
        nombre.push(temas[i].name)
        id.push(temas[i]._id)
      } else {
        nombre2.push(temas[i].name)
        id2.push(temas[i]._id)
      }
    }
    const preguntas = await API.getAllQuestions()
    for (let i = 0; i < preguntas.length; i++) {
      for (let x = 0; x < temas.length; x++) {
        if (preguntas[i].tema_id === temas[x]._id) {
          preguntas[i].tema_id = temas[x].name
        }
      }
    }

    return { nombre, id, preguntas, temas, nombre2, id2, temario }
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
      explicacion: '',
      seleccion: '',
      categoria: ['bomberil', 'legislación', 'N/A'],
      seleccion2: '',
      dificultad: ['Facil', 'Medio', 'Dificil'],
      seleccion3: '',
      seleccion4: '',
      f_tema: '',
      f_categoria: '',
      filtro: true,
      crear: false,
      filtrado: [],
      searchText: ''
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
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        API.crearQuestion(newQuestion)
        this.enunciado = ''
        this.opcion1 = ''
        this.opcion2 = ''
        this.opcion3 = ''
        this.opcion4 = ''
        this.checkbox1 = false
        this.checkbox2 = false
        this.checkbox3 = false
        this.checkbox4 = false
        this.seleccion2 = ''
        this.seleccion3 = ''
        this.seleccion = ''
        this.explicacion = ''
      } else {
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
          tema_id: this.id[this.nombre.indexOf(this.seleccion4)],
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        API.crearQuestion(newQuestion)
        this.enunciado = ''
        this.opcion1 = ''
        this.opcion2 = ''
        this.opcion3 = ''
        this.opcion4 = ''
        this.checkbox1 = false
        this.checkbox2 = false
        this.checkbox3 = false
        this.checkbox4 = false
        this.seleccion2 = ''
        this.seleccion3 = ''
        this.seleccion4 = ''
        this.explicacion = ''
      }
    },
    goToQuestion(question) {
      this.$router.push(`/question/${question}`)
    },
    filtrar() {
      this.filtro = false
      var f_categoria = this.f_categoria
      var f_tema = this.f_tema

      if (f_categoria.length > 0 && f_tema.length === 0) {
        this.filtrado = this.preguntas.filter(x => x.category === f_categoria)
      }
      if (
        (f_tema.length > 0 && f_categoria.length === 0) ||
        (f_tema.length > 0 && f_categoria === 'N/A')
      ) {
        this.filtrado = this.preguntas.filter(x => x.tema_id === f_tema)
      }
      if (f_categoria.length > 0 && f_tema.length > 0) {
        this.filtrado = this.preguntas.filter(
          x => x.tema_id === f_tema && x.category === f_categoria
        )
      }
      this.f_categoria = ''
      this.f_tema = ''
    },
    change_crear() {
      this.crear = true
    },
    buscarText() {
      this.filtrado = []
      this.filtro = false
      if (this.searchText.length > 0) {
        this.preguntas.forEach(p => {
          if (
            p.enunciado.toLowerCase().includes(this.searchText.toLowerCase())
          ) {
            this.filtrado.push(p)
          }
        })
      }
      if (this.searchText.length === 0) {
        this.filtrado = this.preguntas
      }
    }
  }
}
</script>

<style>
.box {
  width: 600px;
}
</style>
