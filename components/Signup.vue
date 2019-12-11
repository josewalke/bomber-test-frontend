<template>
  <div>
    <v-row>
      <v-col cols="10" offset-md="1">
        <v-form ref="form" lazy-validation>
          <v-card fixed flat>
            <v-card-title>
              <h2>Sign Up</h2>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="name"
                label="Nombre"
                :rules="[rules.required]"
                validate-on-blur
              />

              <v-text-field
                v-model="lastName"
                label="Apellidos"
                :rules="[rules.required]"
                validate-on-blur
              />

              <v-text-field
                v-model="phone"
                label="Telefono"
                :rules="[rules.required, rules.phone]"
                validate-on-blur
              />

              <v-text-field
                v-model="email"
                label="E-mail"
                :rules="[rules.required, rules.email]"
                validate-on-blur
              />

              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.password]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Contraseña"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" class="mr-4" @click="signup"
                >Sign Up</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      lastName: '',
      phone: '',
      showPassword: false,
      rules: {
        required: v => !!v || 'Campo Obligatorio',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email no valido'
        },
        password: v => v.length > 5 || 'Contraseña demasiado corta',
        phone: v => v.length === 9 || 'Telefono no valido'
      }
    }
  },
  methods: {
    async signup() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        lastName: this.lastName,
        phone: this.phone
      }

      const newToken = await axios.post('auth/signup', user)
      if (!newToken.error) {
        this.$store.commit('saveToken', newToken.data)
        this.$router.push('/user/profile')
      } else {
        alert(newToken.error)
      }
    }
  }
}
</script>

<style scoped></style>
