<template>
  <v-list>
    <v-list-group prepend-icon="mdi-account-multiple">
      <template v-slot:activator>
        <v-list-item-title class="type_title">Members <v-divider class="type_divider"></v-divider></v-list-item-title>
      </template>
    </v-list-group>
  </v-list>
</template>

<script>
export default {}
</script>

<style>
.type_title {
  margin-top: 5px;
}
.type_divider {
  border-width: 1px !important;
  margin-left: 100px;
  width: 92%;
  margin-top: -10px;
}
.types_block {
  margin-left: 36px;
}
</style>
