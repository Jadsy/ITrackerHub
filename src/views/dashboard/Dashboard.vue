<template>
  <v-container>
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
  </v-container>
</template>

<script>
import DashboardDatatable from './DashboardDatatable.vue'
import AddIssue from './AddIssue.vue'
import Calender from './Calender.vue'
import ToDo from './ToDo.vue'
import RecentActivity from "./RecentActivity.vue"
//import PieChart from './PieChart.vue'

export default {
  components: {
    DashboardDatatable,
    AddIssue,
    Calender,
    ToDo,
    RecentActivity,
    //PieChart
  },
}
</script>
