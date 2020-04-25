<template>
  <v-form ref="form" lazy-validation>
    <v-card fixed flat>
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
          v-model="nickName"
          label="Nombre de usuario"
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
        <div class="text-center">
          <v-sheet id="alert" class="white--text" color="red"> </v-sheet>
        </div>
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
      email: 'Leo@gmail.com',
      password: '123456',
      name: 'leo',
      nickName: 'hotLeo',
      lastName: 'valdez',
      phone: '123456789',
      showPassword: false,
      rules: {
        required: v => !!v || 'Campo Obligatorio',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email no valido'
        },
        password: v => v.length > 5 || 'Contraseña demasiado corta',
        phone: v => v.length > 8 || 'introduca todos los digitos'
      }
    }
  },

  methods: {
    async signup() {
      let re = /\S+@\S+\.\S+/
      if (re.test(this.email)) {
        const user = {
          name: this.cap(this.name),
          nickName: this.nickName,
          email: this.email,
          password: this.password,
          lastName: this.cap(this.lastName),
          phone: this.phone
        }

        const response = await this.$store.dispatch('signup', user)

        if (!response.error) {
          this.$router.push('/user/')
        } else {
          let html = 'E-mail ya registrado'
          document.getElementById('alert').innerText = html
        }
      }
    },
    cap(string) {
      return string
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
  }
}
</script>

<style scoped>
#google {
  width: 200px;
}
</style>
