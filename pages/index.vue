<template>
  <div>
    {resolucion()}
    <!-- Empieza Barra de inicio -->
    <v-app-bar class="nav-bar" fixed flat color="rgba(184, 0, 0, 1)">
      <v-toolbar-title class="white--text font-weight-black" v-text="title" />
      <v-spacer />
      <!-- inicio modal -->
      <v-dialog max-width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Login/Registro</v-btn>
        </template>
        <v-card>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="6">
              <v-tabs v-model="tab">
                <v-tab key="1" :href="`#tab-1`">Registro</v-tab>
                <v-tab key="2" :href="`#tab-2`">Login</v-tab>
                <v-tab-item key="1" value="tab-1">
                  <v-row class="py-2">
                    <v-col cols="12">
                      <Signup />
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item key="2" value="tab-2">
                  <v-row class="py-2">
                    <v-col>
                      <Login />
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <!-- final modal -->
    </v-app-bar>
    <!-- Final de Barra de inicio -->
    <!-- Inicio de Foto de bombero -->
    <div :class="formato === 'movil' ? 'hero-banner' : 'hero-banner-movil'">
      <v-layout
        :class="formato === 'movil' ? 'banner-text' : 'banner-text-movil'"
        column
        justify-center
        align-center
      >
        <h1>Conviértete en Bombero</h1>
        <br />
        <p class="subtitle">
          La mayor Base de Datos <br />de preguntas de examen
        </p>
        <v-dialog max-width="500">
          <template v-slot:activator="{ on }">
            <v-btn
              rounded
              height="75"
              class="btn-big white--text"
              color="#DA3E3E"
              xs="4"
              dark
              v-on="on"
              >Prueba gratis</v-btn
            >
          </template>
          <v-card>
            <v-row align="center" justify="center">
              <v-col cols="12" md="6">
                <v-tabs v-model="tab">
                  <v-tab key="1" :href="`#tab-1`">Registro</v-tab>
                  <v-tab-item key="1" value="tab-1">
                    <v-row class="py-2">
                      <v-col cols="12">
                        <SignupPrueba />
                      </v-col>
                    </v-row>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
    <!-- Final de la Foto de bombero -->
    <!-- Inicio del Espacio en blanco -->
    <div class="quotes ma-12">
      <h1>+15.000 Preguntas de Examen</h1>
      <p>con las que prepararte para aprobar la Oposición de Bombero</p>
    </div>
    <!-- Final del Espacio en blanco -->
    <!-- Inicio de Tabla de suscripcion -->
    <div class="table-wraper" md="height: 550px;" xs="height: 1600px;">
      <div class="table-container">
        <v-row>
          <v-col md="4" xs="12">
            <ul class="price">
              <li class="header">{{ suscripcion[0].name }}</li>
              <li class="grey">{{ suscripcion[0].precio }}€/mes</li>
              <li>{{ suscripcion[0].apartado1 }}</li>
              <li>{{ suscripcion[0].apartado2 }}</li>
              <li>{{ suscripcion[0].apartado3 }}</li>
              <li>{{ suscripcion[0].apartado4 }}</li>
              <li class="grey">
                <v-dialog max-width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Registrate</v-btn>
                  </template>
                  <v-card>
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="6">
                        <v-tabs v-model="tab">
                          <v-tab key="1" :href="`#tab-1`">Regístro</v-tab>
                          <v-tab key="2" :href="`#tab-2`">Login</v-tab>
                          <v-tab-item key="1" value="tab-1">
                            <v-row class="py-2">
                              <v-col cols="12">
                                <Signup />
                              </v-col>
                            </v-row>
                          </v-tab-item>
                          <v-tab-item key="2" value="tab-2">
                            <v-row class="py-2">
                              <v-col>
                                <Login />
                              </v-col>
                            </v-row>
                          </v-tab-item>
                        </v-tabs>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </li>
            </ul>
          </v-col>
          <v-col md="4" xs="12">
            <ul class="price">
              <li class="header">{{ suscripcion[1].name }}</li>
              <li class="grey">{{ suscripcion[1].precio }}€/mes</li>
              <li>{{ suscripcion[1].apartado1 }}</li>
              <li>{{ suscripcion[1].apartado2 }}</li>
              <li>{{ suscripcion[1].apartado3 }}</li>
              <li>{{ suscripcion[1].apartado4 }}</li>
              <li class="grey">
                <v-dialog max-width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Regístrate</v-btn>
                  </template>
                  <v-card>
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="6">
                        <v-tabs v-model="tab">
                          <v-tab key="1" :href="`#tab-1`">Regístro</v-tab>
                          <v-tab key="2" :href="`#tab-2`">Login</v-tab>
                          <v-tab-item key="1" value="tab-1">
                            <v-row class="py-2">
                              <v-col cols="12">
                                <Signup />
                              </v-col>
                            </v-row>
                          </v-tab-item>
                          <v-tab-item key="2" value="tab-2">
                            <v-row class="py-2">
                              <v-col>
                                <Login />
                              </v-col>
                            </v-row>
                          </v-tab-item>
                        </v-tabs>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </li>
            </ul>
          </v-col>
          <v-col md="4" xs="12">
            <ul class="price">
              <li class="header">{{ suscripcion[2].name }}</li>
              <li class="grey">{{ suscripcion[2].precio }}€/mes</li>
              <li>{{ suscripcion[2].apartado1 }}</li>
              <li>{{ suscripcion[2].apartado2 }}</li>
              <li>{{ suscripcion[2].apartado3 }}</li>
              <li>{{ suscripcion[2].apartado4 }}</li>
              <li class="grey">
                <v-dialog max-width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Regístrate</v-btn>
                  </template>
                  <v-card>
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="6">
                        <v-tabs v-model="tab">
                          <v-tab key="1" :href="`#tab-1`">Regístro</v-tab>
                          <v-tab key="2" :href="`#tab-2`">Login</v-tab>
                          <v-tab-item key="1" value="tab-1">
                            <v-row class="py-2">
                              <v-col cols="12">
                                <Signup />
                              </v-col>
                            </v-row>
                          </v-tab-item>
                          <v-tab-item key="2" value="tab-2">
                            <v-row class="py-2">
                              <v-col>
                                <Login />
                              </v-col>
                            </v-row>
                          </v-tab-item>
                        </v-tabs>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- Fin de Tabla de suscripcion -->
    <!-- Inicio del Footer -->
    <v-footer class="text-center" color="rgba(184, 0, 0, 1)">
      <v-row align="center" justify="center">
        <v-col md="6" xs="12">
          <h1 class="white--text">Siguenos en las redes</h1>
          <v-col align="center" justify="center">
            <a href="https://www.instagram.com/oposicionbomberos/">
              <v-icon class="white--text" x-large>mdi-instagram</v-icon>
            </a>
            <a href="https://www.facebook.com/oposicionbomberoslaspalmas/">
              <v-icon class="white--text" x-large>mdi-facebook</v-icon>
            </a>
          </v-col>
        </v-col>
        <v-col md="6" xs="12">
          <h1 class="white--text">Localizanos</h1>
          <v-col align="center" justify="center">
            <h3 class="white--text">Teléfono:{{ localizacion[0].telefono }}</h3>
            <h3 class="white--text">Correo:{{ localizacion[0].correo }}</h3>
            <h3 class="white--text">
              Dirección:{{ localizacion[0].direccion }}
            </h3>
          </v-col>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import API from '~/services/api'
