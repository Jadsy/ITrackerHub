<template>
  <v-container>
    <v-row>
      <v-col xl="3" lg="3" md="3" sm="3" xs="12" v-for="i in 4" :key="i">
        <v-card>
          <v-card-title>{{ severity[i - 1].title }}</v-card-title>
          <v-divider horizontal></v-divider>
          <v-card v-for="issue in issues" :key="issue">
            <v-card-text v-if="issue.issueSeverityId === severity[i - 1].id" align-left>
              <v-dialog v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn block text v-bind="attrs" v-on="on">{{ issue.title }}</v-btn>
                </template>
                <v-card>
                  <v-card-title>{{ issue.title }}</v-card-title>
                  <v-divider horizontal></v-divider>
                  <v-card-text>
                    <p>Description: {{ issue.description }}</p>
                    <p>Creation Date: {{ issue.created }}</p>
                    <p>Time estimate: {{ issue.time_estimate }}</p>
                    <p>Issue Status: {{ severity[i - 1].title }}</p>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
const issues = []
const severity = []

export default {
  data() {
    return {
      issues: [],
      severity: [],
    }
  },
  mounted() {
    this.getIssuesList()
    this.getIssueSeverity()
  },
  methods: {
    getIssuesList() {
      axios
        .get('http://127.0.0.1:8000/api/v1/my-issues/')
        .then(response => {
          this.issues = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIssueSeverity() {
      axios
        .get('http://127.0.0.1:8000/api/v1/my-severities/')
        .then(response => {
          this.severity = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
