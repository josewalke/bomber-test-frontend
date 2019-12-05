<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>

    <v-footer fixed app class="text-center">
      <v-row align="center" justify="center">
        <span>&copy; 2019 - {{ title }}</span>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: 'Reboot Final Project'
    }
  },
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
