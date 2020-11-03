<template>
  <div>
    <v-container>
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
    </v-container>
    <v-container>
      <div v-for="(pdf, idx) in pdfs" :key="idx">
        <h2>{{ pdf.name }}</h2>
        <iframe
          :src="pdf.src"
          :width="pdf.width"
          :height="pdf.height"
          :frameborder="pdf.frameborder"
          :marginwidth="pdf.marginwidth"
          :marginheight="pdf.marginheight"
          :scrolling="pdf.scrolling"
          allowfullscreen
        >
        </iframe>
      </div>
    </v-container>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  async asyncData() {
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
      f_categoria: '',
      f_tema: '',
      pdfs: ''
    }
  },
  methods: {
    reset() {
      this.f_tema = ''
    },
    async filtrar() {
      //por categoria solo
      if (this.f_categoria.length > 0 && this.f_tema.length === 0) {
        console.log('solo categoria')
        let body = {
          categoria: this.f_categoria
        }

        this.pdfs = await API.getPdf(body)

        console.log(this.pdf)
      }

      //por tema solo
      if (
        (this.f_tema.length > 0 && this.f_categoria.length === 0) ||
        (this.f_tema.length > 0 && this.f_categoria === 'N/A')
      ) {
        console.log('solo tema')
        let body = {
          tema: this.f_tema
        }

        this.pdfs = await API.getPdf(body)

        console.log(this.pdf)
      }
      // tema y categoria
      if (this.f_categoria.length > 0 && this.f_tema.length > 0) {
        console.log('tema y categoria')
        let body = {
          categoria: this.f_categoria,
          tema: this.f_tema
        }
        this.pdfs = await API.getPdf(body)
        console.log(this.pdf)
      }
    }
  }
}
</script>

<style></style>
