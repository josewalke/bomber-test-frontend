<template>
  <div class="pa-8 white">
    <div class="title red--text text--darken-1">
      ATENCIÓN
    </div>
    <v-divider></v-divider>
    <div class="mt-3">
      Una vez que cierre el test no podra repetirlo.¿Esta seguro que desea salir
      del test?
    </div>
    <div class="mt-3">
      <v-btn
        value="yes"
        outlined
        class="red--text text--darken-1 mr-3"
        @click="blankAnswerYes"
        >Si</v-btn
      >
      <v-btn
        id="no"
        outlined
        class="red--text text--darken-1"
        @click="blankAnswerNo"
        >No</v-btn
      >
    </div>
    <div></div>
  </div>
</template>

<script>
// import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      askAgain: false
    }
  },
  computed: {
    ...mapGetters(['token', 'userId', 'currentTestQuestion'])
  },
  methods: {
    blankAnswerYes() {
      this.$emit('endTest')
    },
    blankAnswerNo() {
      this.$emit('changeAviso')
    }
  }
}
</script>

<style lang="scss" scoped></style>
