<template>
  <div>
    <h1>Alumnos</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="f_nombre" label="Nombre"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="f_apellido" label="Apellido"></v-text-field>
      </v-col>
      <v-col cols="4">
        <br />
        <v-btn @click="filtrar">Filtrar</v-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Apellidos</th>
            <th class="text-left">Email</th>
            <th class="text-left">Teléfono</th>
            <th class="text-left">Suscripción</th>
            <th class="text-left">Activo</th>
          </tr>
        </thead>
        <tbody v-if="filtro">
          <tr v-for="(item, idx) in student" :key="idx">
            <td class="text-truncate" style="max-width: 150px;">
              {{ item.name }}
            </td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <!-- <td>{{ item.suscription_type }}</td> -->
            <td>
              <v-select
                :items="items"
                :label="item.suscription_type"
                @input="setSelected"
                @change="change_suscription(idx)"
              ></v-select>
            </td>
            <td>
              <v-checkbox
                v-model="item.active"
                color="primary"
                @change="change_active(idx)"
              ></v-checkbox>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item, idx) in student" :key="idx">
            <td
              v-if="
                item.name === f_nombre ||
                  item.lastName === f_apellido ||
                  (item.name === f_nombre && item.lastName === f_apellido)
              "
              class="text-truncate"
              style="max-width: 150px;"
            >
              {{ item.name }}
            </td>
            <td
              v-if="
                item.name === f_nombre ||
                  item.lastName === f_apellido ||
                  (item.name === f_nombre && item.lastName === f_apellido)
              "
            >
              {{ item.lastName }}
            </td>
            <td
              v-if="
                item.name === f_nombre ||
                  item.lastName === f_apellido ||
                  (item.name === f_nombre && item.lastName === f_apellido)
              "
            >
              {{ item.email }}
            </td>
            <td
              v-if="
                item.name === f_nombre ||
                  item.lastName === f_apellido ||
                  (item.name === f_nombre && item.lastName === f_apellido)
              "
            >
              {{ item.phone }}
            </td>
            <td
              v-if="
                item.name === f_nombre ||
                  item.lastName === f_apellido ||
                  (item.name === f_nombre && item.lastName === f_apellido)
              "
            >
              <v-select
                :items="items"
                :label="item.suscription_type"
                @input="setSelected"
                @change="change_suscription(idx)"
              ></v-select>
            </td>
            <td
              v-if="
                item.name === f_nombre ||
                  item.lastName === f_apellido ||
                  (item.name === f_nombre && item.lastName === f_apellido)
              "
            >
              <v-checkbox
                v-model="item.active"
                color="primary"
                @change="change_active(idx)"
              ></v-checkbox>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  name: 'StudentsList',
  props: {
    student: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      f_nombre: '',
      f_apellido: '',
      filtro: true,
      items: ['Basic', 'Pro', 'Premium'],
      seleccion: ''
    }
  },
  methods: {
    filtrar() {
      this.filtro = false
    },
    change_active(idx) {
      const body = {
        id: this.student[idx]._id,
        active: this.student[idx].active
      }
      API.change_active(body)
    },
    change_suscription(idx) {
      const body = {
        id: this.student[idx]._id,
        suscription_type: this.seleccion
      }
      API.change_suscription(body)
      console.log(idx)
      console.log(this.seleccion)
    },
    setSelected(value) {
      this.seleccion = value
      console.log(this.seleccion)
    }
  }
}
</script>
<style lang="scss" scoped></style>
