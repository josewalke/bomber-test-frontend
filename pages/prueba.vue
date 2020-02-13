<template>
  <div>
    <h1 style="display: 'none';">
      Grabar vídeo de la webcam y audio del micrófono con JavaScript
    </h1>
    <a href="//parzibyte.me/blog" target="_blank">By Parzibyte</a>
    <div>
      <label for="dispositivosDeAudio">Micrófono:</label><br />
      <select id="dispositivosDeAudio" name="dispositivosDeAudio"></select>
      <br /><br />
      <label for="dispositivosDeVideo">Cámara:</label><br />
      <select id="dispositivosDeVideo" name="dispositivosDeVideo"></select>
      <br /><br />
      <video id="video" muted="muted"></video>
      <br /><br />
      <p id="duracion"></p>
      <br />
      <v-btn @click="comenzarAGrabar">Comenzar</v-btn>
      <v-btn @click="detenerGrabacion">Detener</v-btn>
    </div>
    {{ dispositivosDeAudio }}
  </div>
</template>

<script>
export default {
  async asyncData() {},
  data() {
    return {
      dispositivosDeAudio: document.querySelector('#dispositivosDeAudio'),
      dispositivosDeVideo: document.querySelector('#dispositivosDeVideo'),
      duracion: document.querySelector('#duracion'),
      video: document.querySelector('#video'),
      tiempoInicio: '',
      mediaRecorder: '',
      idIntervalo: '',
      opcion: ''
    }
  },
  mounted() {
    if (typeof MediaRecorder === 'undefined' || !this.tieneSoporteUserMedia())
      return alert(
        'Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome'
      )
    document.addEventListener('DOMContentLoaded', this.limpiarSelect)
    document.addEventListener('DOMContentLoaded', this.llenarLista)
  },
  methods: {
    tieneSoporteUserMedia() {
      !!navigator.mediaDevices.getUserMedia
    },
    limpiarSelect(elemento) {
      for (let x = elemento.options.length - 1; x >= 0; x--) {
        elemento.options.remove(x)
      }
    },
    segundosATiempo(numeroDeSegundos) {
      let horas = Math.floor(numeroDeSegundos / 60 / 60)
      numeroDeSegundos -= horas * 60 * 60
      let minutos = Math.floor(numeroDeSegundos / 60)
      numeroDeSegundos -= minutos * 60
      numeroDeSegundos = parseInt(numeroDeSegundos)
      if (horas < 10) horas = '0' + horas
      if (minutos < 10) minutos = '0' + minutos
      if (numeroDeSegundos < 10) numeroDeSegundos = '0' + numeroDeSegundos
      return `${horas}:${minutos}:${numeroDeSegundos}`
    },
    refrescar() {
      this.duracion.textContent = this.segundosATiempo(
        (Date.now() - this.tiempoInicio) / 1000
      )
    },
    llenarLista() {
      navigator.mediaDevices.enumerateDevices().then(dispositivos => {
        this.limpiarSelect(this.dispositivosDeAudio)
        this.limpiarSelect(this.dispositivosDeVideo)
        dispositivos.forEach((dispositivo, indice) => {
          if (dispositivo.kind === 'audioinput') {
            this.opcion = document.createElement('option')
            // Firefox no trae nada con label, que viva la privacidad
            // y que muera la compatibilidad
            this.opcion.text = dispositivo.label || `Micrófono ${indice + 1}`
            this.opcion.value = dispositivo.deviceId
            this.dispositivosDeAudio.appendChild(this.opcion)
          } else if (dispositivo.kind === 'videoinput') {
            this.opcion = document.createElement('option')
            // Firefox no trae nada con label, que viva la privacidad
            // y que muera la compatibilidad
            this.opcion.text = dispositivo.label || `Cámara ${indice + 1}`
            this.opcion.value = dispositivo.deviceId
            this.dispositivosDeVideo.appendChild(this.opcion)
          }
        })
      })
    },
    comenzarAContar() {
      this.tiempoInicio = Date.now()
      this.idIntervalo = setInterval(this.refrescar, 500)
    },
    comenzarAGrabar() {
      if (!this.dispositivosDeAudio.options.length)
        return alert('No hay micrófono')
      if (!this.dispositivosDeVideo.options.length)
        return alert('No hay cámara')
      // No permitir que se grabe doblemente
      if (this.mediaRecorder) return alert('Ya se está grabando')

      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: this.dispositivosDeAudio.value // Indicar dispositivo de audio
          },
          video: {
            deviceId: this.dispositivosDeAudio.value // Indicar dispositivo de vídeo
          }
        })
        .then(stream => {
          // Poner stream en vídeo
          this.video.srcObject = stream
          this.video.play()
          // Comenzar a grabar con el stream
          this.mediaRecorder = new MediaRecorder(stream)
          this.mediaRecorder.start()
          this.comenzarAContar()
          // En el arreglo pondremos los datos que traiga el evento dataavailable
          const fragmentosDeAudio = []
          // Escuchar cuando haya datos disponibles
          this.mediaRecorder.addEventListener('dataavailable', evento => {
            // Y agregarlos a los fragmentos
            fragmentosDeAudio.push(evento.data)
          })
          // Cuando se detenga (haciendo click en el botón) se ejecuta esto
          this.mediaRecorder.addEventListener('stop', () => {
            // Pausar vídeo
            this.video.pause()
            // Detener el stream
            stream.getTracks().forEach(track => track.stop())
            // Detener la cuenta regresiva
            this.detenerConteo()
            // Convertir los fragmentos a un objeto binario
            const blobVideo = new Blob(fragmentosDeAudio)

            // Crear una URL o enlace para descargar
            const urlParaDescargar = URL.createObjectURL(blobVideo)
            // Crear un elemento <a> invisible para descargar el audio
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            a.href = urlParaDescargar
            a.download = 'Oposiciones_Bombero.mp4'
            // Hacer click en el enlace
            a.click()
            // Y remover el objeto
            window.URL.revokeObjectURL(urlParaDescargar)
          })
        })
        .catch(error => {
          // Aquí maneja el error, tal vez no dieron permiso
          console.log(error)
        })
    },
    detenerConteo() {
      clearInterval(this.idIntervalo)
      this.tiempoInicio = null
      this.$duracion.textContent = ''
    },
    detenerGrabacion() {
      if (!this.mediaRecorder) return alert('No se está grabando')
      this.mediaRecorder.stop()
      this.mediaRecorder = null
    }
  }
}
</script>

<style>
.box {
  width: 600px;
}
</style>
