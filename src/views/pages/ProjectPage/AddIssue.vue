<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          <v-icon align-self: left>
            mdi-plus-thick
          </v-icon>
          Add Issue
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(type, index) in ProjectTypes" :key="index">
          <v-list-item-title style="cursor: pointer" @click="selectType(type)">{{ type.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" width="500" @click:outside="resetDialog">
      <v-card>
        <v-card-title>
          <h2>Add {{ issue_type_title }}</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" v-model="valid">
            <v-text-field v-model="title" label="Title" :rules="titleRules"></v-text-field>
            <v-textarea v-model="description" label="Description" :rules="descriptionRules"></v-textarea>
            <!-- <v-select
              item-text="title"
              item-value="id"
              :items="Types"
              v-model="issue_type"
              label="Issue Type"
            ></v-select> -->

            <v-select
              v-if="hasSeverity"
              item-text="title"
              item-value="id"
              :items="Severities"
              v-model="issue_severity"
              label="Issue Severity"
              :rules="severityRules"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" @click="postIssue()" class="success mx-0 mt-3">
              <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
            >
            <v-btn outlined class="cancel_btn mx-0 mt-3" @click="Cancel"> Cancel </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['Severities', 'ProjectTypes', 'Statuses', 'Project']),
  },

  data() {
    return {
      dialog: false,

      title: '',
      description: '',
      project: '',
      issue_type: '',
      issue_type_title: '',
      hasSeverity: false,
      issue_severity: null,

      titleRules: [v => !!v || 'Title is required'],
      descriptionRules: [v => !!v || 'Description is required'],
      severityRules: [v => !!v || 'Severity is required'],
      valid: false,
    }
  },

  methods: {
    ...mapActions(['addIssue', 'fetchProjectIssueList']),
    async postIssue() {
      await this.addIssue({
        _title: this.title,
        _description: this.description,
        _projectid: this.Project.id,
        _issue_type: this.issue_type,
        _issue_status: this.Statuses.filter(status => status.title == 'Open')[0].id,
        _issue_severity: this.issue_severity,
        _is_complete: true,
      })
      this.dialog = false
      this.fetchProjectIssueList(this.Project.id)
      this.title = ''
      this.description = ''
      this.issue_severity = ''
      this.issue_type = ''
      this.issue_type_title = ''
      this.hasSeverity = false
    },

    selectType(type) {
      this.dialog = true
      this.hasSeverity = type.needSeverity
      this.issue_type = type.id
      this.issue_type_title = type.title
    },

    resetDialog() {
      this.title = ''
      this.description = ''
      this.issue_severity = ''
      this.issue_type = ''
      this.issue_type_title = ''
      this.hasSeverity = false
    },

    Cancel(){
      this.dialog = false
      this.resetDialog()
    }
  },
}
</script>

<style scoped>
.cancel_btn {
  left: 5%;
}
</style>
