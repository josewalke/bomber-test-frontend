<template>
  <div>
    <h1>Enunciado</h1>
    {{ updatePregunta.enunciado }}
    {{ photo }}
    <v-textarea v-model="newEnunciado" auto-grow solo></v-textarea>
    <v-btn @click="updateEnunciado">Actualizar</v-btn>
    <div>
      <!-- <div v-if="updatePregunta.imagen_url > 0"> -->
      <div
        class="photo-holder"
        :style="{ 'background-image': `url(${updatePregunta.imagen_url})` }"
      ></div>
    </div>
    <v-btn @click="uploadPhoto">Elegir photo</v-btn>
    <div class="photo-question">
      <div
        class="user-card mt-5"
        :style="{
          'background-image': `url(${photo})`
        }"
      ></div>
    </div>
    <h1
      :class="
        updatePregunta.answers[0].correcta === true
          ? `green--text`
          : `black--text`
      "
    >
      Opcion1
    </h1>
    {{ updatePregunta.answers[0].respuesta }}
    <v-textarea v-model="opcion1" auto-grow solo></v-textarea>
    <v-btn @click="updateOpcion1">Actualizar</v-btn>
    <h1
      :class="
        updatePregunta.answers[1].correcta === true
          ? `green--text`
          : `black--text`
      "
    >
      Opcion2
    </h1>
    {{ updatePregunta.answers[1].respuesta }}
    <v-textarea v-model="opcion2" auto-grow solo></v-textarea>
    <v-btn @click="updateOpcion2">Actualizar</v-btn>
    <h1
      :class="
        updatePregunta.answers[2].correcta === true
          ? `green--text`
          : `black--text`
      "
    >
      Opcion3
    </h1>
    {{ updatePregunta.answers[2].respuesta }}
    <v-textarea v-model="opcion3" auto-grow solo></v-textarea>
    <v-btn @click="updateOpcion3">Actualizar</v-btn>
    <h1
      :class="
        updatePregunta.answers[3].correcta === true
          ? `green--text`
          : `black--text`
      "
    >
      Opcion4
    </h1>
    {{ updatePregunta.answers[3].respuesta }}
    <v-textarea v-model="opcion4" auto-grow solo></v-textarea>
    <v-btn @click="updateOpcion4">Actualizar</v-btn>

    <h1>Explicación</h1>
    {{ updatePregunta.explicacion }}
    <v-textarea v-model="explicacion" auto-grow solo></v-textarea>
    <v-btn @click="updateExplicacion">Actualizar</v-btn>
    <!-- ============================================ -->
    <v-row>
      <v-col cols="4">
        <h1>Dificultad</h1>
        <p>{{ updatePregunta.difficulty }}</p>
        <v-overflow-btn
          v-model="seleccion2"
          class="my-2"
          :items="dificultad"
          label="Dificultad"
        ></v-overflow-btn>
        <v-btn @click="updateDificultad">Actualizar</v-btn>
      </v-col>
      <v-col cols="4">
        <h1>Categoria</h1>
        <p>{{ updatePregunta.category }}</p>
        <v-overflow-btn
          v-model="seleccion"
          class="my-2"
          :items="categoria"
          label="Categoria"
        ></v-overflow-btn>
        <v-btn @click="updateCategoria">Actualizar</v-btn>
      </v-col>
      <v-col cols="4">
        <h1>Tema</h1>
        <p v-if="ver">{{ temas[posicion].name }}</p>
        <p v-else>{{ seleccion3 }}</p>
        <v-overflow-btn
          v-if="seleccion === 'Especifico de bombero'"
          v-model="seleccion3"
          class="my-2"
          :items="nombre"
          label="Tema"
        ></v-overflow-btn>
        <v-overflow-btn
          v-else-if="seleccion === 'Materias Jurídicas comunes'"
          v-model="seleccion4"
          class="my-2"
          :items="nombre2"
          label="Tema"
        ></v-overflow-btn>
        <v-overflow-btn
          v-else-if="seleccion === 'Estatutos de autonomía'"
          v-model="seleccion5"
          class="my-2"
          :items="nombre3"
          label="Tema"
        ></v-overflow-btn>
        <v-overflow-btn
          v-else-if="seleccion === 'Geografía específica'"
          v-model="seleccion6"
          class="my-2"
          :items="nombre4"
          label="Tema"
        ></v-overflow-btn>
        <v-overflow-btn
          v-else-if="seleccion === 'Planes de emergencias'"
          v-model="seleccion7"
          class="my-2"
          :items="nombre5"
          label="Tema"
        ></v-overflow-btn>
        <v-overflow-btn v-else class="my-2" label="Tema"></v-overflow-btn>
        <v-btn @click="updateTema">Actualizar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
