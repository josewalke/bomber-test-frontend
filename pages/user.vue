<template>
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
          <v-btn text class="justify-start" color="#6b6b6b">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: 'Alumnos', icon: 'mdi-account' },
        { title: 'Temas', icon: 'mdi-file-document-box' },
        { title: 'Mensaje', icon: 'mdi-email' },
        { title: 'Configuracion', icon: 'mdi-settings' },
        { title: 'Logout', icon: 'mdi-logout-variant' }
      ]
    }
  }
}
</script>
