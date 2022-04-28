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
              <v-tooltip top class="edit_tooltip">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="dialog = true">
                    <v-icon color="primary">mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Click to add issue quickly</span>
              </v-tooltip>
              <v-dialog v-model="dialog" width="500" @click:outside="resetDialog">
                <v-card @keyup.native.enter="createQuickIssue">
                  <v-card-title>
                    <span class="headline">Add Quick Issue</span>
                  </v-card-title>

                  <v-card-text>
                    <v-text-field v-model="quickTitle" label="Add title"></v-text-field>

                    <v-btn class="success mx-0 mt-3" @click="createQuickIssue"
                      ><v-icon align-self:left>mdi-plus</v-icon>Add</v-btn
                    >
                    <v-btn outlined class="cancel_btn mx-0 mt-3" @click="Cancel"> Cancel </v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-divider horizontal></v-divider>
            <v-card-text class="blue lighten-3">
              <draggable
                class="list-group kanban-column"
                v-model="Open"
                group="tasks"
                :componentData="OpenData()"
                :move="onDrop"
                draggable=".true"
              >
                <v-card
                  :style="{ height: 'auto', 'margin-top': '10px', 'border-left': '10px solid' + issue.issueType.color }"
                  v-for="issue in Open"
                  :key="issue.id"
                  :class="`${issue.isComplete}`"
                  align-center
                  elevation="3"
                >
                  <v-card-text>
                    <v-row dense style="width: auto">
                      <router-link
                        v-if="issue.isComplete"
                        class="d-flex align-center text-decoration-none grey--text"
                        style="font-size: 18px"
                        :to="{ name: 'IssuePage', params: { id: issue.id } }"
                      >
                        <v-tooltip top class="issue_tlp">
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">{{ issue.title }}</span>
                          </template>
                          <span>Type: {{ issue.issueType.title }}</span> <br />
                          <span v-if="issue.issueSeverity !== null">Severity: {{ issue.issueSeverity.title }}</span>
                        </v-tooltip>
                      </router-link>
                      <v-row v-else>
                        <v-col>
                          <span
                            class="d-flex align-center text-decoration-none grey--text"
                            style="font-size: 18px; cursor: pointer"
                            @click="completeIssueDialog = true"
                            >{{ issue.title }}
                          </span>
                        </v-col>
                        <v-col>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon class="edit_tooltip" v-bind="attrs" v-on="on" color="red"
                                >mdi-alert-circle-outline</v-icon
                              >
                            </template>
                            <span
                              >This issue is stored locally only. Complete issue details to save it to the server, or it <br/>
                              will be removed when signing out or closing the website</span
                            >
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-card-text>
                  <v-dialog v-model="completeIssueDialog" width="500" @click:outside="resetDialog">
                    <v-card @keyup.native.enter="postIssue(issue)">
                      <v-card-title> Complete Issue Details </v-card-title>
                      <v-card-text>
                        <v-form class="px-3" v-model="valid">
                          <v-text-field v-model="issue.title" label="Title" :rules="titleRules"></v-text-field>
                          <v-textarea
                            v-model="quickDescription"
                            label="Description"
                            :rules="descriptionRules"
                          ></v-textarea>

                          <v-select
                            item-text="title"
                            item-value="id"
                            return-object
                            :items="ProjectTypes"
                            v-model="quickType"
                            label="Issue Type"
                            :rules="severityRules"
                          >
                            {{ selectType(quickType) }}
                          </v-select>

                          <v-select
                            v-if="hasSeverity"
                            item-text="title"
                            item-value="id"
                            :items="Severities"
                            v-model="quickSeverity"
                            label="Issue Severity"
                            :rules="severityRules"
                          ></v-select>
                          <v-spacer></v-spacer>
                          <v-btn :disabled="!valid" @click="postIssue(issue)" class="success mx-0 mt-3">
                            <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
                          >
                          <v-btn outlined class="cancel_btn mx-0 mt-3" @click="Cancel"> Cancel </v-btn>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
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
                draggable=".true"
              >
                <v-card
                  :style="{ height: 'auto', 'margin-top': '10px', 'border-left': '10px solid' + issue.issueType.color }"
                  v-for="issue in InProgress"
                  :key="issue.id"
                  :class="`${issue.isComplete}`"
                  align-center
                  elevation="3"
                >
                  <v-card-text>
                    <v-row dense style="width: auto">
                      <router-link
                        class="d-flex align-center text-decoration-none grey--text"
                        style="font-size: 18px"
                        :to="{ name: 'IssuePage', params: { id: issue.id } }"
                      >
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">{{ issue.title }}</span>
                          </template>
                          <span>Type: {{ issue.issueType.title }}</span>
                        </v-tooltip>
                      </router-link>
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
                draggable=".true"
              >
                <v-card
                  :style="{ height: 'auto', 'margin-top': '10px', 'border-left': '10px solid' + issue.issueType.color }"
                  v-for="issue in Completed"
                  :key="issue.id"
                  :class="`${issue.isComplete}`"
                  align-center
                  elevation="3"
                >
                  <v-card-text>
                    <v-row dense style="width: auto">
                      <router-link
                        class="d-flex align-center text-decoration-none grey--text"
                        style="font-size: 18px"
                        :to="{ name: 'IssuePage', params: { id: issue.id } }"
                      >
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">{{ issue.title }}</span>
                          </template>
                          <span>Type: {{ issue.issueType.title }}</span>
                        </v-tooltip>
                      </router-link>
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
      quickTitle: '',
      quickDescription: '',
      quickType: '',
      quickTypeTitle: '',
      quickSeverity: null,
      hasSeverity: false,
      dialog: false,
      valid: false,
      completeIssueDialog: false,
      titleRules: [v => !!v || 'Title is required'],
      descriptionRules: [v => !!v || 'Description is required'],
      severityRules: [v => !!v || 'Severity is required'],
    }
  },
  components: {
    draggable,
  },

  computed: {
    ...mapGetters(['Statuses', 'ProjectTypes', 'Severities', 'Project', 'User']),

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
      if (!(this.Project == '')) {
        await this.fetchProjectIssueList(this.Project.id)
        await this.getProjectTypes(this.Project.id)

        this.$store.commit('SetOpenIssues')
        this.$store.commit('SetInProgressIssues')
        this.$store.commit('SetClosedIssues')
        this.$store.commit('loadQuickIssues')
      }
      this.pageNotReady = false
    },
  },

  async created() {
    const p = JSON.stringify(this.Project).replace(/\"/g, '')
    this.pageNotReady = true

    if (p.trim() != 'You have no projects') {
      await this.fetchProjectIssueList(JSON.parse(localStorage.getItem('currentProject')).id)
      await this.getProjectTypes(JSON.parse(localStorage.getItem('currentProject')).id)
    }

    this.$store.commit('SetOpenIssues')
    this.$store.commit('SetInProgressIssues')
    this.$store.commit('SetClosedIssues')
    this.$store.commit('loadQuickIssues')
    this.pageNotReady = false
  },

  methods: {
    ...mapActions(['fetchProjectIssueList', 'updateIssue', 'getProjectTypes', 'addIssue', 'ProjectList']),

    issueSeverityChecker(issue) {
      return issue.issueSeverity !== null ? issue.issueSeverity.title : 'No Severity'
    },

    selectType(type) {
      this.hasSeverity = type.needSeverity
      this.issue_type = type.id
    },

    resetDialog() {
      this.quickTitle = ''
      this.quickDescription = ''
      this.quickSeverity = null
      this.quickType = ''
      this.hasSeverity = false
    },

    Cancel() {
      this.dialog = false
      this.completeIssueDialog = false
      this.resetDialog()
    },

    async postIssue(issue) {
      this.$store.commit('CompletedQuickIssue', issue)
      await this.addIssue({
        _title: issue.title,
        _description: this.quickDescription,
        _projectid: this.Project.id,
        _issue_type: this.quickType.id,
        _issue_status: this.Statuses.filter(status => status.title == 'Open')[0].id,
        _issue_severity: this.quickSeverity,
        _is_complete: true,
      })
      this.completeIssueDialog = false
      await this.fetchProjectIssueList(this.Project.id)
      this.quickTitle = ''
      this.quickDescription = ''
      this.quickSeverity = ''
      this.quickType = ''
      this.hasSeverity = false
      this.$store.commit('SetOpenIssues')
    },

    createQuickIssue() {
      var quickIssue = {
        id: Math.floor(Math.random() * 101),
        title: this.quickTitle,
        issueType: {
          color: '#FFFFFF',
        },
        project: {
          id: this.Project.id,
        },
        isComplete: false,
      }
      this.$store.commit('addQuickIssue', quickIssue)
      this.dialog = false
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
        userid: this.User.id,
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

.cancel_btn {
  left: 5%;
}

.edit_tooltip {
  top: -1px;
  left: 110px;
}

.v-tooltip__content {
  color: grey !important;
  background-color: rgba(244, 245, 250, 255) !important;
  box-shadow: aqua !important;
  z-index: 10px !important;
}
</style>
