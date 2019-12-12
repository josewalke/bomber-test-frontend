<template>
  <v-app>
    <v-navigation-drawer absolute permanent left app>
      <v-list-item two-line>
        <v-list-item-avatar width="100px" height="100px">
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-content>
            <v-btn text class="justify-start" color="#6b6b6b" :to="item.view">
              <v-icon class="mr-2">{{ item.icon }}</v-icon> {{ item.title }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn text class="justify-start" color="#6b6b6b" @click="logout">
              <v-icon class="mr-2">mdi-logout-variant</v-icon> Logout
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'Perfil', icon: 'mdi-account', view: 'profile' },
        { title: 'Test', icon: 'mdi-file-document-box', view: 'tests' }
      ]
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  methods: {
    logout() {
      this.$store.commit('clearToken')
      this.$router.push('/')
    }
  }
}
</script>
