<template>
  <!-- <v-app> -->
  <div>
    <vertical-nav-menu v-if="isReady" :is-drawer-open.sync="isDrawerOpen"></vertical-nav-menu>

    <v-app-bar v-if="isReady" app flat absolute color="transparent">
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <v-app-bar-nav-icon class="d-block d-lg-none me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
          <!-- <v-text-field
            rounded
            dense
            outlined
            :prepend-inner-icon="icons.mdiMagnify"
            class="app-bar-search flex-grow-0"
            hide-details
          ></v-text-field> -->

          <h3 class="userName">{{ User.first_name }} {{ User.last_name }}</h3>

          <v-spacer></v-spacer>

          <theme-switcher v-if="isReady"></theme-switcher>

          <app-bar-user-menu v-if="isReady"></app-bar-user-menu>
        </div>
      </div>
    </v-app-bar>
    <v-main v-if="isReady">
      <div class="app-content-container boxed-container pa-6">
        <slot></slot>
      </div>
    </v-main>
  </div>
  <!-- </v-app> -->
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiMagnify, mdiBellOutline, mdiGithub } from '@mdi/js'
import VerticalNavMenu from './components/vertical-nav-menu/VerticalNavMenu.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import AppBarUserMenu from './components/AppBarUserMenu.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    VerticalNavMenu,
    ThemeSwitcher,
    AppBarUserMenu,
  },

  computed: {
    ...mapGetters(['User']),
  },

  data() {
    return {
      isReady: false,
    }
  },

  setup() {
    const isDrawerOpen = ref(null)

    return {
      isDrawerOpen,

      // Icons
      icons: {
        mdiMagnify,
        mdiBellOutline,
        mdiGithub,
      },
    }
  },

  methods: {
    ...mapActions(['getIssueStatus', 'getIssueSeverity', 'getProjectList']),
  },

  async created() {
    await this.getIssueStatus()
      .then(await this.getIssueSeverity())
      .then(await this.getProjectList())
    this.isReady = true
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
}

.boxed-container {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

.userName {
  margin-left: 45%;
}
</style>
