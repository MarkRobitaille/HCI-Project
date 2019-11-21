import Vue from 'vue'

// Import VueRouter and routes
import VueRouter from 'vue-router'
import routes from './routes'

// Import Vuex and store
import Vuex from 'vuex'
import storeModule from './store'

// Impot FontAwesome icons and Vue component
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import main App.vue file
import App from './App.vue'

Vue.config.productionTip = false

// Use VueRouter
Vue.use(VueRouter)
const router = new VueRouter({ routes })

// Use Vuex
Vue.use(Vuex)
const store = new Vuex.Store(storeModule)

// Create library of emoticons and use FontAwesomeIcon
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
