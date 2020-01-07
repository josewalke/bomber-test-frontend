<template>
  <div>
    <div>
      <v-text-field
        v-model="name"
        label="Nombre"
        validate-on-blur
        append-icon="mdi-pencil"
        @click:append="updateName"
      >
      </v-text-field>
    </div>
    <div>
      <v-text-field
        v-model="lastName"
        label="Apellido"
        append-icon="mdi-pencil"
        @click:append="updateLastName"
      />
    </div>
    <div>
      <v-text-field v-model="email" label="Email" validate-on-blur />
    </div>
    <div>
      <v-text-field v-model="phone" label="Telefono" validate-on-blur />
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
      phone: ''
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
    }
  }
}
</script>

<style></style>
