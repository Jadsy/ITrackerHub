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
              disabled
              item-text="title"
              item-value="id"
              :items="ProjectTypes"
              :value="ProjectTypes.filter(type => type.title == Issue.issueType.title)[0]"
              v-on:change="changeType"
              label="Issue Type"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :value="Statuses.filter(status => status.title == Issue.issueStatus.title)[0]"
              label="Issue Status"
              v-on:change="changeStatus"
              :items="Statuses"
            ></v-select>
            <v-select
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
          <v-btn @click="Update" class="success mx-0 mt-3">
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
    ...mapGetters(['Severities', 'ProjectTypes', 'Statuses', 'ProjectList', 'Issue']),
  },

  data() {
    return {
      dialog: false,

      issue_type: '',
      issue_type_check: false,

      issue_status: '',
      issue_status_check: false,

      issue_severity: '',
      issue_severity_check: false,

      issueType_Id: '',
      issueStatus_Id: '',
      issueSeverity_Id: '',
    }
  },

  watch: {
    Issue() {
      this.$store.commit('setIssue', this.Issue)
    },
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
      this.dialog = false
      await this.updateIssue(updateIssue)
      await this.fetchIssue(updateIssue.id)
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
