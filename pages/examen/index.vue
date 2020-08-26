<template>
  <div id="app">
    <v-container>
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
          <v-col xs="3" sm="4" md="3" lg="3">
            <v-switch
              v-model="correctorSwitch"
              :label="`Corrección instantánea `"
              correction-on-
              color="primary"
            ></v-switch>
          </v-col>
          <v-col xs="3" sm="4" md="3" lg="3">
            <v-switch
              v-model="desafio"
              label="Desafío de la semana"
              correction-on-
              color="primary"
            ></v-switch>
          </v-col>
          <v-col xs="3" sm="5" md="3" lg="3">
            <v-btn class="mt-4" @click="testPremium">Test Premium</v-btn>
          </v-col>
          <v-col xs="3" sm="5" md="3" lg="3">
            <v-btn class="mt-4" @click="testDesafio">Desafío Automático</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-card fixd flat>
        <v-card-title>
          Selección de alumnos
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
      <v-row>
        <v-col xs="6" sm="5" md="4">
          <v-select
            v-model="f_categoria"
            :items="categoria"
            label="Categoria"
            @change="reset"
          ></v-select>
        </v-col>
        <v-col xs="6" sm="5" md="4">
          <span v-if="f_categoria.length === 0 || f_categoria === 'N/A'">
            <v-select v-model="f_tema" :items="temario" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Especifico de bombero'">
            <v-select v-model="f_tema" :items="cat1" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Materias Jurídicas comunes'">
            <v-select v-model="f_tema" :items="cat2" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Estatutos de autonomía'">
            <v-select v-model="f_tema" :items="cat3" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Geografía específica'">
            <v-select v-model="f_tema" :items="cat4" label="Tema"></v-select>
          </span>
          <span v-if="f_categoria === 'Planes de emergencias'">
            <v-select v-model="f_tema" :items="cat5" label="Tema"></v-select>
          </span>
          <span
            v-if="f_categoria === 'Reglamentos,tasas y estatutos particulares'"
          >
            <v-select v-model="f_tema" :items="cat6" label="Tema"></v-select>
          </span>
        </v-col>
        <v-col xs="5" sm="6" md="4">
          <br />
          <v-btn @click="filtrar">Filtrar</v-btn>
        </v-col>
      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Enunciado</th>
              <!-- <th class="text-left">Temario</th>
            <th class="text-left">Categoría</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in f_question"
              :key="idx"
              @click="seleccionar(item)"
            >
              <td class="text-truncate" style="max-width: 150px;">
                {{ item.enunciado }}
              </td>

              <!-- <td class="text-truncate" style="max-width: 150px;">
              {{ item.tema_id }}
            </td>
            <td>{{ item.category }}</td> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <h1>Numero de preguntas {{ selected.length }}</h1>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Enunciado</th>
              <th class="text-left">Temario</th>
              <th class="text-left">Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in selected" :key="idx" @click="Quitar(idx)">
              <td class="text-truncate" style="max-width: 150px;">
                {{ item.enunciado }}
              </td>

              <td class="text-truncate" style="max-width: 150px;">
                {{ item.tema_id }}
              </td>
              <td>{{ item.category }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn @click="crearExamen">Crear Examen</v-btn>
    </v-container>
  </div>
</template>

<script>
import API from '~/services/api'

export default {
  async asyncData() {
    const student_active = []
    const student = await API.getAllUsers()
    for (let i = 0; i < student.length; i++) {
      if (student[i].active === true) {
        student_active.push(student[i])
      }
    }
    var categoria = [
      'Especifico de bombero',
      'Materias Jurídicas comunes',
      'Estatutos de autonomía',
      'Geografía específica',
      'Planes de emergencias',
      'Reglamentos,tasas y estatutos particulares'
    ]
    let temas = await API.getAllTemas()
    let temario = []
    let cat1 = []
    let id1 = []
    let cat2 = []
    let id2 = []
    let cat3 = []
    let id3 = []
    let cat4 = []
    let id4 = []
    let cat5 = []
    let id5 = []
    let cat6 = []
    let id6 = []
    for (let i = 0; i < temas.length; i++) {
      temario.push(temas[i].name)
      if (categoria[0] === temas[i].category) {
        cat1.push(temas[i].name)
        id1.push(temas[i]._id)
      }
      if (categoria[1] === temas[i].category) {
        cat2.push(temas[i].name)
        id2.push(temas[i]._id)
      }
      if (categoria[2] === temas[i].category) {
        cat3.push(temas[i].name)
        id3.push(temas[i]._id)
      }
      if (categoria[3] === temas[i].category) {
        cat4.push(temas[i].name)
        id4.push(temas[i]._id)
      }
      if (categoria[4] === temas[i].category) {
        cat5.push(temas[i].name)
        id5.push(temas[i]._id)
      }
      if (categoria[5] === temas[i].category) {
        cat6.push(temas[i].name)
        id6.push(temas[i]._id)
      }
    }
    return {
      student_active,
      temas,
      categoria,
      temario,
      cat1,
      cat2,
      cat3,
      cat4,
      cat5,
      cat6,
      id1,
      id2,
      id3,
      id4,
      id5,
      id6
    }
  },
  data() {
    return {
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
      // desafio de la semana
      desafio: false,
      f_categoria: '',
      f_tema: '',
      f_question: [],
      crear: false,
      enunciado: '',
      opcion1: '',
      opcion2: '',
      opcion3: '',
      opcion4: '',
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      explicacion: '',
      seleccion: '',
      photo: '',
      seleccion2: '',
      dificultad: ['Facil', 'Medio', 'Dificil'],
      seleccion3: '',
      seleccion4: '',
      selected: []
    }
  },
  mounted() {},
  methods: {
    reset() {
      this.f_tema = ''
    },
    async filtrar() {
      let filtros = {
        category: this.f_categoria,
        tema_id: ''
      }
      for (let i = 0; i < this.temas.length; i++) {
        if (this.temas[i].name === this.f_tema) {
          filtros.tema_id = this.temas[i]._id
        }
      }
      console.log(filtros)
      const preguntas = await API.filtrarQuestion(filtros)
      preguntas.forEach(x => {
        this.f_question.push(x)
      })
      for (let i = 0; i < this.temas.length; i++) {
        for (let x = 0; x < this.f_question.length; x++) {
          if (this.f_question[x].tema_id === this.temas[i]._id) {
            this.f_question[x].tema_id = this.temas[i].name
          }
        }
      }
    },
    seleccionar(item) {
      this.selected.push(item)
      console.log(this.selected)
    },
    Quitar(idx) {
      console.log(idx)
      this.selected.splice(idx, 1)
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

      for (let i = 0; i < this.selected.length; i++) {
        id_questions.push(this.selected[i]._id)
      }
      // console.log(id_questions)

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
            desafio: this.desafio,
            deberes: true
          }
          API.crearExamen(test)
          this.select_student = []
          this.testName = ''
          this.id_questions = ''
          this.correctorSwitch = false
          this.desafio = false
          this.selected = []
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
              desafio: this.desafio,
              deberes: true
            }

            API.crearExamen(test)
            this.select_student = []
            this.testName = ''
            this.id_questions = ''
            this.correctorSwitch = false
            this.desafio = false
            this.selected = []
          }
        }
      }
    },
    correctionOn() {
      if (this.correctorSwitch === true) {
        this.switchStatus = 'activada'
      } else {
        this.switchStatus = 'desactivada'
      }
    },
    async testPremium() {
      const testPremium = await API.testPremium()
      const student = await API.getAllUsers()
      for (let i = 0; i < student.length; i++) {
        if (
          student[i].role === 'cliente' &&
          student[i].suscription_type === 'premium'
        ) {
          testPremium.user_id = student[i]._id
          // console.log(testPremium)
          API.crearExamen(testPremium)
          // location.reload()
        }
      }
      alert('Test premium enviado')
    },
    async testDesafio() {
      const testPremium = await API.testPremium()
      const student = await API.getAllUsers()
      const now = new Date()
      const day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()
      const month = now.getMonth() > 9 ? now.getMonth() : '0' + now.getMonth()
      const minutes =
        now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()
      // let date = now.getDate() +"/"+ now.getMonth()+1 +"/"+ now.getFullYear() + " - " + now.getHours()+ ":" + minutes
      let date =
        day +
        '/' +
        month +
        '/' +
        now.getFullYear() +
        ' - ' +
        now.getHours() +
        ':' +
        minutes
      for (let i = 0; i < student.length; i++) {
        if (student[i].role === 'cliente' && student[i].active === true) {
          let testDesafio = {
            user_id: student[i]._id,
            title: 'Desafio semanal ' + date,
            testCheck: testPremium.testCheck,
            aciertos: testPremium.aciertos,
            aciertos_num: testPremium.aciertos_num,
            fallos: testPremium.fallos,
            fallos_num: testPremium.fallos_num,
            respuestas: testPremium.respuestas,
            nota: testPremium.nota,
            no_contestadas: testPremium.no_contestadas,
            mostrar_solucion: testPremium.mostrar_solucion,
            desafio: true,
            deberes: true,
            visible: true
          }
          testPremium.user_id = student[i]._id
          testPremium.desafio = true
          API.crearExamen(testDesafio)
        }
      }
      alert('Desafia enviado')
    }
  }
}
</script>

<style></style>
