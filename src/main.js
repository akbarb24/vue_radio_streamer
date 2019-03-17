import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import VueMq from 'vue-mq'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'
/* Register component with one of 2 methods */
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false
// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-icon', Icon)

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: 'md' // customize this for SSR
})

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app')
