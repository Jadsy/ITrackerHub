<template>
  <v-list>
    <v-list-group prepend-icon="mdi-tag-text-outline">
      <template v-slot:activator>
        <v-list-item-title class="type_title"
          >Issue Types <v-divider class="type_divider"></v-divider
        ></v-list-item-title>
      </template>

      <div class="types_block">
        <v-list-item v-for="type in ProjectTypes" :key="type.id">
          {{ type.title }}
          <v-tooltip right class="edit_tooltip">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="returnType(type)" v-bind="attrs" v-on="on">
                <v-icon small color="primary">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Tap to Edit</span>
          </v-tooltip>
        </v-list-item>
      </div>

      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>
            <span class="headline">{{ selectedType.title }}</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-text-field v-model="selectedType.title" label="Edit Title"></v-text-field>
            </v-row>
            <v-row>
              <v-col>
                <span>Edit Color: </span>
                <v-btn :color="selectedType.color" small rounded @click="selectColor = true"></v-btn>
              </v-col>
            </v-row>
            <v-row v-show="selectColor">
              <v-col cols="12">
                <v-color-picker v-model="selectedType.color"></v-color-picker>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="1">
                <v-btn @click="selectColor = false" color="success" text>Select</v-btn>
              </v-col>
            </v-row>
            <v-btn class="success mx-0 mt-3" @click="UpdateType"
              ><v-icon align-self:left>mdi-content-save-check-outline</v-icon>Save Changes</v-btn
            >
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      selectedType: '',
      selectColor: false,
      loading: false,
    }
  },

  computed: {
    ...mapGetters(['ProjectTypes', 'Project']),
  },

  methods: {
    ...mapActions(['EditProjectType']),

    async UpdateType() {
      this.loading = true
      await this.EditProjectType({ type: this.selectedType, project_id: this.Project.id })
      this.loading = false
      this.dialog = false
    },

    returnType(type) {
      this.selectedType = type
      this.dialog = true
    },
  },
}
</script>

<style>
.type_title {
  margin-top: 5px;
}
.type_divider {
  border-width: 1px !important;
  margin-left: 100px;
  width: 92%;
  margin-top: -10px;
}
.types_block {
  margin-left: 36px;
}

</style>
