<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="blue lighten-1">
            <span class="white--text">Open</span>
          </v-card-title>
          <v-card-text class="blue lighten-2">
            <draggable class="list-group kanban-column" :list="Open" group="tasks">
              <v-card
                class="blue lighten-2"
                color="#f3f3fb"
                style="height:40px; padding-top:10px"
                v-for="issue in Open"
                :key="issue"
                align-left
                @change="this.switch(issue, this.status[0].id)"
              >
                <router-link
                  style="text-decoration: none; color:black"
                  :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                >
                  {{ issue.title }}
                </router-link>
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="light-green lighten-1">
            <span class="white--text">In Progress</span>
          </v-card-title>
          <v-card-text class="light-green lighten-2">
            <draggable class="list-group kanban-column" :list="InProgress" group="tasks">
              <v-card
                class="light-green lighten-2"
                color="#f3f3fb"
                style="height:40px;padding-top:10px"
                v-for="issue in InProgress"
                :key="issue"
                align-left
                @change="this.switch(issue, this.status[1].id)"
              >
                <router-link
                  style="text-decoration:none;color:black"
                  :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                >
                  {{ issue.title }}
                </router-link>
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="orange lighten-1">
            <span class="white--text">Completed</span>
          </v-card-title>
          <v-card-text class="orange lighten-2">
            <draggable class="list-group kanban-column" :list="Completed" group="tasks">
              <v-card
                class="orange lighten-2"
                color="#f3f3fb"
                style="height:40px;padding-top:10px"
                v-for="issue in Completed"
                :key="issue"
                align-left
                @change="this.switch(issue, this.status[2].id)"
              >
                <router-link
                  style="text-decoration:none;color:black"
                  :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                >
                  {{ issue.title }}
                </router-link>
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

    switch(issue, status) {
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
