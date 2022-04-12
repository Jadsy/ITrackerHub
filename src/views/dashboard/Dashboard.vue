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
            <v-list-item v-for="(project, index) in ProjectList" :key="index">
              <v-list-item-title style="cursor: pointer" @click="changeView(project)">{{
                project.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <KanBanBoard></KanBanBoard>
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
      currentProject: '',
    }
  },

  computed: {
    ...mapGetters(['ProjectList']),
  },

  methods: {
    changeView(project) {
      this.currentProject = project.title
      this.project_id = project.id
      this.$store.commit('SetCurrentProject', project)
    },
  },

  async created() {
    console.log('Dashboard created')
    if (localStorage.getItem('currentProject')) {
      this.currentProject = JSON.parse(localStorage.getItem('currentProject')).title
      this.project_id = JSON.parse(localStorage.getItem('currentProject')).id
      this.Cproject = JSON.parse(localStorage.getItem('currentProject'))
    } else {
      this.currentProject = this.ProjectList[0].title
      this.project_id = this.ProjectList[0].id
      this.Cproject = projectList[0]
      this.$store.commit('SetCurrentProject', this.ProjectList[0])
    }
  },

  beforeDestroy() {
    this.$store.commit('ResetProjectIssues')
  }
}
</script>

<style scoped>
.view {
  font-size: 20px;
}
</style>
