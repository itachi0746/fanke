<template>
  <div class="actionBar">
    <ul>
      <li class="shop-car" @click="addToBasket">加入购物车</li>
      <li class="buy-btn" @click="buy">购买</li>
    </ul>
  </div>
</template>

<script>
  import {postData} from '../../server'
//  console.log(Store)

  export default {
    props:['sumPrice'],
    data() {
      return {

      }
    },

    components: {},

    computed: {},

    methods: {
      buy() {
        this.$router.push({name: 'OrderConfirm', params: {} })
      },
      addToBasket() {  // 添加到购物车
        const url = '/AddToBasket';
        const data = [{
          psid: 1,
          date: '2018-08-17',
          count: 2
        }];
        postData(url,data).then((res) => {
          console.log('AddToBasket',res)

        });
      }
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .actionBar {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2.3rem;
    box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);

    ul {
      @include wh(100%, 100%);
      @include fj;

    }

    li {
      flex: 1;
      text-align: center;
      line-height: 2.3rem;
      font-weight: bold;
      @include sc(.9rem, #fff);

    }
    .shop-car {
      background-color: #FF9500;
    }
    .buy-btn {
      background-color: #FF0036;
    }

  }
</style>
