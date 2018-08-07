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
      return {}
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
    methods: {

    },

    mounted() {
      EventBus.$isActInfo = true;

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
