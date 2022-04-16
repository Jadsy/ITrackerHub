<template>
  <v-card flat>
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
            <v-btn color="primary" @click="Next">
              Continue
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['stepCount'],
  data() {
    return {
      valid: false,
      project_name: '',
      repo_link: '',
    }
  },

  methods: {
    Next() {
      this.$emit('continue', [this.stepCount + 1, this.project_name, this.repo_link])
    },
  },
}
</script>

<style></style>
