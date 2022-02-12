<template>
  <div class="text-center">
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
          <v-textarea v-model="content" label="Information"></v-textarea>
          <v-text-field v-model="title" label="Severity"></v-text-field>
          <v-text-field v-model="title" label="Assignees"></v-text-field>
          <v-text-field v-model="title" label="Labels"></v-text-field>
          <v-text-field v-model="title" label="Project"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit" class="success mx-0 mt-3">
            <v-icon align-self:left>mdi-content-save-check-outline</v-icon> Save</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  .v-btn{
    left: 43%
  }
</style>