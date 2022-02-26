<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="12">
        <calender></calender>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset="">
        <to-do></to-do>
      </v-col>
      <v-col cols="6" offset="">
        <recent-activity></recent-activity>
      </v-col>
    </v-row>
  </v-container> -->

  <v-container>
    <v-row class="my-1">
      <h2 style="font-size:40px;text-decoration:underline;color:rgb(92, 92, 92)">Kanban Board </h2>
    </v-row>
    <v-row>
      <KanBanBoard></KanBanBoard>
    </v-row>
  </v-container>
</template>

<script>
// import Calender from './Calender.vue'
// import ToDo from './ToDo.vue'
// import RecentActivity from "./RecentActivity.vue"
//import PieChart from './PieChart.vue'
import KanBanBoard from './KanBanBoard.vue'

export default {
  components: {
    // AddIssue,
    // Calender,
    // ToDo,
    // RecentActivity,
    //PieChart
    KanBanBoard,
  },
}
</script>

<style scoped>
.view {
  font-size: 20px;
}
</style>
