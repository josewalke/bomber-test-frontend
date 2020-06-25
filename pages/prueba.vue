<template>
  <div>
    <v-text-field v-model="file" label="Nombre de usuario" />
    <v-btn color="success" class="mr-4" @click="prueba">PULSAME</v-btn>
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
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/YwodhCjFbQ8"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
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
export default {
  // components: {
  //   pdf
  // },
  layout: 'basic',
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
      style: ''
    }
  },
  methods: {
    prueba() {
      var iframe = this.file
      var posicion = []

      if (this.file.includes('iframe')) {
        console.log(iframe.length)

        for (let i = 0; i < iframe.length; i++) {
          if (iframe[i] === '"') {
            posicion.push(i)
          }
        }
        console.log(posicion)
        this.src = iframe.slice(posicion[0] + 1, posicion[1])
        this.width = iframe.slice(posicion[2] + 1, posicion[3])
        this.height = iframe.slice(posicion[4] + 1, posicion[5])
        this.frameborder = iframe.slice(posicion[6] + 1, posicion[7])
        this.marginwidth = iframe.slice(posicion[8] + 1, posicion[9])
        this.marginheight = iframe.slice(posicion[10] + 1, posicion[11])
        this.scrolling = iframe.slice(posicion[12] + 1, posicion[13])
        this.style = iframe.slice(posicion[14] + 1, posicion[15])
      }
    }
  }
}
</script>

<style scoped>
.fifty {
  height: 50vh;
}
</style>
