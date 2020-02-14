<template>
  <div>
    <h1>{{ currentTest.title }}</h1>
    <h1>{{ currentTest.respuestas }}</h1>
    <v-list
      v-for="(item, idx) in currentTest.no_contestadas"
      :key="item.id"
      dense
      flat
    >
      <v-card-subtitle>{{ findIfAnswered(item) }}</v-card-subtitle>
      <v-card-title>{{ idx }}. {{ item.enunciado }}</v-card-title>
      <v-card-subtitle>{{ findTemaName(item) }}</v-card-subtitle>
      <v-card-subtitle>{{ checkbox[idx] }}</v-card-subtitle>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  async fetch({ params, store }) {
    const test = await API.getTest(params.test)
    store.commit('saveCurrentTest', test)
  },
  async asyncData() {
    const temas = await API.getAllTemasNames()
    return { temas }
  },
  data() {
    return {
      checkbox: []
    }
  },
  computed: {
    ...mapGetters(['currentTest', 'question'])
  },
  methods: {
    findTemaName(item) {
      console.log('aqui estamos')
      console.log(item)
      var temaName = this.temas.filter(elem => elem.id == item.tema_id)
      return temaName[0].name
    },
    findIfAnswered(item) {
      var answered = this.currentTest.respuestas.find(res => res.id == item._id)
      console.log(answered.answered)
      answered.answered
        ? this.checkbox.push('Contestada')
        : this.checkbox.push('No contestada')
    }
  }
}
</script>

<style lang="scss" scoped></style>
