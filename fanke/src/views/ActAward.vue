<template>
  <div style="position: relative;">
    <div class="poupMainInfo actAward" id="poupMainInfo">
      <ul id="awardInfoBox">
        <!--<li class="codeInfoBox" @click="" v-for="(prize, index) in prizeData" :key="index">-->
          <!--<div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">-->
            <!--<p class="awardStyle">{{ prize.PrizeName }}：</p>-->
            <!--<p class="awardName">{{ prize.PrizeDesc }}</p>-->
            <!--<p class="awardTime">{{ prize.PrizeDate }}</p>-->
          <!--</div>-->
        <!--</li>-->

        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
        <li class="codeInfoBox">
          <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
            <p class="awardStyle">111111</p>
            <p class="awardName">222222</p>
            <p class="awardTime">333333</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="line2">
      <div class="line"></div>
    </div>


  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data: function () {
      return {
        prizeData: []
      }
    },

//
    created() {

      // 请求我的奖品
//      const url = '/exam/MyPrize';
//      this.$http({
//        url: url,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
//        method: 'post',//请求方式
//        //这里可以添加axios文档中的各种配置
//      }).then(res => {
//        console.log(res.data, '请求奖品数据成功');
//        this.prizeData = res.data.Data
//
//        //即定时器 20ms
//        this.$nextTick(() => {
//          //$refs绑定元素
//          if (!this.scroll) {
//            this.scroll = new BScroll('#poupMainInfo', {
//              //开启点击事件 默认为false
//              click: true
//            });
//
//          }
//        });
//      }).catch(err => {
//        console.log(err, '请求错误');
////        alert('出错啦')
//
//      });
    },
    mounted() {
      this.$nextTick(() => {
        //$refs绑定元素
        if (!this.scroll) {
          this.scroll = new BScroll('#poupMainInfo', {
            //开启点击事件 默认为false
            click: true
          });
          this.scroll.refresh();
          console.log(this.scroll);

        }
      });

    }

  }
</script>

<style>
  .actInfoBody {
    color: #ffffff;
    font-size: 0.7rem;
    padding: 0 1rem;
    position: relative;
  }

  #awardInfoBox {
    /*height: 16.5rem;*/
    /*overflow-y: auto;*/
    font-size: .6rem;
    margin-top: .2rem;
    position: relative;

  }

  .codeInfoBox {
    width: 13.3rem;
    height: 4.5rem;
    border: .1rem solid #fff;
    border-radius: .2rem;
    margin: 1.05rem auto;
    position: relative;
    padding-top: .8rem;
  }

  /*.goDetailIcon {*/
    /*width: .875rem;*/
    /*height: 1.75rem;*/
    /*background: url('../assets/kqjt.png') no-repeat;*/
    /*background-size: 100%;*/
    /*position: absolute;*/
    /*top: 1rem;*/
    /*right: .5rem;*/
  /*}*/

  .codeInfoBox .djqImgBox {
    width: 1.75rem;
    height: 1.625rem;
    background: url('../assets/djq.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: -2px;
    left: -2px;
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .poupMainInfo.actAward {
    height: 25.25rem;
    /*position: relative;*/
    overflow-y: auto;
    /*top: 0;*/
    /*bottom:5rem;*/
    color: #ffffff;
    font-size: 0.7rem;
    padding: 0 1rem;
  }

  .actAward .poupSlideBar {
    left: 11rem;

  }

  .awardTime {
    margin-top: .5rem;
  }

  .line2 {
    position: absolute;
    left: 11rem;
    width: 5rem;
    top: 0;
  }

  .line {
    height: 3px;
    max-width: 5rem;
    background: #fff;
  }

  .line::after {
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
