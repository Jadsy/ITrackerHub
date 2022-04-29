import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/modules/ServerLink.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    props: true,
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta:
    {
      requireLogin: true,
    }
  },
  {
    path: '/ProjectPage/:id',
    name: 'ProjectPage',
    props: true,
    component: () => import('@/views/pages/ProjectPage/ProjectPage.vue'),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/NoProjects',
    name: 'NoProjects',
    props: true,
    component: () => import('@/views/pages/ProjectPage/NoProject.vue'),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/MyIssues',
    name: 'MyIssues',
    props: true,
    component: () => import('@/views/pages/MyIssuesPage/MyIssuesPage.vue'),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/IssuePage/:id',
    name: 'IssuePage',
    props: true,
    component: () => import('@/views/pages/IssuePage/IssuePage.vue'),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/CreateProject',
    name: 'CreateProject',
    component: () => import('@/views/pages/CreateProjectPage/CreateProject.vue'),
    meta: {
      requireLogin: true,
    },
  },

  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',

    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  var user 
  if (localStorage.getItem('user')) {
    user = localStorage.getItem('user')
  }
  else{
    user = sessionStorage.getItem('user')
  }


  if (to.matched.some(item => item.meta.requireLogin) && (user === 'undefined' || user === null)) {
    next({ name: 'pages-register', query: { to: to.path } });
  }
  else {
    next();
  }
});

export default router
