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
import IssuesTable from '../MyIssuesPage/IssuesTable.vue'
import AddIssue from '../MyIssuesPage/AddIssue.vue'

export default {
  props: ['id', 'project', 'issuesList', 'index'],
  components: { IssuesTable, AddIssue },
  data() {
    return {
      tab: null,
      items: [{ tab: 'Issues' }, { tab: 'Calender' }, { tab: 'About' }],
    }
  },

  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'description', value: 'description' },
        { text: 'estimate', value: 'time_estimate' },
        { text: 'Assignees', value: 'userid' },
        { text: 'Project', value: 'projectid' },
        { text: 'Type', value: 'issueTypeId' },
        { text: 'Status', value: 'issueStatusId' },
        { text: 'Severity', value: 'issueSeverityId' },
      ],
    }
  },
}
</script>

<style></style>
