<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userName'])
  },
  methods: {
    logout() {
      this.$store.commit('clearToken')
    }
  }
}
</script>
