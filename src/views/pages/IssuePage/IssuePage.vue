<template>
  <v-container>
    <v-row v-if="pageNotReady" style="height: 505px"
      ><v-skeleton-loader height="500" type="actions, card-heading, image, divider"> </v-skeleton-loader
    ></v-row>
    <v-row v-if="pageNotReady"
      ><v-skeleton-loader height="500" type="card-heading, divider, list-item-three-line"> </v-skeleton-loader
    ></v-row>

    <v-container v-else>
      <v-row>
        <v-col cols="6">
          <go-back></go-back>
        </v-col>
        <v-col xl="3" lg="3" md="3" sm="3" xs="12">
          <!-- <EditIssue class="edit" style="left:120px;position:relative"></EditIssue> -->
          <EditIssue class="edit"></EditIssue>
        </v-col>

        <v-col xl="3" lg="3" md="3" sm="3" xs="12">
          <!-- <button @click="Delete" class="btn" style="left:100px;position:relative">DELETE ISSUE</button> -->
          <DeleteIssue></DeleteIssue>
        </v-col>
      </v-row>
      <v-card width="2100px">
        <v-card-title class="primary" style="height: 70px">
          <span class="white--text">{{ Issue.title }}</span></v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap justify-space-between>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"><v-icon>mdi-atom-variant</v-icon> Type:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-chip class="ma-2 ml-15" :color="Issue.issueType.color">
                <div class="subtitle-1  white--text">{{ Issue.issueType.title }}</div>
              </v-chip>
            </v-flex>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                    ><v-icon>mdi-clipboard-clock-outline</v-icon> Status:</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <div v-if="Issue.issueSeverity !== null" class="subtitle-1 pl-15 black--text">
                {{ Issue.issueStatus.title }}
              </div>
              <div v-else class="subtitle-1 pl-15 black--text">N/A</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-space-between>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"> <v-icon>mdi-alert-outline</v-icon> Severity:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <div class="subtitle-1 pl-15 black--text">{{ issueSeverityChecker() }}</div>
            </v-flex>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                    ><v-icon>mdi-account-box-outline</v-icon> Created By:</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <div class="subtitle-1 pl-15 black--text">{{ createdBy }}</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-space-between>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"><v-icon>mdi-account-group</v-icon> Assignees:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <div class="subtitle-1 pl-15 black--text" v-for="assignee in assignees" :key="assignee.id">
                {{ assignee.first_name }} {{ assignee.last_name }} <br />
              </div>
            </v-flex>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                    ><v-icon>mdi-clock-outline</v-icon> Date Created:</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <div class="body-1 pl-15 black--text">
                <p>{{ date }}</p>
              </div>
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
            </v-flex>
          </v-layout>
          <v-flex xs12 md6>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1"><v-icon>mdi-card-text-outline</v-icon> Description:</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <div class="body-1 pl-15 black--text">{{ Issue.description }}</div>
          </v-flex>
        </v-card-text>
      </v-card>

      <comments v-if="isReady" class="comments" :issue="Issue"></comments>
    </v-container>
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
      user: {},
      createdBy: '',
      assigneesIDs: [],
      assignees: [],
    }
  },

  computed: {
    ...mapGetters(['Issue', 'User']),
  },

  methods: {
    ...mapActions(['fetchIssue', 'deleteIssue', 'fetchIssueComments', 'fetchUser', 'getIssueAssignees']),

    async FetchUser() {
      this.user = await this.fetchUser(this.Issue.user.id)
      this.user = this.user[0]
      this.isYou()
    },

    isYou() {
      if (this.user.id === this.User.id) this.createdBy = this.user.first_name + ' ' + this.user.last_name + '(You)'
    },

    issueSeverityChecker() {
      return this.Issue.issueSeverity !== null ? this.Issue.issueSeverity.title : 'No Severity'
    },

    ParseDate() {
      this.date = new Date(this.Issue.created).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      })
    },

    async FetchAssignees() {
      this.assigneesIDs.forEach(async member_ID => {
        var member = ''
        member = await this.fetchUser(member_ID.userId)
        member = member[0]
        this.assignees.push(member)
      })
    },
  },

  watch: {
    async id() {
      this.pageNotReady = true
      await this.fetchIssue(this.id)
      await this.fetchIssueComments(this.Issue.id)
      await this.FetchUser()
      this.assigneesIDs = await this.getIssueAssignees(this.Issue.id)
      await this.FetchAssignees()
      this.pageNotReady = false
    },
  },

  async created() {
    this.pageNotReady = true
    await this.fetchIssue(this.id)
    await this.fetchIssueComments(this.Issue.id)
    this.FetchUser(this.Issue.id)
    this.assigneesIDs = await this.getIssueAssignees(this.Issue.id)
    await this.FetchAssignees()
    console.log(this.assigneesIDs)
    this.pageNotReady = false
    this.isReady = true
    this.ParseDate()
  },
}
</script>

<style scoped>
.v-card {
  top: 20px;
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
