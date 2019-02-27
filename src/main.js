import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faBroadcastTower, faPauseCircle, faVolumeUp, faVolumeDown, faVolumeMute, faSyncAlt, faSpinner} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'
/* Register component with one of 2 methods */
import Icon from 'vue-awesome/components/Icon'


library.add(faBroadcastTower, faPlayCircle, faPauseCircle, faVolumeUp, faVolumeDown, faVolumeMute, faSyncAlt, faSpinner)

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-icon', Icon)

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app')
