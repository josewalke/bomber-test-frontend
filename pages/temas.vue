<template>
  <div>
    <h1>Temario</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="newTema"
          label="Crear Nuevo Tema"
          validate-on-blur
          append-icon="mdi-pencil"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="seleccion"
          :items="items"
          :label="'Seleccionar Categoria'"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <br />
        <v-btn @click="crearTema">Crear</v-btn>
      </v-col>
    </v-row>
    <TemasList :items="temas"></TemasList>
  </div>
</template>

<script>
import API from '~/services/api'
import TemasList from '~/components/TemasList.vue'
export default {
  components: {
    TemasList
  },
  async asyncData() {
    const temas = await API.getAllTemas()
    return { temas }
  },
  data() {
    return {
      newTema: '',
      items: [
        'Especifico de bombero',
        'Materias Jurídicas comunes',
        'Geografía específica',
        'Planes de emergencias',
        'Reglamentos,tasas y estatutos particulares'
      ],
      seleccion: ''
    }
  },
  methods: {
    async crearTema() {
      const body = {
        name: this.newTema,
        category: this.seleccion
      }
      let newTema = await API.newTema(body)
      if (newTema) {
        // location.reload()
        this.newTema = ''
        this.seleccion = ''
        this.temas = await API.getAllTemas()
        console.log(this.temas)
      }
    }
  }
}
</script>

<style></style>
