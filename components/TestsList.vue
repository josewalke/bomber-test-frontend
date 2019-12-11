<template>
  <div>
    <div class="header-wraper">
      <h1>Mis Tests</h1>
      <v-btn
        class="ma-2"
        outlined
        fab
        small
        color="#DA3E3E"
        @click="testGeneration"
      >
        <v-icon>mdi-plus-thick</v-icon>
      </v-btn>
      <!-- Modal generación test -->
      <!-- <v-dialog width="350">
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            outlined
            fab
            small
            color="#DA3E3E"
            @click="importQuestions"
            v-on="on"
          >
            <v-icon>mdi-plus-thick</v-icon>
          </v-btn>
        </template>
        <v-card>
          <h4>¿Cúantas preguntas quieres en el test?</h4>
          <v-divider></v-divider>
          <div>
            <form method="post" action="">
              <label for="name">Preguntas</label>
              <input
                id="french-hens"
                type="text"
                name="french-hens"
                value="10"
              />
            </form>
          </div>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false">
              Generar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </div>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  name: 'TestsList',
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
        { text: 'Suscripción', value: 'suscription_type' },
        { text: 'Activo', value: 'active' }
      ]
    }
  },
  methods: {
    testGeneration() {
      const token = this.$store.getters.token
      API.generateTest(token)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wraper {
  display: flex;
  justify-content: space-between;
}
</style>
