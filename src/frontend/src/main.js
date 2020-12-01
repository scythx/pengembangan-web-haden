import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import http from './http'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery'

Vue.config.productionTip = false
Vue.prototype.$jquery = jquery
Vue.prototype.$http = http

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
