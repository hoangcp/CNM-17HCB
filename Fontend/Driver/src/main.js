import Vue from 'vue'
import store from './store'
import { sync } from 'vuex-router-sync'
import { http, router } from './http'
import auth from './auth'
import Vuetify from 'vuetify'
import URLSearchParams from 'url-search-params'
import App from './app'
import Loading from './components/loading'
import Appbar from './components/app-bar'
import Appfooter from './components/app-footer'
import * as VueGoogleMaps from 'vue2-google-maps'
/* import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css' */

Vue.config.productionTip = false

// Polyfills
global.URLSearchParams = URLSearchParams

// Sync router to store, as `store.state.route`.
sync(store, router)

// Http and Auth plugins
Vue.use(http)
Vue.use(auth)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCEheMxtUig64jFuGOWEjAPhsCFKDpy-OA',
    libraries: 'places' // necessary for places input
  }
})
// Vue.use(BootstrapVue)

// Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: '#21CE99',
    secondary: '#D81B60',
    accent: '#805441'
  }
})

// Styles
require('./styles/scss/main.scss')
require('./styles/stylus/main.styl')

// Global Components
Vue.component('loading', Loading)
Vue.component('Appbar', Appbar)
Vue.component('Appfooter', Appfooter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
