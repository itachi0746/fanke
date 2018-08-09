<template>
  <!--  开始-->
  <div class="myOrder">
    <Header :headName="headName"></Header>

    <ul class="order_list_ul">
      <li class="order_list_li">
        <img src="../../../assets/lm.jpg" class="restaurant_image">
        <section class="order_item_right">
          <section>
            <header class="order_item_right_header">
              <section class="order_header">
                <h4><span class="ellipsis">演示 </span>
                  <i class="fa fa-angle-right"></i>
                </h4>
                <p class="order_time">2018-07-31 09:48</p>
              </section>
              <p class="order_status">
                等待支付
              </p>
            </header>
            <section class="order_basket">
              <p class="order_name ellipsis">屏幕名称</p>
              <p class="order_amount">¥9725.00</p>
            </section>
          </section>
          <div class="order_again">
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

  export default {
    data() {
      return {
        headName: '我的订单',
        page: 'Order'
      }
    },

    components: {
      Header, Footer,ComputeTime
    },

    computed: {},

    methods: {},

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
    margin-bottom: .5rem;
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
            .fa {
              padding-left: .5rem;
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
