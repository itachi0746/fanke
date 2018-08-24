
// 全局事件
import Vue from 'vue';
export const EventBus = new Vue({
  data() {
    return {
      userLogoDefault: require('../assets/manImg.jpg'),
      userData: {}
    }
  }
});
