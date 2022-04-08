<template>
  <v-card>
    <v-row>
      <v-col cols="4" class="add" offset-lg="9">
        <add-issue></add-issue>
      </v-col>
    </v-row>
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
</template>

<script>
import AddIssue from './AddIssue.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AddIssue,
  },

  data() {
    return {
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

  methods: {
    handleClick(issue) {
      this.$router.push({
        name: 'IssuePage',
        params: { id: issue.id, issue },
      })
    },
  },

  computed: {
    ...mapGetters(['Project_Issues', 'Project']),
  },
}
</script>

<style scoped></style>
