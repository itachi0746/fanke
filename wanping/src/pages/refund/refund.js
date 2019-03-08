// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './refund.vue'
import {Button} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import '@/config/rem'
import '@/style/font/iconfont.css'
import axiosPlugin from '@/server'
import router from './router';

Vue.config.productionTip = false;
Vue.use(axiosPlugin);
Vue.use(Button);
// Vue.use(Input);


// axios.defaults.baseURL = process.env.BASE_URL;  // 请求的默认URL
// Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // 一定要小写
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
