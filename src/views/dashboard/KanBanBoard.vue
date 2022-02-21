<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title>Open</v-card-title>
          <v-card-text>
            <draggable class="list-group kanban-column" :list="Open" group="tasks">
              <v-card class="list-group-item" v-for="issue in Open" :key="issue" align-left>
                {{ issue.title }}
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title>In Progress</v-card-title>
          <v-card-text>
            <draggable class="list-group kanban-column" :list="InProgress" group="tasks">
              <v-card class="list-group-item" v-for="issue in InProgress" :key="issue" align-left>
                {{ issue.title }}
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title>Completed</v-card-title>
          <v-card-text>
            <draggable class="list-group kanban-column" :list="Completed" group="tasks">
              <v-card class="list-group-item" v-for="issue in Completed" :key="issue" align-left>
                {{ issue.title }}
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Issues from './issues.json'
import Status from './status.json'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  data: () => ({
    issues: Issues,
    status: Status,
    colors: ['#EF5350', '#8C9EFF', '#66BB6A'],
    newTask: '',
    // 4 arrays to keep track of our 4 statuses
    Open: [],
    InProgress: [],
    Completed: [],
  }),
  methods: {
    OpenIssues(issues, open, statusID) {
      for (var issue of issues) {
        if (issue.issueStatusId == statusID) open.push(issue)
      }
    },
    InProgressIssues(issues, inprogress, statusID) {
      for (var issue of issues) {
        if (issue.issueStatusId == statusID) inprogress.push(issue)
      }
    },
    CompletedIssues(issues, completed, statusID) {
      for (var issue of issues) {
        if (issue.issueStatusId == statusID) completed.push(issue)
      }
    },

    switch: function(issue, status) {
      issue.issueStatusId = status
    },
  },
  mounted() {
    this.OpenIssues(this.issues, this.Open, this.status[0].id)
    this.InProgressIssues(this.issues, this.InProgress, this.status[1].id)
    this.CompletedIssues(this.issues, this.Completed, this.status[2].id)
  },
}

// import axios from 'axios'
// const issues = []
// const status = []

// export default {
//   data() {
//     return {
//       issues: [],
//       status: [],
//     }
//   },
//   mounted() {
//     this.getIssuesList()
//     this.getIssueStatus()
//   },
//   methods: {
//     getIssuesList() {
//       axios
//         .get('http://127.0.0.1:8000/api/v1/my-issues/')
//         .then(response => {
//           this.issues = response.data
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//     getIssueStatus() {
//       axios
//         .get('http://127.0.0.1:8000/api/v1/my-status/')
//         .then(response => {
//           this.status = response.data
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//   },
// }
</script>
