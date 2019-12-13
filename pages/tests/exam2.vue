<template>
  <div>
    <v-carousel hide-delimiters height="100vh">
      <v-carousel-item>
        <v-sheet color="red" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <v-container>
              <v-row>
                <v-col>
                  <h1>Enunciado</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <v-card
                    id="soy1"
                    rounded
                    tile
                    min-height="200"
                    :color="estado"
                    class="question"
                    @click="prueba(this)"
                  >
                    <h3>1</h3>
                  </v-card>
                </v-col>
                <v-col cols="5">
                  <v-card
                    rounded
                    tile
                    min-height="200"
                    :color="estado"
                    class="question"
                    @click="prueba"
                  >
                    <h3>2</h3>
                  </v-card>
                </v-col>
                <v-col cols="5">
                  <v-card
                    rounded
                    tile
                    min-height="200"
                    :color="estado"
                    class="question"
                    @click="prueba"
                  >
                    <h3>3</h3>
                  </v-card>
                </v-col>
                <v-col cols="5">
                  <v-card
                    rounded
                    tile
                    min-height="200"
                    :color="estado"
                    class="question"
                    @click="prueba"
                  >
                    <h3>4</h3>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet color="red" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">Slide2</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  data() {
    return {
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange']
    }
  },
  methods: {
    prueba(comp) {
      let id = comp.id
      console.log(id)
    }
  }
}
</script>

<style></style>
