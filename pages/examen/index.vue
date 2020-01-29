<template>
  <div>
    <v-form>
      <h1>Configuración de test</h1>
      <v-card fixd flat>
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
      </v-card>
      <v-card fixd flat>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="numSelected"
              :items="numQuestions"
              label="Nº de preguntas"
              outlined
              :rules="[rules.required]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <!-- {{ selectedCheck() }} -->
            <v-select
              v-model="selected"
              :items="temas"
              item-text="name"
              item-value="id"
              outlined
              multiple
            ></v-select>
          </v-col>
        </v-row>
        {{ correctionOn() }}
        <v-switch
          v-model="correctorSwitch"
          :label="`Corrección instantánea ${switchStatus}`"
          correction-on-
        ></v-switch>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  async asyncData() {
    const student = await API.getAllUsers()
    const temas = await API.getAllTemas()
    return { student, temas }
  },
  data() {
    return {
      testName: '',
      correction: false,
      formula: '',
      persentages: [],
      numQuestions: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      numSelected: 0,
      selected: [],
      alert: '',
      dialog: true,
      radioGroup: 1,
      correctorSwitch: false,
      switchStatus: '',
      rules: {
        required: v => !!v || 'Campo Obligatorio'
      }
    }
  },
  methods: {
    correctionOn() {
      if (this.correctorSwitch === true) {
        this.switchStatus = 'activada'
      } else {
        this.switchStatus = 'desactivada'
      }
    }
  }
}
</script>

<style></style>
