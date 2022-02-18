<template>
  <v-card>
    <v-card-title>Create Your Project</v-card-title>
    
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="project_name"
              label="Project Name"
              outlined
              dense
              placeholder="Project"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="primary"> Submit </v-btn>
            <v-btn type="reset" outlined class="mx-2" @click="reset"> Reset </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  
  setup() {
    const project_name = ref('')

    return {
      project_name,
    }
  },

  methods: {
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
