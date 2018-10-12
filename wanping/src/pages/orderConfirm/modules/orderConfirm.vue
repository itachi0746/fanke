<template>
  <!--订单 开始-->
  <div class="order">
    <Header :headName="headName"></Header>

    <section class="order-data" v-if="orderData" v-for="(item) in orderData">
      <header>
        订单信息
      </header>
      <p class="screenName">{{item.PsName}}</p>

      <ul>
        <li class="data-container">
          <p class="product-name ellipsis">{{item.Date}}</p>
        </li>
        <li class="data-container">
          <span>单价</span>
          <span>¥ {{item.Price}}</span>
        </li>
        <li class="data-container">
          <span>数量</span>
          <span>× {{item.Count}}</span>
        </li>
      </ul>

      <section class="total-price">
        <span>订单总价</span>
        <span>待支付 ¥{{item.Amount}}</span>
      </section>
    </section>

    <section class="confrim-order">
      <p>待支付 ¥{{totalPrice}}</p>
      <p @click="placeOrder">确认下单</p>
    </section>
    <Loading v-show="isLoading"></Loading>

  </div>
  <!--订单 结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'
  import Loading from '../../../components/common/loading.vue'
  import {postData} from '../../../server'
  import getUrlParms from '@/config/utils'


  export default {
    data() {
      return {
        headName: '确认订单',
        orderData: [],
        fromBasket: false,  // 是否来自购物车
        isLoading: false
      }
    },

    components: {
      Header,
      Loading
    },

    computed: {
      totalPrice() {
        let result = 0;
        this.orderData.forEach((item) => {
          result += item.Amount;
        });
        return result
      }
    },

    methods: {
      /**
       * @method 确认下单 跳转
       */
      placeOrder() {
        this.isLoading = true;
        const url = '/ConfirmOrder';
        const data = {
          "FromBasket": this.fromBasket,
          "items": this.handleItems()
        };
        console.log('data',data);
        postData(url, data).then((res) => {
          console.log(res);
//          window.location.href = res.NextStep;
          GoToPage('',res.NextStep,{})
        })
      },
      handleItems() {
        let arr = [];
        this.orderData.forEach((item)=> {
          let newItem = {
            "BasketDtlId": item.BasketDtlId,  // 购物车明细id
            "PsId": item.PsId,  // 产品id
            "Count": item.Count,  // 广告位数量
            "Date": item.Date,  // 日期
            "Amount": item.Amount,  // 总价
            "Price": item.Price  // 价格
          };
          arr.push(newItem)
        });
        console.log('arr',arr);
        return arr
      }
    },
    created() {
      const data = getUrlParms();
      this.fromBasket = eval(data.fromBasket);
//      console.log(data);
      const url = '/GetPlaceOrder';
      postData(url,data.id).then((res) => {
        console.log(res);
        this.orderData = res.Data;
      })

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
    margin-bottom: 2.3rem;
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
