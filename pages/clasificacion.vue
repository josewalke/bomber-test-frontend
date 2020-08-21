<template>
  <div>
    <v-container>
      <h1>
        Clasificación general
      </h1>
    </v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Clasificación</th>
            <th>Usuario</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in clasificacion" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.usuario }}</td>
            <td v-if="item.usuario === nickName">
              {{ item.puntuacion + negativos }}
            </td>
            <td v-else>{{ item.puntuacion }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container>
      <h1>
        Clasificación de la semana
      </h1>
    </v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Clasificación</th>
            <th>Usuario</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in clasificacion2" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.usuario }}</td>
            <td>
              {{ item.desafio }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
export default {
  async asyncData() {
    const student = await API.getAllUsers()
    const tests = await API.getAllTest()
    let plantilla = {
      usuario: '',
      puntuacion: ''
    }
    let contador1 = 0
    let contador2 = 0
    let desafio = 0
    let organizacion1 = []
    let organizacion2 = []
    for (let i = 0; i < student.length; i++) {
      for (let x = 0; x < tests.length; x++) {
        if (student[i]._id === tests[x].user_id) {
          if (tests[x].desafio === false) {
            contador1 +=
              tests[x].testCheck.right -
              Math.floor(tests[x].testCheck.wrong / 3)
          }

          if (
            tests[x].desafio === true &&
            tests[x].deberes === false &&
            tests[x].visible === true
          ) {
            desafio += 100
            contador2 +=
              tests[x].testCheck.right * 2 -
              Math.floor(tests[x].testCheck.wrong / 3)
          }
        }
        plantilla = {
          usuario: student[i].nickName,
          puntuacion: contador1 + student[i].negativos,
          desafio: desafio + contador2
        }
      }
      organizacion1.push(plantilla)
      organizacion2.push(plantilla)

      contador1 = 0
      contador2 = 0
      desafio = 0
    }

    let clasificacion = organizacion1.sort(function(a, b) {
      return a.puntuacion - b.puntuacion
    })

    let clasificacion2 = organizacion2.sort(function(a, b) {
      return a.desafio - b.desafio
    })

    clasificacion.reverse()
    clasificacion2.reverse()

    return { clasificacion, clasificacion2 }
  },
  computed: {
    ...mapGetters(['negativos', 'nickName'])
  }
}
</script>

<style lang="scss" scoped></style>
