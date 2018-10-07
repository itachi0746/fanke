<template>
  <!--订单 开始-->
  <div class="order">
    <Header :headName="headName"></Header>

    <section class="order-data">
      <header>
        订单信息
      </header>
      <ul>
        <li class="data-container">
          <p class="product-name ellipsis">屏幕名称xxxxxxxxxxxxxxxxxxxxx</p>
        </li>
        <li class="data-container">
          <span>单价</span>
          <span>¥ 100</span>
        </li>
        <li class="data-container">
          <span>数量</span>
          <span>× 10</span>
        </li>
      </ul>
      <section class="total-price">
        <span>订单总价</span>
        <span>待支付 ¥1000</span>
      </section>
    </section>

    <section class="confrim-order">
      <p>待支付 ¥1000.0</p>
      <p @click="handleOrder">确认下单</p>
    </section>
  </div>
  <!--订单 结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'
  import {postData} from '../../../server'

  export default {
    data() {
      return {
        headName: '确认订单'
      }
    },

    components: {
      Header
    },

    computed: {},

    methods: {
      handleOrder() {
        const url = '/ConfirmOrder';
        const data = {
          "FromBasket": false,
          items: [{
            "BasketDtlId": "1",  // 购物车id
            "PsId": "12",  // 产品id
            "Count": "10",  // 广告位数量
            "Date": "2018-08-18",
            "Amount": '1000',  // 总价
            "Price": "100"  // 价格
          }]
        };
        postData(url, data).then((res) => {
          console.log(res)
          // TODO
        })
      }
    },

    mounted() {
//      const key = 'SUM_PRIZE';
//      const sumPrice = Store.fetch(key);
//      console.log(sumPrice)
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .order {
    width: 100%;
    /*background-color: #fff;*/
  }

  .order-data {
    margin-top: .5rem;
    background-color: #fff;

    header {
      padding: .5rem;
      border-bottom: 0.05rem solid #f5f5f5;
    }
    ul {
      border-bottom: 0.05rem solid #f5f5f5;

    }
  }

  .data-container {
    display: flex;
    overflow: hidden;
    padding: .3rem .5rem;
    justify-content: space-between;

    .product-name {
      @include sc(.8rem, #666);
      width: 13rem;
    }
    span {
      @include sc(.8rem, #666);

    }
  }

  .total-price {
    display: flex;
    overflow: hidden;
    padding: .5rem .5rem;
    justify-content: space-between;
    span {
      @include sc(.8rem, #666);

    }
    span:nth-child(2) {
      color: #f60;

    }
  }

  .confrim-order {
    display: flex;
    position: fixed;
    bottom: 0;
    @include wh(100%, 2.4rem);
    box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);

    p {
      line-height: 2.4rem;
      font-size: .8rem;
      color: #ffffff;
    }

    p:nth-child(1) {
      flex: 5;
      background-color: #3c3c3c;
      padding-left: .8rem;
    }
    p:nth-child(2) {
      flex: 2;
      background-color: #56d176;
      text-align: center;
    }
  }
</style>
