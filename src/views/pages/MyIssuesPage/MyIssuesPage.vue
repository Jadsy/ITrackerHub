<template>
  <v-card>
    <v-card-title>My Issues</v-card-title>
   
      <add-issue></add-issue>

    <issues-table></issues-table>
  </v-card>
</template>

<script>
import IssuesTable from './IssuesTable.vue'
import AddIssue from './AddIssue.vue'

export default {
  components: { IssuesTable, AddIssue },
}
</script>