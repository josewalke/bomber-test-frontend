<template>
  <div>
    <template>
      <v-card>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="name"
                  :disabled="isUpdating"
                  label="Nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="title"
                  :disabled="isUpdating"
                  label="Apellido"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="title"
                  :disabled="isUpdating"
                  label="Nombre de Usuario"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="title"
                  :disabled="isUpdating"
                  label="Telefono"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  :disabled="isUpdating"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-overflow-btn
                  id="selector"
                  v-model="seleccion"
                  class="my-2"
                  :items="dropdown_font"
                  append-icon="mdi-pencil"
                  label="Suscripcion"
                  @click:append="updateSuscription"
                ></v-overflow-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-switch
            v-model="autoUpdate"
            :disabled="isUpdating"
            class="mt-0"
            color="green lighten-2"
            hide-details
            label="Auto Update"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="autoUpdate"
            :loading="isUpdating"
            color="blue-grey darken-3"
            depressed
            @click="isUpdating = true"
          >
            <v-icon left>mdi-update</v-icon>
            Update Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
