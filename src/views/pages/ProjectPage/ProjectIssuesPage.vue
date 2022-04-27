<template>
  <v-card>
    <v-row>
      <v-col cols="4" class="add" offset-lg="9">
        <add-issue></add-issue>
      </v-col>
    </v-row>
    <v-card-text>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-text>
    <v-data-table
      :headers="headers"
      :items="Project_Issues"
      item-key="full_name"
      class="table-rounded"
      hide-default-footer
      enable-sort
      :search="search"
      @click:row="handleClick"
    >
      <template v-slot:[`item.issueType.title`]="{ item }">
        <v-chip :color="item.issueType.color" dark>
          {{ item.issueType.title }}
        </v-chip>
      </template>
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
      issue_type: '',
      issue_status: '',
      issue_severity: '',
      search: '',
    }
  },

  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Assignees', value: 'user' },
        { text: 'Type', value: 'issueType.title' },
        { text: 'Status', value: 'issueStatus.title' },
        { text: 'Severity', value: 'issueSeverity.title' },
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
