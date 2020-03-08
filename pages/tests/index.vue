<template>
  <div class>
    <div>
      <div class="ml-4 mt-5 overline">Los Tests de</div>
      <div class="ml-4 mb-4 grey--text display-1 ">{{ userName }}</div>
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
              <th class="text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in sorted"
              :key="item._id"
              @click="goToTest(item._id)"
            >
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
                <div v-if="item.time_end === null">
                  <v-icon>mdi-checkbox-blank-outline</v-icon>
                </div>
                <div v-else><v-icon>mdi-check-box-outline</v-icon></div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <h1 class="ml-4">Desafio de la semana</h1>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Titulo</th>
              <th class="text-left">Preguntas</th>
              <th class="text-left">Aciertos</th>
              <th class="text-left">Fallos</th>
              <th class="text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tests"
              :key="item._id"
              @click="goToTest(item._id)"
            >
              <td v-if="item.desafio">{{ item.title }}</td>
              <td v-if="item.desafio">
                {{
                  item.no_contestadas.length -
                    item.aciertos_num -
                    item.fallos_num
                }}
              </td>
              <td v-if="item.desafio">{{ item.aciertos_num }}</td>
              <td v-if="item.desafio">{{ item.fallos_num }}</td>
              <td v-if="item.desafio">
                <span v-if="item.nota === 'suspendido'" class="red--text">{{
                  item.nota
                }}</span>
                <span v-if="item.nota === 'aprobado'" class="green--text">{{
                  item.nota
                }}</span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
// import API from '~/services/api'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['tests', 'userName', 'nickName', 'currentTest']),
    sorted() {
      let sorted = []
      for (let i = this.tests.length - 1; i > -1; i--) {
        let test = this.tests[i]
        sorted.push(test)
      }
      return sorted
    }
  },
  methods: {
    async testGeneration() {
      await this.$store.dispatch('createTest')
      this.$router.push(
        `/tests/${this.$store.state.currentTest._id}/${this.$store.state.currentTest.no_contestadas[0]._id}`
      )
    },
    async goToTest(id) {
      this.$router.push(`/tests/${id}`)
    },

    goToTestConfig() {
      this.$router.push(`/tests/config`)
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
