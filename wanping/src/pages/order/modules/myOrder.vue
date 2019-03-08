<template>
  <!--  开始-->
  <div class="myOrder">
    <Header :headName="headName" @headerHeight="getHeight" :a="oktoGetH"></Header>
    <div class="wrapper" id="wrapper" ref="wrapper">
      <ul class="order_list_ul" v-if="orderArr.length">
        <li class="order_list_li" v-for="(order,index) in orderArr" :key="order.OrderId"
            @click="toOrderDetail($event,order.RefundStatus,order.PaySign)" :id="order.OrderId">
          <section class="order_item_right">
            <section>
              <header class="order_item_right_header">
                <section class="order_header">
                  <h4><span class="ellipsis">{{order.OrderNo}} </span>
                    <i class="icon iconfont icon-youjiantou1"></i>
                  </h4>
                  <p class="order_time">{{order.OrderDate}}</p>
                </section>
                <p class="order_status" v-if="order.RefundStatus">
                  {{order.RefundStatusText}}
                </p>
                <p class="order_status" v-else>
                  {{order.OrderStatus}}
                </p>
              </header>
              <section class="order_basket" v-for="(item) in order.Items">
                <div class="order_img_box">
                  <img class="order_img" :src="item.Img" alt="">
                </div>
                <div class="order_data">
                  <div>
                    <p class="order_name ellipsis">
                      {{item.BusinessName}}
                    </p>
                    <p class="order_name2">{{item.PsName}}</p>
                  </div>
                  <div>
                    <p class="order_amount">¥{{item.Price}}</p>
                    <p class="order_total">×{{item.Total}}</p>
                    <div v-if="order.PaySign">
                      <p class="refund"
                         v-if="order.RefundStatus===null || order.RefundStatus==='BD0909'"
                         @click="clickRefund($event,order.OrderId,item.Price)">退款</p>
                      <p class="refund"
                         v-if="order.RefundStatus!==null && order.RefundStatus!=='BD0909'"
                         @click="clickCheckRefund($event,order.OrderId)">查看退款</p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <div class="order_again">
              <span class="order_sum">合计 ¥{{order.Amount}}</span>
              <ComputeTime :timeData="order"></ComputeTime>
            </div>
          </section>
        </li>
        <li class="empty_data">{{btmFont}}</li>
      </ul>
      <ul v-else>
        <li class="empty-states">
          <span>这里是空的，快去逛逛吧</span>
        </li>
      </ul>

    </div>
    <Loading v-show="isLoading"></Loading>
    <div class="iosBtm" v-if="isIOS"></div>

    <Footer :page="page" @footerHeight="getHeight" :a="oktoGetH"></Footer>
  </div>
  <!--  结束-->
</template>

