<template>
  <div class>
    <div>
      <div class="ml-4 mt-5 overline">Los Tests de</div>
      <div class="ml-4 mb-4 grey--text display-1 ">{{ nickName }}</div>
      <div class="header-wraper">
        <div>
          <v-btn
            class="ma-2"
            outlined
            small
            color="#DA3E3E"
            @click="testGeneration"
          >
            TEST ALEATORIO
            <!-- <v-icon>mdi-plus-thick</v-icon> fab -->
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            small
            color="#DA3E3E"
            @click="goToTestConfig"
          >
            <!-- <v-icon>mdi-tune</v-icon> fab -->
            CONFIGURAR TEST
          </v-btn>
        </div>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Título</th>
              <th class="text-left">Preguntas</th>
              <th class="text-left">Aciertos</th>
              <th class="text-left">Fallos</th>
              <th class="text-left">En Blanco</th>
              <th class="text-left">% Aciertos</th>
              <th class="text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sorted" :key="item._id" @click="goToTest(item)">
              <td v-if="!item.desafio">
                {{ item.title
                }}<span v-if="item.mostrar_solucion">
                  <v-icon small right class="red--text">mdi-eye</v-icon></span
                >
              </td>
              <td v-if="!item.desafio">
                {{ item.no_contestadas.length }}
              </td>
              <td v-if="!item.desafio">{{ item.testCheck.right }}</td>
              <td v-if="!item.desafio">{{ item.testCheck.wrong }}</td>
              <td v-if="!item.desafio">{{ item.testCheck.blank }}</td>
              <td v-if="!item.desafio">
                {{ (item.testCheck.right / item.no_contestadas.length) * 100 }}
              </td>
              <td v-if="!item.desafio">
                <span v-if="item.nota > 0">{{ item.nota }}</span>
                <span v-else>0</span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <h1 class="ml-4">Desafío de la semana</h1>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Título</th>
              <th class="text-left">Preguntas</th>
              <th class="text-left">Aciertos</th>
              <th class="text-left">Fallos</th>
              <th class="text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sorted" :key="item._id" @click="goToTest(item)">
              <td v-if="item.desafio">{{ item.title }}</td>
              <td v-if="item.desafio">
                {{ item.no_contestadas.length }}
              </td>
              <td v-if="item.desafio">{{ item.testCheck.right }}</td>
              <td v-if="item.desafio">{{ item.testCheck.wrong }}</td>
              <td v-if="item.desafio">
                <span v-if="item.nota > 0">{{ item.nota }}</span>
                <span v-if="item.nota < 0">0</span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store }) {
    console.log(store.getters.userId)
    const tests = await API.getAllTestById(store.getters.userId)
    return { tests }
  },
  data() {
    return {
      user_id: '',
      sorted: []
    }
  },
  computed: {
    ...mapGetters(['userName', 'nickName', 'currentTest', 'active', 'userId'])
    // sorted() {
    //   let sorted = []
    //   for (let i = this.tests.length - 1; i > -1; i--) {
    //     let test = this.tests[i]
    //     if (test.user_id === this.userId) {
    //       sorted.push(test)
    //     }
    //   }

    //   return sorted
    // }
  },
  mounted() {
    this.user_id = this.userId
    this.sortedTest()
  },
  methods: {
    async testGeneration() {
      if (this.active === true) {
        console.log('crear test aleatorio')
        await this.$store.dispatch('createTest')
        this.$router.push(`/tests/${this.$store.state.currentTest._id}/`)
      } else {
        alert('Necesita activar la cuenta')
      }
    },
    async goToTest(item) {
      if (item.time_end === null) {
        console.log('iniciar test')
        this.$router.push(`/tests/${item._id}`)
      } else {
        if (item.deberes === true) {
          let test = await this.$store.dispatch('getByTestId', item._id)
          if (test === true) {
            console.log('iniciar test marcado')
            this.$router.push(`/tests/${this.$store.state.currentTest._id}/`)
            await this.$store.dispatch('updateDeberes', item._id)
          }
        } else {
          console.log('mostrar resumen')
          this.$router.push(`/tests/${item._id}/resumen`)
        }
      }
    },
    goToTestConfig() {
      if (this.active === true) {
        this.$router.push(`/tests/config`)
      } else {
        alert('para realizar un test primero debe activar su cuenta')
      }
    },
    sortedTest() {
      for (let i = this.tests.length - 1; i > -1; i--) {
        let test = this.tests[i]
        if (test.user_id === this.userId) {
          this.sorted.push(test)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wraper {
  display: flex;
  justify-content: space-between;
}
</style>
