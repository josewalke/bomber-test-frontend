<template>
  <v-container>
    <div>
      <v-form>
        <h1>Configuración de test</h1>

        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-model="testName"
              label="Nombre del test"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
        {{ correctionOn() }}
        <v-switch
          v-model="correctorSwitch"
          :label="`Corrección instantánea ${switchStatus}`"
          correction-on-
          color="primary"
        ></v-switch>
        <v-switch
          v-model="desafio"
          label="Desafio de la semana"
          correction-on-
          color="primary"
        ></v-switch>
      </v-form>
      <v-card fixd flat>
        <v-card-title>
          Seleccion de alumnos
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_student"
            label="Busqueda"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="select_student"
          :headers="headers_student"
          :items="student"
          item-key="name"
          show-select
          class="elevation-1"
          :search="search_student"
        >
        </v-data-table>
      </v-card>
      <!-- ============================================Elegir preguntas=========================== -->
      <h1>Preguntas</h1>
      <v-card fixd flat>
        <v-card-title>
          Bomberil
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_question"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="select_question"
          :search="search_question"
          :headers="headers_question"
          :items="bomberil"
          :single-select="singleSelect"
          item-key="enunciado"
          show-select
          class="elevation-1"
        >
        </v-data-table>
        <v-card-title>
          Legislacion
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          v-model="select_question"
          :search="search_question"
          :headers="headers_question"
          :items="legislacion"
          :single-select="singleSelect"
          item-key="enunciado"
          show-select
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </div>
    <br />
    <v-btn @click="crearExamen">Crear Examen</v-btn>
  </v-container>
</template>

<script>
import API from '~/services/api'
export default {
  async asyncData() {
    const student = await API.getAllUsers()
    const temas = await API.getAllTemas()
    const preguntas = await API.getAllQuestions()
    const bomberil = []
    const legislacion = []
    for (let i = 0; i < preguntas.length; i++) {
      for (let x = 0; x < temas.length; x++) {
        if (preguntas[i].tema_id === temas[x]._id) {
          preguntas[i].tema_id = temas[x].name
          if (preguntas[i].category === 'bomberil') {
            bomberil.push(preguntas[i])
          } else {
            legislacion.push(preguntas[i])
          }
        }
      }
    }
    return { student, temas, bomberil, legislacion }
  },
  data() {
    return {
      // zona de configuracion del test
      testName: '',
      correction: false,
      formula: '',
      persentages: [],
      alert: '',
      dialog: true,
      correctorSwitch: false,
      switchStatus: '',
      rules: {
        required: v => !!v || 'Campo Obligatorio'
      },
      // tabla de usuarios
      search_student: '',
      singleSelect: false,
      select_student: [],
      headers_student: [
        {
          text: 'Nombre',
          sortable: false,
          value: 'name'
        },
        { text: 'Apellido', value: 'lastName' },
        { text: 'Usuario', value: 'nickName' }
      ],
      search_question: '',
      select_question: [],
      headers_question: [
        {
          text: 'Enunciado',
          align: 'left',
          sortable: false,
          value: 'enunciado'
        },
        { text: 'Tema', value: 'tema_id' }
      ],
      // desafio de la semana
      desafio: false
    }
  },
  methods: {
    correctionOn() {
      if (this.correctorSwitch === true) {
        this.switchStatus = 'activada'
      } else {
        this.switchStatus = 'desactivada'
      }
    },
    crearExamen() {
      const id_questions = []
      const now = new Date()
      let date =
        now.getDate() +
        '/' +
        now.getMonth() +
        1 +
        '/' +
        now.getFullYear() +
        ' - ' +
        now.getHours() +
        ':' +
        now.getMinutes(9)

      for (let i = 0; i < this.select_question.length; i++) {
        id_questions.push(this.select_question[i]._id)
      }
      for (let x = 0; x < this.select_student.length; x++) {
        const test = {
          user_id: this.select_student[x]._id,
          title: this.testName + ' ' + date,
          no_contestadas: id_questions,
          aciertos: [],
          aciertos_num: 0,
          fallos: [],
          fallos_num: 0,
          nota: 0,
          mostrar_solucion: this.correctorSwitch,
          desafio: this.desafio
        }
        API.crearExamen(test)
      }
    }
  }
}
</script>

<style></style>
