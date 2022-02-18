<template>
  <v-container>
    <v-row>
      <v-col xl="3" lg="3" md="3" sm="3" xs="12" v-for="i in 4" :key="i">
        <v-card>
          <v-card-title>{{ severity[i - 1].title }}</v-card-title>
          <v-divider horizontal></v-divider>
          <v-card v-for="issue in issues" :key="issue">
            <v-card-text v-if="issue.issueSeverityId === severity[i - 1].id" align-left>
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
import severity from './severity.json'

export default {
  data: () => ({
    issues: issues,
    severity: severity,
  }),
}
</script>
