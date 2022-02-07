<template>
  <v-row>
    <v-flex style="margin-left:1090px">
      <add-issue/>
    </v-flex>

    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row>
</template>

<script>

import DashboardDatatable from './DashboardDatatable.vue'
import AddIssue from './AddIssue.vue'

export default {
  components: {
    DashboardDatatable,
    AddIssue,
  },
}
</script>
