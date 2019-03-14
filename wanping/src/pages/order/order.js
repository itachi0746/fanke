// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './order.vue';
import '../../config/rem';
import '@/style/font/iconfont.css';
// import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/message-box.css';
import 'element-ui/lib/theme-chalk/button.css';
// import {Button,Dialog,MessageBox} from 'element-ui';

// import router from './router'
// import axios from 'axios'

// Vue.use(Button);
// Vue.use(Dialog);
Vue.config.productionTip = false;
// axios.defaults.baseURL = process.env.BASE_URL;  // 请求的默认URL
// Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
