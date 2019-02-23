import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faPlayCircle, faBroadcastTower, faPauseCircle, faVolumeUp, faVolumeDown, faVolumeMute} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBroadcastTower, faPlayCircle, faPauseCircle, faVolumeUp, faVolumeDown, faVolumeMute)

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app')
