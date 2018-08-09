// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './profile.vue'
import 'font-awesome/css/font-awesome.min.css'
import '../../config/rem'
import router from './router'
// import axios from 'axios'


Vue.config.productionTip = false
// axios.defaults.baseURL = process.env.BASE_URL;  // 请求的默认URL
// Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
