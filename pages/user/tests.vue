<template>
  <div>
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
      </div>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="tests"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
// import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Titulo',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Aciertos', value: 'aciertos_num' },
        { text: 'Fallos', value: 'fallos_num' },
        { text: 'Nota', value: 'nota' }
      ]
    }
  },
  computed: {
    ...mapGetters(['tests'])
  },
  mounted() {
    // this.$store.dispatch('loadTest')
  },
  methods: {
    async testGeneration() {
      await this.$store.dispatch('createTest')
      this.$router.push('exam')
    }
  }
}
</script>

<style lang="scss" scoped></style>
