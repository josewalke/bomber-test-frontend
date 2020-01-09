<template>
  <div>
    <div class="header-wraper">
      <h1>Mensajes</h1>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Pregunta</th>
            <th class="text-left">Leido</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in messages"
            :key="item._id"
            @click="goToQuestion(item.pregunta_id, idx)"
          >
            <td class="text-truncate" style="max-width: 150px;">
              {{ item.pregunta }}
            </td>
            <td>
              <v-icon v-if="!item.respuesta_leida">mdi-check</v-icon>
              <v-icon v-else color="green">mdi-check-all</v-icon>
            </td>
            <td>{{ item.fallos_num }}</td>
            <td>
              <span v-if="item.nota === 'Suspendido'" class="red--text">{{
                item.nota
              }}</span>
              <span v-if="item.nota === 'Aprobado'" class="green--text">{{
                item.nota
              }}</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['messages'])
  },
  methods: {
    goToQuestion(question, idx) {
      console.log(question)
      this.$store.dispatch('savePosition', idx)
      this.$router.push(`/message/${question}`)
    }
  }
}
</script>

<style></style>
