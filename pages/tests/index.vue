<template>
  <div>
    <div>
      <div class="header-wraper">
        <h1>Mis Tests</h1>
        <div>
          <v-btn
            class="ma-2"
            outlined
            fab
            small
            color="#DA3E3E"
            @click="testGeneration"
          >
            <v-icon>mdi-plus-thick</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            fab
            small
            color="#DA3E3E"
            @click="goToTestConfig"
          >
            <v-icon>mdi-tune</v-icon>
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
              <th class="text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tests"
              :key="item._id"
              @click="goToTest(item._id)"
            >
              <td>{{ item.title }}</td>
              <td>
                {{
                  item.no_contestadas.length -
                    item.aciertos_num -
                    item.fallos_num
                }}
              </td>
              <td>{{ item.aciertos_num }}</td>
              <td>{{ item.fallos_num }}</td>
              <td>
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
    ...mapGetters(['tests'])
  },
  methods: {
    async testGeneration() {
      await this.$store.dispatch('createTest')
      this.$router.push(`/tests/${this.$store.state.currentTest._id}`)
    },
    goToTest(id) {
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
