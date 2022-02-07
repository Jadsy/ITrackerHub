import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import ApexCharts from 'apexcharts'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  ApexCharts,
  vuetify,
  render: h => h(App),
}).$mount('#app')
