<template>
  <v-dialog width="500" v-model="dialog" hide-overlay transition="dialog-top-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red" dark v-bind="attrs" v-on="on">
        DELETE
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        WARNING
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Are you sure you want to delete this project? This cannot be undone.
      </v-card-text>

      <v-card-actions>
        <v-btn color="red" text @click="Delete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
    }
  },

  computed: {
    ...mapGetters(['Project']),
  },

  methods: {
    ...mapActions(['deleteProject']),

    async Delete() {
      await this.deleteProject(this.Project.id), 

      this.dialog = false
      this.$router.push('/dashboard')
    },
  },
}
</script>

<style></style>
