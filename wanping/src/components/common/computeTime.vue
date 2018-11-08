<template>
  <div class="page">
        <span class="rem_time" style="color: orange;border-width: 1px;border-style: solid;border-color: orange;"
              @click.stop="gotoPay" v-show="orderStateVal">
	       {{remaining}}
        </span>
        <span class="rem_time" style="color: orange;border-width: 1px;border-style: solid;border-color: orange;"
              @click.stop="" v-show="!orderStateVal">
	       已完成
        </span>
        <!--<span class="rem_time" style="color: red;border-width: 1px;border-style: solid;border-color: red;margin-left:.5rem;"-->
              <!--@click.stop="buyAgain" v-show="!orderStateVal">-->
	       <!--再次购买-->
        <!--</span>-->
  </div>
</template>

<script>
  import {MessageBox} from 'element-ui'

  export default {
    data() {
      return {
        countNum: 0,  // 订单有效剩余时间
        time: 0  // 已经过时间
      }
    },
    mounted() {
      this.countNum = this.timeData.RemainSeconds;  // 剩余时间
      this.remainingTime();
    },
    props: ['timeData'],
    methods: {

      //计算时间
      remainingTime() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.countNum--;
          if (this.countNum <= 0) {
            clearInterval(this.timer);
            console.log('支付超时')
//            MessageBox.alert('支付超时', '提示', {
//              confirmButtonText: '确定',
//            })
          }
        }, 1000);
      },
      /**
       * @method 去支付
       */
      gotoPay() {
        if(this.countNum > 0) {
          GoToPage('','/mall/PayOrder',{'id':this.timeData.OrderId})
        }
      },
      /**
       * @method 再次购买
       */
//      buyAgain() {
//        GoToPage('','/mall/PayOrder',{'id':this.timeData.OrderId})
//
//      }
    },
    computed: {
      //转换时间成分秒
      remaining() {
        if(this.countNum > 0) {
          let minute = parseInt(this.countNum / 60);
          let second = parseInt(this.countNum % 60);
          if (minute < 10) {
            minute = '0' + minute;
          }
          if (second < 10) {
            second = '0' + second;
          }
          return '去支付(还剩' + minute + '分' + second + '秒)';
        } else {
          return '支付超时';
        }
      },
      //订单返回已使用时间秒分 分别处理
      numTime() {
        if (this.time.toString().indexOf('分钟') !== -1) {
          return parseInt(this.time) * 60;
        } else {
          return parseInt(this.time);
        }
      },
      //支付状态
      orderStateVal() {
        return this.timeData.OrderStatusVal === 'BD0901'
      }
    },
//
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .page {
    display: inline-block;
    .rem_time {
      @include sc(.55rem, orange);
      padding: .1rem .2rem;
      border-radius: .15rem;
    }
  }
</style>
<style>
  .el-message-box {
    width: 90%;
  }

</style>
