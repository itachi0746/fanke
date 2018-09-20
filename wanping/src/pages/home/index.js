// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/message.css';
import '@/config/rem'
import axiosPlugin from '@/server'
import $ from 'jquery'

// 引入mockjs
require('../../plugins/mock');


Vue.config.productionTip = false;
Vue.use(axiosPlugin);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
