<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-tabs v-model="tab">
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
    </v-content>
  </div>
</template>

<script>
import Login from '~/components/Login'
import Signup from '~/components/Signup'
export default {
  components: { Login, Signup },
  data() {
    return {
      tab: null
    }
  }
}
</script>

<style scoped></style>
