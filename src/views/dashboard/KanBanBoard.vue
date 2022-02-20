<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12" v-for="i in 3" :key="i">
        <v-card  height="300px" :style="{ 'background-color': colors[i - 1] }">
          <v-card-title class="colorChange"> {{ status[i - 1].title }} </v-card-title>
          <v-divider horizontal></v-divider>
          <!-- <v-card v-for="issue in issues" :key="issue" style="width:360px;margin-left:5px;">
            <v-card-text v-if="issue.issueStatusId === status[i - 1].id" align-left>
              <router-link
                class="d-flex align-center text-decoration-none black--text"
                :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
              >
                {{ issue.title }}
              </router-link>
            </v-card-text>
          </v-card> -->
          <draggable class="list-group kanban-column" :list="issues" group="tasks" v-for="issue in issues" :key="issue">
            <div class="list-group-item" v-if="issue.issueStatusId === status[i - 1].id" align-left>
              <router-link
                class="d-flex align-center text-decoration-none black--text"
                :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
              >
                {{ issue.title }}
              
              </router-link>
            </div>
          </draggable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <div class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <b-form-input
          id="input-2"
          v-model="newTask"
          required
          placeholder="Enter Task"
          @keyup.enter="add"
        ></b-form-input>
        <b-button @click="add" variant="primary" class="ml-3">Add</b-button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>Back Log</h3> -->
  <!-- Backlog draggable component. Pass arrBackLog to list prop -->
  <!-- <draggable class="list-group kanban-column" :list="arrBackLog" group="tasks">
            <div class="list-group-item" v-for="element in arrBackLog" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3> -->
  <!-- In Progress draggable component. Pass arrInProgress to list prop -->
  <!-- <draggable class="list-group kanban-column" :list="arrInProgress" group="tasks">
            <div class="list-group-item" v-for="element in arrInProgress" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Testing</h3> -->
  <!-- Testing draggable component. Pass arrTested to list prop -->
  <!-- <draggable class="list-group kanban-column" :list="arrTested" group="tasks">
            <div class="list-group-item" v-for="element in arrTested" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3> -->
  <!-- Done draggable component. Pass arrDone to list prop -->
  <!-- <draggable class="list-group kanban-column" :list="arrDone" group="tasks">
            <div class="list-group-item" v-for="element in arrDone" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div> -->
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
    arrBackLog: [
      { name: 'Code Sign Up Page' },
      { name: 'Test Dashboard' },
      { name: 'Style Registration' },
      { name: 'Help with Designs' },
    ],
    arrInProgress: [],
    arrTested: [],
    arrDone: [],
  }),
  methods: {
    //add new tasks method
    switch: function(issue, status) {
      issue.issueStatusId = status
    },
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
