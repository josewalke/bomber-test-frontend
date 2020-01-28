<template>
  <v-row>
    <v-col cols="4">
      <h1>Titulo1</h1>
      <p>subtitulo</p>
      <v-text-field v-model="prueba" label="Nombre"></v-text-field>
      <v-btn>pulsame nene</v-btn>
    </v-col>
    <v-col cols="4">
      <h1>Titulo2</h1>
      <p>subtitulo</p>
      <v-text-field label="Apellido"></v-text-field>
      <v-btn>pulsame nene</v-btn>
    </v-col>
    <v-col cols="4">
      <span v-if="prueba === 'a'">
        <h1>Titulo3</h1>
        <p>subtitulo</p>
        <v-text-field label="Nombre"></v-text-field>
        <v-btn>pulsame nene</v-btn>
      </span>
      <span v-else-if="prueba === 'b'">
        <h1>Titulo4</h1>
        <p>subtitulo</p>
        <v-text-field label="Nombre"></v-text-field>
        <v-btn>pulsame nene</v-btn>
      </span>
      <span v-else>
        <h1>Titulo5</h1>
        <p>subtitulo</p>
        <v-select></v-select>
        <v-btn>pulsame nene</v-btn>
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      prueba: ''
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-top: 100px;
}
</style>
