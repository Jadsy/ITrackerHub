<template>
  <div>
    <br />
    <v-layout row wrap justify-space-between>
      <v-flex xs4 md3>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="black--text pl-16"
              ><v-icon>mdi-account-group</v-icon> Members: {{ memberCount }} <br />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-flex>

      <v-flex xs4 md3>
        <v-list-item-content>
          <v-list-item-title>
            <span class="black--text" style="padding-right: 40px"
              ><v-icon>mdi-clipboard-text-outline</v-icon> Issues: {{ issueCount }} <br />
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-between>
      <v-flex xs4 md5>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="black--text pl-16"
              >This Project Was Created On: {{ dateCreated }} <br />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-flex>

      <v-flex xs4 md4>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="black--text pr-10" style="padding-left: 90px"
              ><v-icon>mdi-link</v-icon> Repo Link: {{ repo_link }} <br />
            </v-list-item-title>
            <br />
          </v-list-item-content>
        </v-list-item>
      </v-flex>
    </v-layout>
    <br />
    <delete-project v-if="canDelete"></delete-project>
    <br />
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
      canDelete: false,
    }
  },

  computed: {
    ...mapGetters(['Project', 'Project_Issues', 'User']),
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

    CanDelete() {
      this.canDelete = this.Project.admin == this.User.id
    },
  },

  created() {
    this.ParseDate()
    this.CanDelete()
    this.memberCount = this.Project.members.length
    this.issueCount = this.Project_Issues.length
    this.repoLink = this.Project.repo_link
  },
}
</script>

<style></style>
