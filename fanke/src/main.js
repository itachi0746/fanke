// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import VueLazyload from 'vue-lazyload'
import animate from 'animate.css'
import {EventBus} from './eventBus/eventBus'

const err = require('./assets/error.png');
const ld = require('./assets/loading2.gif');

// 添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: err,
  loading: ld,
  attempt: 1
});

Vue.config.productionTip = false;

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
  axios.defaults.baseURL = "/api"
} else {
  //生产环境下的地址
  axios.defaults.baseURL = "";
}

//响应拦截
// axios.interceptors.response.use(
//
//   error => {
//     // error 的回调信息
//     alert('出错啦');
//     // error.message = '请求错误啊';
//     return Promise.resolve(error);
//   }
// );

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;

/* eslint-disable no-new */
let myVue = new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router,

  methods: {
    postData(url, data) {
      this.$http({
        method: 'post',
        url: url,
        data: {
          data
        }
      })
    },
    _handler() {
      console.log('我监听到了浏览器的返回按钮事件啦');

      let userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") !== -1 || userAgent.indexOf("Chrome") !== -1) {

        if (EventBus.$isActInfo) {
          // console.log('关闭网页', EventBus.$isActInfo);

          WeixinJSBridge.call('closeWindow');
        } else {
          // console.log('不关闭网页', EventBus.$isActInfo);
          EventBus.$isActInfo = true;

        }
      } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
        window.opener = null;
        window.open('about:blank', '_self', '').close();
        console.log(222)
      } else {
        console.log(333)
      }
    }

  },


});

// console.log('myVue',myVue,myVue._handler)
window.addEventListener("popstate", myVue._handler, false);


