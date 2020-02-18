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
        <v-row>
          <v-col cols="3">
            <v-switch
              v-model="correctorSwitch"
              :label="`Corrección instantánea ${switchStatus}`"
              correction-on-
              color="primary"
            ></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch
              v-model="desafio"
              label="Desafio de la semana"
              correction-on-
              color="primary"
            ></v-switch>
          </v-col>
          <v-col cols="3">
            <v-btn class="mt-4" @click="testPremium">Test Premium</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn class="mt-4" @click="testDesafio">Desafio Semanal</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-card fixd flat>
        <v-card-title>
          Seleccion de alumnos
          <v-switch
            v-model="allStudent"
            label="Todos los estudiantes"
            correction-on-
            color="primary"
            class="ml-4"
          ></v-switch>
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
          :items="student_active"
          item-key="_id"
          single-select
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
    const student_active = []
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
    for (let i = 0; i < student.length; i++) {
      if (student[i].active === true) {
        student_active.push(student[i])
      }
    }
    return { student_active, temas, bomberil, legislacion }
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
      allStudent: false,
      search_student: '',
      singleSelect: false,
      select_student: [],
      headers_student: [
        {
          text: 'Nombre',
          sortable: true,
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
    async crearExamen() {
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

      let respuestas = []
      id_questions.forEach(q => {
        respuestas.push({ id: q, answered: false })
      })

      let testCheck = { right: 0, wrong: 0, blank: id_questions.length }
      if (this.allStudent === false) {
        for (let x = 0; x < this.select_student.length; x++) {
          const test = {
            user_id: this.select_student[x]._id,
            title: this.testName + ' ' + date,
            testCheck: testCheck,
            no_contestadas: id_questions,
            aciertos: [],
            aciertos_num: 0,
            fallos: [],
            respuestas: respuestas,
            fallos_num: 0,
            nota: 0,
            mostrar_solucion: this.correctorSwitch,
            desafio: this.desafio
          }
          API.crearExamen(test)
          location.reload()
        }
      } else {
        const students = await API.getAllUsers()
        for (let i = 0; i < students.length; i++) {
          if (students[i].active === true && students[i].role === 'cliente') {
            const test = {
              user_id: students[i]._id,
              title: this.testName + ' ' + date,
              testCheck: testCheck,
              no_contestadas: id_questions,
              aciertos: [],
              aciertos_num: 0,
              fallos: [],
              respuestas: respuestas,
              fallos_num: 0,
              nota: 0,
              mostrar_solucion: this.correctorSwitch,
              desafio: this.desafio
            }
            API.crearExamen(test)
            location.reload()
          }
        }
      }
    },
    async testPremium() {
      const testPremium = await API.testPremium()
      const student = await API.getAllUsers()
      for (let i = 0; i < student.length; i++) {
        if (
          student[i].role === 'cliente' &&
          student[i].suscription_type === 'Premium'
        ) {
          testPremium.user_id = student[i]._id
          API.crearExamen(testPremium)
          location.reload()
        }
      }
    },
    async testDesafio() {
      const testPremium = await API.testPremium()
      const student = await API.getAllUsers()
      for (let i = 0; i < student.length; i++) {
        if (student[i].role === 'cliente' && student[i].active === true) {
          let testDesafio = {
            user_id: student[i]._id,
            title: testPremium.title,
            testCheck: testPremium.testCheck,
            aciertos: testPremium.aciertos,
            aciertos_num: testPremium.aciertos_num,
            fallos: testPremium.fallos,
            fallos_num: testPremium.fallos_num,
            respuestas: testPremium.respuestas,
            nota: testPremium.nota,
            no_contestadas: testPremium.no_contestadas,
            mostrar_solucion: testPremium.mostrar_solucion,
            desafio: true
          }
          testPremium.user_id = student[i]._id
          testPremium.desafio = true

          API.crearExamen(testDesafio)
        }
      }
      location.reload()
    }
  }
}
</script>

<style></style>
