<template>
  <div class="Mask2 yao">
    <audio id="yao" ref="yao" :src="YAOsrc"></audio>
    <img id="yaoImg" :class="{animated:true,shake:isShake}" src="../assets/yao.png"/>
    <!--<div class="loadingPage" v-show="isLoading">-->
    <!--<img src="../assets/loading.gif" alt="loading">-->
    <!--</div>-->
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {
        lastTime: 0,//此变量用来记录上次摇动的时间
        //此组变量分别记录对应x、y、z三轴的数值和上次的数值
        x: 0,
        y: 0,
        z: 0,
        lastX: 0,
        lastY: 0,
        lastZ: 0,
        shakeSpeed: 1500,//设置阈值
        winPrize: false,
        prizeData: {},
        isShake: false,
        YAOsrc: require('../assets/music/yyy.mp3'),
        yao: null,
      }
    },

//
//  components: {},
//
//  computed: {},
//
    methods: {
      _shake: function (eventDate) {
        let acceleration = eventDate.accelerationIncludingGravity;//获取设备加速度信息
        let nowTime = new Date().getTime();//记录当前时间
        //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
        if (nowTime - this.lastTime > 100) {
          let diffTime = nowTime - this.lastTime;//记录时间段
          this.lastTime = nowTime;//记录本次摇动时间，为下次计算摇动时间做准备
          this.x = acceleration.x;//获取x轴数值，x轴为垂直于北轴，向东为正
          this.y = acceleration.y;//获取y轴数值，y轴向正北为正
          this.z = acceleration.z;//获取z轴数值，z轴垂直于地面，向上为正
          //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
          let speed = Math.abs(this.x + this.y + this.z - this.lastX - this.lastY - this.lastZ) / diffTime * 10000;
          if (speed > this.shakeSpeed) {//如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
            //这里就是放置如果用户成功的摇一摇，将要触发的事件，例如提示摇到了谁，摇到了多少金币等等
            this.shakeAction();

          }
          this.lastX = this.x;//赋值，为下一次计算做准备
          this.lastY = this.y;//赋值，为下一次计算做准备
          this.lastZ = this.z;//赋值，为下一次计算做准备
        }
      },

      test() {
        this.shakeAction()
      },


      shakeAction() {
        if (!this.isShake) {  // 开关 避免重复触发摇一摇
          this.$refs.yao.play();
          this.isShake = true;

          this.timer = setTimeout(() => {
            this.$router.replace({name: 'awardResult', params: {winPrize: this.winPrize, prizeData: this.prizeData}});

          }, 2000)

        }

      },

      addEvent() {

        if (window.DeviceMotionEvent) {//判断设备是否支持运动传感事件。

          window.addEventListener('devicemotion', this._shake, false);//如果支持，那么就绑定shake方法到事件上
        } else {
          alert('本设备不支持摇一摇功能, 将自动为您抽奖');
          this.shakeAction()
        }
      }

    },
    created() {

//        this.$refs.yao.load();


    },
    mounted() {
//      this.yao = document.querySelector('#yao');
      this.winPrize = this.$route.params.drawData.Success;  // 是否中奖
//
      this.prizeData = this.$route.params.drawData.Data;  // 中奖的数据
//      this.doDraw()
      this.addEvent()
//      this.test();

    },

  }
</script>

<style>
  /*.loadingPage {*/
  /*background: rgba(0, 0, 0, 0.5);*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*background-size: 100% 100%;*/
  /*top: 0;*/
  /*left: 0;*/
  /*position: absolute;*/

  /*}*/

  /*.loadingPage img {*/
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*margin: auto;*/
  /*}*/
  #yaoImg {
    width: 15rem;
    position: absolute;
    top: 5rem;
    left: 50%;
    margin-left: -7.5rem;

  }

  .Mask2 {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;

  }

  @-webkit-keyframes _headShake {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }

    6.5% {
      -webkit-transform: translateX(-12px) rotateY(-15deg);
      transform: translateX(-12px) rotateY(-15deg);
    }

    18.5% {
      -webkit-transform: translateX(10px) rotateY(13deg);
      transform: translateX(10px) rotateY(13deg);
    }

    31.5% {
      -webkit-transform: translateX(-7px) rotateY(-9deg);
      transform: translateX(-7px) rotateY(-9deg);
    }

    43.5% {
      -webkit-transform: translateX(5px) rotateY(7deg);
      transform: translateX(5px) rotateY(7deg);
    }

    50% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }

  @keyframes _headShake {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }

    6.5% {
      -webkit-transform: translateX(-6px) rotateY(-9deg);
      transform: translateX(-6px) rotateY(-9deg);
    }

    18.5% {
      -webkit-transform: translateX(5px) rotateY(7deg);
      transform: translateX(5px) rotateY(7deg);
    }

    31.5% {
      -webkit-transform: translateX(-3px) rotateY(-5deg);
      transform: translateX(-3px) rotateY(-5deg);
    }

    43.5% {
      -webkit-transform: translateX(2px) rotateY(3deg);
      transform: translateX(2px) rotateY(3deg);
    }

    50% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }

  ._headShake {
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-name: _headShake;
    animation-name: _headShake;
  }
</style>
