import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery'
import App from './App.vue'
import http from './http'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$jquery = jquery
Vue.prototype.$http = http

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
