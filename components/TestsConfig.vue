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
      <v-btn class="ma-2" outlined color="error" @click="testGeneration"
        >INICIAR TEST</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    temas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      testName: '',
      correction: false,
      formula: '',
      persentages: [],
      numQuestions: [10, 15, 20, 25, 30, 35, 40, 45, 50],
      numSelected: 10,
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

  computed: {
    ...mapGetters(['tests'])
  },

  numberTemasSelected() {
    return this.selected.length
  },

  methods: {
    correctionOn() {
      if (this.correctorSwitch === true) {
        this.switchStatus = 'activada'
      } else {
        this.switchStatus = 'desactivada'
      }
    },
    async testGeneration() {
      const test = {
        name: this.testName,
        number: this.numSelected,
        temas: this.selected,
        correction: this.correctorSwitch
      }
      await this.$store.dispatch('createTestConfig', test)
      this.$router.push(
        `/tests/${this.$store.state.currentTest._id}/${this.$store.state.currentTest.no_contestadas[0]._id}`
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
