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
      <!-- name -->
      <template #[`item.full_name`]="{item}">
        <div class="d-flex flex-column">
          <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.full_name }}</span>
          <small>{{ item.post }}</small>
        </div>
      </template>
      <template #[`item.salary`]="{item}">
        {{ `$${item.salary}` }}
      </template>

      <template #[`item.status`]="{item}">
        <v-chip small :color="statusColor[status[item.status]]" class="font-weight-medium">
          {{ status[item.status] }}
        </v-chip>
      </template>
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

  mounted() {
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
          let issueList = response.data
          for (let i = 0; i < issueList.length; i++) {
            for (let j = 0; j < this.issueType.length; j++) {
              if (issueList[i].issueTypeId == this.issueType[j].id) {
                issueList[i].issueTypeId = this.issueType[j].title
              }
            }
            for (let j = 0; j < this.issueStatus.length; j++) {
              if (issueList[i].issueStatusId == this.issueStatus[j].id) {
                issueList[i].issueStatusId = this.issueStatus[j].title
              }
            }
            for (let j = 0; j < this.issueSeverity.length; j++) {
              if (issueList[i].issueSeverityId == this.issueSeverity[j].id) {
                issueList[i].issueSeverityId = this.issueSeverity[j].title
              }
            }
            for (let j = 0; j < this.projectList.length; j++) {
              if (issueList[i].projectid == this.projectList[j].id) {
                issueList[i].projectid = this.projectList[j].title
              }
            }
            this.issues = issueList
          }
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
