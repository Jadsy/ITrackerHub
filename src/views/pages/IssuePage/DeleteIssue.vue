<template>
  <v-dialog width="500" v-model="dialog" hide-overlay transition="dialog-top-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn" color="red white--text"  v-bind="attrs" v-on="on">
        DELETE
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        WARNING
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Are you sure you want to delete this Issue?
      </v-card-text>

      <v-card-actions>
        <v-btn :loading="loading" :disabled="loading" color="red" text @click="Delete">
          Delete
        </v-btn>

        <v-btn color="green" text @click="dialog = false">
          Cancel
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
      loading: false,
    }
  },

  computed: {
    ...mapGetters(['Issue']),
  },

  methods: {
    ...mapActions(['deleteIssue']),

    async Delete() {
      this.loading = true
      await this.deleteIssue(this.Issue.id), 
      this.loading = false, 
      this.dialog = false
      this.$router.go(-1)
    },
  },
}
</script>

<style>
.btn {
  /* background-color: rgb(255, 255, 255); */
  
  width: 150px;
  border-radius: 30px;
  right: 12%;
  position: absolute;
}

.btn:hover {
  background-color: white;
  color: red;
  border: solid;
}
</style>
