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
                <span  style="position:relative;top:15px;font-size:28px;color:black"> Description: </span>
                <span  style="position:relative;left:50px;top:15px;font-size:20px; color:black">{{ issue.description }}</span>
                <br>
                <span style="position:relative;top:35px; font-size:28px; color:black"> Details: </span>
                <br />
                
              </v-text>
            </v-row>

            <v-row>
              <v-text>
                <br />
                <v-row>
                  <v-col cols="6"> <span class=" text-h5 " style="position:relative;top:30px;color:black"> Type: </span></v-col>
                  <v-col cols="6"><span class=" text-subtitle-1 " style="position:relative;right:150px;top:35px; color:black"> {{ issue.issueType }} </span></v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"> <span class=" text-h5 " style="position:relative;top:30px; color:black"> Status: </span></v-col>
                  <v-col cols="6"><span class=" text-subtitle-1 " style="position:relative;right:150px;top:35px; color:black"> {{ issue.issueStatus }}</span></v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"> <span class=" text-h5 " style="position:relative;top:30px;color:black"> Severity: </span></v-col>
                  <v-col cols="6"><span class=" text-subtitle-1 " style="position:relative;right:150px;top:35px;color:black"> {{ issue.issueSeverity }} </span></v-col>
                </v-row>
              </v-text>
            </v-row>
          </v-col>

          <v-col cols="3">
            <v-row>
              <span class=" text-h5 " style="position:relative; top:150px;right:170px;color:black">Created by:</span>
              <span class=" text-subtitle-1" style="position:relative; bottom:40px;color:black">{{ issue.userid }}</span>
              
              <br />
            </v-row>
            <v-row>
              <span class=" text-h5 " style="position:relative; top:150px;right:170px;color:black">Assignees:</span>
            </v-row>
            <v-row>
              <span class=" text-h5 " style="position:relative; top:170px;right:170px;color:black">Date Created:</span>
              <span class=" text-subtitle-1" style="position:relative; top:130px;color:black">{{ issue.created }}</span>
              
            </v-row>
            <v-row>
              <button class="btn"> DELETE ISSUE</button>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="my-16">
          <span class=" text-h5" style="position:relative;top:10px;color: black">Attachments: </span>
        </v-row>

        <v-row>
          <span class=" text-h5 " style="position:relative;bottom:30px; color:black"> Comments: </span>
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
    deleteIssue() {
      axios
        .delete('https://fadiserver.herokuapp.com/api/v1/my-issues/?id=' + this.id)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
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

.btn{
  background-color: red;
  color: white;
  position: relative;
  bottom: 285px;
  left: 100px;
  width: 150px;
  border-radius: 30px;
}
.btn:hover {
  background-color: white;
  color: red;
  border: solid;
}
</style>
