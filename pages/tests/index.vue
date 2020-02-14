<template>
  <div class>
    <div>
      <div class="header-wraper">
        <h1 class="ml-4">Los Tests de {{ userName }}</h1>
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
              <th class="text-left">Titulo</th>
              <th class="text-left">Preguntas</th>
              <th class="text-left">Aciertos</th>
              <th class="text-left">Fallos</th>
              <th class="text-left">% Aciertos</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tests"
              :key="item._id"
              @click="goToTest(item._id)"
            >
              <td v-if="!item.desafio">{{ item.title }}</td>
              <td v-if="!item.desafio">
                {{ item.no_contestadas.length }}
              </td>
              <td v-if="!item.desafio">{{ item.testCheck.right }}</td>
              <td v-if="!item.desafio">{{ item.testCheck.wrong }}</td>
              <td v-if="!item.desafio">
                {{ (item.testCheck.right / item.no_contestadas.length) * 100 }}
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tests', 'userName'])
  },
  methods: {
    async testGeneration() {
      await this.$store.dispatch('createTest')
      this.$router.push(`/tests/${this.$store.state.currentTest._id}`)
    },
    goToTest(id) {
      this.$router.push(`/tests/${id}`)
      console.log(id)
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
