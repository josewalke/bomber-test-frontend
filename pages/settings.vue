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
        v-model="nickName"
        label="Nombre de usuario"
        validate-on-blur
        append-icon="mdi-pencil"
        :rules="[rules.required]"
        @click:append="updateNickName"
      >
      </v-text-field>
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
    <div>
      <v-overflow-btn
        id="selector"
        v-model="seleccion"
        class="my-2"
        :items="dropdown_font"
        append-icon="mdi-pencil"
        label="Suscripcion"
        @click:append="updateSuscription"
      ></v-overflow-btn>
    </div>
    <v-btn @click="sendAll">Guardar</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nickName: '',
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
      },
      dropdown_font: ['basic', 'pro', 'premium'],
      seleccion: ''
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
    async updateNickName() {
      if (this.nickName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateNickName', this.nickName)
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
    },
    async updateSuscription() {
      if (this.seleccion.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateSuscription', this.seleccion)
      }
    },
    async sendAll() {
      if (this.name.length === 0) {
        console.log('esta vacio')
      } else {
        this.updateName()
        console.log('hola dentro')
      }
      if (this.lastName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateLastName', this.lastName)
      }
      if (this.nickName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateNickName', this.nickName)
      }
      if (this.email.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateEmail', this.email)
      }
      if (this.phone.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updatePhone', this.phone)
      }
      if (this.seleccion.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateSuscription', this.seleccion)
      }
    }
  }
}
</script>
<style></style>
