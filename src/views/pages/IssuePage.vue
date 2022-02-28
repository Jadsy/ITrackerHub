<template>
  <v-container>
    <go-back></go-back>
    <v-card width="1000px">
      <v-card-title class="purple lighten-3" style="height: 70px;"><span class="white--text">{{ issue.title }}</span></v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-row>
              <v-text>
                <span class="black--text text-h4 " style="position:relative;top:15px"> Description: </span>
                <br>
                <span class="black--text text-h4 " style="position:relative;top:40px"> Details: </span>
                <br />
                <p>{{ issue.description }}</p>
              </v-text>
            </v-row>

            <v-row>
              <v-text>
                <br />
                <v-row>
                  <v-col cols="6"> <span class="black--text text-h5 " style="position:relative;top:30px"> Type: </span></v-col>
                  <v-col cols="6"><span class="black--text text-subtitle-1 " style="position:relative;right:150px;top:30px"> {{ issue.issueType }} </span></v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"> <span class="black--text text-h5 " style="position:relative;top:30px"> Status: </span></v-col>
                  <v-col cols="6"><span class="black--text text-subtitle-1 " style="position:relative;right:150px;top:30px"> {{ issue.issueStatus }}</span></v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"> <span class="black--text text-h5 " style="position:relative;top:30px"> Severity: </span></v-col>
                  <v-col cols="6"><span class="black--text text-subtitle-1 " style="position:relative;right:150px;top:30px"> {{ issue.issueSeverity }} </span></v-col>
                </v-row>
              </v-text>
            </v-row>
          </v-col>

          <v-col cols="3">
            <v-row>
              <span class="black--text text-h5 " style="position:relative; top:150px;right:170px">Created by:</span>
              <span class="black--text text-subtitle-1" style="position:relative; bottom:40px">{{ issue.userid }}</span>
              
              <br />
            </v-row>
            <v-row>
              <span class="black--text text-h5 " style="position:relative; top:150px;right:170px">Assignees:</span>
            </v-row>
            <v-row>
              <span class="black--text text-h5 " style="position:relative; top:170px;right:170px">Date Created:</span>
              <span class="black--text text-subtitle-1" style="position:relative; top:130px">{{ issue.created }}</span>
              
            </v-row>
          </v-col>
        </v-row>
        <v-row class="my-16">
          <span class="black--text text-h5" style="position:relative;top:10px">Attachments: </span>
        </v-row>

        <v-row>
          <span class="black--text text-h5 " style="position:relative;bottom:30px"> Comments: </span>
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
