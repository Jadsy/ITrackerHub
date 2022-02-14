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
    <severity-vue></severity-vue>

    <kan-ban-board></kan-ban-board>
  </v-container>
  
</template>

<script>
// import Calender from './Calender.vue'
// import ToDo from './ToDo.vue'
// import RecentActivity from "./RecentActivity.vue"
//import PieChart from './PieChart.vue'
import SeverityVue from './Severity.vue'
import KanBanBoard from './KanBanBoard.vue'

export default {
  components: {
    // AddIssue,
    // Calender,
    // ToDo,
    // RecentActivity,
    //PieChart
    SeverityVue,
    KanBanBoard
  },
}
</script>
