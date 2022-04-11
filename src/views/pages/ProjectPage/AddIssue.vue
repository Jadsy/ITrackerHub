<template>
  <div class="text-center">

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          <v-icon align-self: left>
            mdi-plus-thick
          </v-icon>
          Add Issue
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(type, index) in Types" :key="index">
          <v-list-item-title style="cursor: pointer" @click="selectType(type.title)">{{
            type.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <h2>Add Issue</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field v-model="title" label="Title"></v-text-field>
            <v-textarea v-model="description" label="Description"></v-textarea>
            <v-select
              item-text="text"
              item-value="value"
              :items="time_est"
              v-model="time_estimate"
              label="Time Estimate"
            ></v-select>
            <!-- <v-select
              item-text="title"
              item-value="id"
              :items="Types"
              v-model="issue_type"
              label="Issue Type"
            ></v-select> -->

            <v-select
              v-if="isBug"
              item-text="title"
              item-value="id"
              :items="Severities"
              v-model="issue_severity"
              label="Issue Severity"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn flat @click="postIssue()" class="success mx-0 mt-3">
              <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['Severities', 'Types', 'Statuses', 'Project']),
  },

  data() {
    return {
      dialog: false,

      isBug: false,
      isFeature: false,
      isTest: false,
      isUserStory: false,

      title: '',
      description: '',
      time_estimate: '',
      project: '',
      issue_type: '',
      issue_status: '',
      issue_severity: '',

      time_est: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
      ],
    }
  },

  methods: {
    ...mapActions(['addIssue', 'fetchProjectIssueList']),
    async postIssue() {
      const issueType = this.assignType()
      console.log(issueType)

      await this.addIssue({
        _title: this.title,
        _description: this.description,
        _time_estimate: this.time_estimate,
        _projectid: this.Project.id,
        _issue_type: issueType,
        _issue_status: this.issue_status,
        _issue_severity: this.issue_severity,
      })
      this.dialog = false
      this.fetchProjectIssueList(this.Project.id)
    },
    selectType(type) {
      this.dialog = true
      switch (type) {
        case 'Bug':
          this.isBug = true
          break
        case 'Feature':
          this.isFeature = true
          break
        case 'Test':
          this.isTest = true
          break
        case 'User Story':
          this.isUserStory = true
          break
      }
    },
    assignType(){
      if(this.isBug){
        return this.Types.find(type => type.title === 'Bug')
      }
      if(this.isFeature){
        return this.Types.find(type => type.title === 'Feature')
      }
      if(this.isTest){
        return this.Types.find(type => type.title === 'Test')
      }
      if(this.isUserStory){
        return this.Types.find(type => type.title === 'User Story')
      }
    }
  },
}
</script>

<style scoped></style>
