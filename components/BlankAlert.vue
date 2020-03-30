<template>
  <div class="pa-8 white">
    <div class="title red--text text--darken-1">
      ATENCIÓN
    </div>
    <v-divider></v-divider>
    <div class="mt-3">
      Si pasas la pregunta sin contestar se dará como contestadas en blanco.
      ¿Quieres contiunar?
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
      <v-checkbox v-model="askAgain" label="No volver a preguntar"></v-checkbox>
    </div>
    <div></div>
  </div>
</template>

<script>
// import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  props: {
    notAgainAlert: {
      type: Boolean,
      default: false
    }
  },
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
      const yes = true
      this.$emit('blank', yes, this.askAgain)
    },
    blankAnswerNo() {
      this.askAgain = false
      const no = false
      this.$emit('blank', no)
    }
  }
}
</script>

<style lang="scss" scoped></style>
