// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './screen.vue'
import BaiduMap from 'vue-baidu-map'
import {Button,Switch,Row,Col} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/message-box.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/switch.css';
import 'element-ui/lib/theme-chalk/row.css';
import 'element-ui/lib/theme-chalk/col.css';

import '@/config/rem'
import '@/style/font/iconfont.css'
import axiosPlugin from '@/server'
// import router from './router'


Vue.config.productionTip = false;
Vue.use(axiosPlugin);
Vue.use(Button).use(Switch).use(Row).use(Col);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '8jmD3Hhd9QLXWtBcS2GyYcGF4zxDPdTG'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
