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
            <td v-if="item.name != 'Sin Tema'">{{ item.name }}</td>
            <td v-if="item.name != 'Sin Tema'">{{ item.category }}</td>
            <td v-if="item.name != 'Sin Tema'">
              <v-dialog max-width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="error" dark v-on="on">Eliminar</v-btn>
                </template>
                <v-card>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"
                        >Atencion</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >Si acepta borrar este tema las preguntas relacionadas
                        se veran afectadas.<br />
                        ¿Esta seguro de borrarlo?
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions align="center" justify="center">
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="deleteTema(item)"
                      >Eliminar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
  },
  methods: {
    deleteTema(tema) {
      this.$store.dispatch('cambiarTemas', tema)
    }
  }
}
</script>

<style></style>