<script>
  import Footer from '@/components/footer/footer.vue'
  import Header from '@/components/header/header.vue'
  import ComputeTime from '../../../components/common/computeTime.vue'
  import Loading from '../../../components/common/loading.vue'
  import {postData} from '@/server'
  import BScroll from 'better-scroll'
  import {Button,MessageBox,Message} from 'element-ui';

  export default {
    data() {
      return {
        headName: '我的订单',
        page: 'Order',
        orderArr: [],  // 原数组
        pageNum: 0, // 一开始一页
        pageCount: null,  // 最多可以有几页
        loadMoreSwitch: true,
        btmFont: '加载更多',
        isLoading: true,
        WH: null, // 窗口高度
        times: 0,
        oktoGetH: false,

        options: {
          //开启点击事件 默认为false
          click: true,
//            probeType: 3,
          pullUpLoad: {
            threshold: -20 // 当上拉距离超过20px时触发 pullingUp 事件
          },
          scrollbar: {
            fade: true
          }
        }
      }
    },

    components: {
      Header, Footer, ComputeTime, Loading
    },

    computed: {
      isIOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac');
          return true
        }
      }
    },

    methods: {
      /**
       * @method 用窗口高度减去头部脚部高度 计算主要内容wrapper的高度
       * @param {String} h 高度
       */
      getHeight(h) {
        this.times++;
        console.log(h);
        this.WH -= h;
        if (this.times === 2) {
          this.$refs.wrapper.style.height = this.WH + 'px';
        }
      },

      //获取窗口可视范围的高度
      getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
          clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        console.log(clientHeight);
        return clientHeight;
      },
      /**
       * @method 获取数据
       */
      getData() {
        const url = '/GetOrders';
        this.pageNum++;
        const data = {
          pageindex: this.pageNum
        };
        postData(url, data).then((res) => {
          console.log(res);
          this.orderArr = this.orderArr.concat(res.Data.Models);
          this.pageCount = res.Data.PageCount;  // 总页数

          this.btmFont = this.pageNum > this.pageCount ? '没有更多数据了' : '加载更多';
          this.$nextTick(() => {
            this.init_scroll();
          });
          this.oktoGetH = true;
          this.loadMoreSwitch = true;
          this.pageNum === 1 ? this.isLoading = false : ''

        })

      },

      toOrderDetail(event, refundStatus, paySign) {
        const status = paySign;
        if (status) { // 已付款可以去详情
          if(refundStatus===null || refundStatus==='BD0909') { // 没申请退款或者申请退款被拒绝的可以
            const Tindex = event.currentTarget.id;
            GoToPage("orderDetail", "orderDetail.html", {OrderId: Tindex});
          }
        }
      },
      init_scroll() {
        if (!this.scroll) {
          this.scroll = new BScroll('#wrapper', this.options);
        } else {
          this.scroll.refresh();
        }
        this.scroll.on('pullingUp', () => {  // 上拉加载
          if (this.loadMoreSwitch) {
            this.loadMoreSwitch = false;
            if (this.pageNum <= this.pageCount) {
              console.log('加载更多');
              this.btmFont = '加载中...';
              this.getData();
              this.scroll.finishPullUp();
              this.scroll.refresh();
            }
          }
        });
        this.scroll.on('touchend', (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            console.log(222)
          }
        });
        console.log(this.scroll);
      },
      /**
       * 点击退款
       * @param e
       * @param id 订单id
       */
      clickRefund(e,id,p) {
        e.stopPropagation();
//        console.log(id);
        GoToPage('refund','refund.html',{OrderId: id, price: p});

      },
      /**
       * 查看退款
       */
      clickCheckRefund(e,id) {
        e.stopPropagation();
        GoToPage('refundResult','refundResult.html',{OrderId: id});
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      this.WH = this.getClientHeight();
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .wrapper {
    /*position: relative;*/
    /*bottom: 3rem;*/
    /*top: 0;*/
    overflow: hidden;
    height: 29rem;
    /*margin-bottom: 3.3rem;*/

  }

  .myOrder {
    background-color: #f1f1f1;
    margin-bottom: 1.95rem;
    p, span, h4 {
      /*font-family: Helvetica Neue, Tahoma, Arial;*/
    }
  }

  .order_list_ul {
    /*margin-bottom: 2.5rem;*/
    .order_list_li {
      background-color: #fff;
      display: flex;
      margin-bottom: 0.5rem;
      padding: .6rem .6rem 0;
      .restaurant_image {
        @include wh(2rem, 2rem);
        margin-right: 0.4rem;
      }
      .order_item_right {
        flex: 5;
        .order_item_right_header {
          border-bottom: 0.05rem solid #f5f5f5;
          padding-bottom: .3rem;
          @include fj;
          .order_header {
            h4 {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              @include sc(.75rem, #333);
              line-height: 1rem;
              width: 9rem;

              .arrow_right {
                @include wh(.4rem, .4rem);
                fill: #ccc;
                margin-right: .2rem;
              }
            }
            .order_time {
              @include sc(.55rem, #999);
              line-height: .8rem;
            }
            .icon {
              /*padding-left: .5rem;*/
            }
          }
          .order_status {
            @include sc(.6rem, $payColor);
          }
        }
        .order_basket {
          display: flex;
          /*line-height: 2rem;*/
          border-bottom: 0.025rem solid #f5f5f5;
          padding: .25rem 0;
          .order_img_box {
            @include wh(4rem, 4rem);
            margin-right: .5rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .order_data {
            display: flex;
            flex: 1;
            justify-content:space-between;
          }
          .order_name {
            display: flex;
            justify-content:space-between;
            @include sc(.65rem, #333);
            width: 10rem;
          }
          .order_name2 {
            @include sc(.65rem, #333);
            width: 10rem;
          }
          .order_amount {
            @include sc(.65rem, $payColor);
            font-weight: bold;
            text-align: right;

          }
          .order_total {
            @include sc(.65rem, #333);
            text-align: right;
          }
          .refund {
            @include sc(.6rem, #a5a4a4);
            border: 1px solid #a5a4a4;
            border-radius: .8rem;
            padding: .1rem .3rem;
            white-space: nowrap;
          }
        }
        .order_again {
          text-align: right;
          line-height: 1.6rem;
          .buy_again {
            @include sc(.55rem, #3190e8);
            border: 0.025rem solid #3190e8;
            padding: .1rem .2rem;
            border-radius: .15rem;
          }
          .order_sum {
            @include sc(.8rem, #333);
          }
        }
      }
    }
  }

  .loading-enter-active, .loading-leave-active {
    transition: opacity .7s
  }

  .loading-enter, .loading-leave-active {
    opacity: 0
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }

  .empty_data {
    font-size: 0.6rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
    margin-bottom: 2.3rem;
    background-color: #fff;
  }

  .iosBtm {
    width: 100%;
    height: 3.5rem;
  }

  .empty-states {
    padding-top: 3rem;
    font-size: .9rem;
    color: #AEB0B7;
    text-align: center;
  }

</style>
