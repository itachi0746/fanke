<template>
  <!--  开始-->
  <div>
    <Header :headName="headName"></Header>

    <section class="food_list">
      <a href="#" class="food_list_header">
        <div class="shop_name">
          <img src="../../../assets/lm.jpg">
          <span>订单信息</span>
        </div>
        <i class="fa fa-angle-right arrow_right"></i>
      </a>
      <ul class="food_list_ul">
        <li><p class="food_name ellipsis">广告信息</p>
          <div class="quantity_price">
            <span>X1</span>
            <span>¥20</span>
          </div>
        </li>
      </ul>
      <!--<div class="deliver_fee"><span>配送费</span> <span>4</span>-->
      <!--</div>-->
      <div class="pay_ment">实付9725.00</div>
    </section>
  </div>
  <!--  结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'

  export default {
    data() {
      return {
        headName: '订单详情'
      }
    },

    components: {
      Header
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

  .food_list {
    background-color: #fff;
    margin-bottom: .5rem;
    .food_list_header {
      @include fj;
      align-items: center;
      padding: .2rem .5rem;
      border-bottom: 1px solid #f5f5f5;
      .shop_name {
        img {
          @include wh(1.2rem, 1.2rem);
          vertical-align: middle;
          margin-right: .2rem;
        }
        span {
          @include sc(.75rem, #333);
          font-weight: bold;
        }
      }
      svg {
        @include wh(.6rem, .6rem);
        fill: #666;
      }
    }
    .food_list_ul {
      li {
        @include fj;
        align-items: center;
        padding: 0 .5rem;
        line-height: 2rem;
        .food_name {
          @include sc(.6rem, #666);
          flex: 4;
        }
        .quantity_price {
          flex: 1;
          @include fj;
          align-items: center;
          span:nth-of-type(1) {
            @include sc(.6rem, #ccc);
          }
          span:nth-of-type(2) {
            @include sc(.6rem, #666);
          }
        }
      }
    }
    .deliver_fee {
      @include fj;
      align-items: center;
      padding: 0 .5rem;
      line-height: 2rem;
      border-top: 1px solid #f5f5f5;
      span {
        @include sc(.6rem, #666);
      }
    }
    .pay_ment {
      @include sc(.6rem, #fb6b23);
      border-top: 1px solid #f5f5f5;
      font-weight: bold;
      line-height: 2rem;
      text-align: right;
      padding-right: .5rem;
    }
  }

</style>
