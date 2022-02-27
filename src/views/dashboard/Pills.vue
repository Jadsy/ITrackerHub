<template>
  <v-chip class="ma-2" color="red" outlined>
    {{ issue_atribute }}
  </v-chip>
</template>
<script>
export default {
  props: ['issue_atribute'],
}
</script>
