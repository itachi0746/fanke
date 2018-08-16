// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './screen.vue'
import 'font-awesome/css/font-awesome.min.css'
import {Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/config/rem'
import axiosPlugin from '@/server'
// import router from './router'


Vue.config.productionTip = false;
Vue.use(axiosPlugin);
Vue.use(Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
