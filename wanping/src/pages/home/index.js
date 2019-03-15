// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
// import {Carousel, CarouselItem} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/carousel-item.css';
// import 'element-ui/lib/theme-chalk/carousel.css';
import 'element-ui/lib/theme-chalk/message.css';
import '@/config/rem'
import '@/style/font/iconfont.css'
import axiosPlugin from '@/server'

// 引入mockjs
// require('../../plugins/mock');


Vue.config.productionTip = false;
Vue.use(axiosPlugin);
// Vue.use(Carousel).use(CarouselItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
