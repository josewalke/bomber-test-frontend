<template>
  <div>
    hola
    <v-list v-for="(item, idx) in questions" :key="item._id" dense flat>
      <v-row @click="goToQuestion(item._id, idx)">
        <v-col cols="8">
          <div class="overline text-uppercase red--text pl-4">
            <!-- {{ getQuestionSubject[idx] }} -->
          </div>
          <div class="body-2 pl-4">{{ idx + 1 }}. {{ item.enunciado }}</div>
        </v-col>
        <v-col cols="4">
          <div
            v-if="respuestas[idx].answered === true"
            class="overline text-right pr-5 green--text"
          >
            contestada
          </div>
          <div v-else class="overline text-right pr-5 red--text">
            sin contestar
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      default: () => {
        return []
      }
    },
    respuestas: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
