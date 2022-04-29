<template>
  <v-card>
    <v-card-title class="primary"> <span class="white--text">Comments</span></v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-list>
          <template v-for="(comment, index) in commentUsers">
            <v-list-item :key="comment.id">
              <v-list-item-content>
                <p class="comment_details text-subtitle-1 font-weight-black">
                  <span class="success--text"><v-icon color="success">mdi-account</v-icon> {{ comment.userName }}</span>
                </p>

                <v-list-item-title style="display: inline-block; margin: 0"
                  ><span class="text-h6">{{ comment.comment }}</span></v-list-item-title
                >
                <p class="comment_details text-caption">{{ comment.createdAt }}</p>

                <v-btn v-if="User.id == comment.userId" class="gar" icon color="red" @click="Delete(comment.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>

        <v-text-field v-if="Add_Comment" dense v-model="comment_text" label="Comment"> </v-text-field>
        <v-btn v-if="Add_Comment" color="success" @click="Add" :loading="loading"> Post </v-btn>
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
      loading: false,
      commentUsers: [],
      commentUser: '',
    }
  },

  watch: {
    IssueComments() {
      this.loadComments()
    },
  },

  computed: {
    ...mapGetters(['Issue', 'IssueComments', 'User']),
  },

  methods: {
    ...mapActions(['addComment', 'fetchIssue', 'fetchIssueComments', 'deleteIssueComment', 'fetchUser']),

    async Add() {
      this.loading = true
      await this.addComment({
        _comment: this.comment_text,
        _user_id: this.User.id,
        _issue_id: this.Issue.id,
      })
      this.Add_Comment = false
      this.comment_text = ''
      this.loading = false
    },

    async Delete(comment_id) {
      await this.deleteIssueComment(comment_id)
    },

    async FetchUser(user_id) {
      return await this.fetchUser(user_id)
    },

    reset() {
      this.$refs.form.reset()
    },

    async loadComments() {
      this.commentUsers = []
      for (let i = 0; i < this.IssueComments.length; i++) {
        this.commentUser = await this.fetchUser(this.IssueComments[i].userId)
        this.commentUser = this.commentUser[0]
        const cs = {
          id: this.IssueComments[i].id,
          userId: this.IssueComments[i].userId,
          comment: this.IssueComments[i].comment,
          userName: this.commentUser.first_name + ' ' + this.commentUser.last_name,
          createdAt: this.ParseDateCreated(this.IssueComments[i].created),
        }
        this.commentUsers.push(cs)
      }
    },

    ParseDateCreated(dateCreated) {
      const date = new Date(dateCreated).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      })
      return date
    },
  },

  async created() {
    this.loadComments()
  },
}
</script>

<style>
.v-list-item__content {
  margin: auto;
}
.te {
  display: inline-block;
  float: right;
}

.gar {
  display: inline-block;
  float: right;
  right: -90%;
  top: -75px;
}

.ed {
  display: inline-block;
  float: right;
  right: -90%;
}

.comment_details {
  right: -90%;
}
</style>
