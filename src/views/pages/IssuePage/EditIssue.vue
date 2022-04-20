<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" @click:outside="Cancel">
      <template v-slot:activator="{ on }">
        <v-btn rounded class="edit_btn success" dark v-on="on">
          <v-icon align-self: left>
            mdi-pencil-outline
          </v-icon>
          Edit Issue
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Edit Issue</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" v-model="valid">
            <v-text-field v-model="Issue.title" label="Title" :rules="titleRule"></v-text-field>
            <v-textarea v-model="Issue.description" label="Description" :rules="descriptionRule"></v-textarea>
            <v-select
              disabled
              item-text="title"
              item-value="id"
              :items="ProjectTypes"
              :value="ProjectTypes.filter(type => type.title == Issue.issueType.title)[0]"
              v-on:change="changeType"
              label="Issue Type"
            ></v-select>
            <v-select
              :rules="statusRule"
              item-text="title"
              item-value="id"
              :value="Statuses.filter(status => status.title == Issue.issueStatus.title)[0]"
              label="Issue Status"
              v-on:change="changeStatus"
              :items="Statuses"
            ></v-select>
            <v-select
              :rules="severityRule"
              v-if="Issue.issueType.needSeverity"
              item-text="title"
              item-value="id"
              :items="Severities"
              :value="this.Severities.filter(severity => severity.title == this.Issue.issueSeverity.title)[0]"
              label="Issue Severity"
              v-on:change="changeSeverity"
            ></v-select>
            <v-spacer></v-spacer>
          </v-form>
          <v-btn @click="Update" :loading="loading" :disabled="loading" class="success mx-0 mt-3">
            <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Update</v-btn
          >
          <v-btn outlined class="cancel_btn mx-0 mt-3" @click="Cancel"> Cancel </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['Severities', 'ProjectTypes', 'Statuses', 'ProjectList', 'Issue']),
  },

  data() {
    return {
      dialog: false,
      loading: false,
      valid: false,

      temporaryTile: '',
      temporaryDescription: '',

      issue_type: '',
      issue_type_check: false,

      issue_status: '',
      issue_status_check: false,

      issue_severity: '',
      issue_severity_check: false,

      issueType_Id: '',
      issueStatus_Id: '',
      issueSeverity_Id: '',

      titleRule: [v => !!v || 'Title is required'],
      descriptionRule: [v => !!v || 'Description is required'],
      statusRule: [v => !!v || 'Status is required'],
      severityRule: [v => !!v || 'Severity is required'],
    }
  },

  watch: {
    Issue() {
      this.$store.commit('setIssue', this.Issue)
      this.temporaryTile = Object.assign(this.Issue.title)
      this.temporaryDescription = Object.assign(this.Issue.description)
    },
  },

  created() {
    this.temporaryTile = Object.assign(this.Issue.title)
    this.temporaryDescription = Object.assign(this.Issue.description)
  },

  methods: {
    ...mapActions(['updateIssue', 'fetchIssue']),

    changeType(e) {
      this.issue_type = e
      this.issue_type_check = true
    },
    changeStatus(e) {
      this.issue_status = e
      this.issue_status_check = true
    },
    changeSeverity(e) {
      this.issue_severity = e
      this.issue_severity_check = true
    },

    Cancel() {
      this.Issue.title = Object.assign(this.temporaryTile)
      this.Issue.description = Object.assign(this.temporaryDescription)
      this.temporaryTile = ''
      this.temporaryDescription = ''
      this.dialog = false
    },

    async Update() {
      if (!this.issue_type_check) {
        this.issue_type = this.Issue.issueType.title
        this.issueType_Id = this.ProjectTypes.filter(type => type.title == this.issue_type)[0].id
      } else {
        this.issueType_Id = this.ProjectTypes.filter(type => type.id == this.issue_type)[0].id
      }

      if (!this.issue_status_check) {
        this.issue_status = this.Issue.issueStatus.title
        this.issueStatus_Id = this.Statuses.filter(type => type.title == this.issue_status)[0].id
      } else {
        this.issueStatus_Id = this.Statuses.filter(type => type.id == this.issue_status)[0].id
      }

      if (!this.issue_severity_check) {
        this.issue_severity = this.Issue.issueSeverity.title
        this.issueSeverity_Id = this.Severities.filter(type => type.title == this.issue_severity)[0].id
      } else {
        this.issueSeverity_Id = this.Severities.filter(type => type.id == this.issue_severity)[0].id
      }

      const updateIssue = {
        id: this.Issue.id,
        created: this.Issue.created,
        title: this.Issue.title,
        description: this.Issue.description,
        time_estimate: this.time_estimate,
        userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
        projectid: this.Issue.project.id,
        issueTypeId: this.issueType_Id,
        issueStatusId: this.issueStatus_Id,
        issueSeverityId: this.issueSeverity_Id,
        isComplete: this.Issue.isComplete,
      }
      this.loading = true
      await this.updateIssue(updateIssue)
      await this.fetchIssue(updateIssue.id)
      this.loading = false
      this.dialog = false
    },
  },
}
</script>

<style scoped>
.cancel_btn {
  left: 5%;
}

.edit_btn {
  right: 24%;
  position: absolute;
}
</style>
