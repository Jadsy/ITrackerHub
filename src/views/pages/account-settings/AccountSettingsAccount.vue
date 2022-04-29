<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text class="d-flex">
      <!-- <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="accountDataLocale.avatarImg"></v-img>
      </v-avatar> -->

      <!-- upload photo -->
      <!-- <div>
        <v-btn
          color="primary"
          class="me-3 mt-5"
          @click="$refs.refInputEl.click()"
        >
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Upload new photo</span>
        </v-btn>

        <input
          ref="refInputEl"
          type="file"
          accept=".jpeg,.png,.jpg,GIF"
          :hidden="true"
        />

        <v-btn
          color="error"
          outlined
          class="mt-5"
        >
          Reset
        </v-btn>
        <p class="text-sm mt-5">
          Allowed JPG, GIF or PNG. Max size of 800K
        </p>
      </div> -->
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col md="12" cols="12">
            <v-text-field disabled label="Username" dense v-model="temporaryUsername"></v-text-field>
          </v-col>

          <v-col md="12" cols="12">
            <v-text-field :disabled="!editMode" label="E-mail" dense v-model="temporaryEmail"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field :disabled="!editMode" label="First Name" dense v-model="temporaryFirstName"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field :disabled="!editMode" dense label="Last Name" v-model="temporaryLastName"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="success" v-if="editMode" class="me-3 mt-4">
              <v-icon> mdi-content-save-check-outline</v-icon> Save changes
            </v-btn>
            <v-btn color="primary" v-if="!editMode" class="me-3 mt-4" @click="editMode = true">
              <v-icon>mdi-pencil-outline</v-icon> Edit
            </v-btn>
            <v-btn color="secondary" outlined class="mt-4"> Cancel </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      temporaryUsername: '',
      temporaryEmail: '',
      temporaryFirstName: '',
      temporaryLastName: '',
      editMode: false,
    }
  },

  computed: {
    ...mapGetters(['User', 'UserName']),
  },

  created() {
    this.temporaryUsername = Object.assign(this.UserName)
    this.temporaryEmail = Object.assign(this.User.email)
    this.temporaryFirstName = Object.assign(this.User.first_name)
    this.temporaryLastName = Object.assign(this.User.last_name)
  },
}
</script>

<style>
/* .v-label--active {
  transform: translateY(-25px) scale(1) !important;
  font-size: 12px !important;
  padding-right: 8px;
  background-color: white
} */
</style>
