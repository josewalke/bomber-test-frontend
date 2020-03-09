<template>
  <div>
    {{ resolucion() }}
    <v-row>
      <v-col cols="10" offset="1">
        <v-card class="mx-auto pt-5">
          <div
            class="user-card mt-5"
            :style="{ 'background-image': `url(${image_url})` }"
          ></div>
          <!-- <v-img :src="image_url" height="100px"></v-img> -->
          <v-card-title>
            {{ userName }}
            <br />
            {{ nickName }}
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
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="formato != 'movil'">
      <v-col md="5" offset="1">
        <v-card>
          <v-card-title v-if="mensajes === 0">
            sin menajes nuevo
          </v-card-title>
          <v-card-title v-else>
            {{ mensajes }}
            mensajes nuevos
          </v-card-title>
          <v-card-subtitle> de {{ messages.length }} mensajes </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col md="5">
        <v-card>
          <v-card-title> Suscripción {{ suscription_type }}.</v-card-title>
          <v-card-subtitle>
            válida hasta el 31 de enero de 2020
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="formato === 'movil'">
      <v-col cols="10" offset="1">
        <v-card>
          <v-card-title>
            {{ mensajes }}
            mensajes nuevos
          </v-card-title>
          <v-card-subtitle> de {{ messages.length }} mensajes </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="formato === 'movil'">
      <v-col cols="10" offset="1">
        <v-card>
          <v-card-title> Suscripción {{ suscription_type }}.</v-card-title>
          <v-card-subtitle>
            válida hasta el 31 de enero de 2020
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1">
        <v-card color="green" class="mt-2">
          <v-card-subtitle class="white--text">
            {{ aprobados }} tests aprobados de {{ tests.length }}
          </v-card-subtitle>
        </v-card>
        <v-card color="error" class="mt-2">
          <v-card-subtitle class="white--text">
            {{ suspendidos }} tests suspendidos de {{ tests.length }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      formato: ''
    }
  },
  computed: {
    ...mapGetters([
      'tests',
      'nickName',
      'userName',
      'image_url',
      'email',
      'phone',
      'mensajes',
      'MensajesTotales',
      'aprobados',
      'suspendidos',
      'total',
      'suscription_type',
      'active',
      'messages',
      'tests'
    ])
  },
  methods: {
    resolucion() {
      if (window.screen.width < 600) {
        this.formato = 'movil'
      } else {
        this.formato = 'ordenador'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-card {
  height: 200px;
  background-size: contain;
  background-position: center;
}
</style>
