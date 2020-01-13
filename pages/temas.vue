<template>
  <div>
    <h1>Temario</h1>
    <v-text-field
      v-model="newTema"
      label="Crear Nuevo Tema"
      validate-on-blur
      append-icon="mdi-pencil"
    ></v-text-field>
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
      newTema: ''
    }
  },
  methods: {
    crearTema() {
      console.log(this.newTema)
      API.newTema(this.newTema)
      location.reload()
      // this.$router.push('/temas')
    }
  }
}
</script>

<style></style>
