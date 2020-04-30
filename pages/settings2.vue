<template>
  <v-container>
    <h1>Localizacion de prueba</h1>
    <v-card class="mx-auto">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <v-text-field
              v-model="upt_telefono"
              label="Telefono"
            ></v-text-field>
            <v-text-field v-model="upt_correo" label="Correo"></v-text-field>
            <v-text-field
              v-model="upt_direccion"
              label="Direccion"
            ></v-text-field>
          </v-list-item-title>
          <v-card-actions>
            <v-btn @click="update_localizacion">Guardar</v-btn>
          </v-card-actions>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <h1>URL de las clases Online</h1>
    <v-card class="mx-auto">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>
            <v-text-field
              v-model="url_streaming"
              label="URL de la clase Streaming"
            ></v-text-field>
            <v-text-field
              v-model="contraseña_url"
              label="Contraseña"
            ></v-text-field>
          </v-list-item-title>
          <v-card-actions>
            <v-btn @click="streaming">Guardar</v-btn>
          </v-card-actions>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <h1>Ofertas de suscripcion</h1>
    <v-row class="d-flex justify-center">
      <v-col md="4" xs="12">
        <ul class="price">
          <li class="header">{{ suscripciones[0].name }}</li>
          <li class="grey">{{ suscripciones[0].precio }}</li>
          <li>{{ suscripciones[0].apartado1 }}</li>
          <li>{{ suscripciones[0].apartado2 }}</li>
          <li>{{ suscripciones[0].apartado3 }}</li>
          <li>{{ suscripciones[0].apartado4 }}</li>
        </ul>
      </v-col>
      <v-col md="4" xs="12">
        <ul>
          <li>
            <v-text-field v-model="seleccion1"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion2"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion3"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion4"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion5"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion6"></v-text-field>
          </li>
          <div class="d-flex justify-center">
            <v-btn @click="update1">Guardar</v-btn>
          </div>
        </ul>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col md="4" xs="12">
        <ul class="price">
          <li class="header">{{ suscripciones[1].name }}</li>
          <li class="grey">{{ suscripciones[1].precio }}</li>
          <li>{{ suscripciones[1].apartado1 }}</li>
          <li>{{ suscripciones[1].apartado2 }}</li>
          <li>{{ suscripciones[1].apartado3 }}</li>
          <li>{{ suscripciones[1].apartado4 }}</li>
        </ul>
      </v-col>
      <v-col md="4" xs="12">
        <ul>
          <li>
            <v-text-field v-model="seleccion7"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion8"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion9"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion10"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion11"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion12"></v-text-field>
          </li>
          <div class="d-flex justify-center">
            <v-btn @click="update2">Guardar</v-btn>
          </div>
        </ul>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col md="4" xs="12">
        <ul class="price">
          <li class="header">{{ suscripciones[2].name }}</li>
          <li class="grey">{{ suscripciones[2].precio }}</li>
          <li>{{ suscripciones[2].apartado1 }}</li>
          <li>{{ suscripciones[2].apartado2 }}</li>
          <li>{{ suscripciones[2].apartado3 }}</li>
          <li>{{ suscripciones[2].apartado4 }}</li>
        </ul>
      </v-col>
      <v-col md="4" xs="12">
        <ul>
          <li>
            <v-text-field v-model="seleccion13"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion14"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion15"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion16"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion17"></v-text-field>
          </li>
          <li>
            <v-text-field v-model="seleccion18"></v-text-field>
          </li>
          <div class="d-flex justify-center">
            <v-btn @click="update3">Guardar</v-btn>
          </div>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
