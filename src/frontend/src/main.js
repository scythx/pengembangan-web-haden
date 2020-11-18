import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery'
import App from './App.vue'


const app = createApp(App)

app.config.globalProperties.$jquery = jquery
app.mount('#app')
