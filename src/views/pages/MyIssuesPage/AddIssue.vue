<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          <v-icon align-self: left>
            mdi-plus-thick
          </v-icon>
          Add Issue
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add Issue</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field v-model="title" label="Title"></v-text-field>
            <v-textarea v-model="description" label="Description"></v-textarea>
            <v-select
              item-text="text"
              item-value="value"
              :items="time_est"
              v-model="time_estimate"
              label="Time Estimate"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :items="projectList"
              v-model="project"
              label="Project"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :items="issueType"
              v-model="issue_type"
              label="Issue Type"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              v-model="issue_status"
              label="Issue Status"
              :items="issueStatus"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :items="issueSeverity"
              v-model="issue_severity"
              label="Issue Severity"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn flat @click="postIssue" class="success mx-0 mt-3">
              <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
const issue = {}
const issueType = []
const issueStatus = []
const issueSeverity = []
const projectList = []
export default {
  data() {
    return {
      title: '',
      description: '',
      time_estimate: '',
      project: '',
      issue_type: '',
      issue_status: '',
      issue_severity: '',
      issueType: [],
      issueStatus: [],
      issueSeverity: [],
      projectList: [],
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
  mounted() {
    this.getIssueStatus()
    this.getIssueSeverity()
    this.getIssueType()
    this.getProjectList()
  },
  methods: {
    postIssue() {
      axios
        .post('https://fadiserver.herokuapp.com/api/v1/my-issues/', {
          title: this.title,
          description: this.description,
          time_estimate: this.time_estimate,
          userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
          projectid: this.project,
          issueTypeId: this.issue_type,
          issueStatusId: this.issue_status,
          issueSeverityId: this.issue_severity,
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIssueStatus() {
      axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-status/')
        .then(response => {
          this.issueStatus = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIssueSeverity() {
      axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-severities/')
        .then(response => {
          this.issueSeverity = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIssueType() {
      axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-types/')
        .then(response => {
          this.issueType = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProjectList() {
      axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-projects/')
        .then(response => {
          this.projectList = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.v-btn {
  left: 43%;
}
</style>
