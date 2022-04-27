<template>
  <v-list>
    <v-list-group prepend-icon="mdi-account-multiple">
      <template v-slot:activator>
        <v-list-item-title class="type_title">Members <v-divider class="type_divider"></v-divider></v-list-item-title>
      </template>
      <div class="types_block">
        <v-list-item v-for="member in Project.members" :key="member.id">
          <template>{{ isYou(member) }}</template>
          <span v-if="is_you">{{ member }} (You)</span>
          <span v-else>{{ member }}</span>
        </v-list-item>
      </div>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['Project', 'User']),
  },

  data() {
    return {
      is_you: false,
    }
  },

  methods: {
    isYou(member) {
      this.is_you = member == this.User.id
    },
  },
}
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
