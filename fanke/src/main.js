// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import VueLazyload from 'vue-lazyload'
import animate from 'animate.css'
import 'element-ui/lib/theme-chalk/message.css';
// import {Message} from "element-ui/";

import {Message} from "element-ui";

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
  axios.defaults.baseURL = "/api"
} else {
  //生产环境下的地址
  axios.defaults.baseURL = "/api";
}
axios.defaults.timeout = 10000;

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    // if (res.data && !res.data.Success) {
    //   Message({
    //     //  饿了么的消息弹窗组件,类似toast
    //     showClose: true,
    //     message: res.data.ErrMsg,
    //     type: "error"
    //   });
    //   // alert(res.data.ErrMsg);
    //   return Promise.reject(res.data.ErrMsg);
    // }
    return res;
  },
  error => {

    // 返回 response 里的错误信息
    // console.log(error.response)
    let errRes = error.response;
    let msg = errRes.status + ':' + errRes.statusText;
    // error 的回调信息
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: msg,
      type: "error"
    });
    return Promise.reject(msg);
  }
);

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
        // window.open('about:blank', '_self', '').close();
        console.log(222)

        WeixinJSBridge.call('closeWindow');
      } else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
        console.log(333)
        if (EventBus.$isActInfo) {
          console.log('关闭网页', EventBus.$isActInfo);

          WeixinJSBridge.call('closeWindow');
        } else {
          console.log('不关闭网页', EventBus.$isActInfo);
          EventBus.$isActInfo = true;

        }
      } else {
        console.log(444)
        window.open('about:blank', '_self', '').close();

      }
    }

  },


});

// console.log('myVue',myVue,myVue._handler)
window.addEventListener("popstate", myVue._handler, false);


