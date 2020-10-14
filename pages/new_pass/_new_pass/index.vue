<template>
  <div>
    <v-form v-if="show1" ref="form" lazy-validation>
      <v-card max-width="344" class="mx-auto">
        <v-card-text>
          <v-text-field
            v-model="new_pass"
            label="Nueva Contraseña"
            validate-on-blur
            :rules="[rules.required, rules.password]"
            type="text"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="new_pass2"
            label="Verificar Contraseña"
            validate-on-blur
            type="password"
            :rules="[rules.required, rules.password]"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            small
            color="#DA3E3E"
            class="mr-4"
            @click="reset_pass()"
            >Actualizar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  layout: 'basic',
  async asyncData({ params }) {
    var token = params.new_pass
    return { token }
  },
  data() {
    return {
      new_pass: '',
      new_pass2: '',
      show1: true,
      show2: false,
      showPassword: false,
      rules: {
        required: v => !!v || 'Campo requerido',
        password: v => v.length > 5 || 'Contraseña demasiado corta'
      }
    }
  },
  methods: {
    async reset_pass() {
      if (this.new_pass != this.new_pass2) {
        alert('no coincide la contraseña')
      } else {
        let body = {
          token: this.token,
          password: this.new_pass2
        }
        console.log(body)
        let change = await API.new_pass(body)
        if (change) {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style scoped>
.v-form {
  margin-top: 10rem;
}
h1 {
  text-align: center;
  margin-top: 10rem;
}
</style>
