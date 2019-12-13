<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ currentTest.no_contestadas[0].enunciado }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-card
          rounded
          tile
          min-height="200"
          class="question"
          @click="selectAnswer(1)"
        >
          <h3>{{ currentTest.no_contestadas[0].answer_wrong[0] }}</h3>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          rounded
          tile
          min-height="200"
          class="question"
          @click="selectAnswer(2)"
        >
          <h3>{{ currentTest.no_contestadas[0].answer_wrong[1] }}</h3>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          rounded
          tile
          min-height="200"
          class="question"
          @click="selectAnswer(3)"
        >
          <h3>{{ currentTest.no_contestadas[0].answer_wrong[2] }}</h3>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          rounded
          tile
          min-height="200"
          class="question"
          @click="selectAnswer(4)"
        >
          <h3>{{ currentTest.no_contestadas[0].answer_wrong[3] }}</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapGetters } from 'vuex'
import API from '~/services/api'

export default {
  layout: 'basic',
  // computed: {
  //   ...mapGetters(['currentTest'])
  // },
  async asyncData() {
    const test = await API.getTest(this.$route.query.question)
    return {
      currentTest: test
    }
  },
  methods: {
    selectAnswer(number) {
      console.log(number)
    }
  }
}
</script>

<style scoped>
.enunciado {
  margin: 150px auto;
}
.btn-size {
  height: 100%;
}
.question {
  padding: 10px;
}
</style>
