<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12" v-for="i in 3" :key="i">
        <v-card :style="{ 'background-color': colors[i - 1] }">
          <v-card-title class="colorChange"> {{ status[i - 1].title }} </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card v-for="issue in issues" :key="issue" style="width:360px;margin-left:5px;">
            <v-card-text v-if="issue.issueStatusId === status[i - 1].id" align-left>
              <router-link
                class="d-flex align-center text-decoration-none black--text"
                :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
              >
                {{ issue.title }}
              </router-link>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Issues from './issues.json'
import Status from './status.json'


export default {
  data: () => ({
    issues: Issues,
    status: Status,
    colors: ['#EF5350', '#8C9EFF', '#66BB6A'],
  }),
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
