<template>
  <div>
    <h1>Temario</h1>
    <v-text-field
      v-model="newTema"
      label="Crear Nuevo Tema"
      validate-on-blur
      append-icon="mdi-pencil"
    ></v-text-field>
    <v-select
      v-model="seleccion"
      :items="items"
      :label="'Categoria'"
    ></v-select>
    <v-btn @click="crearTema">Crear</v-btn>
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
      items: ['bomberil', 'legislacion'],
      seleccion: ''
    }
  },
  methods: {
    crearTema() {
      const body = {
        name: this.newTema,
        category: this.seleccion
      }
      console.log(body)
      API.newTema(body)
      location.reload()
    }
  }
}
</script>

<style></style>
