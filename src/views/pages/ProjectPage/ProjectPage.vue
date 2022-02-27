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

            {{ getSeveritiesTitles(issuesList[index], Severities) }}
            {{ getTypesTitles(issuesList[index], Types) }}
            {{ getStatusesTitles(issuesList[index], Statuses) }}

            <v-card>
              <v-data-table
                :headers="headers"
                :items="issuesList[index]"
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
  },

  methods: {
    async getTypes() {
      try {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-types')
        this.Types = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async getSeverities() {
      try {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-severities')
        this.Severities = response.data
      } catch (error) {
        console.log(error)
      }
    },

    async getStatuses() {
      try {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-status')
        this.Statuses = response.data
      } catch (error) {
        console.log(error)
      }
    },

    getTypesTitles(Issues, types) {
      for (var issue of Issues) {
        for (var type of types) {
          if (issue.issueTypeId == type.id) {
            issue.issueTypeId = type.title
          }
        }
      }
    },

    getSeveritiesTitles(Issues, severities) {
      for (var issue of Issues) {
        for (var severity of severities) {
          if (issue.issueSeverityId == severity.id) {
            issue.issueSeverityId = severity.title
          }
        }
      }
    },

    getStatusesTitles(Issues, statuses) {
      for (var issue of Issues) {
        for (var status of statuses) {
          if (issue.issueStatusId == status.id) {
            issue.issueStatusId = status.title
          }
        }
      }
    },
  },
}
</script>

<style></style>
