export default {
  hola() {
    console.log('hola')
  },
  tieneSoporteUserMedia() {
    !!navigator.mediaDevices.getUserMedia
  },
  init() {
    if (typeof MediaRecorder === 'undefined' || !this.tieneSoporteUserMedia()) {
      console.log(
        'Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome'
      )
    } else {
      console.log(!!navigator.mediaDevices.getUserMedia)
    }
  }
}
