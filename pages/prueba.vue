<template>
  <div>
    <template>
      <v-card width="600px" class="mx-auto">
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
        <v-card-actions><v-btn>Actualizar</v-btn> </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
