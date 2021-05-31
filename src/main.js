import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import Vuex from 'vuex'
Vue.use(Vuex)

// bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./assets/css/custom.scss"
if (store.getters.getlang == "ar") {
  import ("./assets/css/bootstrap-rtl.min.css")
  .then((something) => {});
}

import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(BootstrapVue, IconsPlugin, axios)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
