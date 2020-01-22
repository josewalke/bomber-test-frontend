<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Tema</th>
            <th class="text-left">Categoria</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>
              <v-btn color="error" @click="deleteTema(item)">Eliminar</v-btn>
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
  },
  methods: {
    deleteTema(tema) {
      API.deleteTema(tema._id)
      location.reload()
    }
  }
}
</script>

<style></style>
