<template>
  <v-form ref="form" lazy-validation>
    <v-card fixed flat>
      <v-card-text>
        <button>
          <img
            id="google"
            src="../static/assets/loggoogle.png"
            alt="google login"
          />
        </button>
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
          :rules="[rules.required]"
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
        <v-btn color="success" class="mr-4" @click="signup">Registrarse</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
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
        password: v => v.length > 5 || 'Contraseña demasiado corta'
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

      const response = await this.$store.dispatch('signup', user)

      if (!response.error) {
        this.$router.push('/user/')
      } else {
        alert(response.error)
      }
    }
  }
}
</script>

<style scoped>
#google {
  width: 200px;
}
</style>
