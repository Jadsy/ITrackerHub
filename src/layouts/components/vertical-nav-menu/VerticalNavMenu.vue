<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    expand-on-hover
    mini-variant-width="60px"
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-slide-x-transition>
          <h2 class="app-title text--primary">ITH</h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list expand shaped class="vertical-nav-menu-items pr-5">
      <nav-menu-link
        title="Dashboard"
        :to="{ name: 'dashboard' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>

      <v-list>
        <v-list-group :prepend-icon="icons.mdiTelevisionGuide">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="'My Projects'"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="(project, index) in ProjectList" :key="index">
            <v-icon class="mx-2">{{ icons.mdiAccountGroup }}</v-icon>
            <v-list-item-content>
              <router-link
                class="d-flex align-center text-decoration-none black--text"
                :to="{ name: 'ProjectPage', params: { id: project.id} }"
              >
                {{ project.title }}
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <nav-menu-link title="My Issues" :to="{ name: 'MyIssues' }" :icon="icons.mdiBookEditOutline"></nav-menu-link>
      <nav-menu-link
        style="position:relative; top:70px;"
        title="Account Settings"
        :to="{ name: 'pages-account-settings' }"
        :icon="icons.mdiAccountCogOutline"
      ></nav-menu-link>

      <nav-menu-link
        style="position: relative; top: 200px"
        title="Create Project"
        :to="{ name: 'CreateProject' }"
        :icon="icons.mdiPlusMinus"
      ></nav-menu-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiTelevisionGuide,
  mdiBookEditOutline,
  mdiPlusMinus,
} from '@mdi/js'

// import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    // NavMenuSectionTitle,
    NavMenuGroup,
    NavMenuLink,
  },
 
  computed: {
    ...mapGetters(['ProjectList']),
  },

  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },

  setup() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiAccountGroup,
        mdiAccountMultiple,
        mdiTelevisionGuide,
        mdiBookEditOutline,
        mdiPlusMinus,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-10px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}
</style>
