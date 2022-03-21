<template>
  <v-card>
    <v-card-title>Comments</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field v-if="Add_Comment" dense v-model="comment_text" outlined label="Comment"> </v-text-field>
        <v-btn v-if="Add_Comment" color="success" @click=""> Post </v-btn>
        <v-btn v-if="Add_Comment" type="reset" outlined class="mx-2" @click="reset"> Reset </v-btn>
        <v-btn v-if="Add_Comment" outlined class="mx-2" @click="Add_Comment=false"> Cancel </v-btn>
      </v-form>

      <v-btn v-if="!Add_Comment" color="success" outlined class="mx-2" @click="Add_Comment = true"> <v-icon>mdi-plus</v-icon> Add Comment</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      Add_Comment: false,
      comment_text: '',
    }
  },

  methods: {
      reset() {
      this.$refs.form.reset()
    },
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
</style>
