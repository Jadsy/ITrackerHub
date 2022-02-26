<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="blue lighten-3">
            <span class="white--text">Open</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="blue lighten-3">
            <draggable class="list-group kanban-column" :list="issues" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:40px; margin-top:10px;"
                v-for="issue in issues"
                :key="issue"
                align-center
                elevation="3"
              >
                <router-link
                  class="d-flex align-center text-decoration-none grey--text"
                  :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                >
                  {{ issue.title }}
                  <pills :issue_atribute="getSeverityTitle(issue)"> 

                  </pills>
                  
                  
                  
                </router-link>
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="light-green lighten-3">
            <span class="white--text">In Progress</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="light-green lighten-3">
            <draggable class="list-group kanban-column" :list="InProgress" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:40px; margin-top:10px"
                v-for="issue in InProgress"
                :key="issue"
                align-left
                elevation="3"
              >
                <router-link
                  class="d-flex align-center text-decoration-none grey--text"
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
          <v-card-title class="orange lighten-3">
            <span class="white--text">Completed</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="orange lighten-3">
            <draggable class="list-group kanban-column" :list="Completed" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:40px; margin-top:10px"
                v-for="issue in Completed"
                :key="issue"
                align-left
                elevation="3"
              >
                <router-link
                  class="d-flex align-center text-decoration-none grey--text"
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
import draggable from 'vuedraggable'
import axios from 'axios'
import Severity from './severity.json'
import pills from './Pills.vue'


export default {
  data() {
    return {
      issues: [],
      status: [],
      Open: [],
      InProgress: [],
      Completed: [],
      severity: Severity,
    }
  },

  components: {
    draggable,
    pills,
  },

  mounted() {
    this.getIssuesList(), 
    this.getIssueStatus(), 
    this.OpenIssues(),
    this.InProgressIssues()
    this.CompletedIssues()
  },

  methods: {
    OpenIssues() {
      for (var issue of this.issues) {
        if (issue.issueStatusId == this.status[0].id) this.Open.push(issue)
      }
    },

    InProgressIssues() {
      for (var issue of this.issues) {
        if (issue.issueStatusId == this.status[1].id) this.InProgress.push(issue)
      }
    },
    
    CompletedIssues() {
      for (var issue of this.issues) {
        if (issue.issueStatusId == this.status[2].id) this.Completed.push(issue)
      }
    },

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
    getIssueStatus() {
      axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-status/')
        .then(response => {
          this.status = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSeverityTitle(s){
      for(var sv of this.severity){
        if (s.issueSeverityId==sv) {
          return sv.title
        }
      }
    }
  },
}
</script>

<style scoped>
hr {
  margin-top: 0.1px;
  margin-bottom: 0.1px;
  border: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
