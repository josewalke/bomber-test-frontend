<template>
  <div>
    <v-container v-if="crear">
      <v-text-field v-model="name" class="max-width" label="Nombre del PDF" />
      <v-text-field v-model="file" label="Inserte el iframe" />

      <v-select
        v-model="select_categoria"
        :items="categoria"
        label="Categoria"
      ></v-select>
      <span v-if="select_categoria.length === 0 || select_categoria === 'N/A'">
        <v-select
          v-model="select_tema"
          :items="temario"
          label="Tema"
        ></v-select>
      </span>

      <span v-if="select_categoria === 'Especifico de bombero'">
        <v-select v-model="select_tema" :items="cat1" label="Tema"></v-select>
      </span>
      <span v-if="select_categoria === 'Materias Jurídicas comunes'">
        <v-select v-model="select_tema" :items="cat2" label="Tema"></v-select>
      </span>
      <span v-if="select_categoria === 'Estatutos de autonomía'">
        <v-select v-model="select_tema" :items="cat3" label="Tema"></v-select>
      </span>
      <span v-if="select_categoria === 'Geografía específica'">
        <v-select v-model="select_tema" :items="cat4" label="Tema"></v-select>
      </span>
      <span v-if="select_categoria === 'Planes de emergencias'">
        <v-select v-model="select_tema" :items="cat5" label="Tema"></v-select>
      </span>
      <span
        v-if="select_categoria === 'Reglamentos,tasas y estatutos particulares'"
      >
        <v-select v-model="select_tema" :items="cat6" label="Tema"></v-select>
      </span>

      <v-btn color="success" class="mr-4" @click="guardar">Guardar</v-btn>
      <v-btn color="success" class="mr-4" @click="visualizar"
        >Visualizar PDF</v-btn
      >

      <br />
      <iframe
        :src="src"
        :width="width"
        :height="height"
        :frameborder="frameborder"
        :marginwidth="marginwidth"
        :marginheight="marginheight"
        :scrolling="scrolling"
        allowfullscreen
      >
      </iframe>
    </v-container>
    <v-container>
      <v-row>
        <v-col xs="6" sm="6" md="4" class="ma-3">
          <v-select
            v-model="f_categoria"
            :items="categoria"
            label="Categoria"
            @change="reset"
          ></v-select>
        </v-col>
        <v-col xs="6" sm="6" md="4" class="ma-3">
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
        <v-col xs="12" sm="5" md="4" class="ma-3">
          <br />
          <v-btn class="ma-3" @click="filtrar">Filtrar</v-btn>
          <v-btn class="ma-3" @click="change_crear">Crear Pdf</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <div v-for="(pdf, idx) in pdfs" :key="idx">
        <v-row class="ma-3">
          <h2 class="ma-3">
            {{ pdf.name }}
          </h2>
          <v-btn class="ma-3" color="error" @click="borrar(idx)">Borrar</v-btn>
        </v-row>

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
import { mapGetters } from 'vuex'
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
      file: '',
      src: '',
      width: '',
      height: '',
      frameborder: '',
      marginwidth: '',
      marginheight: '',
      scrolling: '',
      style: '',
      name: '',
      select_categoria: '',
      select_tema: '',
      f_categoria: '',
      f_tema: '',
      pdfs: '',
      crear: false
    }
  },
  mounted() {
    this.Find_end()
  },
  computed: {
    ...mapGetters(['V_categoria', 'V_tema'])
  },
  methods: {
    visualizar() {
      var iframe = this.file
      var posicion = []

      if (this.file.includes('iframe')) {
        for (let i = 0; i < iframe.length; i++) {
          if (iframe[i] === '"') {
            posicion.push(i)
          }
        }
        this.src = iframe.slice(posicion[0] + 1, posicion[1])
        this.width = iframe.slice(posicion[2] + 1, posicion[3])
        this.height = iframe.slice(posicion[4] + 1, posicion[5])
        this.frameborder = iframe.slice(posicion[6] + 1, posicion[7])
        this.marginwidth = iframe.slice(posicion[8] + 1, posicion[9])
        this.marginheight = iframe.slice(posicion[10] + 1, posicion[11])
        this.scrolling = iframe.slice(posicion[12] + 1, posicion[13])
        this.style = iframe.slice(posicion[14] + 1, posicion[15])
      }
    },
    guardar() {
      var iframe = this.file
      var posicion = []

      if (this.file.includes('iframe')) {
        for (let i = 0; i < iframe.length; i++) {
          if (iframe[i] === '"') {
            posicion.push(i)
          }
        }
      }
      let body = {
        src: iframe.slice(posicion[0] + 1, posicion[1]),
        width: iframe.slice(posicion[2] + 1, posicion[3]),
        height: iframe.slice(posicion[4] + 1, posicion[5]),
        frameborder: iframe.slice(posicion[6] + 1, posicion[7]),
        marginwidth: iframe.slice(posicion[8] + 1, posicion[9]),
        marginheight: iframe.slice(posicion[10] + 1, posicion[11]),
        scrolling: iframe.slice(posicion[12] + 1, posicion[13]),
        style: iframe.slice(posicion[14] + 1, posicion[15]),
        name: this.name,
        categoria: this.select_categoria,
        tema: this.select_tema
      }
      API.post_pdf(body)
      alert('ya se ha creado el nuevo pdf')
    },
    reset() {
      this.f_tema = ''
    },
    async filtrar() {
      let filtros = {
        f_categoria: this.f_categoria,
        f_tema: this.f_tema
      }
      let find = {
        categoria: this.f_categoria,
        tema: this.f_tema
      }
      this.$store.dispatch('filtro_search', filtros)
      //por categoria solo
      if (this.f_categoria.length > 0 && this.f_tema.length === 0) {
        console.log('solo categoria')
        this.pdfs = await API.getPdf(find)
      }

      //por tema solo
      if (
        (this.f_tema.length > 0 && this.f_categoria.length === 0) ||
        (this.f_tema.length > 0 && this.f_categoria === 'N/A')
      ) {
        console.log('solo tema')
        this.pdfs = await API.getPdf(find)
      }
      // tema y categoria
      if (this.f_categoria.length > 0 && this.f_tema.length > 0) {
        console.log('tema y categoria')
        this.pdfs = await API.getPdf(find)
      }
    },
    change_crear() {
      this.crear = true
    },
    async borrar(idx) {
      await API.deletePdf(this.pdfs[idx]._id)
      location.reload()
    },
    Find_end() {
      if (this.V_categoria.length > 0) {
        this.f_categoria = this.V_categoria
      }
      if (this.V_tema.length > 0) {
        this.f_tema = this.V_tema
      }
      this.filtrar()
    }
  }
}
</script>

<style scoped>
.max-width {
  max-width: 300px;
}
</style>
