<template>


  <!--首页-->
  <div class="homePage">
    <div class="bg1"></div>
    <RuleImg></RuleImg>
    <TitleImg></TitleImg>
    <StartBtn></StartBtn>
    <router-view></router-view>
  </div>

</template>

<script>
  import RuleImg from '../components/RuleImg'
  import TitleImg from '../components/TitleImg'
  import StartBtn from '../components/StartBtn'
  import {EventBus} from '../eventBus/eventBus'


  export default {
    data: function () {
      return {
      }
    },
//
    components: {
      RuleImg,
      TitleImg,
      StartBtn
    },
//
//  computed: {},
//
//  methods: {}
//
    mounted() {
      EventBus.$isActInfo = true;

      window.addEventListener("popstate", function (e) {
        console.log('我监听到了浏览器的返回按钮事件啦');

        let userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {



          // Vue.prototype.$isActInfo ? '' : WeixinJSBridge.call('closeWindow')
          if (EventBus.$isActInfo) {
            console.log('关闭网页', EventBus.$isActInfo)

            // console.log(EventBus.$isActInfo)

            WeixinJSBridge.call('closeWindow');
          } else {
            console.log('不关闭网页', EventBus.$isActInfo)
            EventBus.$isActInfo = true;

            // console.log(EventBus.$isActInfo)

          }
          // WeixinJSBridge.call('closeWindow');  // 微信浏览器关闭当前页面
        } else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
          window.opener = null;
          window.open('about:blank', '_self', '').close();
          console.log(222)
        } else {

          console.log(333)
        }

      }, false);
    }

//  beforeDestroy: function() {
//    console.log('home beforeDestroy')
//
//  }
  }
</script>

<style>
  .homePage {
    position: relative;
    width: 100%;
    height: 100%;

  }

  .bg1 {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99;
    background: url('../assets/bg1.png') no-repeat;
    background-size: 100% 100%;
  }

</style>
