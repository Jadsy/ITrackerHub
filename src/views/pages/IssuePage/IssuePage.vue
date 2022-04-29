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
          <!-- <EditIssue class="edit"></EditIssue> -->
          <v-btn class="edit_btn" rounded color="success" :disabled="!changes" :loading="loading" @click="Update">
            <v-icon>mdi-content-save-check-outline</v-icon> Save Changes</v-btn
          >
        </v-col>

        <v-col xl="3" lg="3" md="3" sm="3" xs="12">
          <!-- <button @click="Delete" class="btn" style="left:100px;position:relative">DELETE ISSUE</button> -->
          <DeleteIssue></DeleteIssue>
        </v-col>
      </v-row>
      <v-card width="2100px">
        <v-card-title class="primary" style="height: 70px">
          <span v-if="!editTitle" class="white--text"
            >{{ temporaryTitle
            }}<v-btn icon @click="editTitle = true">
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
          </span>
          <v-row>
            <v-col>
              <v-text-field v-if="editTitle" color="white" label="Title" v-model="temporaryTitle"></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="success" rounded v-if="editTitle" @click="editTitle = false">Ok</v-btn>
            </v-col>
            <v-col> </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap justify-space-between>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"><v-icon>mdi-atom-variant</v-icon> Type: </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-chip class="ma-2 ml-15" :color="Issue.issueType.color">
                <div class="subtitle-1 white--text">{{ Issue.issueType.title }}</div>
              </v-chip>
            </v-flex>
            <v-flex xs4 md3>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                    ><v-icon>mdi-clipboard-clock-outline</v-icon> Status: <v-btn icon @click="editStatus = true">
                    <v-icon color="primary">mdi-pencil</v-icon>
                  </v-btn></v-list-item-title
                  >
                  
                  <v-select
                    v-if="editStatus"
                    item-text="title"
                    item-value="id"
                    :value="Statuses.filter(status => status.title == Issue.issueStatus.title)[0]"
                    label="Issue Status"
                    v-on:change="changeStatus"
                    :items="Statuses"
                  ></v-select>
                  <v-btn rounded class="primary" v-if="editStatus" @click="editStatus = false">Ok</v-btn>
                </v-list-item-content>
              </v-list-item>
              <div v-if="!editStatus" class="subtitle-1 pl-15 black--text">
                {{ temporaryStatus }}
              </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-space-between>
            <v-flex xs4 md3 v-if="hasSeverity">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    <v-icon>mdi-alert-outline</v-icon> Severity:
                    <v-btn v-if="hasSeverity" icon @click="editSeverity = true">
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                    <v-select
                      v-if="editSeverity"
                      item-text="title"
                      item-value="id"
                      :items="Severities"
                      :value="this.Severities.filter(severity => severity.title == this.Issue.issueSeverity.title)[0]"
                      label="Issue Severity"
                      v-on:change="changeSeverity"
                    ></v-select>
                    <v-btn rounded class="primary" v-if="editSeverity" @click="editSeverity = false">Ok</v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <div v-if="!editSeverity" class="subtitle-1 pl-15 black--text">
                {{ temporarySeverity }}
              </div>
            </v-flex>
            <v-flex xs4 md3 v-else>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6"> <v-icon>mdi-alert-outline</v-icon> Severity: </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <div class="subtitle-1 pl-15 black--text">
                {{ temporarySeverity }}
              </div>
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

              <div class="body-1 pl-14 black--text">
                <p>{{ date }}</p>
              </div>
            </v-flex>
          </v-layout>
          <v-flex xs12 md6>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1"
                  ><v-icon>mdi-card-text-outline</v-icon> Description:
                  <v-btn icon @click="editDescription = true">
                    <v-icon color="primary">mdi-pencil</v-icon>
                  </v-btn></v-list-item-title
                >
                <v-textarea
                  :full-width="true"
                  v-if="editDescription"
                  label="Description"
                  v-model="temporaryDescription"
                ></v-textarea>
                <v-btn rounded class="primary" v-if="editDescription" @click="editDescription = false">Ok</v-btn>
              </v-list-item-content>
            </v-list-item>

            <div v-if="!editDescription" class="body-1 pl-15 black--text">{{ temporaryDescription }}</div>
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
      hasSeverity: false,
      editTitle: false,
      editDescription: false,
      editStatus: false,
      editSeverity: false,
      time: '',
      date: '',
      isReady: false,
      pageNotReady: true,
      user: {},
      createdBy: '',
      assigneesIDs: [],
      assignees: [],
      temporaryTitle: '',
      temporaryDescription: '',
      temporarySeverity: '',
      temporaryStatus: '',
      loading: false,

      changes: false,

      issue_type: '',
      issue_type_check: false,

      issue_status: '',
      issue_status_check: false,

      issue_severity: '',
      issue_severity_check: false,

      issueType_Id: '',
      issueStatus_Id: '',
      issueSeverity_Id: '',
    }
  },

  computed: {
    ...mapGetters(['Issue', 'User', 'Severities', 'Statuses']),
  },

  methods: {
    ...mapActions(['fetchIssue', 'deleteIssue', 'fetchIssueComments', 'fetchUser', 'getIssueAssignees', 'updateIssue']),

    async FetchUser() {
      this.user = await this.fetchUser(this.Issue.user.id)
      this.user = this.user[0]
      this.isYou()
    },

    resetTemporaryTitle() {
      this.temporaryTitle = Object.assign(this.Issue.title)
    },
    resetTemporaryDescription() {
      this.temporaryDescription = Object.assign(this.Issue.title)
    },

    changeStatus(e) {
      this.issue_status = e
      this.issue_status_check = true
      this.temporaryStatus = this.Statuses.filter(status => status.id == this.issue_status)[0].title
    },
    changeSeverity(e) {
      this.issue_severity = e
      this.issue_severity_check = true
      this.temporarySeverity = this.Severities.filter(status => status.id == this.issue_severity)[0].title
    },

    isYou() {
      if (this.user.id === this.User.id) this.createdBy = this.user.first_name + ' ' + this.user.last_name + '(You)'
      else this.createdBy = this.user.first_name + ' ' + this.user.last_name
    },

    issueSeverityChecker() {
      return this.Issue.issueSeverity !== null ? this.Issue.issueSeverity.title : 'N/A'
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

    async Update() {
      
      if (!this.issue_status_check) {
        this.issue_status = this.Issue.issueStatus.title
        this.issueStatus_Id = this.Statuses.filter(type => type.title == this.issue_status)[0].id
      } else {
        this.issueStatus_Id = this.Statuses.filter(type => type.id == this.issue_status)[0].id
      }

      if (this.Issue.issueSeverity != null) {
        if (!this.issue_severity_check) {
          this.issue_severity = this.Issue.issueSeverity.title
          this.issueSeverity_Id = this.Severities.filter(type => type.title == this.issue_severity)[0].id
        } else {
          this.issueSeverity_Id = this.Severities.filter(type => type.id == this.issue_severity)[0].id
        }
      }

      const updateIssue = {
        id: this.Issue.id,
        created: this.Issue.created,
        title: this.Issue.title,
        description: this.Issue.description,
        time_estimate: this.time_estimate,
        userid: this.User.id,
        projectid: this.Issue.project.id,
        issueTypeId: this.issueType_Id,
        issueStatusId: this.issueStatus_Id,
        issueSeverityId: this.issueSeverity_Id,
        isComplete: this.Issue.isComplete,
      }

      this.loading = true
      await this.updateIssue(updateIssue)
      await this.fetchIssue(updateIssue.id)
      this.loading = false
      this.dialog = false
    },
  },

  watch: {
    async id() {
      this.pageNotReady = true
      this.temporaryTitle = Object.assign(this.Issue.title)
      this.temporaryDescription = Object.assign(this.Issue.description)
      this.temporarySeverity = this.issueSeverityChecker()
      this.temporaryStatus = Object.assign(this.Issue.issueStatus).title
      this.hasSeverity = this.Issue.issueSeverity !== null
      await this.fetchIssue(this.id)
      await this.fetchIssueComments(this.Issue.id)
      this.FetchUser(this.Issue.id)
      this.assigneesIDs = await this.getIssueAssignees(this.Issue.id)
      await this.FetchAssignees()
      this.pageNotReady = false
      this.isReady = true
      this.ParseDate()
    },

    editTitle() {
      this.changes = true
    },
    editDescription() {
      this.changes = true
    },
    editSeverity() {
      this.changes = true
    },
    editStatus() {
      this.changes = true
    },
  },

  async created() {
    this.pageNotReady = true
    this.temporaryTitle = Object.assign(this.Issue.title)
    this.temporaryDescription = Object.assign(this.Issue.description)
    this.temporarySeverity = this.issueSeverityChecker()
    this.temporaryStatus = Object.assign(this.Issue.issueStatus).title
    this.hasSeverity = this.Issue.issueSeverity !== null
    await this.fetchIssue(this.id)
    await this.fetchIssueComments(this.Issue.id)
    this.FetchUser(this.Issue.id)
    this.assigneesIDs = await this.getIssueAssignees(this.Issue.id)
    await this.FetchAssignees()
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

.edit_btn {
  right: 24%;
  position: absolute;
}
</style>