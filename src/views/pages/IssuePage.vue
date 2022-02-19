<template>
  <v-container>
    <go-back></go-back>
    <v-card>
      <v-card-title>{{ issue.title }}</v-card-title>
      <v-divider horizontal></v-divider>
      <v-card-text>
        <p>Description: {{ issue.description }}</p>
        <p>Created by: {{ issue.userid }}</p>
        <p>Creation Date: {{ issue.created }}</p>
        <p>Time estimate: {{ issue.time_estimate }}</p>
        <p>Issue Status: {{ issue.issueStatusId }}</p>
        <p>Issue Type: {{ issue.issueTypeId }}</p>
        <p>Issue Severity: {{ issue.issueSeverityId }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import GoBack from '@/layouts/components/GoBack.vue'

export default {
  props: ['id', 'issue'],
  components: {
    GoBack,
  },
}
</script>

<style scoped>
.v-card{
  top:20px
}
</style>
