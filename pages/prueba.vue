<template>
  <div>
    <v-text-field v-model="file" label="Nombre de usuario" />
    <v-btn color="success" class="mr-4" @click="prueba">PULSAME</v-btn>
    <pdf src="/static/autorizacion.pdf" width="400px" height="300px"></pdf>

    <!-- <iframe
      src="//www.slideshare.net/slideshow/embed_code/key/zWqiRwegmQdC93"
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
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  layout: 'basic',
  data() {
    return {
      file: null
    }
  },
  methods: {
    fileChange(event) {
      this.file = event.target.files[0]
    },
    prueba() {
      console.log(this.file)
    }
  }
}
</script>

<style scoped>
.fifty {
  height: 50vh;
}
</style>
