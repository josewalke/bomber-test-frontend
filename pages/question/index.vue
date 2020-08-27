<template>
  <div>
    <v-container>
      <div v-if="crear">
        <h1>Enunciado</h1>
        <v-textarea v-model="enunciado" auto-grow solo></v-textarea>
        <div v-if="photo.length > 0">
          <div
            class="photo-holder"
            :style="{ 'background-image': `url(${photo})` }"
          ></div>
        </div>
        <v-btn @click="uploadPhoto">Añadir photo</v-btn>
        <div class="photo-question">
          <div
            class="user-card mt-5"
            :style="{
              'background-image': `url(${photo})`
            }"
          ></div>
        </div>
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
              v-if="seleccion2 === 'Especifico de bombero'"
              v-model="seleccion4"
              class="my-2"
              :items="cat1"
              label="Tema"
            >
            </v-overflow-btn>

            <v-overflow-btn
              v-if="seleccion2 === 'Materias Jurídicas comunes'"
              v-model="seleccion4"
              class="my-2"
              :items="cat2"
              label="Tema"
            ></v-overflow-btn>

            <v-overflow-btn
              v-if="seleccion2 === 'Estatutos de autonomía'"
              v-model="seleccion4"
              class="my-2"
              :items="cat3"
              label="Tema"
            ></v-overflow-btn>
            <v-overflow-btn
              v-if="seleccion2 === 'Geografía específica'"
              v-model="seleccion4"
              class="my-2"
              :items="cat4"
              label="Tema"
            ></v-overflow-btn>

            <v-overflow-btn
              v-if="seleccion2 === 'Planes de emergencias'"
              v-model="seleccion4"
              class="my-2"
              :items="cat5"
              label="Tema"
            ></v-overflow-btn>
            <v-overflow-btn
              v-if="seleccion2 === 'Reglamentos,tasas y estatutos particulares'"
              v-model="seleccion4"
              class="my-2"
              :items="cat6"
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
        <v-col xs="6" sm="5" md="4">
          <v-select
            v-model="f_categoria"
            :items="categoria"
            label="Categoria"
            @change="reset"
          ></v-select>
        </v-col>
        <v-col xs="6" sm="5" md="4">
          <span v-if="f_categoria.length === 0 || f_categoria === 'N/A'">
            <v-select v-model="f_tema" :items="temario" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Especifico de bombero'">
            <v-select v-model="f_tema" :items="cat1" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Materias Jurídicas comunes'">
            <v-select v-model="f_tema" :items="cat2" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Estatutos de autonomía'">
            <v-select v-model="f_tema" :items="cat3" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Geografía específica'">
            <v-select v-model="f_tema" :items="cat4" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Planes de emergencias'">
            <v-select v-model="f_tema" :items="cat5" label="Tema"></v-select>
          </span>
          <span
            v-if="f_categoria === 'Reglamentos,tasas y estatutos particulares'"
          >
            <v-select v-model="f_tema" :items="cat6" label="Tema"></v-select>
          </span>
        </v-col>
        <v-col xs="5" sm="6" md="4">
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
            <th class="text-left">Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in f_question"
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
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
export default {
  async asyncData() {
    var categoria = [
      'Especifico de bombero',
      'Materias Jurídicas comunes',
      'Estatutos de autonomía',
      'Geografía específica',
      'Planes de emergencias',
      'Reglamentos,tasas y estatutos particulares'
    ]
    let temas = await API.getAllTemas()
    let temario = []
    let cat1 = []
    let id1 = []
    let cat2 = []
    let id2 = []
    let cat3 = []
    let id3 = []
    let cat4 = []
    let id4 = []
    let cat5 = []
    let id5 = []
    let cat6 = []
    let id6 = []
    for (let i = 0; i < temas.length; i++) {
      temario.push(temas[i].name)
      if (categoria[0] === temas[i].category) {
        cat1.push(temas[i].name)
        id1.push(temas[i]._id)
      }
      if (categoria[1] === temas[i].category) {
        cat2.push(temas[i].name)
        id2.push(temas[i]._id)
      }
      if (categoria[2] === temas[i].category) {
        cat3.push(temas[i].name)
        id3.push(temas[i]._id)
      }
      if (categoria[3] === temas[i].category) {
        cat4.push(temas[i].name)
        id4.push(temas[i]._id)
      }
      if (categoria[4] === temas[i].category) {
        cat5.push(temas[i].name)
        id5.push(temas[i]._id)
      }
      if (categoria[5] === temas[i].category) {
        cat6.push(temas[i].name)
        id6.push(temas[i]._id)
      }
    }
    return {
      temas,
      categoria,
      temario,
      cat1,
      cat2,
      cat3,
      cat4,
      cat5,
      cat6,
      id1,
      id2,
      id3,
      id4,
      id5,
      id6
    }
  },
  data() {
    return {
      f_categoria: '',
      f_tema: '',
      f_question: [],
      crear: false,
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
      photo: '',
      seleccion2: '',
      dificultad: ['Facil', 'Medio', 'Dificil'],
      seleccion3: '',
      seleccion4: ''
    }
  },
  mounted() {
    this.Find_end()
  },
  computed: {
    ...mapGetters(['V_categoria', 'V_tema'])
  },
  methods: {
    async filtrar() {
      this.f_question = []
      let filtros = {
        f_categoria: this.f_categoria,
        f_tema: this.f_tema
      }

      this.$store.dispatch('filtro_search', filtros)
      //por categoria solo
      if (this.f_categoria.length > 0 && this.f_tema.length === 0) {
        var body = {
          category: this.f_categoria
        }
        let question = await API.getQuestion(body)
        question.forEach(x => {
          this.f_question.push(x)
        })
      }

      for (let i = 0; i < this.temas.length; i++) {
        for (let x = 0; x < this.f_question.length; x++) {
          if (this.f_question[x].tema_id === this.temas[i]._id) {
            this.f_question[x].tema_id = this.temas[i].name
          }
        }
      }

      //por tema solo
      if (
        (this.f_tema.length > 0 && this.f_categoria.length === 0) ||
        (this.f_tema.length > 0 && this.f_categoria === 'N/A')
      ) {
        console.log('solo tema')
        for (let i = 0; i < this.temario.length; i++) {
          if (this.temas[i].name === this.f_tema) {
            let body = {
              tema_id: this.temas[i]._id
            }
            console.log(body)
            let question = await API.getQuestion(body)
            question.forEach(x => {
              this.f_question.push(x)
            })
          }
        }
        for (let i = 0; i < this.temas.length; i++) {
          for (let x = 0; x < this.f_question.length; x++) {
            if (this.f_question[x].tema_id === this.temas[i]._id) {
              this.f_question[x].tema_id = this.temas[i].name
            }
          }
        }
      }
      // tema y categoria
      if (this.f_categoria.length > 0 && this.f_tema.length > 0) {
        console.log('tema y categoria')
        for (let i = 0; i < this.temario.length; i++) {
          if (
            this.temas[i].name === this.f_tema &&
            this.temas[i].category === this.f_categoria
          ) {
            let body = {
              tema_id: this.temas[i]._id,
              category: this.temas[i].category
            }

            let question = await API.getQuestion(body)
            question.forEach(x => {
              this.f_question.push(x)
            })
          }
        }
        for (let i = 0; i < this.temas.length; i++) {
          for (let x = 0; x < this.f_question.length; x++) {
            if (this.f_question[x].tema_id === this.temas[i]._id) {
              this.f_question[x].tema_id = this.temas[i].name
            }
          }
        }
      }
    },
    reset() {
      this.f_tema = ''
    },
    goToQuestion(question) {
      this.$router.push(`/question/${question}`)
    },
    change_crear() {
      this.crear = true
    },
    crearQuestion() {
      console.log(this.seleccion4)
      if (this.seleccion2 === 'Especifico de bombero') {
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
          tema_id: this.seleccion4,
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion,
          photo: this.photo
        }
        for (let i = 0; i < this.temas.length; i++) {
          if (newQuestion.tema_id === this.temas[i].name) {
            newQuestion.tema_id = this.temas[i]._id
          }
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
        this.photo = ''
      }
      if (this.seleccion2 === 'Materias Jurídicas comunes') {
        const newQuestion = {
          enunciado: this.enunciado,
          photo: this.photo,
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
          tema_id: this.seleccion4,
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        for (let i = 0; i < this.temas.length; i++) {
          if (newQuestion.tema_id === this.temas[i].name) {
            newQuestion.tema_id = this.temas[i]._id
          }
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
        this.photo = ''
      }
      if (this.seleccion2 === 'Estatutos de autonomía') {
        const newQuestion = {
          enunciado: this.enunciado,
          photo: this.photo,
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
          tema_id: this.seleccion4,
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        for (let i = 0; i < this.temas.length; i++) {
          if (newQuestion.tema_id === this.temas[i].name) {
            newQuestion.tema_id = this.temas[i]._id
          }
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
        this.photo = ''
      }
      if (this.seleccion2 === 'Geografía específica') {
        const newQuestion = {
          enunciado: this.enunciado,
          photo: this.photo,
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
          tema_id: this.seleccion4,
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        for (let i = 0; i < this.temas.length; i++) {
          if (newQuestion.tema_id === this.temas[i].name) {
            newQuestion.tema_id = this.temas[i]._id
          }
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
        this.photo = ''
      }
      if (this.seleccion2 === 'Planes de emergencias') {
        const newQuestion = {
          enunciado: this.enunciado,
          photo: this.photo,
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
          tema_id: this.seleccion4,
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        for (let i = 0; i < this.temas.length; i++) {
          if (newQuestion.tema_id === this.temas[i].name) {
            newQuestion.tema_id = this.temas[i]._id
          }
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
        this.photo = ''
      }
      if (this.seleccion2 === 'Reglamentos,tasas y estatutos particulares') {
        const newQuestion = {
          enunciado: this.enunciado,
          photo: this.photo,
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
          tema_id: this.seleccion4,
          category: this.seleccion2,
          difficulty: this.seleccion3,
          explicacion: this.explicacion
        }
        for (let i = 0; i < this.temas.length; i++) {
          if (newQuestion.tema_id === this.temas[i].name) {
            newQuestion.tema_id = this.temas[i]._id
          }
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
        this.photo = ''
      }
    },
    photoUploader() {
      // eslint-disable-next-line no-undef
      const newWidget = cloudinary.createUploadWidget(
        {
          cloudName: 'dea2xlykc',
          uploadPreset: 'questionPhoto',
          multiple: false,
          maxFiles: 1,
          cropping: true,
          clientAllowedFormats: ['png', 'gif', 'jpeg']
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const newUrl = result.info.url
            this.photo = newUrl
          }
        }
      )
      return newWidget
    },
    uploadPhoto() {
      const widget = this.photoUploader()
      widget.open()
    },
    Find_end() {
      if (this.V_categoria.length > 0) {
        this.f_categoria = this.V_categoria
      }
      if (this.V_tema.length > 0) {
        this.f_tema = this.V_tema
      }
      this.filtrar()
    }
  },
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }]
    }
  }
}
</script>

<style>
.photo-holder {
  height: 500px;
  width: 750px;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
}
.box {
  width: 600px;
}
</style>
