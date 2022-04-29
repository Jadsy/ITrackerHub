<template>
  <v-list>
    <v-list-group prepend-icon="mdi-tag-text-outline">
      <template v-slot:activator>
        <v-list-item-title class="type_title"
          >Issue Types <v-divider class="type_divider"></v-divider
        ></v-list-item-title>
      </template>

      <div class="types_block">
        <v-list-item v-if="canAdd">
          <v-btn dense small class="success mx-0 mt-3 add_type_btn" @click="NewTypeDialog = true">
            <v-icon> mdi-plus </v-icon>
            Add Type
          </v-btn>
        </v-list-item>
        <v-list-item v-for="type in ProjectTypes" :key="type.id" class="types">
          {{ type.title }}
          <v-tooltip v-if="canEdit" right class="edit_tooltip">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="returnType(type)" v-bind="attrs" v-on="on">
                <v-icon small color="primary">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Tap to Edit</span>
          </v-tooltip>
        </v-list-item>
      </div>

      <v-dialog v-model="dialog" width="500">
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
            <v-btn :loading="loading2" class="success mx-0 mt-3" @click="UpdateType"
              ><v-icon align-self:left>mdi-content-save-check-outline</v-icon>Save Changes</v-btn
            >
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="NewTypeDialog" width="500" @click:outside="Cancel">
        <v-card>
          <v-card-title>
            <h2>Custom Type Details</h2>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" v-model="valid">
              <v-row class="typeTitle">
                <v-text-field v-model="newTypeTitle" label="Title" :rules="titleRule"></v-text-field>
              </v-row>
              <v-row>
                <v-col>
                  <span>Select Color: </span>
                  <v-btn :color="newTypeColor" small rounded @click="selectColor = true"></v-btn>
                </v-col>
              </v-row>
              <v-row v-show="selectColor">
                <v-col cols="12">
                  <v-color-picker v-model="newTypeColor"></v-color-picker>
                </v-col>

                <v-spacer></v-spacer>
                <v-col cols="1">
                  <v-btn @click="selectColor = false" color="success" text>Select</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6"> <v-checkbox v-model="newTypeSeverity" label="Has Severity"> </v-checkbox></v-col>
                <v-col cols="6">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on" class="tltp">
                        mdi-help-circle-outline
                      </v-icon>
                    </template>
                    <span>Select the checkbox if your type has a severity attribute</span>
                  </v-tooltip>
                </v-col>
              </v-row>

              <v-btn :loading1="loading1" :disabled="!valid" class="success mx-0 mt-3" @click="createCustomType"
                ><v-icon align-self:left>mdi-content-save-check-outline</v-icon> Add Type</v-btn
              >
              <v-btn @click="Cancel" class="cancel_btn mx-0 mt-3" outlined> Cancel </v-btn>
            </v-form>
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
      canAdd: false,
      canEdit: false,
      valid: false,
      dialog: false,
      selectedType: '',
      selectColor: false,
      loading1: false,
      loading2: false,
      NewTypeDialog: false,
      newTypeTitle: '',
      newTypeSeverity: false,
      newTypeColor: '#FFFFFFFF',
      titleRule: [v => !!v || 'Title is required'],
    }
  },

  computed: {
    ...mapGetters(['ProjectTypes', 'Project', 'User']),
  },

  created(){
    this.CanAdd()
    this.CanEdit()
  },

  methods: {
    ...mapActions(['EditProjectType', 'addCustomType', 'getProjectTypes']),

    Cancel() {
      this.NewTypeDialog = false
      this.newTypeTitle = ''
      this.newTypeSeverity = false
      this.newTypeColor = '#FFFFFFFF'
    },

    CanAdd(){
      this.canAdd = this.User.id == this.Project.admin
    },
    CanEdit(){
      this.canEdit = this.User.id == this.Project.admin
    },

    async createCustomType() {
      this.loading1 = true
      await this.addCustomType({
        type: {
          title: this.newTypeTitle,
          color: this.newTypeColor,
          hasSeverity: this.newTypeSeverity,
        },
        project_id: this.Project.id,
      })

      await this.getProjectTypes(this.Project.id)
      this.newTypeTitle = ''
      this.newTypeSeverity = false
      this.newTypeColor = '#FFFFFFFF'
      this.NewTypeDialog = false
      this.loading1 = false
    },

    async UpdateType() {
      this.loading2 = true
      await this.EditProjectType({ type: this.selectedType, project_id: this.Project.id })
      await this.getProjectTypes(this.Project.id)
      this.loading2 = false
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

.types {
  top: -20px;
}

.add_type_btn {
  top: -15px;
  margin-bottom: -1px;
}

.cancel_btn {
  left: 5%;
}
</style>
