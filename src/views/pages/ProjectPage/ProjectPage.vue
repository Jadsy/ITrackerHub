<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        {{ project.title }}
      </h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="primary" dark centered>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card v-if="item.tab == 'Issues'">
            <template>
              <AddIssue :projectid="id"></AddIssue>
              <!-- <div class="text-center">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn class="success" dark v-on="on">
                      <v-icon align-self: left>
                        mdi-plus-thick
                      </v-icon>
                      Add Issue
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <h2>Add Issue</h2>
                    </v-card-title>
                    <v-card-text>
                      <v-form class="px-3">
                        <v-text-field v-model="title" label="Title"></v-text-field>
                        <v-textarea v-model="description" label="Description"></v-textarea>
                        <v-select
                          item-text="text"
                          item-value="value"
                          :items="time_est"
                          v-model="time_estimate"
                          label="Time Estimate"
                        ></v-select>

                        <v-select
                          item-text="title"
                          item-value="id"
                          :items="issueType"
                          v-model="issue_type"
                          label="Issue Type"
                        ></v-select>
                        <v-select
                          item-text="title"
                          item-value="id"
                          v-model="issue_status"
                          label="Issue Status"
                          :items="issueStatus"
                        ></v-select>
                        <v-select
                          item-text="title"
                          item-value="id"
                          :items="issueSeverity"
                          v-model="issue_severity"
                          label="Issue Severity"
                        ></v-select>
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          @click="
                            postIssue()
                            reloadPage()
                          "
                          class="success mx-0 mt-3"
                        >
                          <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn
                        >
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div> -->
            </template>

            <v-card>
              <v-data-table
                :headers="headers"
                :items="Project_Issues"
                item-key="full_name"
                class="table-rounded"
                hide-default-footer
                enable-sort
                @click:row="handleClick"
              >
              </v-data-table>
            </v-card>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import axios from 'axios'
import AddIssue from './AddIssue.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['id', 'project'],

  components: {
    AddIssue
  },

  data() {
    return {
      tab: null,
      items: [{ tab: 'Issues' }, { tab: 'Calender' }, { tab: 'About' }],

      title: '',
      description: '',
      time_estimate: '',
      issue_type: '',
      issue_status: '',
      issue_severity: '',
      time_est: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
      ],
    }
  },

  setup() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Estimate', value: 'time_estimate' },
        { text: 'Assignees', value: 'user' },
        { text: 'Type', value: 'issueType' },
        { text: 'Status', value: 'issueStatus' },
        { text: 'Severity', value: 'issueSeverity' },
      ],
    }
  },

  watch: {
    id(){
      this.fetchProjectIssueList(this.id)
    }
  },

  created() {
    this.fetchProjectIssueList(this.id)
  },

  computed: {
    ...mapGetters(['Project_Issues'])
  },

  methods: {
    ...mapActions(['fetchProjectIssueList']),

    handleClick(issue) {
      this.$router.push({
        name: 'IssuePage',
        params: { id: issue.id, issue },
      })
    },

    postIssue() {
      axios
        .post('https://fadiserver.herokuapp.com/api/v1/my-issues/', {
          title: this.title,
          description: this.description,
          time_estimate: this.time_estimate,
          userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
          projectid: this.id,
          issueTypeId: this.issue_type,
          issueStatusId: this.issue_status,
          issueSeverityId: this.issue_severity,
        })
        .then(response => {
          console.log(response)
        })
    },
    reloadPage() {
      window.location.reload()
    },
  },


}
</script>

<style scoped>
.v-btn {
  left: 43%;
}
</style>
