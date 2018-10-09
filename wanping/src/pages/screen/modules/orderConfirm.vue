<template>
  <!--订单 开始-->
  <div class="order">
    <Header :headName="headName"></Header>

    <section class="order-data" v-if="orderData">
      <header>
        订单信息
      </header>
      <p class="screenName">{{orderData.name}}</p>

      <ul v-for="(item) in orderData.items" :key="item.id">
        <li class="data-container">
          <p class="product-name ellipsis">{{item.day}}</p>
        </li>
        <li class="data-container">
          <span>单价</span>
          <span>¥ {{item.price}}</span>
        </li>
        <li class="data-container">
          <span>数量</span>
          <span>× {{item.count}}</span>
        </li>
      </ul>

      <section class="total-price">
        <span>订单总价</span>
        <span>待支付 ¥{{orderData.sumPrice}}</span>
      </section>
    </section>

    <section class="confrim-order">
      <p>待支付 ¥{{orderData.sumPrice}}</p>
      <p @click="handleOrder">确认下单</p>
    </section>
  </div>
  <!--订单 结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'
  import {postData} from '../../../server'
  import getUrlParms from '@/config/utils'


  export default {
    data() {
      return {
        headName: '确认订单',
        orderData: []
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
          items: this.handleItems()
        };
        postData(url, data).then((res) => {
          console.log(res)
          const url = res.NextStep;
          console.log(url)

          // TODO
        })
      },
      handleItems() {
        let arr = [];
        this.orderData.items.forEach((item,index)=> {
          let newItem = {
            "BasketDtlId": null,  // 购物车明细id
            "PsId": this.orderData.id,  // 产品id
            "Count": item.count,  // 广告位数量
            "Date": item.date + '',  // 日期
            "Amount": item.sumPrice,  // 总价
            "Price": item.price  // 价格
          };
          arr.push(newItem)
        });
        return arr
      }
    },
    created() {
      const data = getUrlParms();
      console.log(data);
//      this.orderData = this.$route.params.data;
//      console.log('confirm created',this.orderData)
      const url = '/GetPlaceOrder';

//      postData(url,)

    },

    mounted() {
//      const key = 'SUM_PRIZE';
//      const sumPrice = Store.fetch(key);
      console.log('confirm mountred')
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
    .screenName {
      padding: .5rem;

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
