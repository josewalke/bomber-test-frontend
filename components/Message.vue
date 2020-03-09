<template>
  <div>
    <div class="pa-8 white">
      <div class="overline">Duda / Impugnar</div>
      <v-radio-group v-model="type" row>
        <v-radio label="duda" value="duda" color="#DA3E3E"></v-radio>
        <v-radio label="obsoleta" value="obsoleta" color="#DA3E3E"></v-radio>
        <v-radio label="errata" value="errata" color="#DA3E3E"></v-radio>
        <v-radio label="otro" value="otro" color="#DA3E3E"></v-radio>
      </v-radio-group>
      <div>
        <v-textarea
          v-model="message"
          counter
          outlined
          color="#DA3E3E"
          no-resize
          auto-grow
        >
        </v-textarea>
      </div>
      <v-btn outlined color="#DA3E3E" small @click="sendMessage">Enviar</v-btn>
      <v-snackbar v-model="snackbar" :timeout="timeout" top>
        {{ snackbarText }}
        <v-btn color="red" text @click="snackbar = false">
          X
        </v-btn>
      </v-snackbar>
    </div>
    <!-- <v-alert
      v-model="snackbar"
      top
      color="red"
      dense
      class="overline yellow--text"
    >
      <v-icon color="yellow">mdi-alert</v-icon>
      {{ snackbarText }}
      <v-btn color="red" text class="yellow--text" @click="snackbar = false">
        Close
      </v-btn>
    </v-alert> -->
  </div>
</template>

<script>
// import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      type: '',
      snackbar: false,
      snackbarText: '',
      timeout: 1400,
      message: ''
    }
  },
  computed: {
    ...mapGetters(['token', 'userId', 'currentTestQuestion'])
  },
  methods: {
    async sendMessage() {
      if (!this.type && this.message.length < 10) {
        this.snackbar = true
        this.snackbarText = 'Seleciona una opción y escribe un mensaje'
      } else if (this.message.length < 10) {
        this.snackbar = true
        this.snackbarText = 'Mensaje demasiado corto'
      } else if (!this.type) {
        this.snackbar = true
        this.snackbarText = 'Elige un tipo de mensaje'
      } else {
        this.$emit('status', 'false')
        console.log('dentro')
        const message = {
          userId: this.userId,
          type: this.type,
          message: this.message,
          questionId: this.currentTestQuestion._id
        }
        // API.newMessage(this.token, message)
        await this.$store.dispatch('newMessage', message)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
