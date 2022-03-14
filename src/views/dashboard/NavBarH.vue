<template>
  <header :class="{ 'scrolled-nav': scrollPosition }">
    <nav>
      <div class="branding">
        <img src="" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link class="link" :to="{ name: 'dashboard' }" :icon="icons.mdiHomeOutline">Dashboard</router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'ProjectPage' }" :icon="icons.mdiHomeOutline">My Projects</router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'MyIssues' }" :icon="icons.mdiHomeOutline">My Issues</router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'CreateProject' }" :icon="icons.mdiHomeOutline"
            >Create Project</router-link
          >
        </li>
        <li>
          <router-link class="link" :to="{ name: 'pages-account-settings' }" :icon="icons.mdiHomeOutline"
            >Account Settings</router-link
          >
        </li>
      </ul>
      <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdownNav">
          <li>
            <router-link class="link" :to="{ name: 'dashboard' }" :icon="icons.mdiHomeOutline">Dashboard</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: 'ProjectPage' }" :icon="icons.mdiHomeOutline"
              >My Projects</router-link
            >
          </li>
          <li>
            <router-link class="link" :to="{ name: 'MyIssues' }" :icon="icons.mdiHomeOutline">My Issues</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: 'CreateProject' }" :icon="icons.mdiHomeOutline"
              >Create Project</router-link
            >
          </li>
          <li>
            <router-link class="link" :to="{ name: 'pages-account-settings' }" :icon="icons.mdiHomeOutline"
              >Account Settings</router-link
            >
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created()
  {
      window.addEventListener("resize",this.checkScreen);
  },
  methods:{
      toggleMobileNav(){
          this.mobileNav=!this.mobileNav;
      },
      checkScreen(){
          this.windowWidth=window.innerWidth;
          if(this.windowWidth<=750){
              this.mobile=true;
              return;
          }
          this.mobile=false;
          this.mobileNav=false;
          return;
      }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }
    ul,
    .link {
      font-weight: 500;
      color: #fff;
      list-style: none;
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;
      &:hover {
        color: #966fd6;
        border-color: #966fd6;
      }
    }
    .branding {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        transition: 0.5s ease all;
      }
    }

    .navigation{
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
    }
    .icon{
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 24px;
        height: 100%;

        i{
            cursor: pointer;
            font-size: 24px;
            transition: 0.8s ease all;
        }
    }
    .icon-active{
        transform: rotate(180deg);
    }
  }
}
</style>
