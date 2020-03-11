<template>
  <div>
    <v-card class="mx-auto">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <v-text-field label="Telefono"></v-text-field>
            <v-text-field label="Correo"></v-text-field>
            <v-text-field label="Direccion"></v-text-field>
          </v-list-item-title>
          <v-card-actions>
            <v-btn>Guardar</v-btn>
          </v-card-actions>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.v-card {
  width: 350px;
}
</style>
