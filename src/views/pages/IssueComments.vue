<template>
  <v-card>
    <v-card-title>Comments</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-list>
          <template v-for="(comment, index) in IssueComments">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-title v-html="comment.comment"></v-list-item-title>
                <v-btn @click="Delete(comment.id)">Delete</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>

        <v-text-field v-if="Add_Comment" dense v-model="comment_text" outlined label="Comment"> </v-text-field>
        <v-btn v-if="Add_Comment" color="success" @click="Add"> Post </v-btn>
        <v-btn v-if="Add_Comment" type="reset" outlined class="mx-2" @click="reset"> Reset </v-btn>
        <v-btn v-if="Add_Comment" outlined class="mx-2" @click="Add_Comment = false"> Cancel </v-btn>
      </v-form>

      <v-btn v-if="!Add_Comment" color="success" outlined class="mx-2" @click="Add_Comment = true">
        <v-icon>mdi-plus</v-icon> Add Comment</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['issueId'],

  data() {
    return {
      Add_Comment: false,
      comment_text: '',
    }
  },

  watch: {
    issueId() {
      this.fetchIssueComments(this.issueId)
    },
  },

  computed: {
    ...mapGetters(['Issue', 'IssueComments']),
  },

  methods: {
    ...mapActions(['addComment', 'fetchIssue', 'fetchIssueComments', 'deleteIssueComment']),

    Add() {
      this.addComment({
        _comment: this.comment_text,
        _user_id: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
        _issue_id: this.issueId,
      })
      this.Add_Comment = false
    },

    Delete(comment_id) {
      this.deleteIssueComment(comment_id)
    },

    reset() {
      this.$refs.form.reset()
    },
  },

  created() {
    this.fetchIssue(this.issueId)
    this.fetchIssueComments(this.issueId)
  },
}
</script>

<style>
.v-label--active {
  transform: translateY(-25px) scale(1) !important;
  font-size: 12px !important;
  padding-right: 8px;
  background-color: white;
}
</style>
