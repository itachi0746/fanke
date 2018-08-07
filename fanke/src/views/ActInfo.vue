<template>
  <!--<div :class="{hide: isHide}" id="actInfo">-->

    <div class="Mask2 actInfo">
      <div class="actInfoHead">
        <ul>
          <li @click="tabSwitch1">活动说明</li>

          <li @click="tabSwitch2">排行榜</li>

          <li @click="tabSwitch3">我的奖品</li>

        </ul>

        <img @click="goBack" class="close" src="../assets/close.png"/>

      </div>
      <keep-alive>     <!--使用keep-alive会将页面缓存-->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>
  <!--</div>-->
</template>

<script>
  import {EventBus} from '../eventBus/eventBus'

  export default {
  data: function () {
    return {
//      isHide: true
    }
  },
//
//  components: {},
//
//  computed: {},
//
  methods: {
    goBack: function () {
      this.$router.go(-1);
      EventBus.$isActInfo = false;
//      console.log('actinfo')
    },
    tabSwitch1: function () {  // replace() 不在浏览器留下历史记录
      this.$router.replace('actDesc')
    },
    tabSwitch2: function () {
      this.$router.replace('actRank')
    },
    tabSwitch3: function () {
      this.$router.replace('actAward')
    }
  }
//
//  mounted: function() {},
//
//  beforeDestroy: function() {}
}
</script>

<style>
  .Mask2 {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: absolute;
    top: 0;
    left: 0;

  }
  .actInfo,.Mask2 {
    z-index: 40;
  }
  .actInfoHead {
    color: #ffffff;
    font-size: 0.8rem;
    margin: 2rem 1rem 0 1rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #ffffff;
    position: relative;
  }
  .actInfoHead ul {
    /*overflow: hidden;*/
  }
  .actInfoHead li {
    float: left;
    width: 5rem;
    color: #ffffff;
    /*padding: 0.5rem 0;*/
    text-align: center;
  }
  .actInfoHead li:nth-child(2) {
    border-left: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
  }
  .close {
    width: 1.5rem;
    position: relative;
    top: -0.2rem;
    /*float: right;*/
  }
  .poupSlideBar {
    position: absolute;
    /*left: 0;*/
    width: 5rem;
    top: 0;
  }
  .slideBarTip {
    height: 3px;
    max-width: 5rem;
    background: #fff;
  }
  .slideBarTip::after {
    content: '';
    position: absolute;
    left: 0rem;
    bottom: 0;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
    border-bottom: .45rem solid #fff;
    width: 0;
    right: 0;
    margin: auto;
  }

</style>
