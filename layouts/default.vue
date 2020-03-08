<template>
  <v-app>
    {{ resolucion() }}
    <div v-if="formato === 'movil'">
      <v-icon large class="ma-4" @click.stop="drawer = !drawer">
        mdi-format-align-justify
      </v-icon>

      <v-navigation-drawer v-model="drawer" left app>
        <v-list-item two-line>
          <v-list-item-avatar width="100px" height="100px">
            <img :src="image_url" />
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-if="role === 'cliente'" dense>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-content>
              <v-btn text class="justify-start" color="#6b6b6b" :to="item.page">
                <v-icon class="mr-2">{{ item.icon }}</v-icon
                ><span></span> {{ item.title }}
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
        <v-list v-else dense>
          <v-list-item v-for="item in admin" :key="item.title">
            <v-list-item-content>
              <v-btn text class="justify-start" color="#6b6b6b" :to="item.page">
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
    </div>
    <div v-else>
      <v-navigation-drawer permanent left app>
        <v-list-item two-line>
          <v-list-item-avatar width="100px" height="100px">
            <img :src="image_url" />
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-if="role === 'cliente'" dense>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-content>
              <v-btn text class="justify-start" color="#6b6b6b" :to="item.page">
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
        <v-list v-else dense>
          <v-list-item v-for="item in admin" :key="item.title">
            <v-list-item-content>
              <v-btn text class="justify-start" color="#6b6b6b" :to="item.page">
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
    </div>

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
      drawer: null,
      items: [
        { title: 'Perfil', icon: 'mdi-account', page: '/user' },
        { title: 'Test', icon: 'mdi-file-document-box', page: '/tests' },
        { title: 'Mensajes', icon: 'mdi-email', page: '/message' },
        {
          title: 'Clasificatoria',
          icon: 'mdi-playlist-star',
          page: '/clasificacion'
        },
        { title: 'Configuracion', icon: 'mdi-settings', page: '/settings' }
      ],
      admin: [
        { title: 'Alumnos', icon: 'mdi-account', page: '/dashboard' },
        { title: 'Temas', icon: 'mdi-file-document-box', page: '/temas' },
        { title: 'Mensajes', icon: 'mdi-email', page: '/message' },
        { title: 'Preguntas', icon: 'mdi-playlist-edit', page: '/question' },
        { title: 'Test', icon: 'mdi-ballot', page: '/examen' }
      ],
      formato: ''
    }
  },
  computed: {
    ...mapGetters(['userName', 'image_url', 'role'])
  },
  methods: {
    resolucion() {
      if (window.screen.width < 600) {
        this.formato = 'movil'
      } else {
        this.formato = 'ordenador'
      }
    },
    logout() {
      this.$store.commit('clearToken')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
