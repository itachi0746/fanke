// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './cart.vue'
import 'font-awesome/css/font-awesome.min.css'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/radio.css';
// import {Radio} from 'element-ui'
import '@/config/rem'
import axiosPlugin from '@/server'
// 引入mockjs
require('../../plugins/mock')

Vue.config.productionTip = false;
Vue.use(axiosPlugin);
// Vue.use(Radio);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
