<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mx-auto">
        <v-img
          src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-8.jpg"
          height="200px"
        ></v-img>

        <v-card-title>
          {{ usuario.name }}
          {{ usuario.lastName }}
        </v-card-title>

        <v-card-subtitle>
          <div>
            <font-awesome-icon icon="envelope" />
            {{ usuario.email }}
          </div>
          <div>
            <font-awesome-icon icon="phone-square" />
            {{ usuario.phone }}
          </div>
        </v-card-subtitle>
      </v-card></v-col
    >
  </v-row>
</template>

<script>
import API from '~/services/api'

export default {
  async asyncData({ store }) {
    const prueba = store.state.userId
    const user = await API.getUserById(prueba)
    return { usuario: user }
  }
}
</script>
