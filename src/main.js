import '@/plugins/vue-composition-api'
import '@/styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import colors from 'vuetify/lib/util/colors'

Vue.config.productionTip = false

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  vuetify,
  colors,
  render: h => h(App),
}).$mount('#app')
