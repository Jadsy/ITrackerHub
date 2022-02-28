<template>
  <v-container>
    <v-row class="my-1">
      <h2 style="font-size:40px;text-decoration:underline;color:rgb(92, 92, 92)">Kanban Board</h2>
    </v-row>
    <v-row>
      <KanBanBoard :Issues="Issues"></KanBanBoard>
    </v-row>
  </v-container>
</template>

<script>
import KanBanBoard from './KanBanBoard.vue'
import axios from 'axios'

export default {
  data() {
    return {
      Issues: [],
    }
  },

  components: {
    KanBanBoard,
  },

  created() {
    this.getIssues()
  },

  methods: {
    async getIssues() {
      await axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles')
        .then(response => {
          this.Issues = (response.data)
          // console.log(this.Issues)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.view {
  font-size: 20px;
}
</style>