import Login from '~/components/Login.vue'
import Signup from '~/components/Signup.vue'
import SignupPrueba from '~/components/SignupPrueba.vue'
export default {
  components: {
    Login,
    Signup,
    SignupPrueba
  },
  async asyncData() {
    const suscripcion = await API.getAllSuscription()
    const localizacion = await API.getAllLocalizacion()

    return { suscripcion, localizacion }
  },
  data() {
    return {
      title: 'Oposiciones de Bomberos',
      items: [{ title: 'Login', to: '/auth' }],
      tab: null,
      formato: ''
    }
  },
  method: {
    resolucion() {
      if (window.screen.width < 600) {
        this.formato = 'movil'
      } else {
        this.formato = 'ordenador'
      }
    }
  },
  layout: 'basic'
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: rgba(184, 0, 0, 1);
}
.hero-banner {
  color: rgba(255, 0, 0, 1);
  background-image: url('../static/assets/banner.jpg');
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-blend-mode: darken;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom right, #002f4b, #dc4225);
    opacity: 0;
  }
}
.hero-banner-movil {
  color: rgba(255, 0, 0, 1);
  background-image: url('../static/assets/banner.jpg');
  width: 100vw;
  height: 125vh;
  background-position: center;
  background-size: cover;
  background-blend-mode: darken;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom right, #002f4b, #dc4225);
    opacity: 0;
  }
}
.banner-text {
  margin-left: 40%;
  h1 {
    color: #ffffff;
    font-size: 3rem;
    margin-top: 40%;
    z-index: 1;
  }
  p {
    color: #ffffff;
    font-size: 2.2rem;
    margin-top: -20px;
    z-index: 1;
  }
}
.banner-text-movil {
  margin-left: 40%;
  h1 {
    color: #ffffff;
    font-size: 2rem;
    margin-top: 40%;
    z-index: 1;
  }
  p {
    color: #ffffff;
    font-size: 2rem;
    margin-top: -20px;
    z-index: 1;
  }
}
.quotes {
  text-align: center;

  h1 {
    font-size: 3.4rem;
    color: #da3e3e;
  }
  p {
    font-size: 1.7rem;
  }
}
.table-wraper {
  margin: 0 auto;
  background-image: url('../static/assets/table.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  padding-top: 1rem;
}
.table-container {
  width: 70%;
  margin: 0 auto;
}
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
.v-footer {
  background-color: #da3e3e;
}
a {
  text-decoration: none;
}
</style>
