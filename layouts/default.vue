<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="userName">
        Hi {{ userName }}
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </div>
      <v-btn class="btn-login" v-else text to="/auth">Login</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text class="menu" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-btn text :to="item.to">{{ item.title }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app class="text-center">
      <v-row align="center" justify="center">
        <span>&copy; 2019 - {{ title }}</span>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script scoped>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: 'Reboot Final Project',
      items: [{ title: 'Login', to: '/auth' }]
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
<style>
@media screen and (min-width: 600px) {
  .menu {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .btn-login {
    display: none;
  }
}
</style>
