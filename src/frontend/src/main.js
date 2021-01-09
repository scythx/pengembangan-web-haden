import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import http from './http'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import VueGtag from "vue-gtag";
import dayjs from 'dayjs';

Vue.config.productionTip = false
Vue.prototype.$jquery = jquery
Vue.prototype.$http = http

Vue.use(CKEditor);

Vue.use(VueGtag, {
  config: { id: "G-GT1G679Q41" }
}, router);

Vue.filter('formatDate', function(value) {
  if (value) {
      return dayjs(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.dispatch('authentication/initialize')
  },
  render: h => h(App)
}).$mount('#app')
