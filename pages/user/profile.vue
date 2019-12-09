<template>
  <v-app>
    {{ objectId }}
    {{ usuario }}
  </v-app>
</template>

<script>
import data from '~/services/data'
import { mapState } from 'vuex'

export default {
  async asyncData() {
    const user = await data.Api_getUserById()
    return { usuario: user }
  },
  // data() {
  //   return {
  //     usuario: this.$store.state.objectId
  //   }
  // },
  computed: {
    ...mapState(['objectId'])
  },
  // mounted() {
  //   this.findUser()
  // },
  methods: {
    findUser() {
      data.Api_getUserById(this.objectId).then(response => {
        this.usuario = response
      })
    }
  }
}
</script>
