<template>
  <div>
    <div>
      <v-text-field v-model="userName" label="Nombre" validate-on-blur />
    </div>
    <div>
      <v-text-field v-model="email" label="Email" validate-on-blur />
    </div>
    <div>
      <v-text-field v-model="phone" label="Telefono" validate-on-blur />
    </div>
    <div>
      <v-text-field
        v-model="suscription_type"
        label="Suscripción"
        validate-on-blur
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'tests',
      'userName',
      'image_url',
      'email',
      'phone',
      'mensajes',
      'MensajesTotales',
      'aprobados',
      'suspendidos',
      'total',
      'suscription_type'
    ])
  }
}
</script>

<style></style>
