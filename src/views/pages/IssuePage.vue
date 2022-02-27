<template>
  <v-container>
    <go-back></go-back>
    <v-card width="1000px">
      <v-card-title>{{ issue.title }}</v-card-title>
      <v-divider horizontal></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-row>
              <v-text>
                <h4>Description</h4>
                <br />
                <p>{{ issue.description }}</p>
              </v-text>
            </v-row>

            <v-row>
              <v-text>
                <h4>Details:</h4>
                <br />
                <v-row>
                  <v-col cols="6"> <h5>Type</h5></v-col>
                  <v-col cols="6"> {{ issue.issueTypeId }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"> <h5>Status</h5></v-col>
                  <v-col cols="6"> {{ issue.issueStatusId }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"> <h5>Severity</h5></v-col>
                  <v-col cols="6"> {{ issue.issueSeverityId }}</v-col>
                </v-row>
              </v-text>
            </v-row>
          </v-col>

          <v-col cols="3">
            <v-row>
              <h4>Created by:</h4>
              {{ issue.userid }}
              <br />
            </v-row>
            <v-row>
              <h4>Assignees</h4>
            </v-row>
            <v-row>
              <h4>Date Created</h4>
              {{ issue.created }}
            </v-row>
          </v-col>
        </v-row>
        <v-row class="my-16">
          <h4>Attachments:</h4>
        </v-row>

        <v-row>
          <h4>Comments</h4>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import GoBack from '@/layouts/components/GoBack.vue'
const projectList = []
const issuesList = []
import axios from 'axios'
export default {
  data() {
    return {
      projectList: [],
      issuesList: [],
    }
  },
  methods: {
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
    getIssuesById() {
      for (let j = 0; j < this.projectList.length; j++) {
        let projectid = this.projectList[j].id
        axios
          .get('https://fadiserver.herokuapp.com/api/v1/my-projects/?projectid=' + projectid)
          .then(response => {
            this.issuesList.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
  },
  props: ['id', 'issue'],
  components: {
    GoBack,
  },
}
</script>

<style scoped>
.v-card {
  top: 20px;
}
</style>
