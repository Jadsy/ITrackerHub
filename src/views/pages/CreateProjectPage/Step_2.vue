<template>
  <v-card flat>
    <template v-for="type in Types">
      <v-row :key="type.id">
        <v-col>
          <v-checkbox v-model="type.value" :label="type.title"></v-checkbox>
        </v-col>
        <v-col>
          <span>Select Color: </span>
          <v-btn :color="type.color" small rounded @click="CurrentTypeColor(type)"></v-btn>
        </v-col>
      </v-row>
    </template>

    <v-dialog v-model="ColorDialog" width="500">
      <v-card>
        <v-card-title>
          Select Color
        </v-card-title>
        <v-card-text>
          <v-color-picker v-model="currentType.color"></v-color-picker>
          <v-btn text color="success" @click="ColorDialog = false">Select</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-btn color="success" text @click="NewTypeDialog = true"
      ><v-icon align-self: left>mdi-plus-thick</v-icon> Create Custom Type
    </v-btn>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="Next">
          Continue
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="NewTypeDialog" width="500">
      <v-card>
        <v-card-title>
          Custom Type Details
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-row class="typeTitle">
              <v-text-field v-model="newTypeTitle" label="Title"></v-text-field>
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

            <v-btn class="success mx-0 mt-3" @click="createCustomType"
              ><v-icon align-self:left>mdi-content-save-check-outline</v-icon> Add Type</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: ['stepCount'],

  data() {
    return {
      Types: [
        { id: 1, title: 'Bug', value: false, hasSeverity: true, color: '#BF360CFF' },
        { id: 2, title: 'Feature', value: false, hasSeverity: false, color: '#1E88E5FF' },
        { id: 3, title: 'User Story', value: false, hasSeverity: false, color: '#EFFF40FF' },
        { id: 4, title: 'Test', value: false, hasSeverity: false, color: '#8BC34AFF' },
      ],
      ID: 4,
      NewTypes: [],
      NewTypeDialog: false,
      ColorDialog: false,
      newTypeTitle: '',
      newTypeSeverity: false,
      newTypeColor: '#FFFFFFFF',
      currentType: '',
      selectColor: false,
    }
  },

  methods: {
    createCustomType() {
      this.Types.push({ id: this.ID + 1, title: this.newTypeTitle, value: true, hasSeverity: this.newTypeSeverity, color: this.newTypeColor })
      this.newTypeTitle = '',
      this.newTypeSeverity = false,
      this.newTypeColor = '#FFFFFFFF',
      this.selectColor = false,
      this.NewTypeDialog = false
    },
    Next() {
      this.$emit('continue', [this.stepCount + 1, this.Types.filter(type => type.value)])
    },

    CurrentTypeColor(type) {
      this.ColorDialog = true
      this.currentType = type
    },
  },
}
</script>

<style scoped>
.tltp {
  top: 21px;
}

.clr {
  top: 21px;
}
</style>
