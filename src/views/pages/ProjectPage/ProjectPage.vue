<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        {{ project.title }}
      </h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="primary" dark centered>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card v-if="item.tab == 'Issues'">
            <add-issue></add-issue>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="Issues"
                item-key="full_name"
                class="table-rounded"
                hide-default-footer
                enable-sort
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
import AddIssue from '../MyIssuesPage/AddIssue.vue'
import axios from 'axios'

export default {
  props: ['id', 'project', 'issuesList', 'index'],
  components: { AddIssue },
  data() {
    return {
      Issues: this.issuesList[this.index],
      tab: null,
      items: [{ tab: 'Issues' }, { tab: 'Calender' }, { tab: 'About' }],
      Types: [],
      Severities: [],
      Statuses: [],
    }
  },

  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Estimate', value: 'time_estimate' },
        { text: 'Assignees', value: 'userid' },
        { text: 'Type', value: 'issueTypeId' },
        { text: 'Status', value: 'issueStatusId' },
        { text: 'Severity', value: 'issueSeverityId' },
      ],
    }
  },

  created() {
    this.getTypes()
      .then(this.getSeverities())
      .then(this.getStatuses())
      .then(this.getNames())
  },

  methods: {
    getTypes() {
      return axios
        .get('http://fadiserver.herokuapp.com/api/v1/my-types')
        .then(response => {
          this.Types = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSeverities() {
      return axios
        .get('http://fadiserver.herokuapp.com/api/v1/my-severities')
        .then(response => {
          this.Severities = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    getStatuses() {
      return axios
        .get('http://fadiserver.herokuapp.com/api/v1/my-status')
        .then(response => {
          this.Statuses = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    getNames() {
      for (var issue of this.Issues) {
        for (var type of this.Types) {
          if (issue.issueTypeId == type.id) console.log('test')
        }
      }
    },
  },
}
</script>

<style></style>
