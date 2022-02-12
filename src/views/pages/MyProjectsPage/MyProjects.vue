<template>
  <v-card>
    <v-card-title> My Projects </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for="project in projectinfo" :key = "project.title">
        <v-expansion-panel-header> {{project.title}} </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{project.body}}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  props: ['projectinfo']
}
</script>

<style>
</style>