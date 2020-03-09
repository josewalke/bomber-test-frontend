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
            <td>{{ item.puntuacion }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  async asyncData() {
    const student = await API.getAllUsers()
    const tests = await API.getAllTest()
    let plantilla = {
      usuario: '',
      puntuacion: ''
    }
    let contador = 0
    let clasificacion = []
    for (let i = 0; i < student.length; i++) {
      for (let x = 0; x < tests.length; x++) {
        if (student[i]._id === tests[x].user_id) {
          if (tests[x].nota === 'aprobado') {
            contador++
          }
        }
        plantilla = {
          usuario: student[i].nickName,
          puntuacion: contador
        }
      }
      clasificacion.push(plantilla)
      contador = 0
    }

    return { clasificacion }
  }
}
</script>

<style lang="scss" scoped></style>
