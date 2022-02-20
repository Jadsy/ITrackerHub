<template>
  <!-- <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12" v-for="i in 3" :key="i">
        <v-card :style="{ 'background-color': colors[i - 1] }">
          <v-card-title class="colorChange"> {{ status[i - 1].title }} </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card v-for="issue in issues" :key="issue" style="width:360px;margin-left:3px;">
            <v-card-text v-if="issue.issueStatusId === status[i - 1].id" align-left>
              <router-link
                class="d-flex align-center text-decoration-none black--text"
                :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
              >
                {{ issue.title }}
              </router-link>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->
  <v-container>
    <!-- <div id="app"> -->
      <main class="flexbox">
        <Board id="board-1">
          <Card id="card-1" draggable="true">
            <p>card one</p>
          </Card>
        </Board>
        <Board id="board-2">
          <Card id="card-2" draggable="true">
            <p>card two</p>
          </Card>
        </Board>
      </main>
    <!-- </div> -->
  </v-container>
</template>

<script>
import Issues from './issues.json'
import Status from './status.json'
import Board from './Board.vue'
import Card from './Card.vue'

export default {
  components: {
    Board,
    Card,
  },
  data: () => ({
    issues: Issues,
    status: Status,
    colors: ['#EF5350', '#8C9EFF', '#66BB6A'],
  }),
}

// import axios from 'axios'
// const issues = []
// const status = []

// export default {
//   data() {
//     return {
//       issues: [],
//       status: [],
//     }
//   },
//   mounted() {
//     this.getIssuesList()
//     this.getIssueStatus()
//   },
//   methods: {
//     getIssuesList() {
//       axios
//         .get('http://127.0.0.1:8000/api/v1/my-issues/')
//         .then(response => {
//           this.issues = response.data
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//     getIssueStatus() {
//       axios
//         .get('http://127.0.0.1:8000/api/v1/my-status/')
//         .then(response => {
//           this.status = response.data
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//   },
// }
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background-color: white;
  }
  .flexbox{
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 760px;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    padding: 15px;
  }
  .flexbox .board{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    background-color: black;
    padding: 15px;
  }
  .flexbox .board .card{
    padding: 15px 25px;
    background-color: white;
    cursor: pointer;
    margin-bottom: 15px;
  }
</style>
