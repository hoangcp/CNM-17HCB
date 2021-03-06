import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCEheMxtUig64jFuGOWEjAPhsCFKDpy-OA",
    libraries: "places,drawing,visualization" // necessary for places input
  }
});

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')

