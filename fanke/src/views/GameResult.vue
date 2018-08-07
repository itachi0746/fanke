<template>
  <div :class="{Mask:true, gameResult:true, hide:isHide}">
    <!--挑战成功-->
    <div class="resultBox isSuccess" v-if="isSuccess">
      <div class="successBg"></div>
      <div class="optContainer">
        <img class="manImg" src="../assets/manImg.jpg"/>
        <img src="../assets/success.png"/>
        <p>您的成绩为: {{Score}} 分</p>
        <p>{{Desc}}</p>
        <p>最佳成绩为: {{BestScore}}分</p>
        <p>最佳排名为: NO.{{Rank}}</p>
        <p>今天还有 {{PrizeChance}} 次抽奖机会</p>
        <router-link to="/gamePage/shake">
          <div class="result-button main-btn">
            赶紧去抽奖
          </div>
        </router-link>

        <div class="buttonBox">
          <router-link to="/gamePage/gameResult/actInfo/actRank">
            <div class="result-button rank-btn" @click="">
              排行榜
            </div>
          </router-link>
          <router-link :to="{name: 'gamePage'}">
            <div class="result-button home-btn">
              再玩一次
            </div>
          </router-link>

        </div>
      </div>
    </div>
    <!--挑战失败-->
    <div class="resultBox isFail" v-else>
      <div class="failBg"></div>
      <div class="optContainer">
        <img class="manImg" src="../assets/manImg.jpg"/>
        <img src="../assets/fail.png"/>
        <p>您的成绩为: {{Score}} 分</p>
        <p>{{Desc}}</p>
        <p>最佳成绩为: {{BestScore}}分</p>
        <p>最佳排名为: NO.{{Rank}}</p>
        <router-link to="/gamePage">
          <div class="result-button main-btn" @click="">
            再玩一次
          </div>
        </router-link>
        <div class="buttonBox">
          <router-link to="/gamePage/gameResult/actInfo/actRank">
            <div class="result-button rank-btn" @click="">
              排行榜
            </div>
          </router-link>
          <router-link to="/home">
            <div class="result-button home-btn">
              返回首页
            </div>
          </router-link>

        </div>
      </div>

    </div>

    <router-view></router-view>

  </div>
</template>

<script>
  //  import {EventBus} from '../eventBus/eventBus'


  export default {
    data: function () {
      return {
        isSuccess: false,  // 是否挑战成功
        BestScore: 0,
        Desc: "",
        PrizeChance: 0,
        Rank: 0,
        Score: 0,
        isHide: true
      }
    },
//
//  components: {},
//
//  computed: {},
//
    methods: {},
//    created() {
//
//    },
//
    created: function () {
      const url = '/exam/ExamResult';

      this.$http({
        method: 'post',
        url: url,
//      data: {
//        data
//      }

      }).then(res => {
        console.log(res.data, '请求成功');
        let data = res.data.Data;

        this.BestScore = data.BestScore;
        this.Desc = data.Desc;
        this.PrizeChance = data.PrizeChance;
        this.Rank = data.Rank;
        this.Score = data.Score;
        this.Score >= 80 ? this.isSuccess = true : this.isSuccess = false;

        this.isHide = false;
      }).catch(err => {
        console.log(err, '请求错误');
      })
    },
//
//  beforeDestroy: function() {}
  }
</script>

<style>
  .gameResult, .Mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
  }

  .hide {
    display: none;
  }

  .resultBox {
    padding-top: 1rem;
    width: 100%;
    text-align: center;
  }

  .resultBox a {
    color: #ffffff;
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

  .failBg {
    width: 4rem;
    height: 3rem;
    background-image: url('../assets/bird.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 1rem;
    right: 0;
    z-index: 35;
    -webkit-animation: fly 4s linear;
    animation: fly 4s linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;

  }

  .optContainer {
    font-size: .7rem;
    line-height: 1rem;
    text-align: center;
    height: 25rem;
    overflow-y: auto;
    position: relative;
    z-index: 30;
    color: #ffffff;
    width: 90%;
    margin: 0 auto;
  }

  .optContainer p:nth-child(3) {
    font-size: 0.9rem;
  }

  .optContainer p:nth-child(4) {
    margin-bottom: 0.8rem;
  }

  .optContainer p:nth-child(6) {
    margin-bottom: 0.8rem;
  }

  .optContainer p:nth-child(7) {
    font-size: 0.7rem;
  }

  .optContainer p {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }

  .isSuccess .manImg {
    border: .4rem solid #70d572;
    border-radius: 50%;

  }

  .isFail .manImg {
    border: .4rem solid #b5b5b6;
    border-radius: 50%;

  }

  .optContainer img:nth-child(2) {
    width: 90%;
  }

  .result-button {
    height: 2rem;
    line-height: 2rem;
    font-size: 0.8rem;
    border-radius: .2rem;
  }

  .main-btn {
    width: 80%;
    background-color: #fe8208;
    margin: 0.5rem auto;
  }

  .rank-btn {
    width: 48%;
    background: #41bd43;
    display: inline-block;
    float: left;
  }

  .home-btn {
    width: 48%;
    background: #41bd43;
    display: inline-block;
    float: right;
  }

  .buttonBox {
    margin: 0.5rem auto;
    width: 80%;
    overflow: hidden;
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

  @-webkit-keyframes fly {
    0% {
      right: -4rem;
    }

    100% {
      right: 15rem;
    }
  }

  @keyframes fly {
    0% {
      right: -4rem;
    }

    100% {
      right: 20rem;
    }
  }
</style>
