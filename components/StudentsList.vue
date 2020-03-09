<template>
  <div>
    <h1>Alumnos</h1>
    {{ switch1 }}
    {{ switch2 }}
    <v-row>
      <v-col cols="2">
        <v-switch
          v-model="switch1"
          :label="`activos: ${switch1.toString()}`"
          @change="solo_activos"
        ></v-switch>
      </v-col>
      <v-col cols="2">
        <v-switch
          v-model="switch2"
          :label="`inactivos: ${switch2.toString()}`"
          @change="solo_inactivos"
        ></v-switch>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="f_nombre"
          label="Nombre"
          @keyup="filtrar"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="f_apellido"
          label="Apellido"
          @keyup="filtrar"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col vols="2">
        <v-switch
          v-model="plan[0]"
          :label="`Basic`"
          @change="select_basic"
        ></v-switch>
      </v-col>
      <v-col vols="2">
        <v-switch
          v-model="plan[1]"
          :label="`Pro`"
          @change="select_pro"
        ></v-switch>
      </v-col>
      <v-col vols="2">
        <v-switch
          v-model="plan[2]"
          :label="`Premium`"
          @change="select_premium"
        ></v-switch>
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
        <tbody>
          <tr v-for="(item, idx) in filter" :key="idx">
            <td class="text-truncate" style="max-width: 150px;">
              {{ item.name }}
            </td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
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
      filtro: false,
      items: ['Basic', 'Pro', 'Premium'],
      seleccion: '',
      filter: this.student,
      switch1: false,
      switch2: false,
      plan: [false, false, false]
    }
  },
  methods: {
    filtrar(event) {
      this.filtro = true
      let filteredUsers = []
      let name = this.f_nombre.toLowerCase()
      let sirname = this.f_apellido.toLowerCase()
      if (event.key === 'Backspace') {
        this.filter = this.student
      }
      if (name.length === 0 && sirname.length === 0) {
        this.filter.forEach(user => {
          if (
            user.name.toLowerCase().includes('') &&
            user.lastName.toLowerCase().includes('')
          ) {
            filteredUsers.push(user)
          }
        })
        this.filter = this.student
      }
      if (name.length > 0 && sirname.length > 0) {
        this.filter.forEach(user => {
          if (
            user.name.toLowerCase().includes(name) &&
            user.lastName.toLowerCase().includes(sirname)
          ) {
            filteredUsers.push(user)
          }
        })
        this.filter = filteredUsers
      }
      if (name.length > 0 && sirname.length === 0) {
        this.filter.forEach(user => {
          if (user.name.toLowerCase().includes(name)) {
            filteredUsers.push(user)
          }
        })
        this.filter = filteredUsers
      }
      if (name.length === 0 && sirname.length > 0) {
        this.filter.forEach(user => {
          if (user.lastName.toLowerCase().includes(sirname)) {
            filteredUsers.push(user)
          }
        })
        this.filter = filteredUsers
        console.log(this.fiter === filteredUsers)
      }
    },
    solo_activos() {
      console.log('switch')
      let filter = []
      if (this.switch2 === true) {
        this.switch2 = false
        this.filter = this.student
      }
      if (this.switch1 === true) {
        this.filter.forEach(user => {
          if (user.active === true) {
            filter.push(user)
          }
        })
        this.filter = filter
      } else {
        this.filter = this.student
      }
    },
    solo_inactivos() {
      console.log('switch')
      let filter = []
      if (this.switch1 === true) {
        this.switch1 = false
        this.filter = this.student
      }
      if (this.switch2 === true) {
        this.filter.forEach(user => {
          if (user.active !== true) {
            filter.push(user)
          }
        })
        this.filter = filter
      } else {
        this.filter = this.student
      }
    },

    select_basic() {
      if (this.plan[0] === true) {
        let filter = []
        this.filter = this.student
        this.plan[1] = false
        this.plan[2] = false
        this.filter.forEach(user => {
          if (user.suscription_type === 'Basic') {
            filter.push(user)
          }
          this.filter = filter
        })
      } else {
        this.filter = this.student
      }
    },
    select_pro() {
      if (this.plan[1] === true) {
        let filter = []
        this.filter = this.student
        this.plan[0] = false
        this.plan[2] = false
        this.filter.forEach(user => {
          if (user.suscription_type === 'Pro') {
            filter.push(user)
          }
          this.filter = filter
        })
      } else {
        this.filter = this.student
      }
    },
    select_premium() {
      if (this.plan[2] === true) {
        let filter = []
        this.filter = this.student
        this.plan[0] = false
        this.plan[1] = false
        this.filter.forEach(user => {
          if (user.suscription_type === 'Premium') {
            filter.push(user)
          }
          this.filter = filter
        })
      } else {
        this.filter = this.student
      }
    },
    change_active(idx) {
      console.log(this.filter[idx]._id)

      const body = {
        id: this.filter[idx]._id,
        active: this.filter[idx].active
      }
      console.log('aqui')
      console.log(body)
      API.change_active(body)
    },
    change_suscription(idx) {
      const body = {
        id: this.filter[idx]._id,
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
