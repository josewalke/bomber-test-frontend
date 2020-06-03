<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-card max-width="344" class="mx-auto">
        <v-card-text>
          <v-text-field
            v-model="email"
            label="E-mail"
            validate-on-blur
            :rules="[rules.required, rules.email]"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" class="mr-4" @click="reset_pass">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  layout: 'basic',
  data() {
    return {
      email: '',
      rules: {
        required: v => !!v || 'Campo requerido',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email no valido'
        }
      }
    }
  },
  methods: {
    reset_pass() {
      let body = {
        email: this.email
      }
      API.sendEmail(body)
    }
  }
}
</script>

<style scoped>
.v-form {
  margin-top: 10rem;
}
</style>
