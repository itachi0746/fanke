<template>
  <div class="actionBar">
    <ul>
      <li class="shop-car">加入购物车</li>
      <li class="buy-btn">购买</li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },

    components: {},

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
