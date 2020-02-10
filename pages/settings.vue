<template>
  <div>
    <template>
      <v-card width="600px" class="mx-auto">
        <v-form>
          <v-container>
            <div class="avatar-edition" @click="uploadPhoto">
              <div
                class="user-card mt-5"
                :style="{ 'background-image': `url(${$store.state.img_url})` }"
              ></div>
            </div>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="name"
                  label="Nombre"
                  validate-on-blur
                  append-icon="mdi-pencil"
                  :rules="[rules.required]"
                  @click:append="updateName"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastName"
                  label="Apellido"
                  append-icon="mdi-pencil"
                  :rules="[rules.required]"
                  @click:append="updateLastName"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nickName"
                  label="Nombre de usuario"
                  validate-on-blur
                  append-icon="mdi-pencil"
                  :rules="[rules.required]"
                  @click:append="updateNickName"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="phone"
                  label="Telefono"
                  append-icon="mdi-pencil"
                  :rules="[rules.required, rules.phone]"
                  @click:append="updatePhone"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email"
                  append-icon="mdi-pencil"
                  :rules="[rules.required, rules.email]"
                  @click:append="updateEmail"
                />
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="sendAll">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nickName: '',
      lastName: '',
      email: '',
      phone: '',
      photo: '',
      rules: {
        required: v => !!v || 'Campo Obligatorio',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email no valido'
        },
        phone: v => v.length > 8 || 'introduca todos los digitos'
      },
      dropdown_font: ['basic', 'pro', 'premium'],
      seleccion: ''
    }
  },
  methods: {
    async updateName() {
      if (this.name.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateName', this.name)
      }
    },
    async updateLastName() {
      if (this.lastName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateLastName', this.lastName)
      }
    },
    async updatePhoto() {
      if (this.photo.length === 0) {
        console.log('esta vacio')
      } else {
        console.log(this.photo.length)
        await this.$store.dispatch('updatePhoto', this.photo)
      }
    },
    async updateNickName() {
      if (this.nickName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateNickName', this.nickName)
      }
    },
    async updateEmail() {
      if (this.email.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateEmail', this.email)
      }
    },
    async updatePhone() {
      if (this.phone.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updatePhone', this.phone)
      }
    },
    async updateSuscription() {
      if (this.seleccion.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateSuscription', this.seleccion)
      }
    },
    async sendAll() {
      if (this.name.length === 0) {
        console.log('esta vacio')
      } else {
        this.updateName()
        this.name = ''
      }
      if (this.lastName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateLastName', this.lastName)
        this.lastName = ''
      }
      if (this.photo.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updatePhoto', this.photo)
        this.photo = ''
      }
      if (this.nickName.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateNickName', this.nickName)
        this.nickName = ''
      }
      if (this.email.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateEmail', this.email)
        this.email = ''
      }
      if (this.phone.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updatePhone', this.phone)
        this.phone = ''
      }
      if (this.seleccion.length === 0) {
        console.log('esta vacio')
      } else {
        await this.$store.dispatch('updateSuscription', this.seleccion)
        this.seleccion = ''
      }
    },
    photoUploader() {
      // eslint-disable-next-line no-undef
      const newWidget = cloudinary.createUploadWidget(
        {
          cloudName: 'dea2xlykc',
          uploadPreset: 'profileAvatar',
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 1,
          croppingCordinateMode: 'face',
          clientAllowedFormats: ['png', 'gif', 'jpeg']
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const newUrl = result.info.url
            this.photo = newUrl
            this.sendAll()
          }
        }
      )
      return newWidget
    },
    uploadPhoto() {
      const widget = this.photoUploader()
      widget.open()
    }
  },
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }]
    }
  }
}
</script>
<style scoped>
.v-card {
  margin-top: 100px;
}
.user-card {
  height: 300px;
  width: 300px;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
}
.user-card:hover {
  height: 300px;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
</style>
