<template>
  <v-card>
    <v-card-title class="blue lighten-4">Comments</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-list>
          <template v-for="(comment, index) in IssueComments">
            <v-list-item :key="index" style="height:fit-content;" >
              <v-list-item-content class="te">
                <v-list-item-title
                  v-html="comment.comment"
                  style="display: inline-block; margin: 0;"
                ></v-list-item-title>
                <v-btn class="gar" icon color="red" @click="Delete(comment.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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

  data() {
    return {
      Add_Comment: false,
      comment_text: '',
    }
  },

  watch: {
    issueId() {
      this.fetchIssueComments(this.Issue.id)
    },
  },

  computed: {
    ...mapGetters(['Issue', 'IssueComments']),
  },

  methods: {
    ...mapActions(['addComment', 'fetchIssue', 'fetchIssueComments', 'deleteIssueComment']),

    async Add() {
      await this.addComment({
        _comment: this.comment_text,
        _user_id: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
        _issue_id: this.Issue.id,
      })
      this.Add_Comment = false
      this.fetchIssueComments(this.Issue.id)
    },

    async Delete(comment_id) {
      await this.deleteIssueComment(comment_id)
      this.fetchIssueComments(this.Issue.id)
    },

    reset() {
      this.$refs.form.reset()
    },
  },

  async created() {
    console.log('fetching Issue comments')
    await this.fetchIssueComments(this.Issue.id)
  },

  beforeDestroy(){
    this.$store.commit('resetIssueComments')
  }
}
</script>

<style>
.v-label--active {
  transform: translateY(-25px) scale(1) !important;
  font-size: 12px !important;
  padding-right: 8px;
  background-color: white;
}

.te {
  display: inline-block;
  float: right;
}

.gar {
  display: inline-block;
  float: right;
  margin-bottom: 10px;
}
</style>
