// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './shop.vue'

import 'element-ui/lib/theme-chalk/message.css';
import '../../config/rem'
import '@/style/font/iconfont.css'
import axiosPlugin from '@/server'
// import $ from 'jquery'



Vue.config.productionTip = false
// axios.defaults.baseURL = process.env.BASE_URL;  // 请求的默认URL
Vue.use(axiosPlugin);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