export default {
  async asyncData() {
    const localizacion = await API.getAllLocalizacion()

    return { localizacion }
  },
  data() {
    return {
      seleccion1: '',
      seleccion2: '',
      seleccion3: '',
      seleccion4: '',
      seleccion5: '',
      seleccion6: '',
      seleccion7: '',
      seleccion8: '',
      seleccion9: '',
      seleccion10: '',
      seleccion11: '',
      seleccion12: '',
      seleccion13: '',
      seleccion14: '',
      seleccion15: '',
      seleccion16: '',
      seleccion17: '',
      seleccion18: '',
      upt_telefono: '',
      upt_correo: '',
      upt_direccion: '',
      url_streaming: '',
      contraseña_url: ''
    }
  },
  computed: {
    ...mapGetters(['suscripciones'])
  },
  methods: {
    async update1() {
      let body = {
        id: this.suscripciones[0]._id,
        name: '',
        precio: '',
        apartado1: '',
        apartado2: '',
        apartado3: '',
        apartado4: ''
      }
      if (this.seleccion1.length > 0) {
        body.name = this.seleccion1
      } else {
        body.name = this.suscripciones[0].name
      }
      if (this.seleccion2.length > 0) {
        body.precio = this.seleccion2
      } else {
        body.precio = this.suscripciones[0].precio
      }
      if (this.seleccion3.length > 0) {
        body.apartado1 = this.seleccion3
      } else {
        body.apartado1 = this.suscripciones[0].apartado1
      }
      if (this.seleccion4.length > 0) {
        body.apartado2 = this.seleccion4
      } else {
        body.apartado2 = this.suscripciones[0].apartado2
      }
      if (this.seleccion5.length > 0) {
        body.apartado3 = this.seleccion5
      } else {
        body.apartado3 = this.suscripciones[0].apartado3
      }
      if (this.seleccion6.length > 0) {
        body.apartado4 = this.seleccion6
      } else {
        body.apartado4 = this.suscripciones[0].apartado4
      }
      await this.$store.dispatch('putSuscription', body)
      this.seleccion1 = ''
      this.seleccion2 = ''
      this.seleccion3 = ''
      this.seleccion4 = ''
      this.seleccion5 = ''
      this.seleccion6 = ''
    },
    async update2() {
      let body = {
        id: this.suscripciones[1]._id,
        name: '',
        precio: '',
        apartado1: '',
        apartado2: '',
        apartado3: '',
        apartado4: ''
      }
      if (this.seleccion7.length > 0) {
        body.name = this.seleccion7
      } else {
        body.name = this.suscripciones[1].name
      }
      if (this.seleccion8.length > 0) {
        body.precio = this.seleccion8
      } else {
        body.precio = this.suscripciones[1].precio
      }
      if (this.seleccion9.length > 0) {
        body.apartado1 = this.seleccion9
      } else {
        body.apartado1 = this.suscripciones[1].apartado1
      }
      if (this.seleccion10.length > 0) {
        body.apartado2 = this.seleccion10
      } else {
        body.apartado2 = this.suscripciones[1].apartado2
      }
      if (this.seleccion11.length > 0) {
        body.apartado3 = this.seleccion11
      } else {
        body.apartado3 = this.suscripciones[1].apartado3
      }
      if (this.seleccion12.length > 0) {
        body.apartado4 = this.seleccion12
      } else {
        body.apartado4 = this.suscripciones[1].apartado4
      }
      await this.$store.dispatch('putSuscription', body)
      this.seleccion7 = ''
      this.seleccion8 = ''
      this.seleccion9 = ''
      this.seleccion10 = ''
      this.seleccion11 = ''
      this.seleccion12 = ''
    },
    async update3() {
      let body = {
        id: this.suscripciones[2]._id,
        name: '',
        precio: '',
        apartado1: '',
        apartado2: '',
        apartado3: '',
        apartado4: ''
      }
      if (this.seleccion13.length > 0) {
        body.name = this.seleccion13
      } else {
        body.name = this.suscripciones[2].name
      }
      if (this.seleccion14.length > 0) {
        body.precio = this.seleccion14
      } else {
        body.precio = this.suscripciones[2].precio
      }
      if (this.seleccion15.length > 0) {
        body.apartado1 = this.seleccion15
      } else {
        body.apartado1 = this.suscripciones[2].apartado1
      }
      if (this.seleccion16.length > 0) {
        body.apartado2 = this.seleccion16
      } else {
        body.apartado2 = this.suscripciones[2].apartado2
      }
      if (this.seleccion17.length > 0) {
        body.apartado3 = this.seleccion17
      } else {
        body.apartado3 = this.suscripciones[2].apartado3
      }
      if (this.seleccion18.length > 0) {
        body.apartado4 = this.seleccion18
      } else {
        body.apartado4 = this.suscripciones[2].apartado4
      }
      await this.$store.dispatch('putSuscription', body)
      this.seleccion13 = ''
      this.seleccion14 = ''
      this.seleccion15 = ''
      this.seleccion16 = ''
      this.seleccion17 = ''
      this.seleccion18 = ''
    },
    async update_localizacion() {
      let body = {
        id: this.localizacion[0]._id,
        telefono: '',
        correo: '',
        direccion: ''
      }
      if (this.upt_telefono.length > 0) {
        body.telefono = this.upt_telefono
      } else {
        body.telefono = this.localizacion[0].telefono
      }
      if (this.upt_correo.length > 0) {
        body.correo = this.upt_correo
      } else {
        body.correo = this.localizacion[0].correo
      }
      if (this.upt_direccion.length > 0) {
        body.direccion = this.upt_direccion
      } else {
        body.direccion = this.localizacion[0].direccion
      }
      await API.putLocalizacion(body)
      this.upt_telefono = ''
      this.upt_correo = ''
      this.upt_direccion = ''
    },
    async streaming() {
      var dato = await API.getURL()
      console.log(dato[0])
      let body = {
        id: dato[0]._id,
        direccion: this.url_streaming,
        contraseña: this.contraseña_url
      }
      await API.putURL(body)
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  list-style-type: none;
  margin: 0;
  padding: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.price .header {
  background-color: #da3e3e;
  color: white;
  font-size: 25px;
}
.price li {
  padding: 20px;
  text-align: center;
  background-color: white;
}
.v-card {
  width: 350px;
}
</style>
