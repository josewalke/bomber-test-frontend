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
    <v-row>
      <v-col md="6" offset="3">
        <v-card>
          <v-card-title>
            <h4>Para activar su cuenta</h4>
          </v-card-title>

          <v-card-actions>
            <p>
              Deberá comunicarse con el profesor a traves del:<br />
              correo {{ localizacion[0].correo }} <br />
              móvil {{ localizacion[0].telefono }}
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="false">
      <v-col v-if="formato != 'movil'" md="6" offset="3">
        <v-card v-if="suscription_type === 'basic'">
          <v-card-title>
            <h4>Pago de Suscripción BASIC</h4>
          </v-card-title>
          <StripeBasic></StripeBasic>
        </v-card>
        <v-card v-if="suscription_type === 'pro'">
          <v-card-title>
            <h4>Pago de Suscripción PRO</h4>
          </v-card-title>
          <StripePro></StripePro>
        </v-card>
        <v-card v-if="suscription_type === 'premium'">
          <v-card-title>
            <h4>Pago de Suscripción PREMIUM</h4>
          </v-card-title>
          <StripePremium></StripePremium>
        </v-card>
      </v-col>
      <v-col v-if="formato != 'ordenador'" cols="10" offset="1">
        <v-card v-if="suscription_type === 'basic'">
          <v-card-title>
            <h4>Pago de Suscripción BASICO</h4>
          </v-card-title>
          <StripeBasic></StripeBasic>
        </v-card>
        <v-card v-if="suscription_type === 'pro'">
          <v-card-title>
            <h4>Pago de Suscripción PRO</h4>
          </v-card-title>
          <StripePro></StripePro>
        </v-card>
        <v-card v-if="suscription_type === 'premium'">
          <v-card-title>
            <h4>Pago de Suscripción PREMIUM</h4>
          </v-card-title>
          <StripePremium></StripePremium>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="suscription_type === 'premium' || suscription_type === 'pro'">
      <v-col md="10" offset="1">
        <v-card>
          <h1>Clases por Streaming</h1>
          <v-card-subtitle>
            <a :href="url[0].direccion">Asistir a una clase</a>
            <p>contraseña: {{ url[0].contraseña }}</p>
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
            válida hasta el
            {{ new Date(parseInt(suscription_end_active)).getDate() }} de
            {{ meses[new Date(parseInt(suscription_end_active)).getMonth()] }}
            de
            {{ new Date(parseInt(suscription_end_active)).getFullYear() }}
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
            válida hasta el
            {{ new Date(parseInt(suscription_end_active)).getDate() }} de
            {{ meses[new Date(parseInt(suscription_end_active)).getMonth()] }}
            de
            {{ new Date(parseInt(suscription_end_active)).getFullYear() }}
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
import API from '~/services/api'
import StripeBasic from '~/components/StripeBasic.vue'
import StripePro from '~/components/StripePro.vue'
import StripePremium from '~/components/StripePremium.vue'
export default {
  components: {
    StripeBasic,
    StripePro,
    StripePremium
  },
  async asyncData() {
    const url = await API.getURL()
    const localizacion = await API.getAllLocalizacion()

    return { url, localizacion }
  },
  data() {
    return {
      formato: '',
      meses: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ]
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
      'tests',
      'suscription_end_active'
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
