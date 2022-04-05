<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="blue lighten-3">
            <span class="white--text">Open</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="blue lighten-3">
            <draggable class="list-group kanban-column" v-model="Open" tag="Open" group="tasks" :move="onDrop">
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
                      {{ issue.title }}
                    </router-link>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="red"
                        outlined
                        style="float:right; display:inline-block; height:min-content"
                      >
                        {{ issue.issueSeverity }}
                      </v-chip>
                    </v-col>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="green"
                        outlined
                        style="height:min-content; display:inline-block; "
                      >
                        {{ issue.issueType }}
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
              tag="In-Progress"
              group="tasks"
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
                      {{ issue.title }}
                    </router-link>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="red"
                        outlined
                        style="position:relative; right:10px;top:10px; height:min-content"
                      >
                        {{ issue.issueSeverity }}
                      </v-chip>
                    </v-col>

                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="green"
                        outlined
                        style="position:relative; right:83px; top:10px;height:min-content"
                      >
                        {{ issue.issueType }}
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
            <draggable class="list-group kanban-column" v-model="Completed" tag="Closed" group="tasks" :move="onDrop">
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
                      {{ issue.title }}
                    </router-link>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="red"
                        outlined
                        style="position:relative; right:10px;top:10px; height:min-content"
                      >
                        {{ issue.issueSeverity }}
                      </v-chip>
                    </v-col>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="green"
                        outlined
                        style="position:relative; right:83px; top:10px;height:min-content"
                      >
                        {{ issue.issueType }}
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
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['project_id'],

  components: {
    draggable,
  },

  computed: {
    ...mapGetters(['Statuses', 'Types', 'Severities']),

    Open: {
      get() {
        return this.$store.getters.Open
      },
      set(value) {
        console.log('New Open Issues: ', value)
        this.$store.commit('UpdateOpenIssues', value)
      },
    },
    InProgress: {
      get() {
        return this.$store.getters.InProgress
      },
      set(value) {
        console.log('New In Progress Issues: ', value)
        this.$store.commit('UpdateInProgressIssues', value)
      },
    },
    Completed: {
      get() {
        return this.$store.getters.Completed
      },
      set(value) {
        console.log('New Completed Issues: ', value)
        this.$store.commit('UpdateCompletedIssues', value)
      },
    },
  },

  watch: {
    async project_id() {
      await this.fetchProjectIssueList(this.project_id)
      this.$store.commit('SetOpenIssues')
      this.$store.commit('SetInProgressIssues')
      this.$store.commit('SetClosedIssues')
    },
  },

  methods: {
    ...mapActions(['fetchProjectIssueList', 'updateIssue']),

    async onDrop(evt) {
      const movedIssue = evt.draggedContext.element

      var StatusTag = evt.relatedContext.component.tag
      if (StatusTag == 'In-Progress') StatusTag = 'In Progress'

      var TypeTag = evt.draggedContext.element.issueType
      var SeverityTag = evt.draggedContext.element.issueSeverity

      var status = this.Statuses.find(st => st.title == StatusTag).id
      var type = this.Types.find(tp => tp.title == TypeTag).id
      var severity = this.Severities.find(sv => sv.title == SeverityTag).id

      const updatedIssue = {
        id: movedIssue.id,
        created: movedIssue.created,
        title: movedIssue.title,
        description: movedIssue.description,
        time_estimate: movedIssue.time_estimate,
        userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
        projectid: movedIssue.projectid,
        issueTypeId: type,
        issueStatusId: status,
        issueSeverityId: severity,
      }
      await this.updateIssue(updatedIssue)
    },
  },

  created() {
    this.fetchProjectIssueList(this.project_id)
    console.log(this.project_id)
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
</style>
