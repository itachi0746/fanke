<template>


  <!--首页-->
  <div class="homePage">
    <div class="bg1"></div>
    <RuleImg></RuleImg>
    <TitleImg></TitleImg>
    <WinningList></WinningList>
    <StartBtn></StartBtn>

    <router-view></router-view>
  </div>

</template>

<script>
  import RuleImg from '../components/RuleImg'
  import TitleImg from '../components/TitleImg'
  import StartBtn from '../components/StartBtn'
  import WinningList from '../components/WinningList'
  import {EventBus} from '../eventBus/eventBus'


  export default {
    data: function () {
      return {
//        userData:[]
      }
    },
//
    components: {
      RuleImg,
      TitleImg,
      StartBtn,
      WinningList
    },
//
//  computed: {},
//
    methods: {

    },

    mounted() {
      EventBus.$isActInfo = true;

      // 请求用户信头像,名字
      const url = '/account/getUserInfo';
      this.$http({
        url: url,
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
        console.log(res.data, '请求用户数据成功');
        EventBus.userData = res.data.Data

      }).catch(err => {
        console.log(err, '请求错误');
//        alert('出错啦')

      });

//      console.log($)

    },

    beforeDestroy: function () {
      console.log('home beforeDestroy');

    }
  }
</script>

<style>
  .homePage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .bg1 {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99;
    background: url('../assets/bg1.jpg') no-repeat;
    background-size: 100% 100%;
  }

</style>
