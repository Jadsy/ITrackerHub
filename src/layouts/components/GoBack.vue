<template>
  <span class="go-back">
    <v-btn outlined color="primary" @click="goBack">
      <v-icon>mdi-keyboard-backspace</v-icon>
      Go Back
    </v-btn>
  </span>
</template>

<script>
export default {
   
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.v-icon {
    left: -10%
}
</style>
