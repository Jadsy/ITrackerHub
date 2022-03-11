<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        {{ Project.title }}
      </h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="primary" dark centered>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card v-if="item.tab == 'Issues'">
            <template>
              <AddIssue :projectid="id"></AddIssue>
            </template>

            <v-card>
              <v-data-table
                :headers="headers"
                :items="Project_Issues"
                item-key="full_name"
                class="table-rounded"
                hide-default-footer
                enable-sort
                @click:row="handleClick"
              >
              </v-data-table>
            </v-card>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import axios from 'axios'
import AddIssue from './AddIssue.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['id'],

  components: {
    AddIssue,
  },

  data() {
    return {
      tab: null,
      items: [{ tab: 'Issues' }, { tab: 'Calender' }, { tab: 'About' }],

      title: '',
      description: '',
      time_estimate: '',
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

  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Estimate', value: 'time_estimate' },
        { text: 'Assignees', value: 'user' },
        { text: 'Type', value: 'issueType' },
        { text: 'Status', value: 'issueStatus' },
        { text: 'Severity', value: 'issueSeverity' },
      ],
    }
  },

  watch: {
    id() {
      this.fetchProjectIssueList(this.id)
      this.fetchProject(this.id)
    },
  },

  created() {
    this.fetchProjectIssueList(this.id)
    this.fetchProject(this.id)
  },

  computed: {
    ...mapGetters(['Project_Issues', 'Project']),
  },

  methods: {
    ...mapActions(['fetchProjectIssueList', 'fetchProject']),

    handleClick(issue) {
      this.$router.push({
        name: 'IssuePage',
        params: { id: issue.id, issue },
      })
    },

    postIssue() {
      axios
        .post('https://fadiserver.herokuapp.com/api/v1/my-issues/', {
          title: this.title,
          description: this.description,
          time_estimate: this.time_estimate,
          userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
          projectid: this.id,
          issueTypeId: this.issue_type,
          issueStatusId: this.issue_status,
          issueSeverityId: this.issue_severity,
        })
        .then(response => {
          console.log(response)
        })
    },
  },
}
</script>

<style scoped>
.v-btn {
  left: 43%;
}
</style>
