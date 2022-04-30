<template>
  <div>
    <div v-if="isLoading">
      <v-skeleton-loader type="card-heading, list-item,table-thead, table-tbody"></v-skeleton-loader>
    </div>
    <div v-else>
      <v-card>
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold text-h2 basil--text">My Issues</h1>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-text>

        <v-data-table
          :headers="headers"
          :items="allIssues"
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      title: '',
      description: '',
      issue_type: '',
      issue_status: '',
      issue_severity: '',
      isLoading: false,
      search: '',
      allIssues: [],
      assignedIssuesIDs: [],
      assignedIssues: [],
    }
  },

  computed: {
    ...mapGetters(['My_Issues', 'Project']),
  },

  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Type', value: 'issueType.title' },
        { text: 'Status', value: 'issueStatus.title' },
        { text: 'Severity', value: 'issueSeverity.title' },
      ],
    }
  },

  async created() {
    this.isLoading = true
    await this.fetchMyIssues()
    await this.FetchAllIssues()
    console.log(this.My_Issues)
    this.My_Issues.forEach((issue) => {
      this.allIssues.push(issue)
    })
    this.FetchIssues()
    console.log(this.allIssues)
    this.isLoading = false
  },

  // watch: {
  //   async My_Issues() {
  //     this.isLoading = true
  //     await this.fetchMyIssues()
  //     await this.FetchAllIssues()
  //     this.isLoading = false
  //   },
  // },

  methods: {
    ...mapActions(['fetchMyIssues', 'fetchUserIssues', 'fetchIssue']),

   async FetchAllIssues(){
      this.assignedIssuesIDs = await this.fetchUserIssues()
    },

    async FetchIssues(){
      this.assignedIssuesIDs.forEach(async (issue) => {
        var issues = await this.fetchIssue(issue.issueId)
        issues = issues[0]
        this.allIssues.push(issues)
      })
    },

    handleClick(issue) {
      this.$router.push({
        name: 'IssuePage',
        params: { id: issue.id, issue },
      })
    },
  },
}
</script>