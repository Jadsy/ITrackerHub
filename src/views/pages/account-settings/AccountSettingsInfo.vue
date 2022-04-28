<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text>
      <p>Number of projects: {{ ProjectList.length }}</p>
      <p>Joined on: {{date}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      date: '',
    }
  },
  computed: {
    ...mapGetters(['User', 'ProjectList']),
  },

  created(){
    this.ParseDateJoined()
  },

  methods: {
    ParseDateJoined() {
      const dateRegex = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
      this.date = dateRegex.exec(this.User.created).toString().split('-');
      this.date = new Date(this.date[0], this.date[1] - 1, this.date[2]).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'}); 
    },
  },
}
</script>
