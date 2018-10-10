<template>
  <!--  开始-->
  <div class="myOrder">
    <Header :headName="headName"></Header>

    <ul class="order_list_ul">
      <li class="order_list_li" v-for="(order,index) in orderArr" :key="order.OrderId"
          @click="toOrderDetail($event)" :id="order.OrderId"
      >
        <!--<img src="../../../assets/lm.jpg" class="restaurant_image">-->
        <section class="order_item_right">
          <section>
            <header class="order_item_right_header">
              <section class="order_header">
                <h4><span class="ellipsis">{{order.OrderNo}} </span>
                  <!--<i class="fa fa-angle-right"></i>-->
                  <i class="icon iconfont icon-youjiantou1"></i>
                </h4>
                <p class="order_time">{{order.OrderDate}}</p>
              </section>
              <p class="order_status">
                {{order.OrderStatus}}
              </p>
            </header>
            <section class="order_basket" v-for="(item,index) in order.Items" :key="item.OrderId">
              <p class="order_name ellipsis">{{item.PsName}}</p>
              <p class="order_amount">¥{{item.Amount}}</p>
            </section>
          </section>
          <div class="order_again">
            <span class="order_sum">合计 ¥{{order.Amount}}</span>
            <ComputeTime></ComputeTime>
          </div>
        </section>
      </li>
    </ul>

    <Footer :page="page"></Footer>
  </div>
  <!--  结束-->
</template>

<script>
  import Footer from '@/components/footer/footer.vue'
  import Header from '@/components/header/header.vue'
  import ComputeTime from '../../../components/common/computeTime.vue'
  import {postData} from '@/server'


  export default {
    data() {
      return {
        headName: '我的订单',
        page: 'Order',
        orderArr: []
      }
    },

    components: {
      Header, Footer,ComputeTime
    },

    computed: {},

    methods: {
      toOrderDetail(event) {
        const Tindex = event.currentTarget.id;
//        console.log(event.target)
//        console.log(event.currentTarget )

        console.log(Tindex)

        GoToPage("orderDetail","orderDetail.html",{OrderId:Tindex});
        //window.location.href = 'orderDetail.html?OrderId=' + Tindex;
      }
    },

    created() {
      const url = '/GetOrders';
      postData(url).then((res) => {
        console.log(res)
        this.orderArr = res.Data.Models;
      });
    },
    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .myOrder{
    background-color: #f1f1f1;
    margin-bottom: 1.95rem;
    p, span, h4{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .order_list_ul{
    margin-bottom: 2.5rem;
    .order_list_li{
      background-color: #fff;
      display: flex;
      margin-bottom: 0.5rem;
      padding: .6rem .6rem 0;
      .restaurant_image{
        @include wh(2rem, 2rem);
        margin-right: 0.4rem;
      }
      .order_item_right{
        flex: 5;
        .order_item_right_header{
          border-bottom: 0.05rem solid #f5f5f5;
          padding-bottom: .3rem;
          @include fj;
          .order_header{
            h4{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              @include sc(.75rem, #333);
              line-height: 1rem;
              width: 9rem;

              .arrow_right{
                @include wh(.4rem, .4rem);
                fill: #ccc;
                margin-right: .2rem;
              }
            }
            .order_time{
              @include sc(.55rem, #999);
              line-height: .8rem;
            }
            .icon {
              /*padding-left: .5rem;*/
            }
          }
          .order_status{
            @include sc(.6rem, #333);
          }
        }
        .order_basket{
          @include fj;
          line-height: 2rem;
          border-bottom: 0.025rem solid #f5f5f5;
          .order_name{
            @include sc(.6rem, #666);
            width: 10rem;
          }
          .order_amount{
            @include sc(.6rem, #f60);
            font-weight: bold;
          }
        }
        .order_again{
          text-align: right;
          line-height: 1.6rem;
          .buy_again{
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
</style>
