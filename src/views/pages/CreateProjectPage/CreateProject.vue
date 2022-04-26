<template>
  <v-card>
    <v-card-title>Create Your Project</v-card-title>
    <v-card-text>
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Project Information
          <small>Project Name and Repo Link</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <Step-1 :stepCount="e6" @continue="setProjectData"></Step-1>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Choose Issues Types To Add To Your Project
        </v-stepper-step>

        <v-stepper-content step="2">
          <step-2 :stepCount="e6" @continue="setProjectTypes"></step-2>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          Add Members To Your Project
        </v-stepper-step>

        <v-stepper-content step="3">
          <step-3></step-3>
          <v-btn :loading="loading" :disabled="loading" color="primary" @click="Add_Project">
            Create Project
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Step1 from './Step_1.vue'
import Step2 from './Step_2.vue'
import Step3 from './Step_3.vue'

export default {
  components: {
    Step1,
    Step2,
    Step3,
  },
  data() {
    return {
      loading: false,
      e6: 1,
      projectName: '',
      repoLink: '',
      members: [],
      projectID: '',
      customTypes: [],
    }
  },

  methods: {
    ...mapActions(['addProject', 'addCustomType']),

    async Add_Project() {
      this.loading = true
      this.projectID = await this.addProject({
        _name: this.projectName,
        _repo_link: this.repoLink,
        _members: this.members,
      })

      this.customTypes.forEach(async type => {
        await this.addCustomType({
          project_id: this.projectID,
          type: type,
        })
      })
      this.loading = false
      this.$router.push({ name: 'ProjectPage', params: { id: this.projectID } })
    },
    
    setProjectData(data) {
      this.e6 = data[0]
      this.projectName = data[1]
      this.repoLink = data[2]
    },
    setProjectTypes(data) {
      this.e6 = data[0]
      data[1].forEach(element => {
        this.customTypes.push(element)
      })
    },
    setProjectMembers(data) {
      //TODO: Add Implementation
    },
  },
}
</script>

<style>
.v-label--active {
  transform: translateY(-33px) scale(1) !important;
  font-size: 12px !important;
  padding-right: 8px;
  background-color: white;
}
</style>
