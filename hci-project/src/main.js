import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Vuex from 'vuex'
import storeModule from './store'
import App from './App.vue'


Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({routes})

Vue.use(Vuex)
const store = new Vuex.Store(storeModule)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
