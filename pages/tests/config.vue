<template>
  <div>
    <TestsConfig :temas="temas" />
  </div>
</template>

<script>
import API from '~/services/api'
import TestsConfig from '~/components/TestsConfig'
export default {
  components: {
    TestsConfig
  },
  async asyncData() {
    const colectivo = await API.getAllTemasNames()
    let temas = []
    for (let i = 0; i < colectivo.length; i++) {
      if (colectivo[i].name != 'Sin Tema') {
        temas.push(colectivo[i])
      }
    }
    return { temas }
  }
}
</script>

<style lang="scss" scoped></style>
