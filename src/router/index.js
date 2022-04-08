import Vue from 'vue'
import VueRouter from 'vue-router'

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
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    props: true,
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/ProjectPage/:id',
    name: 'ProjectPage',
    props: true,
    component: () => import('@/views/pages/ProjectPage/ProjectPage.vue')
  },
  {
    path: '/MyIssues',
    name: 'MyIssues',
    props: true,
    component: () => import('@/views/pages/MyIssuesPage/MyIssuesPage.vue')
  },
  {
    path: '/IssuePage/:id',
    name: 'IssuePage',
    props: true,
    component: () => import('@/views/pages/IssuePage/IssuePage.vue')
  },
  {
    path: '/CreateProject',
    name: 'CreateProject',
    component: () => import('@/views/pages/CreateProject.vue')
  },
 
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
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

export default router
