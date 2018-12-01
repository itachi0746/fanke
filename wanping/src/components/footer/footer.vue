<template>
  <div>
    <div class="foot-guide">
      <ul ref="foot" id="foot">
        <li class="foot-guide-li" @click="toIndex" v-if="this.page==='Home'">
          <i class="icon iconfont icon-home chosen"></i>
          <span>主页</span>
        </li>
        <li class="foot-guide-li" @click="toIndex" v-else>
          <i class="icon iconfont icon-home"></i>
          <span>主页</span>
        </li>
        <li class="foot-guide-li" @click="toCart" v-if="this.page==='Cart'">
          <i class="icon iconfont icon-gouwuche chosen"></i>
          <span>购物车</span>
        </li>
        <li class="foot-guide-li" @click="toCart" v-else>
          <i class="icon iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </li>

        <li class="foot-guide-li" @click="toSearch" v-if="this.page==='Search'">
          <i class="icon iconfont icon-search chosen"></i>
          <span>搜索</span>
        </li>
        <li class="foot-guide-li" @click="toSearch" v-else>
          <i class="icon iconfont icon-search"></i>
          <span>搜索</span>
        </li>

        <li class="foot-guide-li" @click="toOrder" v-if="this.page==='Order'">
          <i class="icon iconfont icon-orderedlist chosen"></i>
          <span>订单</span>
        </li>
        <li class="foot-guide-li" @click="toOrder" v-else>
          <i class="icon iconfont icon-orderedlist"></i>
          <span>订单</span>
        </li>

        <li class="foot-guide-li" @click="toProfile" v-if="this.page==='Profile'">
          <i class="icon iconfont icon-user chosen"></i>
          <span>我的</span>
        </li>
        <li class="foot-guide-li" @click="toProfile" v-else>
          <i class="icon iconfont icon-user"></i>
          <span>我的</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    page: {
      type: String,
//      default: 'Home',
    },
    a: Boolean

  },
  data() {
    return {

    }
  },

  components: {},

  watch: {
    a() {
      if(this.a) {
//        console.log(this.$refs.foot)
        this.$emit('footerHeight',this.$refs.foot.offsetHeight)
      }
    }
  },

  methods: {
    toProfile() {
      GoToPage("profile","profile.html",{});
     // window.location.href = 'profile.html';
    },
    toSearch() {
      GoToPage("search","search.html",{});
      //window.location.href = 'search.html';

    },
    toIndex() {
      GoToPage("index","index.html",{});
      //window.location.href = 'index.html';

    },
    toOrder() {
      GoToPage("order","order.html",{});
      //window.location.href = 'order.html';

    },
    toCart() {
      GoToPage("cart","cart.html",{});
     // window.location.href = 'cart.html';

    },



  },

  mounted() {

//    console.log(this.$refs.foot.offsetHeight);
//    this.$emit('footerHeight',this.$refs.foot.offsetHeight)

  },

  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .foot-guide ul {
    background-color: #fff;
    position: fixed;
    z-index: 90;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2.3rem;
    @include fj;
    box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);


  }

  .foot-guide-li {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;

    i {
      width: 1.2rem;
      height: 1.2rem;
      margin-top: .2rem;
      font-size: 1.2rem;
    }
    span {
      @include sc(.6rem,#000);
    }
  }
  .chosen {
    color: $mainColor!important;
  }
</style>
