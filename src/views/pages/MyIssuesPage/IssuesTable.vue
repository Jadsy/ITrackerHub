<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="issues"
      item-key="full_name"
      class="table-rounded"
      hide-default-footer
      enable-sort
    >
    </v-data-table>
  </v-card>
</template>

<script>
//const issueList = []
const issueType = []
const issueStatus = []
const issueSeverity = []
const projectList = []
const issues = []
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'

import axios from 'axios'
export default {
  data() {
    return {
      //issueList: [],
      issueType: [],
      issueStatus: [],
      issueSeverity: [],
      projectList: [],
      issues: [],
    }
  },
  created() {
    this.getIssueStatus()
    this.getIssueSeverity()
    this.getIssueType()
    this.getProjectList()
    this.getIssuesList()
  },

  methods: {
    getIssuesList() {
      axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-issues/')
        .then(response => {
          this.issues = response.data
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
  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'description', value: 'description' },
        { text: 'estimate', value: 'time_estimate' },
        { text: 'Assignees', value: 'userid' },
        { text: 'Project', value: 'projectid' },
        { text: 'Type', value: 'issueTypeId' },
        { text: 'Status', value: 'issueStatusId' },
        { text: 'Severity', value: 'issueSeverityId' },
      ],
    }
  },
}
</script>
