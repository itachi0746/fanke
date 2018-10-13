<template>
  <!--  开始-->
  <div class="myOrder">
    <Header :headName="headName" @headerHeight="getHeight" :a="oktoGetH"></Header>
    <div class="wrapper" id="wrapper" ref="wrapper">
      <ul class="order_list_ul" v-if="orderArr.length">
        <li class="order_list_li" v-for="(order,index) in orderArr" :key="order.OrderId"
            @click="toOrderDetail($event,index)" :id="order.OrderId">
          <section class="order_item_right">
            <section>
              <header class="order_item_right_header">
                <section class="order_header">
                  <h4><span class="ellipsis">{{order.OrderNo}} </span>
                    <i class="icon iconfont icon-youjiantou1"></i>
                  </h4>
                  <p class="order_time">{{order.OrderDate}}</p>
                </section>
                <p class="order_status">
                  {{order.OrderStatus}}
                </p>
              </header>
              <section class="order_basket" v-for="(item,index) in order.Items">
                <p class="order_name ellipsis">{{item.PsName}}</p>
                <p class="order_amount">¥{{item.Amount}}</p>
              </section>
            </section>
            <div class="order_again">
              <span class="order_sum">合计 ¥{{order.Amount}}</span>
              <ComputeTime :timeData="order" v-show="order.OrderStatusVal==='BD0901'"></ComputeTime>
            </div>
          </section>
        </li>
        <li class="empty_data">{{btmFont}}</li>
      </ul>

    </div>
    <Loading v-show="isLoading"></Loading>
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

    watch: {},

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
//          console.log(this.$refs.wrapper.style.height)
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
          console.log(res)
          this.orderArr = this.orderArr.concat(res.Data.Models);
          this.pageCount = res.Data.PageCount;  // 总页数
//          if (this.pageNum > this.pageCount) {
//            this.btmFont = '没有更多数据了';
//          } else {
//            this.btmFont = '加载更多';
//          }
          this.btmFont = this.pageNum > this.pageCount ? '没有更多数据了' : '加载更多';
          this.$nextTick(() => {
            this.init_scroll();
          });
          this.oktoGetH = true;
          this.loadMoreSwitch = true;
          this.pageNum === 1 ? this.isLoading = false : ''

        })

      },
      toOrderDetail(event, i) {
        if (this.orderArr[i].OrderStatusVal !== 'BD0901') {
          const Tindex = event.currentTarget.id;
          GoToPage("orderDetail", "orderDetail.html", {OrderId: Tindex});  // TODo 支付完成的 跳去订单详情

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
        })
        console.log(this.scroll);
      },

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
      font-family: Helvetica Neue, Tahoma, Arial;
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
            @include sc(.6rem, #333);
          }
        }
        .order_basket {
          @include fj;
          line-height: 2rem;
          border-bottom: 0.025rem solid #f5f5f5;
          .order_name {
            @include sc(.6rem, #666);
            width: 10rem;
          }
          .order_amount {
            @include sc(.6rem, #f60);
            font-weight: bold;
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
</style>
