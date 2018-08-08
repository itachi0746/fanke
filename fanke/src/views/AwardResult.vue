<template>
  <div class="Mask2 awardResult">
    <!--中奖-->
    <div class="result-gift" v-if="winPrize">
      <div class="successBg"></div>
      <h3>恭喜你获得了</h3>
      <div class="giftImg">
        <img v-lazy="img2"/>

      </div>
      <p style="font-size: .95rem;
    line-height: 1.65rem;
    color: #ffdb12;">{{ prizeData.PrizeName }}</p>
      <h3>{{ prizeData.PrizeDesc }}</h3>

      <div class="resule-gift-buttonMenu">

        <div class="giftBtnBox lookDetail">
          <router-link to="/gamePage/awardResult/actInfo" class="seeAwardDetail buttonContent">
            查看奖品详情
          </router-link>
        </div>

        <router-link to="/home">
          <div class="menuBack" @click="">
            返回首页
          </div>
        </router-link>

      </div>
    </div>

    <!--没中奖-->
    <div class="result-nogift" v-else>
      <div class="nogiftImg">
        <img v-lazy="img1"/>
      </div>

      <div class="resule-gift-buttonMenu">
        <router-link to="/gamePage/shake">
          <div class="repeatDraw">
            继续抽奖
          </div>
        </router-link>
        <br>
        <router-link to="/home">
          <div class="menuBack" @click="">返回首页</div>
        </router-link>

        <!--<div>-->
        <!--<a class="followBtn">关注我们</a>-->
        <!--</div>-->
      </div>

    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import {EventBus} from '../eventBus/eventBus';

  export default {
    data: function () {
      return {
        winPrize: false,
        prizeData: {},
        img1: require('../assets/faiImg2-2.png'),
        img2: require('../assets/gift.png')

      }
    },
//
//  components: {},
//
//  computed: {},
//
    methods: {

    },

    beforeCreate() {
//      this.winPrize = this.$router.params.winPrize;
//      this.prizeData = this.$router.params.prizeData;
    },

    created() {
      console.log(this.$route.params)

      this.winPrize = this.$route.params.winPrize;  // 是否中奖
      this.prizeData = this.$route.params.prizeData;  // 中奖的数据
    }
//
//  beforeDestroy: function() {}
  }
</script>

<style>
  .Mask2 {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;

  }

  .result-gift {
    padding-top: 4rem;
    position: relative;
    z-index: 30;
    text-align: center;
    color: #ffffff;

  }

  .result-nogift {
    padding-top: 2rem;
    position: relative;
    z-index: 300;
    text-align: center;
    color: #ffffff;
    /*display: none;*/

  }

  .result-nogift img {
    width: 15rem;

  }

  .successBg {
    top: -3rem;
    width: 15rem;
    height: 15rem;
    background-image: url('../assets/light.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: 15;
    border-radius: 50%;
    left: 50%;
    margin-left: -7.5rem;
    -webkit-animation: bgRotate 5s linear infinite;
    animation: bgRotate 5s linear infinite;
  }

  .awardResult {
    display: block;
  }

  .awardResult .successBg {
    top: 3rem;

  }

  .giftImg {
    position: relative;
    margin-top: 2rem;
    margin-bottom: 2rem;
    z-index: 20;
  }

  .nogiftImg {
    position: relative;
    margin-top: 2rem;
    margin-bottom: 2rem;
    z-index: 20;
  }

  .giftImg img {
    width: 5.5rem;
  }

  .resule-gift-buttonMenu {
    margin-top: 3rem;
    color: #fff;
    position: relative;
    z-index: 20;
  }

  .resule-gift-buttonMenu .menuBack {
    width: 10rem;
    height: 2rem;
  }

  .giftBtnBox {
    width: 10rem;
    height: 2rem;
    line-height: 2rem !important;
    background: #41bd43;
    border-radius: .2rem;
    margin: 0 auto .5rem;
  }

  .giftBtnBox {
    width: 10rem;
    height: 2rem;
    line-height: 2rem !important;
    background: #41bd43;
    border-radius: .2rem;
    margin: 0 auto .5rem;
  }

  .menuBtnBox .menuName, .giftBtnBox .buttonContent {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .giftBtnBox .buttonContent {
    color: #fff;
    line-height: 2rem;
    font-size: 0.8rem;
  }

  .repeatDraw {
    font-size: 0.8rem;
    /*display: inline-block;*/
    background: #fe8208;
    /*left: 3rem;*/
    /*right: auto;*/
    width: 10rem;
    line-height: 2rem;
    height: 2rem;
    margin: 0 auto;
    -webkit-border-radius: 0.2rem;
    -moz-border-radius: 0.2rem;
    border-radius: 0.2rem;
    /*margin-bottom: .5rem;*/
    color: #fff;
  }

  .menuBack {
    font-size: 0.8rem;
    display: inline-block;
    width: 5rem;
    height: 2rem;
    line-height: 2rem !important;
    background: #41bd43;
    border-radius: .2rem;
    margin-bottom: .5rem;
    color: #fff;
  }

  .followBtn {
    display: inline-block;
    width: 10.2rem;
    height: 2rem;
    line-height: 2rem;

    background: #41bd43;
    border-radius: .2rem;
    font-size: 0.8rem;

  }

  @-webkit-keyframes bgRotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes bgRotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
