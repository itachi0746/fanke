// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './orderConfirm.vue'

import 'element-ui/lib/theme-chalk/message.css';
import '@/config/rem'
import '@/style/font/iconfont.css'
import axiosPlugin from '@/server'

import Collapse from 'vant/lib/Collapse';
import CollapseItem from 'vant/lib/Collapse-Item';
import Radio from 'vant/lib/Radio';
import RadioGroup from 'vant/lib/Radio-Group';
import CellGroup from 'vant/lib/Cell-Group';
import Cell from 'vant/lib/Cell';
// import Icon from 'vant/lib/Icon';

import 'vant/lib/Collapse/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/Radio/style';
import 'vant/lib/Radio-Group/style';
import 'vant/lib/Cell-Group/style';
import 'vant/lib/Cell/style';
// import 'vant/lib/Icon/style';
// 引入mockjs
// require('../../plugins/mock');

Vue.config.productionTip = false;
Vue.use(axiosPlugin);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(CellGroup);
Vue.use(Cell);
// Vue.use(Icon);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
