<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on">
          <v-icon align-self: left>
            mdi-plus-thick
          </v-icon>
          Add Issue
        </v-btn>
      </template>
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
            <v-select
              item-text="title"
              item-value="id"
              :items="Types"
              v-model="issue_type"
              label="Issue Type"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              v-model="issue_status"
              label="Issue Status"
              :items="Statuses"
            ></v-select>
            <v-select
              item-text="title"
              item-value="id"
              :items="Severities"
              v-model="issue_severity"
              label="Issue Severity"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn flat @click="postIssue(), reloadPage()" class="success mx-0 mt-3">
              <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['projectid'],

  computed: {
    ...mapGetters(['Severities', 'Types', 'Statuses']),
  },

  data() {
    return {
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
    ...mapActions(['addIssue']),
    postIssue() {
      this.addIssue({
        _title: this.title,
        _description: this.description,
        _time_estimate: this.time_estimate,
        _projectid: this.projectid,
        _issue_type: this.issue_type,
        _issue_status: this.issue_status,
        _issue_severity: this.issue_severity,
      })
    },

    reloadPage() {
      window.location.reload()
    },
  },

  mounted() {
    this.getIssueStatus()
    this.getIssueSeverity()
    this.getIssueType()
  },
}
</script>

<style scoped>
.v-btn {
  left: 43%;
}
</style>
