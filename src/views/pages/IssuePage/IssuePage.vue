<template>
  <v-container>
    <v-row v-if="pageNotReady" style="height: 340px;"
      ><v-skeleton-loader height="500" type="actions, card-heading, image, divider" >
      </v-skeleton-loader
    ></v-row>
    <v-row v-if="pageNotReady"
      ><v-skeleton-loader height="500" type="card-heading, divider, list-item-three-line" >
      </v-skeleton-loader
    ></v-row>

    <container v-else>
      <v-row>
        <v-col cols="6">
          <go-back></go-back>
        </v-col>
        <v-col cols="3">
          <!-- <EditIssue class="edit" style="left:120px;position:relative"></EditIssue> -->
          <EditIssue class="edit"></EditIssue>
        </v-col>

        <v-col cols="3">
          <!-- <button @click="Delete" class="btn" style="left:100px;position:relative">DELETE ISSUE</button> -->
          <DeleteIssue></DeleteIssue>
        </v-col>
      </v-row>
      <v-card width="2100px">
        <v-card-title class="blue lighten-4" style="height: 70px;">
          <span class="black--text">{{ Issue.title }}</span></v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="blue lighten-5">
          <v-layout row wrap>
            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="purple lighten-3" width="100" height="100">
                      <v-icon dark large> mdi-image-text</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <!-- <div class="overline text-right">
                Description
              </div> -->
                    <v-list-item-title class="headline mb-1 text-right">Description</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2" person></v-icon>
                  <div class="body-1">{{ Issue.description }}</div>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="orange darken-1" width="100" height="100" elevation="50">
                      <v-icon dark large> mdi-format-list-bulleted-type</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <!-- <div class="overline text-right">
                Description
              </div> -->
                    <v-list-item-title class="headline mb-1 text-right">Type</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2" person></v-icon>
                  <div class="overline">{{ Issue.issueType.title }}</div>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="light-blue accent-2" width="100" height="100" elevation="50">
                      <v-icon dark large> mdi-list-status</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1 text-right">Status</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2" person></v-icon>
                  <div class="overline">{{ Issue.issueStatus.title }}</div>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="red darken-1" width="100" height="100" elevation="50">
                      <v-icon dark large> mdi-alert</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <!-- <div class="overline text-right">
                Description
              </div> -->
                    <v-list-item-title class="headline mb-1 text-right">Severity</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2" person></v-icon>
                  <div class="overline">{{ Issue.issueSeverity.title }}</div>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3" width="1000px">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="grey lighten-1" width="100" height="100" elevation="50">
                      <v-icon dark large> mdi-account</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <!-- <div class="overline text-right">
                Description
              </div> -->
                    <v-list-item-title class="headline mb-1 text-right">Created By</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2" person></v-icon>
                  <div class="overline">{{ Issue.userid }}</div>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3" width="1000px">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="blue darken-2" width="100" height="100" elevation="50">
                      <v-icon dark large> mdi-account-group</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <!-- <div class="overline text-right">
                Description
              </div> -->
                    <v-list-item-title class="headline mb-1 text-right">Assignees</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon style="margin-bottom:5px"></v-icon>
                  <div class="overline"></div>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex sm6 xs12 md6 lg3>
              <v-card class="ma-3" width="4000px">
                <v-list-item>
                  <v-list-item-avatar tile class="mt-n7">
                    <v-sheet color="brown lighten-2" width="100" height="100">
                      <v-icon dark large> mdi-alarm</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <!-- <div class="overline text-right">
                Description
              </div> -->
                    <v-list-item-title class="headline mb-1 text-right">Date Created</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-icon text class="ma-2" person></v-icon>
                  <div class="body-1">
                    <p>Created on {{ date }}</p>
                    <p>at {{ time }}</p>
                  </div>
                </v-card-actions>
              </v-card>
            </v-flex>
            <!-- <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3" width="2000">
              <v-list-item>
                <v-list-item-avatar tile class="mt-n7">
                  <v-sheet color="yellow darken-2" width="100" height="100" elevation="50">
                    <v-icon dark large> mdi-paperclip</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content> -->
            <!-- <div class="overline text-right">
                Description
              </div> -->
            <!-- <v-list-item-title class="headline mb-1 text-right">Attachments</v-list-item-title>
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-icon text class="ma-2" person></v-icon>
                <div class="overline">
                  <v-file-input v-model="attachment_files" show-size counter multiple label="File input" @input="AddAttachment"></v-file-input>
                </div>
              </v-card-actions>
            </v-card>
          </v-flex> -->
          </v-layout>
          <v-layout row wrap> </v-layout>
        </v-card-text>
      </v-card>

      <comments v-if="isReady" class="comments" :issue="Issue"></comments>
    </container>
  </v-container>
</template>
<script>
import GoBack from '@/layouts/components/GoBack.vue'
import EditIssue from '../IssuePage/EditIssue.vue'
import Comments from '../IssuePage/IssueComments.vue'
import DeleteIssue from '../IssuePage/DeleteIssue.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    GoBack,
    EditIssue,
    Comments,
    DeleteIssue,
  },

  props: ['id'],

  data() {
    return {
      time: '',
      date: '',
      isReady: false,
      pageNotReady: true,
    }
  },

  computed: {
    ...mapGetters(['Issue']),
  },

  methods: {
    ...mapActions(['fetchIssue', 'deleteIssue']),

    Delete() {
      this.deleteIssue(this.id)
    },

    ParseDate() {
      const dateRegex = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
      const timeRegex = new RegExp('[0-9]{2}:[0-9]{2}')

      this.time = timeRegex.exec(this.Issue.created).toString()
      this.date = dateRegex.exec(this.Issue.created).toString()
    },
  },

  watch: {
    async id() {
      this.pageNotReady = true
      await this.fetchIssue(this.id)
      this.pageNotReady = false
    },
  },

  async created() {
    this.pageNotReady = true
    await this.fetchIssue(this.id)
    this.pageNotReady = false
    this.isReady = true
    this.ParseDate()
  },

  beforeDestroy() {
    this.$store.commit('resetIssue')
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
  width: 150px;
  border-radius: 30px;
  /* left: 900px; */
  /* position: absolute; */
}
.btn:hover {
  background-color: white;
  color: red;
  border: solid;
}

.edit {
  width: 150px;
  border-radius: 30px;
}

hr {
  margin-top: 0.1px;
  margin-bottom: 0.1px;
  border: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.comments {
  top: 30px;
}
</style>
