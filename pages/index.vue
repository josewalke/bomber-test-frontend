<template>
  <div>
    <v-app-bar class="nav-bar" fixed flat>
      <v-toolbar-title class="white--text font-weight-black" v-text="title" />
      <v-spacer />
      <!-- inicio nav del ordenador -->
      <v-btn text class="white--text btn-ordenador">Home</v-btn>
      <v-btn text class="white--text btn-ordenador">Precios</v-btn>
      <v-btn text class="white--text btn-ordenador" to="/auth"
        >Login/Registro</v-btn
      >
      <!-- inicio modal -->
      <v-dialog max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Login/Registro</v-btn>
        </template>
        <v-card>
          <v-row align="center" justify="center">
            <v-col cols="12" md="6">
              <v-tabs>
                <v-tab key="1" :href="`#tab-1`">Login</v-tab>
                <v-tab key="2" :href="`#tab-2`">Signup</v-tab>
                <v-tab-item key="1" value="tab-1">
                  <v-row class="py-7">
                    <v-col>
                      <Login />
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item key="2" value="tab-2">
                  <v-row class="py-7">
                    <v-col>
                      <Signup />
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <!-- final modal -->
      <!-- final nav del ordenador -->
      <!-- inicio nav del movil -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text class="menu" v-on="on">
            <v-icon class="white--text">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-btn text :to="item.to">{{ item.title }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- final nav del movil -->
    </v-app-bar>
    <div class="hero-banner">
      <v-layout class="banner-text" column justify-center align-center>
        <h1>PREPÁRATE PARA TU FUTURO CON NOSOTROS</h1>
        <p>la mayor base de datos de preguntas de examen</p>
        <v-btn rounded height="75" class="btn-big white--text" color="#DA3E3E"
          >Prueba gratis</v-btn
        >
      </v-layout>
    </div>
    <div class="quotes">
      <h1>+ de 2.000 preguntas</h1>
      <p>de examen con las que prepararte y realizar simulacros de examen</p>
    </div>
    <div class="table-wraper">
      <div class="table-container">
        <div class="columns">
          <ul class="price">
            <li class="header">Basic</li>
            <li class="grey">$ 9.99 / year</li>
            <li>10GB Storage</li>
            <li>10 Emails</li>
            <li>10 Domains</li>
            <li>1GB Bandwidth</li>
            <li class="grey"><a href="#" class="button">Sign Up</a></li>
          </ul>
        </div>
        <div class="columns">
          <ul class="price">
            <li class="header">Pro</li>
            <li class="grey">$ 24.99 / year</li>
            <li>25GB Storage</li>
            <li>25 Emails</li>
            <li>25 Domains</li>
            <li>2GB Bandwidth</li>
            <li class="grey"><a href="#" class="button">Sign Up</a></li>
          </ul>
        </div>
        <div class="columns">
          <ul class="price">
            <li class="header">Premium</li>
            <li class="grey">$ 49.99 / year</li>
            <li>50GB Storage</li>
            <li>50 Emails</li>
            <li>50 Domains</li>
            <li>5GB Bandwidth</li>
            <li class="grey"><a href="#" class="button">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </div>
    <v-footer class="text-center">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h1 class="white--text">Siguenos en las redes</h1>
        </v-col>
        <v-col cols="4">
          <v-icon class="white--text" x-large>mdi-instagram</v-icon>
          <v-icon class="white--text" x-large>mdi-facebook-box</v-icon>
          <v-icon class="white--text" x-large>mdi-twitter-box</v-icon>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Login from '~/components/Login.vue'
import Signup from '~/components/Signup.vue'
export default {
  components: {
    Login,
    Signup
  },
  data() {
    return {
      title: 'Oposicion de Bombero',
      items: [{ title: 'Login', to: '/auth' }]
    }
  },
  layout: 'basic'
}
</script>
<style lang="scss" scoped>
.nav-bar {
  background-color: rgba(255, 0, 0, 0);
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

.btn-big {
  margin-left: 40%;
  font-size: 1.4rem;
}
.quotes {
  height: 400px;
  text-align: center;
  padding-top: 7rem;
  h1 {
    font-size: 3.4rem;
    color: #da3e3e;
  }
  p {
    font-size: 1.7rem;
  }
}
//table
.table-wraper {
  margin: 0 auto;
  background-image: url('../static/assets/table.jpg');
  background-size: cover;
  background-position: center;
  height: 550px;
  width: 100%;
  padding-top: 1rem;
}
.table-container {
  width: 70%;
  margin: 0 auto;
}

.columns {
  float: left;
  width: 33.3%;
  padding: 8px;
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

.button {
  background-color: #e26767;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
}

.v-footer {
  background-color: #da3e3e;
}

@media only screen and (max-width: 600px) {
  .columns {
    width: 100%;
  }
  .btn-ordenador {
    display: none;
  }
}
@media only screen and (min-width: 600px) {
  .menu {
    display: none;
  }
}
</style>
