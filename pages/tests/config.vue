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
    const temas = await API.getAllTemasNames()
    return { temas }
  }
}
</script>

<style lang="scss" scoped></style>
