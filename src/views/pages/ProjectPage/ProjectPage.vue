<template>
  <div>
    <div v-if="pageNotReady">
      <v-skeleton-loader type="card-heading, list-item,table-thead, table-tbody"></v-skeleton-loader>
    </div>
    <v-card v-else>
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
            <template v-if="item.tab == 'Issues'">
              <issues-page></issues-page>
            </template>

            <template v-if="item.tab == 'About'">
              <about-page></about-page>
            </template>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import AddIssue from './AddIssue.vue'
import IssuesPage from './ProjectIssuesPage.vue'
import AboutPage from './AboutPage.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['id'],

  components: {
    AddIssue,
    IssuesPage,
    AboutPage,
  },

  data() {
    return {
      tab: null,
      items: [{ tab: 'Issues' }, { tab: 'Calendar' }, { tab: 'About' }],
      pageNotReady: ''
    }
  },

  watch: {
    async id() {
      this.pageNotReady = true
      await this.fetchProject(this.id)
      await this.fetchProjectIssueList(this.id)
      await this.getProjectTypes(this.id)
      this.pageNotReady = false
    },
    async $route(to, from) {
      this.pageNotReady = true
      this.$store.commit('ResetProjectIssues')
      await this.fetchProject(this.id)
      await this.fetchProjectIssueList(this.id)
      await this.getProjectTypes(this.id)
      this.pageNotReady = false
    },
  },

  async created() {
    this.pageNotReady = true
    await this.fetchProject(this.id)
    await this.fetchProjectIssueList(this.id)
    await this.getProjectTypes(this.id)
    this.pageNotReady = false
  },

  computed: {
    ...mapGetters(['Project_Issues', 'Project']),
  },

  methods: {
    ...mapActions(['fetchProjectIssueList', 'fetchProject', 'getProjectTypes']),

    handleClick(issue) {
      this.$router.push({
        name: 'IssuePage',
        params: { id: issue.id, issue },
      })
    },
  },

  beforeDestroy() {
    this.$store.commit('ResetProject')
    this.$store.commit('ResetProjectIssues')
  },
}
</script>
