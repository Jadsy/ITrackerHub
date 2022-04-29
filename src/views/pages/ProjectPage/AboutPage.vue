<template>
  <div>
    <span>Project Created On: {{ dateCreated }} <br/> </span>
    <span>Members: {{ memberCount }} <br/> </span>
    <span>Issues: {{ issueCount }} <br/> </span>
    <span>Repo Link: {{ repo_link }} <br/> </span>
    <delete-project></delete-project>
  </div>
</template>

<script>
import DeleteProject from './DeleteProject.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    DeleteProject,
  },

  data() {
    return {
      dateCreated: '',
      memberCount: 0,
      issueCount: 0,
      repoLink: '',
    }
  },

  computed: {
    ...mapGetters(['Project', 'Project_Issues']),
  },

  methods: {
    ParseDate() {
      this.dateCreated = new Date(this.Project.created).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      })
    },
  },

  created() {
    this.ParseDate()
    this.memberCount = this.Project.members.length
    this.issueCount = this.Project_Issues.length
    this.repoLink = this.Project.repo_link
  },
}
</script>

<style></style>
