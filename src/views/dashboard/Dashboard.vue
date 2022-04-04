<template>
  <v-container>
    <v-row class="my-1">
      <v-col cols="3">
        <h2 style="font-size:40px;color:rgb(92, 92, 92)">Kanban Board</h2>
      </v-col>
      <v-col cols="7"></v-col>
      <v-col cols="2">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on"> {{ currentProject }} </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(project, index) in Projects" :key="index">
              <v-list-item-title style="cursor: pointer" @click="changeView(project)">{{
                project.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <KanBanBoard :project_id="project_id"></KanBanBoard>
    </v-row>
  </v-container>
</template>

<script>
import KanBanBoard from './KanBanBoard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    KanBanBoard,
  },

  data() {
    return {
      project_id: '',
      currentProject: 'All Projects',
      Projects: [],
    }
  },

  computed: {
    ...mapGetters(['ProjectList']),
  },

  methods: {
    ...mapActions(['fetchProjectIssueList']),

    changeView(project) {
      this.currentProject = project.title
      this.project_id = project.id
    },

    AddAllProject() {
      const AllProjects = {
        id: '',
        title: 'All Projects',
        repo_link: null,
        created: null,
        members: null,
        admin: null,
      }

      this.Projects = Array.from(this.ProjectList)
      this.Projects.push(AllProjects)
    },
  },

  created() {
    this.fetchProjectIssueList()
    this.AddAllProject()
  },
}
</script>

<style scoped>
.view {
  font-size: 20px;
}
</style>
