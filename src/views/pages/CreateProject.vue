<template>
  <v-card>
    <v-card-title>Create Your Project</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field outlined v-model="project_name" label="Project Name" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field outlined v-model="repo_link" label="Repository Link" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn color="success" @click="Add_Project"> Create </v-btn>
            <v-btn type="reset" outlined class="mx-2" @click="reset"> Reset </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      project_name: '',
      repo_link: '',
    }
  },

  methods: {
    ...mapActions(['addProject']),

    Add_Project() {
      this.addProject({ _name: this.project_name, _repo_link: this.repo_link })
      this.reset()
    },
    reset() {
      this.$refs.form.reset()
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
