<template>
  <v-container>
    <v-row v-if="pageNotReady">
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

    <v-container v-else>
      <v-row wrap>
        <v-col xl="4" lg="4" md="4" sm="4" xs="12">
          <v-card>
            <v-card-title class="blue lighten-3">
              <span class="white--text">Open</span>
            </v-card-title>
            <v-divider horizontal></v-divider>
            <v-card-text class="blue lighten-3">
              <draggable
                class="list-group kanban-column"
                v-model="Open"
                group="tasks"
                :componentData="OpenData()"
                :move="onDrop"
              >
                <v-card
                  class="#f4f5fa"
                  style="height:auto; margin-top:10px"
                  v-for="issue in Open"
                  :key="issue.id"
                  align-center
                  elevation="3"
                >
                  <v-card-text>
                    <v-row dense style="width:auto">
                      <router-link
                        class="d-flex align-center text-decoration-none grey--text"
                        style="font-size:18px;"
                        :to="{ name: 'IssuePage', params: { id: issue.id } }"
                      >
                      <span class="vertical-line"></span>
                        {{ issue.title }}
                      </router-link>
                    </v-row>

                    <v-row dense>
                      <v-col>
                        <!-- <v-chip
                          class="ma-2"
                          color="red"
                          outlined
                          style="float:right; display:inline-block; height:min-content"
                        >
                          {{ issueSeverityChecker(issue) }}
                        </v-chip> -->
                        
                      </v-col>
                      <v-col>
                        <v-chip class="ma-2" color="green" outlined style="height:min-content; display:inline-block; ">
                          {{ issue.issueType.title }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </draggable>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col xl="4" lg="4" md="4" sm="4" xs="12">
          <v-card>
            <v-card-title class="light-green lighten-3">
              <span class="white--text">In Progress</span>
            </v-card-title>
            <v-divider horizontal></v-divider>
            <v-card-text class="light-green lighten-3">
              <draggable
                class="list-group kanban-column"
                v-model="InProgress"
                group="tasks"
                :componentData="InProgressData()"
                :move="onDrop"
              >
                <v-card
                  class="#f4f5fa"
                  style="height:auto; margin-top:10px"
                  v-for="issue in InProgress"
                  :key="issue.id"
                  align-center
                  elevation="3"
                >
                  <v-card-text>
                    <v-row dense style="width:auto">
                      <router-link
                        class="d-flex align-center text-decoration-none grey--text"
                        style="font-size:18px;"
                        :to="{ name: 'IssuePage', params: { id: issue.id } }"
                      >
                      <span class="vertical-line"></span>
                        {{ issue.title }}
                      </router-link>
                    </v-row>

                    <v-row dense>
                      <v-col>
                        <!-- <v-chip
                          class="ma-2"
                          color="red"
                          outlined
                          style="position:relative; right:10px;top:10px; height:min-content"
                        >
                          {{ issueSeverityChecker(issue) }}
                        </v-chip> -->
                      </v-col>

                      <v-col>
                        <v-chip
                          class="ma-2"
                          color="green"
                          outlined
                          style="position:relative; right:83px; top:10px;height:min-content"
                        >
                          {{ issue.issueType.title }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </draggable>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col xl="4" lg="4" md="4" sm="4" xs="12">
          <v-card>
            <v-card-title class="orange lighten-3">
              <span class="white--text">Completed</span>
            </v-card-title>
            <v-divider horizontal></v-divider>
            <v-card-text class="orange lighten-3">
              <draggable
                class="list-group kanban-column"
                v-model="Completed"
                group="tasks"
                :componentData="ClosedData()"
                :move="onDrop"
              >
                <v-card
                  class="#f4f5fa"
                  style="height:auto; margin-top:10px"
                  v-for="issue in Completed"
                  :key="issue.id"
                  align-center
                  elevation="3"
                >
                  <v-card-text>
                    <v-row dense style="width:auto">
                      <router-link
                        class="d-flex align-center text-decoration-none grey--text"
                        style="font-size:18px;"
                        :to="{ name: 'IssuePage', params: { id: issue.id } }"
                      >
                      <span class="vertical-line"></span>
                        {{ issue.title }}
                      </router-link>
                    </v-row>

                    <v-row dense>
                      <v-col>
                        <!-- <v-chip
                          class="ma-2"
                          color="red"
                          outlined
                          style="position:relative; right:10px;top:10px; height:min-content"
                        >
                          {{ issueSeverityChecker(issue) }}
                        </v-chip> -->
                      </v-col>
                      <v-col>
                        <v-chip
                          class="ma-2"
                          color="green"
                          outlined
                          style="position:relative; right:83px; top:10px;height:min-content"
                        >
                          {{ issue.issueType.title }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </draggable>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      pageNotReady: true,
    }
  },
  components: {
    draggable,
  },

  computed: {
    ...mapGetters(['Statuses', 'ProjectTypes', 'Severities', 'Project']),

    Open: {
      get() {
        return this.$store.getters.Open
      },
      set(value) {
        this.$store.commit('UpdateOpenIssues', value)
      },
    },
    InProgress: {
      get() {
        return this.$store.getters.InProgress
      },
      set(value) {
        this.$store.commit('UpdateInProgressIssues', value)
      },
    },
    Completed: {
      get() {
        return this.$store.getters.Completed
      },
      set(value) {
        this.$store.commit('UpdateCompletedIssues', value)
      },
    },
  },

  watch: {
    async Project() {
      this.pageNotReady = true
      await this.fetchProjectIssueList(this.Project.id)
      await this.getProjectTypes(this.Project.id)

      this.$store.commit('SetOpenIssues')
      this.$store.commit('SetInProgressIssues')
      this.$store.commit('SetClosedIssues')
      this.pageNotReady = false
    },
  },

  methods: {
    ...mapActions(['fetchProjectIssueList', 'updateIssue', 'getProjectTypes']),

    issueSeverityChecker(issue) {
      return issue.issueSeverity !== null ? issue.issueSeverity.title : 'No Severity'
    },

    async onDrop(evt) {
      const movedIssue = evt.draggedContext.element

      var newStatus = evt.relatedContext.component.componentData

      const updatedIssue = {
        id: movedIssue.id,
        created: movedIssue.created,
        title: movedIssue.title,
        description: movedIssue.description,
        time_estimate: movedIssue.time_estimate,
        userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
        projectid: movedIssue.projectid,
        issueTypeId: movedIssue.issueType.id,
        issueStatusId: newStatus.id,
        issueSeverityId: movedIssue.issueSeverity !== null ? movedIssue.issueSeverity.id : null,
        isComplete: true,
      }
      await this.updateIssue(updatedIssue)
    },
    OpenData() {
      return {
        title: 'Open',
        id: this.Statuses.filter(status => status.title === 'Open')[0].id,
      }
    },
    InProgressData() {
      return {
        title: 'In Progress',
        id: this.Statuses.filter(status => status.title === 'In Progress')[0].id,
      }
    },
    ClosedData() {
      return {
        title: 'Completed',
        id: this.Statuses.filter(status => status.title === 'Closed')[0].id,
      }
    },
  },

  async created() {
    this.pageNotReady = true
    await this.fetchProjectIssueList(JSON.parse(localStorage.getItem('currentProject')).id)
    await this.getProjectTypes(JSON.parse(localStorage.getItem('currentProject')).id)
    this.$store.commit('SetOpenIssues')
    this.$store.commit('SetInProgressIssues')
    this.$store.commit('SetClosedIssues')
    this.pageNotReady = false
  },
}
</script>

<style lang="scss" scoped>
hr {
  margin-top: 0.1px;
  margin-bottom: 0.1px;
  border: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.kanban-column {
  min-height: auto;
}
.vertical-line{
  border-left: 10px solid red;
  display: block;
  height: 105px;
  padding-bottom: 40px;
  margin-right: 50px;
  margin-left: -28px;
  margin-bottom: -100px;
  margin-top: -55px;
  border-radius: 10%;
}
</style>
