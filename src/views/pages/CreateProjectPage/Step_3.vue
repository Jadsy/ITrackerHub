<template>
  <v-card flat>
    <v-card-text>
      <v-alert dense outlined type="error" icon="mdi-close-circle-outline" v-if="error">{{
        this.errorMessage
      }}</v-alert>
      <v-row>
        <v-col cols="11">
          <v-text-field label="Member Email" v-model="userEmail"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn :loading="loading" color="primary" @click="SearchForUser"> Add </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <template v-for="member in members">
            <v-chip @click:close="removeMember(member)" close :color="randomColor()" :key="member.id"
              >{{ member.first_name }} {{ member.last_name }}</v-chip
            >
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-btn color="primary" @click="Next">Continue</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['stepCount'],

  data() {
    return {
      loading: false,
      searchResult: '',
      errorMessage: '',
      error: false,
      userEmail: '',
      members: [],
      membersIDs: [],
    }
  },

  methods: {
    ...mapActions(['fetchUserByEmail']),

    removeMember(member) {
      this.members = this.members.filter(m => m.id !== member.id)
    },

    async SearchForUser() {
      this.loading = true
      this.searchResult = await this.fetchUserByEmail(this.userEmail.toLowerCase())
      this.searchResult = this.searchResult[0]
      if (this.searchResult === undefined) {
        this.errorMessage = 'User not found'
        this.error = true
      } else {
        if (Boolean(this.members.find(member => member.id == this.searchResult.id))) {
          this.errorMessage = 'User already added'
          this.error = true
        } else {
          this.members.push(this.searchResult)
        }
      }
      this.loading = false
    },

    randomColor() {
      return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)'
    },

    Next() {
      this.members.forEach(member => {
        this.membersIDs.push(member.id)
      })
      this.$emit('continue', [this.e6 + 1, this.membersIDs])
    },
  },
}
</script>

<style></style>
