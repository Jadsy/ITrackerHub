<template>
  <v-container>
    <v-row class="my-1">
      <v-col cols="3">
        <h2 style="font-size: 40px; color: rgb(92, 92, 92)">Kanban Board</h2>
      </v-col>
      <v-col cols="7"></v-col>
      <v-col cols="2">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on"> {{ currentProject }} </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(project, index) in ProjectList" :key="index">
              <v-list-item-title style="cursor: pointer" @click="changeView(project)">{{
                project.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row v-if="!kanbanWait">
      <v-col cols="4">
        <v-skeleton-loader type="card-heading, divider, image"></v-skeleton-loader>
      </v-col>
      <v-col cols="4">
        <v-skeleton-loader type="card-heading, divider, image"></v-skeleton-loader>
      </v-col>
      <v-col cols="4">
        <v-skeleton-loader type="card-heading, divider, image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <KanBanBoard v-if="kanbanWait"></KanBanBoard>
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
      kanbanWait: false,
      project_id: '',
      currentProject: '',
    }
  },

  computed: {
    ...mapGetters(['ProjectList', 'Project']),
  },

  methods: {
    ...mapActions(['fetchProject']),
    changeView(project) {
      this.currentProject = project.title
      this.project_id = project.id
      this.$store.commit('SetCurrentProject', project)
    },
  },

  async created() {
    /// if there is a Project in local storage, check if it is valid i.e not null, if valid use it, if not use the first one in project list
    /// if there is no project in local storage, use the first one in project list
    if (this.ProjectList === undefined || this.ProjectList.length == 0) {
      this.currentProject = 'You have no projects'
      this.project_id = 0
      this.$store.commit('SetCurrentProject', this.currentProject)
    } else {
      if (localStorage.getItem('currentProject')) {
        var project = JSON.parse(localStorage.getItem('currentProject'))
        await this.fetchProject(project.id)

        if (this.Project == null) {
          this.currentProject = this.ProjectList[0].title
          this.project_id = this.ProjectList[0].id
          this.$store.commit('SetCurrentProject', this.ProjectList[0])
        } else {
          this.currentProject = project.title
          this.project_id = project.id
          this.$store.commit('SetCurrentProject', project)
        }
      } else {
        this.currentProject = this.ProjectList[0].title
        this.project_id = this.ProjectList[0].id
        this.$store.commit('SetCurrentProject', this.ProjectList[0])
      }
    }

    this.kanbanWait = true
  },
}
</script>

<style scoped>
.view {
  font-size: 20px;
}
</style>
