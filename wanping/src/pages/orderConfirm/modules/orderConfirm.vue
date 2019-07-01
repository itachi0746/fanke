<template>
  <!--订单 开始-->
  <div class="order">
    <Header :headName="headName"></Header>

    <section class="order-data" v-if="orderData" v-for="(item,index1) in orderData" :key="index1">
      <header>
        订单信息
      </header>
      <div class="screenName">
        <p>{{item.BusinessName}}</p>
        <p>{{item.PsName}}</p>

      </div>

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
    <div class="cp-box" v-if="couponData">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title" class="titleClass">
            <span>商家优惠</span>
            <i>{{couponFont}}</i>
          </div>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell v-for="(item,index) in couponData" :key="index" :title="item.ReferenceValues.CC05_COUPON_ID" clickable @click="handleClickCell(item,index)">
                <van-radio :name="index" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>
    </div>

    <section class="confrim-order">
      <p>待支付 ¥{{totalPriceResult}}</p>
      <p @click="placeOrder">确认下单</p>
    </section>
    <Loading v-show="isLoading"></Loading>
    <div class="iosBtm" v-if="isIOS"></div>

  </div>
  <!--订单 结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'
  import Loading from '../../../components/common/loading.vue'
  import {postData} from '../../../server'
  import {getUrlParms,IOSConfig} from '@/config/utils'

  export default {
    data() {
      return {
        headName: '确认订单',
        orderData: [],
        fromBasket: false,  // 是否来自购物车
        isLoading: false,
        activeNames: [],
        titleName: '商家优惠',
        radio: null, // 记录单选
        couponData: null, // 优惠券数据
        couponId: null, // 优惠券id
        couponFont: '', // 优惠券文字
        totalPrice: 0, // 总价
        couponVal: 0, // 优惠券金额
        totalPriceResult: 0 // 显示的总价
      }
    },

    components: {
      Header,
      Loading
    },

    computed: {

      isIOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac');
          return true
        }
      },
      businessId () { // 商家id
        let arr = [];
        for (let obj of this.orderData) {
          arr.push(obj.BusinessId)
        }
        let resultArr = [];
        for (let obj of arr) {
          let have = false; // 是否已有
          for (let robj of resultArr) {
            if (obj === robj) {
              have = true;
              break
            }
          }
          if (!have) {
            resultArr.push(obj)
          }
        }
        return resultArr.join(',')
      }
    },

    methods: {
      /**
       * 计算总价
       */
      calTotalPrice() {
        let result = 0;
        this.orderData.forEach((item) => {
          result += item.Amount;
        });
        this.totalPrice = result
        this.totalPriceResult = this.totalPrice - this.couponVal

      },
      /**
       * @method 确认下单 跳转
       */
      placeOrder() {
        this.isLoading = true;
        const url = '/ConfirmOrder';
        const data = {
          "FromBasket": this.fromBasket,
          "items": this.handleItems(),
          "CouponId": this.couponId
        };
        console.log('data',data);
        postData(url, data).then((res) => {
          console.log(res);
          this.isLoading = false;
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
      },
      /**
       * 请求订单信息
       */
      getOrderData () {
        const data = getUrlParms();
        this.fromBasket = data.frombasket;

        const url = '/GetPlaceOrder';
        postData(url,data.id).then((res) => {
          console.log(res);
          this.orderData = res.Data;
          this.getCouponData()
          this.calTotalPrice()
        })
      },
      /**
       * 请求优惠券信息
       */
      getCouponData () {
        const bId = this.businessId;
        const url = '/GetMyBizUsingCoupons';
        const data = {
          AcctIds: bId
        }
        postData(url,data).then((res) => {
          console.log(res);
          this.couponData = res.Data
        })

      },
      /**
       * 点击优惠券, 重新计算总价
       */
      handleClickCell (item,index) {
        this.radio = index;
        this.couponId = item.CC05_COUPON_ID;
        this.couponFont = item.ReferenceValues.CC05_COUPON_ID
        const url = '/CalMyBizUsingCoupons'
        const data = {
          CouponId: this.couponId,
          Money: this.totalPrice
        }
        this.isLoading = true;
        postData(url,data).then((res) => {
          console.log(res);
          this.isLoading = false;
          this.totalPriceResult = this.totalPrice - res.Data // 重新计算总价
        })
      }
    },
    created() {
      this.getOrderData()

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
      background-color: #000;
      padding-left: .8rem;
    }
    p:nth-child(2) {
      flex: 2;
      background-color: $mainColor;
      text-align: center;
    }
  }

  .iosBtm {
    width: 100%;
    height: 3.5rem;
  }
  .titleClass {
    /*display: flex;*/
    /*align-items: center;*/
    font-size: 0.8rem;
    i {
      font-size: 12px;
      color: red;
      margin-left: 5px;
    }
  }
  .cp-box {
    margin-top: 0.5rem;
  }
</style>
