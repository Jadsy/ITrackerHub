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
    <v-row>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            {{ view }}
          </v-btn>
          <v-text class="view" style="position:relative; margin-right:10px; top:4px">View: </v-text>
        </template>
        <v-list>
          <v-list-item v-for="v in views" :key="v" @click="view = v.title">
            <v-list-item-title>{{ v.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-row>
      <severity-vue v-show="view === 'Severity'"></severity-vue>

      <kan-ban-board v-show="view === 'Kanban'"></kan-ban-board>
    </v-row>
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
    KanBanBoard,
  },

  data: () => ({
    view: 'Kanban',
    views: [{ title: 'Kanban' }, { title: 'Severity' }],
  }),
}
</script>

<style scoped>
.view {
  font-size: 20px;
}
</style>