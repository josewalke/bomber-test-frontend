<template>
  <v-app>
    <v-navigation-drawer absolute permanent left>
      <v-list-item two-line>
        <v-list-item-avatar width="100px" height="100px">
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-content>
            <v-btn text class="justify-start" color="#6b6b6b" @click="prueba">
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
    <vista v-if="estado"></vista>
  </v-app>
</template>
<script>
import vista from '~/components/Prueba.vue'
export default {
  components: {
    vista
  },
  data() {
    return {
      estado: false,
      items: [
        { title: 'Perfil', icon: 'mdi-account', view: 'prueba' },
        { title: 'Test', icon: 'mdi-file-document-box', view: 'prueba' },
        { title: 'Mensaje', icon: 'mdi-email', view: 'prueba' },
        { title: 'Configuracion', icon: 'mdi-settings' }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.commit('clearToken')
      this.$router.push('/')
    },
    prueba() {
      console.log('prueba funciona')
      this.estado = true
    }
  }
}
</script>
