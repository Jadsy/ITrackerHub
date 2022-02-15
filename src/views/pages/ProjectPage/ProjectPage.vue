<template>
  <v-card>
    <v-card-title>This is {{ project.title }}</v-card-title>
    <v-tabs>
      <v-tab> Issues </v-tab>
      <v-tab> Team Calender </v-tab>
      <v-tab> About </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>

export default {
  props: ['id', 'project']
}
</script>

<style>
</style>