export default {
  async asyncData({ params, store }) {
    const pregunta = await API.getQuestionById(params.question)
    const temas = await API.getAllTemas()
    store.dispatch('updateQuestion', pregunta)

    let posicion = ''
    const nombre = []
    const id = []
    const nombre2 = []
    const id2 = []
    const nombre3 = []
    const id3 = []
    const nombre4 = []
    const id4 = []
    const nombre5 = []
    const id5 = []
    for (let i = 0; i < temas.length; i++) {
      if (pregunta.tema_id === temas[i]._id) {
        posicion = i
      }

      if (temas[i].category === 'Especifico de bombero') {
        nombre.push(temas[i].name)
        id.push(temas[i]._id)
      }
      if (temas[i].category === 'Materias Jurídicas comunes') {
        nombre2.push(temas[i].name)
        id2.push(temas[i]._id)
      }
      if (temas[i].category === 'Estatutos de autonomía') {
        nombre3.push(temas[i].name)
        id3.push(temas[i]._id)
      }
      if (temas[i].category === 'Geografía específica') {
        nombre4.push(temas[i].name)
        id4.push(temas[i]._id)
      }
      if (temas[i].category === 'Planes de emergencias') {
        nombre5.push(temas[i].name)
        id5.push(temas[i]._id)
      }
    }

    return {
      temas,
      posicion,
      nombre,
      id,
      nombre2,
      id2,
      nombre3,
      id3,
      nombre4,
      id4,
      nombre5,
      id5
    }
  },
  data() {
    return {
      newEnunciado: '',
      opcion1: '',
      opcion2: '',
      opcion3: '',
      opcion4: '',
      explicacion: '',
      categoria: [
        'Especifico de bombero',
        'Materias Jurídicas comunes',
        'Estatutos de autonomía',
        'Geografía específica',
        'Planes de emergencias'
      ],
      seleccion: '',
      dificultad: ['Facil', 'Medio', 'Dificil'],
      seleccion2: '',
      seleccion3: '',
      seleccion4: '',
      seleccion5: '',
      seleccion6: '',
      seleccion7: '',
      ver: true,
      photo: ''
    }
  },
  computed: {
    ...mapGetters(['updatePregunta'])
  },
  methods: {
    updateEnunciado() {
      if (this.newEnunciado.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          enunciado: this.newEnunciado
        }
        this.$store.dispatch('updateEnunciado', body)
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
            this.updatePhoto()
          }
        }
      )
      return newWidget
    },
    uploadPhoto() {
      const widget = this.photoUploader()
      widget.open()
    },
    updatePhoto() {
      console.log(this.photo)
      if (this.photo.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          imagen_url: this.photo
        }
        this.$store.dispatch('updateQuestionPhoto', body)
      }
    },
    updateOpcion1() {
      if (this.opcion1.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          answers: [
            {
              respuesta: this.opcion1,
              correcta: this.updatePregunta.answers[0].correcta
            },
            {
              respuesta: this.updatePregunta.answers[1].respuesta,
              correcta: this.updatePregunta.answers[1].correcta
            },
            {
              respuesta: this.updatePregunta.answers[2].respuesta,
              correcta: this.updatePregunta.answers[2].correcta
            },
            {
              respuesta: this.updatePregunta.answers[3].respuesta,
              correcta: this.updatePregunta.answers[3].correcta
            }
          ]
        }
        this.$store.dispatch('updateOpcion', body)
      }
    },
    updateOpcion2() {
      if (this.opcion2.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          answers: [
            {
              respuesta: this.updatePregunta.answers[0].respuesta,
              correcta: this.updatePregunta.answers[0].correcta
            },
            {
              respuesta: this.opcion2,
              correcta: this.updatePregunta.answers[1].correcta
            },
            {
              respuesta: this.updatePregunta.answers[2].respuesta,
              correcta: this.updatePregunta.answers[2].correcta
            },
            {
              respuesta: this.updatePregunta.answers[3].respuesta,
              correcta: this.updatePregunta.answers[3].correcta
            }
          ]
        }
        this.$store.dispatch('updateOpcion', body)
      }
    },
    updateOpcion3() {
      if (this.opcion3.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          answers: [
            {
              respuesta: this.updatePregunta.answers[0].respuesta,
              correcta: this.updatePregunta.answers[0].correcta
            },
            {
              respuesta: this.updatePregunta.answers[1].respuesta,
              correcta: this.updatePregunta.answers[1].correcta
            },
            {
              respuesta: this.opcion3,
              correcta: this.updatePregunta.answers[2].correcta
            },
            {
              respuesta: this.updatePregunta.answers[3].respuesta,
              correcta: this.updatePregunta.answers[3].correcta
            }
          ]
        }
        this.$store.dispatch('updateOpcion', body)
      }
    },
    updateOpcion4() {
      if (this.opcion4.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          answers: [
            {
              respuesta: this.updatePregunta.answers[0].respuesta,
              correcta: this.updatePregunta.answers[0].correcta
            },
            {
              respuesta: this.updatePregunta.answers[1].respuesta,
              correcta: this.updatePregunta.answers[1].correcta
            },
            {
              respuesta: this.updatePregunta.answers[2].respuesta,
              correcta: this.updatePregunta.answers[2].correcta
            },
            {
              respuesta: this.opcion4,
              correcta: this.updatePregunta.answers[3].correcta
            }
          ]
        }
        this.$store.dispatch('updateOpcion', body)
      }
    },
    updateCategoria() {
      const body = {
        id: this.updatePregunta._id,
        category: this.seleccion
      }
      this.$store.dispatch('updateCategoria', body)
    },
    updateDificultad() {
      const body = {
        id: this.updatePregunta._id,
        difficulty: this.seleccion2
      }
      this.$store.dispatch('updateDifficulty', body)
    },
    updateTema() {
      if (this.seleccion === 'Especifico de bombero') {
        const body = {
          id: this.updatePregunta._id,
          tema_id: this.id[this.nombre.indexOf(this.seleccion3)]
        }
        this.$store.dispatch('updateTema', body)
        this.ver = false
      }
      if (this.seleccion === 'Materias Jurídicas comunes') {
        const body = {
          id: this.updatePregunta._id,
          tema_id: this.id2[this.nombre2.indexOf(this.seleccion4)]
        }
        this.$store.dispatch('updateTema', body)
        this.ver = false
      }
      if (this.seleccion === 'Estatutos de autonomía') {
        const body = {
          id: this.updatePregunta._id,
          tema_id: this.id3[this.nombre3.indexOf(this.seleccion5)]
        }
        this.$store.dispatch('updateTema', body)
        this.ver = false
      }
      if (this.seleccion === 'Geografía específica') {
        const body = {
          id: this.updatePregunta._id,
          tema_id: this.id4[this.nombre4.indexOf(this.seleccion6)]
        }
        this.$store.dispatch('updateTema', body)
        this.ver = false
      }
      if (this.seleccion === 'Planes de emergencias') {
        const body = {
          id: this.updatePregunta._id,
          tema_id: this.id5[this.nombre5.indexOf(this.seleccion7)]
        }
        this.$store.dispatch('updateTema', body)
        this.ver = false
      }
    },
    updateExplicacion() {
      if (this.explicacion.length > 0) {
        const body = {
          id: this.updatePregunta._id,
          explicacion: this.explicacion
        }
        this.$store.dispatch('updateExplicacion', body)
      }
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
  background-color: red;
}
</style>
