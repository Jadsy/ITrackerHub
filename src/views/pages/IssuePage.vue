<template>
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
</template>
<script>
export default {
  props: ['id', 'issue'],
}
</script>
