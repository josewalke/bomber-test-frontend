<template>
  <div>
    <TestsConfig :temas="tema" />
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
    const tema = await API.getAllTemasNames()
    return { tema }
  }
}
</script>

<style lang="scss" scoped></style>
