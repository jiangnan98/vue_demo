import Vue from 'vue'

import 'reset-css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import Cookies from 'js-cookie'
import validatorPlugin from './utils/Validator-plugin'
import './icons'
import './permission'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(validatorPlugin)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

import * as filters from './filters'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
