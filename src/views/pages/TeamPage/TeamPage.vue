<template>
  <v-card>
    <v-card-title>This is team {{slug}}</v-card-title>
    <v-tabs>
      <v-tab> Projects </v-tab>
      <v-tab> Issues </v-tab>
      <v-tab> Team Calender </v-tab>
      <v-tab> About </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
// import TeamData from 'src/layouts/components/vertical-nav-menu/components/Teams.json'

export default {
    props:['slug']
//   data() {
//     return {
//       slug: this.$route.params.slug,
//     }
//   },
}
</script>
