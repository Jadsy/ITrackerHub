<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="blue lighten-4">
            <span class="white--text">Open</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="blue lighten-4">
            <draggable
              class="list-group kanban-column"
              :list="Open"
              group="tasks"
            >
              <v-card
                class="#f4f5fa"
                style="height:40px; margin-top:10px"
                v-for="issue in (Open = issues.filter(x => x.issueStatusId == status[0].id))"
                :key="issue"
                align-center
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
          <v-card-title class="light-green lighten-4">
            <span class="white--text">In Progress</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="light-green lighten-4">
            <draggable class="list-group kanban-column" :list="InProgress" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:40px; margin-top:10px"
                v-for="issue in InProgress = issues.filter(x => x.issueStatusId == status[1].id)"
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
          <v-card-title class="orange lighten-4">
            <span class="white--text">Completed</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="orange lighten-4">
            <draggable class="list-group kanban-column" :list="Completed" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:40px; margin-top:10px"
                v-for="issue in Completed = issues.filter(x => x.issueStatusId == status[2].id)"
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

export default {
  data() {
    return {
      issues: [],
      status: [],
    }
  },

  components: {
    draggable,
  },

  mounted() {
    this.getIssueStatus(), this.getIssuesList()
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
