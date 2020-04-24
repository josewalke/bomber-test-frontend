<template>
  <v-form ref="form" lazy-validation>
    <v-card fixed flat>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="[rules.required, rules.email]"
          validate-on-blur
        />

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :rules="[rules.required]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          @click:append="showPassword = !showPassword"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" class="mr-4" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // email: 'admin@gmail.com',
      email: 'jose@gmail.com',
      password: '123456',
      showPassword: false,
      rules: {
        required: v => !!v || 'Item is required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    async login() {
      const user = {
        email: this.email,
        password: this.password
      }

      const response = await this.$store.dispatch('login', user)

      if (!response.error) {
        if (this.role === 'cliente') {
          this.$router.push('/user')
        }
        if (this.role === 'admin') {
          const res_admin = await this.$store.dispatch('saveMessageAdmin')
          if (!res_admin) {
            this.$router.push('/dashboard')
          }
        }
        if (this.role === 'prueba') {
          this.$router.push('/user')
        }
      } else {
        alert(response.error)
      }
    }
  }
}
</script>

<style scoped></style>
