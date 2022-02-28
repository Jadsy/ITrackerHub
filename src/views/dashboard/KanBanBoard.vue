<template>
  <v-container>
    <v-row wrap>
      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="blue lighten-3">
            <span class="white--text">Open</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="blue lighten-3">
            <draggable class="list-group kanban-column" :list="Open" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:auto; margin-top:10px"
                v-for="issue in Open"
                :key="issue"
                align-center
                elevation="3"
              >
                <v-card-text>
                  <v-row dense style="width:auto">
                    <router-link
                      class="d-flex align-center text-decoration-none grey--text"
                      style="font-size:18px;"
                      :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                    >
                      {{ issue.title }}
                    </router-link>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="red"
                        outlined
                        style="position:relative; right:10px;top:10px; height:min-content"
                      >
                        {{ issue.issueSeverity }}
                      </v-chip>
                    </v-col>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="green"
                        outlined
                        style="position:relative; right:83px; top:10px;height:min-content"
                      >
                        {{ issue.issueType }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="light-green lighten-3">
            <span class="white--text">In Progress</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="light-green lighten-3">
            <draggable class="list-group kanban-column" :list="InProgress" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:auto; margin-top:10px"
                v-for="issue in InProgress"
                :key="issue"
                align-center
                elevation="3"
              >
                <v-card-text>
                  <v-row dense style="width:auto">
                    <router-link
                      class="d-flex align-center text-decoration-none grey--text"
                      style="font-size:18px;"
                      :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                    >
                      {{ issue.title }}
                    </router-link>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="red"
                        outlined
                        style="position:relative; right:10px;top:10px; height:min-content"
                      >
                        {{ issue.issueSeverity }}
                      </v-chip>
                    </v-col>

                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="green"
                        outlined
                        style="position:relative; right:83px; top:10px;height:min-content"
                      >
                        {{ issue.issueType }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="4" xs="12">
        <v-card>
          <v-card-title class="orange lighten-3">
            <span class="white--text">Completed</span>
          </v-card-title>
          <v-divider horizontal></v-divider>
          <v-card-text class="orange lighten-3">
            <draggable class="list-group kanban-column" :list="Completed" group="tasks">
              <v-card
                class="#f4f5fa"
                style="height:auto; margin-top:10px"
                v-for="issue in Completed"
                :key="issue"
                align-center
                elevation="3"
              >
                <v-card-text>
                  <v-row dense style="width:auto">
                    <router-link
                      class="d-flex align-center text-decoration-none grey--text"
                      style="font-size:18px;"
                      :to="{ name: 'IssuePage', params: { id: issue.id, issue } }"
                    >
                      {{ issue.title }}
                    </router-link>
                  </v-row>

                  <v-row dense>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="red"
                        outlined
                        style="position:relative; right:10px;top:10px; height:min-content"
                      >
                        {{ issue.issueSeverity }}
                      </v-chip>
                    </v-col>
                    <v-col>
                      <v-chip
                        class="ma-2"
                        color="green"
                        outlined
                        style="position:relative; right:83px; top:10px;height:min-content"
                      >
                        {{ issue.issueType }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {

  components: {
    draggable,
  },

  computed: {
    ...mapGetters(['Open']),
    ...mapGetters(['InProgress']),
    ...mapGetters(['Completed'])
  },

  methods: {
    ...mapActions(['fetchIssues'])
  },

  created() {
    this.fetchIssues()
  }
  
}
</script>

<style scoped>
hr {
  margin-top: 0.1px;
  margin-bottom: 0.1px;
  border: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
