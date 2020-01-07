<template>
  <div>
    <div>
      <v-text-field
        v-model="name"
        label="Nombre"
        validate-on-blur
        append-icon="mdi-pencil"
        :rules="[rules.required]"
        @click:append="updateName"
      >
      </v-text-field>
    </div>
    <div>
      <v-text-field
        v-model="lastName"
        label="Apellido"
        append-icon="mdi-pencil"
        :rules="[rules.required]"
        @click:append="updateLastName"
      />
    </div>
    <div>
      <v-text-field
        v-model="email"
        label="Email"
        append-icon="mdi-pencil"
        :rules="[rules.required, rules.email]"
        @click:append="updateEmail"
      />
    </div>
    <div>
      <v-text-field
        v-model="phone"
        label="Telefono"
        append-icon="mdi-pencil"
        :rules="[rules.required, rules.phone]"
        @click:append="updatePhone"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      rules: {
        required: v => !!v || 'Campo Obligatorio',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email no valido'
        },
        phone: v => v.length > 8 || 'introduca todos los digitos'
      }
    }
  },
  computed: {
    Name() {
      return this.name.length
    }
  },
  methods: {
    async updateName() {
      if (this.name.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateName', this.name)
      }
    },
    async updateLastName() {
      if (this.lastName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateLastName', this.lastName)
      }
    },
    async updateEmail() {
      if (this.email.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateEmail', this.email)
      }
    },
    async updatePhone() {
      if (this.phone.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updatePhone', this.phone)
      }
    }
  }
}
</script>

<style></style>
