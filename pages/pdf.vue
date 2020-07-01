<template>
  <div>
    <v-container>
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
    </v-container>
    <br />
    <!-- <pdf src="/static/autorizacion.pdf" width="400px" height="300px"></pdf> -->
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

    <!-- <iframe src="//www.slideshare.net/slideshow/embed_code/key/zWqiRwegmQdC93"
      width="595"
      height="485"
      frameborder="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
      style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;"
      allowfullscreen
    >
    </iframe> -->
  </div>
</template>

<script>
// import pdf from 'vue-pdf'
import API from '~/services/api'
export default {
  // components: {
  //   pdf
  // },
  // layout: 'basic',
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
    let cat2 = []
    let cat3 = []
    let cat4 = []
    let cat5 = []
    let cat6 = []

    for (let i = 0; i < temas.length; i++) {
      temario.push(temas[i].name)
      if (categoria[0] === temas[i].category) {
        console.log('primera categoria')
        cat1.push(temas[i].name)
      }
      if (categoria[1] === temas[i].category) {
        console.log('segunda categoria')
        cat2.push(temas[i].name)
      }
      if (categoria[2] === temas[i].category) {
        console.log('tercera categoria')
        cat3.push(temas[i].name)
      }
      if (categoria[3] === temas[i].category) {
        console.log('cuarta categoria')
        cat4.push(temas[i].name)
      }
      if (categoria[4] === temas[i].category) {
        console.log('quinta categoria')
        cat5.push(temas[i].name)
      }
      if (categoria[5] === temas[i].category) {
        console.log('sexta categoria')
        cat6.push(temas[i].name)
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
      cat6
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
      select_tema: ''
    }
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
    }
  }
}
</script>

<style scoped>
.max-width {
  max-width: 300px;
}
</style>
