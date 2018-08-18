// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './orderConfirm.vue'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/message.css';
import '@/config/rem'
import axiosPlugin from '@/server'



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
