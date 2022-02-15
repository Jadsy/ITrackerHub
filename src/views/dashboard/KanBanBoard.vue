<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12" v-for="i in 3" :key="i">
        <v-card>
          <v-card-title> {{ status[i - 1].title }} </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card v-for="issue in issues" :key="issue">
            <v-card-text v-if="issue.issueStatusId === status[i - 1].id" align-left>
              <v-dialog v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn block text v-bind="attrs" v-on="on"> {{ issue.title }} </v-btn>
                </template>
                <v-card>
                    <v-card-title> {{ issue.title }} </v-card-title>
                    <v-divider horizontal></v-divider>
                    <v-card-text>
                        <p> Description: {{ issue.description }} </p>
                        <p> Creation Date: {{ issue.created }} </p>
                        <p> Time estimate: {{ issue.time_estimate }}</p>
                        <p> Issue Status: {{ status[i - 1].title }} </p>
                    </v-card-text>
                </v-card>
              </v-dialog>
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
