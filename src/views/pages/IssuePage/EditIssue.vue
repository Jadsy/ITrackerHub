<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn rounded class="success" dark v-on="on">
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
          <v-form class="px-3">
            <v-text-field v-model="Issue.title" label="Title"></v-text-field>
            <v-textarea v-model="Issue.description" label="Description"></v-textarea>
            <v-select
              :value="time_est.filter(time => time.value == Issue.time_estimate)[0]"
              item-text="text"
              item-value="value"
              :items="time_est"
              label="Time Estimate"
            ></v-select>
            <v-select
              disabled
              item-text="title"
              item-value="id"
              :items="Types"
              :value="Types.filter(type => type.title == Issue.issueType)[0]"
              v-on:change="changeType"
              label="Issue Type"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :value="Statuses.filter(status => status.title == Issue.issueStatus)[0]"
              label="Issue Status"
              v-on:change="changeStatus"
              :items="Statuses"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :items="Severities"
              :value="this.Severities.filter(severity => severity.title == this.Issue.issueSeverity)[0]"
              label="Issue Severity"
              v-on:change="changeSeverity"
            ></v-select>
            <v-spacer></v-spacer>
          </v-form>
          <v-btn flat @click="Update" class="success mx-0 mt-3">
            <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Update</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['Severities', 'Types', 'Statuses', 'ProjectList', 'Issue']),
  },

  data() {
    return {
      dialog: false,

      title_updated: '',
      description_updated: '',
      time_estimate: '',
      project: '',
      issue_type: '',
      issue_status: '',
      issue_severity: '',

      issue_type_check: false,

      issue_type_check: false,

      issue_status_check: false,

      issue_severity_check: false,

      issueType_Id: '',
      issueStatus_Id: '',
      issueSeverity_Id: '',

      time_est: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
      ],
    }
  },

  watch: {
    Issue() {
      this.$store.commit('setIssue', this.Issue)
    },
  },

  methods: {
    ...mapActions(['updateIssue', 'fetchIssue']),

    changeTimeEstimate(e) {
      this.time_estimate = e
    },
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

    async Update() {
      this.title_updated = this.Issue.title
      this.description_updated = this.Issue.description
      this.time_estimate = this.Issue.time_estimate
      this.project = this.Issue.project

      if (!this.issue_type_check) {
        this.issue_type = this.Issue.issueType
        this.issueType_Id = this.Types.filter(type => type.title == this.issue_type)[0].id
      } else {
        this.issueType_Id = this.Types.filter(type => type.id == this.issue_type)[0].id
      }

      if (!this.issue_status_check) {
        this.issue_status = this.Issue.issueStatus
        this.issueStatus_Id = this.Statuses.filter(type => type.title == this.issue_status)[0].id
      } else {
        this.issueStatus_Id = this.Statuses.filter(type => type.id == this.issue_status)[0].id
      }

      if (!this.issue_severity_check) {
        this.issue_severity = this.Issue.issueSeverity
        this.issueSeverity_Id = this.Severities.filter(type => type.title == this.issue_severity)[0].id
      } else {
        this.issueSeverity_Id = this.Severities.filter(type => type.id == this.issue_severity)[0].id
      }

      const updateIssue = {
        id: this.Issue.id,
        created: this.Issue.created,
        title: this.title_updated,
        description: this.description_updated,
        time_estimate: this.time_estimate,
        userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
        projectid: this.ProjectList.filter(project => project.title == this.project)[0].id,
        issueTypeId: this.issueType_Id,
        issueStatusId: this.issueStatus_Id,
        issueSeverityId: this.issueSeverity_Id,
      }
      this.dialog = false
      await this.updateIssue(updateIssue)
      await this.fetchIssue(updateIssue.id)
    },

    reloadPage() {
      window.location.reload()
    },
  },
}
</script>

<style scoped>
.v-btn {
  left: 43%;
}
.v-btn:hover {
  background-color: white;
  color: green;
  border: solid;
}
</style>
