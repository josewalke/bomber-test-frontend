<template>
  <div>
    <v-container>
      <h1>
        Clasificacion del bombero mas preparado
      </h1>
    </v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Clasificacion</th>
            <th>Usuario</th>
            <th>Puntuacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in clasificacion" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.usuario }}</td>
            <td>{{ item.puntuacion + negativos }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container>
      <h1>
        Clasificacion de la semana
      </h1>
    </v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Clasificacion</th>
            <th>Usuario</th>
            <th>Puntuacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in clasificacion" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.usuario }}</td>
            <td>
              <span v-if="idx + 1 === 1"> {{ item.desafio + 50 }}</span>
              <span v-else>
                {{ item.desafio }}
              </span>
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
    let organizacion = []
    for (let i = 0; i < student.length; i++) {
      for (let x = 0; x < tests.length; x++) {
        if (student[i]._id === tests[x].user_id) {
          if (tests[x].desafio === false) {
            contador1 +=
              tests[x].testCheck.right -
              Math.floor(tests[x].testCheck.wrong / 3)
          }
          if (tests[x].desafio === true && tests[x].deberes === false) {
            console.log('es true')
            desafio += 100
            contador2 +=
              tests[x].testCheck.right * 2 -
              Math.floor(tests[x].testCheck.wrong / 3)
          }
        }
        plantilla = {
          usuario: student[i].nickName,
          puntuacion: contador1,
          desafio: desafio + contador2
        }
      }
      organizacion.push(plantilla)
      contador1 = 0
      contador2 = 0
      desafio = 0
    }

    let clasificacion = organizacion

    console.log(clasificacion)
    return { clasificacion }
  },
  computed: {
    ...mapGetters(['negativos'])
  }
}
</script>

<style lang="scss" scoped></style>
