<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mx-auto">
        <v-img :src="image_url" height="200px"></v-img>

        <v-card-title>
          {{ username }}
        </v-card-title>

        <v-card-subtitle>
          <div>
            <font-awesome-icon icon="envelope" />
            {{ email }}
          </div>
          <div>
            <font-awesome-icon icon="phone-square" />
            {{ phone }}
          </div>
        </v-card-subtitle>
      </v-card></v-col
    >
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tests', 'username', 'image_url', 'email', 'phone'])
  }
}
</script>
