<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          <v-icon align-self: left> mdi-plus-thick </v-icon>
          Add Issue
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(type, index) in ProjectTypes" :key="index">
          <v-list-item-title style="cursor: pointer" @click="selectType(type)">{{ type.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" width="500" @click:outside="resetDialog">
      <v-card>
        <v-card-title>
          <h2>Add {{ issue_type_title }}</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" v-model="valid">
            <v-text-field v-model="title" label="Title" :rules="titleRules"></v-text-field>
            <v-textarea v-model="description" label="Description" :rules="descriptionRules"></v-textarea>
            <!-- <v-select
              item-text="title"
              item-value="id"
              :items="Types"
              v-model="issue_type"
              label="Issue Type"
            ></v-select> -->

            <v-select
              v-if="hasSeverity"
              item-text="title"
              item-value="id"
              :items="Severities"
              v-model="issue_severity"
              label="Issue Severity"
              :rules="severityRules"
            ></v-select>

            <span>Add Assignees</span>
            <v-btn icon prepend-icon: @click="addAssignee = true">
              <v-icon small color="primary">mdi-plus</v-icon>
            </v-btn>
            <v-card flat v-if="addAssignee">
              <v-card-text>
                <v-alert dense outlined type="error" icon="mdi-close-circle-outline" v-if="error">{{
                  this.errorMessage
                }}</v-alert>
                <v-row>
                  <v-col cols="10">
                    <v-text-field label="Member Email" v-model="userEmail"></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn small :loading="loading2" color="primary" @click="SearchForUser"> Search </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <template v-for="member in members">
                      <v-chip @click:close="removeMember(member)" close :color="randomColor()" :key="member.id"
                        >{{ member.first_name }} {{ member.last_name }}</v-chip
                      >
                    </template>
                  </v-col>
                </v-row>
                <!-- <v-row>
                  <v-col cols="3">
                    <v-btn color="primary" @click="AddAssignees" :loading="loading3">Add Assignees</v-btn>
                  </v-col>
                </v-row> -->
              </v-card-text>
            </v-card>

            <v-spacer></v-spacer>
            <v-btn :loading="loading1" :disabled="!valid" @click="postIssue()" class="success mx-0 mt-3">
              <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
            >
            <v-btn outlined class="cancel_btn mx-0 mt-3" @click="Cancel"> Cancel </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['Severities', 'ProjectTypes', 'Statuses', 'Project', 'Issue']),
  },

  data() {
    return {
      dialog: false,

      title: '',
      description: '',
      project: '',
      issue_type: '',
      issue_type_title: '',
      hasSeverity: false,
      issue_severity: null,
      addAssignee: false,
      assigneeDialog: false,
      userEmail: '',
      loading1: false,
      loading2: false,
      loading3: false,
      error: false,

      members: [],
      membersIDs: [],

      titleRules: [v => !!v || 'Title is required'],
      descriptionRules: [v => !!v || 'Description is required'],
      severityRules: [v => !!v || 'Severity is required'],
      valid: false,
    }
  },

  methods: {
    ...mapActions(['addIssue', 'fetchProjectIssueList', 'fetchUserByEmail', 'addProjectMembers', 'addIssueAssignee']),
    async postIssue() {
      this.loading1 = true
      const issue_id = await this.addIssue({
        _title: this.title,
        _description: this.description,
        _projectid: this.Project.id,
        _issue_type: this.issue_type,
        _issue_status: this.Statuses.filter(status => status.title == 'Open')[0].id,
        _issue_severity: this.issue_severity,
        _is_complete: true,
      })
      this.dialog = false
      await this.fetchProjectIssueList(this.Project.id)
      this.AddAssignees(issue_id)
      this.title = ''
      this.description = ''
      this.issue_severity = ''
      this.issue_type = ''
      this.issue_type_title = ''
      this.hasSeverity = false
      this.loading1 = false
      this.$router.push({ name: 'IssuePage', params: { id: issue_id } })
    },

    async SearchForUser() {
      this.loading2 = true
      this.searchResult = await this.fetchUserByEmail(this.userEmail)
      this.searchResult = this.searchResult[0]
      if (this.searchResult === undefined) {
        this.errorMessage = 'User not found'
        this.error = true
      } else {
        if (Boolean(this.members.find(member => member.id == this.searchResult.id))) {
          this.errorMessage = 'User already added'
          this.error = true
        } else {
          this.members.push(this.searchResult)
        }
      }
      this.loading2 = false
    },

    randomColor() {
      return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)'
    },

    async AddAssignees(issue_id) {
      this.loading3 = true
      this.members.forEach(member => {
        this.membersIDs.push(member.id)
      })

      this.membersIDs.forEach(async member_id => {
        await this.addIssueAssignee({issue_id: issue_id, user_id: member_id})
      })

      this.loading3 = false
      this.dialog = false
      this.reset()
    },

    selectType(type) {
      this.dialog = true
      this.hasSeverity = type.needSeverity
      this.issue_type = type.id
      this.issue_type_title = type.title
    },

    resetDialog() {
      this.title = ''
      this.description = ''
      this.issue_severity = null
      this.issue_type = ''
      this.issue_type_title = ''
      this.hasSeverity = false
    },

    Cancel() {
      this.dialog = false
      this.resetDialog()
    },

    reset() {
      this.userEmail = ''
      this.members = []
      this.membersIDs = []
    },
  },
}
</script>

<style scoped>
.cancel_btn {
  left: 5%;
}
</style>
