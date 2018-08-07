<template>
  <div class="actInfoBody actAward">
    <div class="poupMainInfo">
      <div id="awardInfoBox">

        <div id="awardInfo" v-for="(prize, index) in prizeData" :key="index">
          <div id="codeInfo0" class="codeInfoBox" @click="">
            <!--<div class="goDetailIcon"></div>-->
            <!--<div class="djqImgBox"></div>-->
            <div class="isEmptyAward ellipsis" style="width: 11rem;margin-left:0.6rem;font-size:0.7rem;">
              <p class="awardStyle">{{ prize.PrizeName }}：</p>
              <p class="awardName">{{ prize.PrizeDesc }}</p>
              <p class="awardTime">{{ prize.PrizeDate }}</p>
            </div>
            <!--<div class="noPartnersBox ">-->
              <!--<div class="codeperiod" style="margin: 0.25rem 0.6rem;line-height:1.4rem;"><span-->
                <!--class="awardTypeName">兑奖期限</span>：<span class="awardBgTime">2018.06.27</span> 至 <span-->
                <!--class="awardEndTime">2018.07.04</span></div>-->
              <!--&lt;!&ndash;<div style="color: #ecb208;margin-left:0.6rem;">未核销</div>&ndash;&gt;-->
            <!--</div>-->
          </div>
        </div>

      </div>

    </div>
    <div class="poupSlideBar">
      <div class="slideBarTip"></div>
    </div>

    <router-view></router-view>
  </div>

</template>

<script>

  export default {
    data: function () {
      return {
        prizeData: []
      }
    },
//
//  components: {},
//
//  computed: {},
//
    methods: {
//      toAwardDetail: function () {
//        this.$router.push('/home/actInfo/actAward/awardDetail')
//      }
    },
//
    mounted() {
      // 请求我的奖品
      const url = '/exam/MyPrize';
      this.$http({
        url: url,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
        console.log(res.data, '请求奖品数据成功');
        this.prizeData = res.data.Data

      }).catch(err => {
        console.log(err, '请求错误');
      });
    },

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
    overflow-y: auto;
    font-size: .6rem;
    margin-top: .2rem;
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

  .goDetailIcon {
    width: .875rem;
    height: 1.75rem;
    background: url('../assets/kqjt.png') no-repeat;
    background-size: 100%;
    position: absolute;
    top: 1rem;
    right: .5rem;
  }

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

  .poupMainInfo {
    height: 24rem;
    overflow-y: auto;
  }

  .actAward .poupSlideBar {
    left: 11rem;

  }
  .awardTime {
    margin-top: .5rem;
  }

</style>
