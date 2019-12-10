<template>
  <div>
    <h1>Alumnos</h1>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'StudentsList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Apellidos', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Teléfono', value: 'phone' },
        { text: 'Suscripción', value: 'suscription' },
        { text: 'Activo', value: 'active' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped></style>
