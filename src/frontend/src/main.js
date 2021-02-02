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
import _ from 'lodash'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$jquery = jquery
Vue.prototype.$http = http

Vue.use(CKEditor);

Vue.use(VueGtag, {
  config: { id: "UA-185690843-1" }
}, router);

Vue.filter('formatDate', function(value) {
  if (value) {
      return dayjs(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.filter('title', function(value) {
  if (value) {
      return _.unescape(value);
  }
});

Vue.filter('textPreview', function(value) {
  if (value) {
      var i = 0
      const domparser = new DOMParser();
      let el = domparser.parseFromString(value, "text/html");
      var text = el.getElementsByTagName("p")[i].innerHTML
      while(text.length < 30){
        text = text + el.getElementsByTagName("p")[i++].innerHTML
      }
      return _.unescape(text.replace(/(<([^>]+)>)/gi, "") + ".. Baca selengkapnya.");
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
