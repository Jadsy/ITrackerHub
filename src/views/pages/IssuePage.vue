<template>
  <v-container>
    <go-back></go-back>
    <v-card width="1000px">
      <v-card-title class="primary lighten-3" style="height: 70px;"
        ><span class="white--text">{{ Issue.title }}</span></v-card-title
      >
      <v-card-text>
        
        <v-row>
          <v-col cols="9">
            <v-row>
              <v-text>
                <span style="position:relative;top:15px;font-size:28px;color:black"> Description: </span>
                <span style="position:relative;left:50px;top:15px;font-size:20px; color:black">{{
                  Issue.description
                }}</span>
                <br />
                <span style="position:relative;top:35px; font-size:28px; color:black"> Details: </span>
                <br />
              </v-text>
            </v-row>

            <v-row>
              <v-text>
                <br />
                <v-row>
                  <v-col cols="6">
                    <span class=" text-h5 " style="position:relative;top:30px;color:black"> Type: </span></v-col
                  >
                  <v-col cols="6"
                    ><span class=" text-subtitle-1 " style="position:relative;right:150px;top:35px; color:black">
                      {{ Issue.issueType }}
                    </span></v-col
                  >
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span class=" text-h5 " style="position:relative;top:30px; color:black"> Status: </span></v-col
                  >
                  <v-col cols="6"
                    ><span class=" text-subtitle-1 " style="position:relative;right:150px;top:35px; color:black">
                      {{ Issue.issueStatus }}</span
                    ></v-col
                  >
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <span class=" text-h5 " style="position:relative;top:30px;color:black"> Severity: </span></v-col
                  >
                  <v-col cols="6"
                    ><span class=" text-subtitle-1 " style="position:relative;right:150px;top:35px;color:black">
                      {{ Issue.issueSeverity }}
                    </span></v-col
                  >
                </v-row>
              </v-text>
            </v-row>
          </v-col>

          <v-col cols="3">
            <v-row>
              <span class=" text-h5 " style="position:relative; top:150px;right:170px;color:black">Created by:</span>
              <span class=" text-subtitle-1" style="position:relative; bottom:40px;color:black">{{
                Issue.userid
              }}</span>

              <br />
            </v-row>
            <v-row>
              <span class=" text-h5 " style="position:relative; top:150px;right:170px;color:black">Assignees:</span>
            </v-row>
            <v-row>
              <span class=" text-h5 " style="position:relative; top:170px;right:170px;color:black">Date Created:</span>
              <span class=" text-subtitle-1" style="position:relative; top:130px;color:black">{{ Issue.created }}</span>
            </v-row>
            <v-row>
              <v-col>
                <button @click="Delete" class="btn">DELETE ISSUE</button>
              </v-col>
              <v-col>
                <EditIssue class="edit" :Issue="Issue"></EditIssue>
              </v-col>
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
import EditIssue from './ProjectPage/EditIssue.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    GoBack,
    EditIssue,
  },

  props: ['id'],

  computed: {
    ...mapGetters(['Issue']),
  },

  methods: {
    ...mapActions(['fetchIssue', 'deleteIssue']),

    Delete() {
      this.deleteIssue(this.id)
    },
  },

  watch: {
    id() {
      this.fetchIssue(this.id)
    },
  },

  created() {
    this.fetchIssue(this.id)
  },
}
</script>

<style scoped>
.v-card {
  top: 20px;
}

.btn {
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

.edit {
  position: relative;
  bottom: 347px;
  left: -150px;
  width: 150px;
  border-radius: 30px;
}
</style>
