<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12" v-for="i in 3" :key="i">
        <v-card>
          <v-card-title> {{ status[i - 1].title }} </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card v-for="issue in issues" :key="issue">
            <v-card-text v-if="issue.issueStatusId === status[i - 1].id" align-left>
              <router-link
                class="d-flex align-center text-decoration-none black--text"
                :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
              >
                {{ issue.title }}
              </router-link>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import issues from './issues.json'
import status from './status.json'

export default {
  data: () => ({
    issues: issues,
    status: status,
  }),
}
</script>
