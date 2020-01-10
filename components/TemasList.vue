<template>
  <div>
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
  name: 'TemasList',
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
        }
      ]
    }
  }
}
</script>

<style></style>
