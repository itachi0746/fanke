<template>
  <div>
    <div class="foot-guide">
      <ul>
        <li class="foot-guide-li" @click="toIndex" v-if="this.page==='Home'">
          <img src="../../assets/home2.png" alt="">
          <span class="chosen">主页</span>
        </li>
        <li class="foot-guide-li" @click="toIndex" v-else>
          <img src="../../assets/home.png" alt="">
          <span>主页</span>
        </li>

        <li class="foot-guide-li" @click="toSearch" v-if="this.page==='Search'">
          <img src="../../assets/search2.png" alt="">
          <span class="chosen">搜索</span>
        </li>
        <li class="foot-guide-li" @click="toSearch" v-else>
          <img src="../../assets/search.png" alt="">
          <span>搜索</span>
        </li>

        <li class="foot-guide-li" @click="toOrder" v-if="this.page==='Order'">
          <img src="../../assets/ordered-list2.png" alt="">
          <span class="chosen">订单</span>
        </li>
        <li class="foot-guide-li" @click="toOrder" v-else>
          <img src="../../assets/ordered-list.png" alt="">
          <span>订单</span>
        </li>

        <li class="foot-guide-li" @click="toProfile" v-if="this.page==='Profile'">
          <img src="../../assets/user2.png" alt="">
          <span class="chosen">我的</span>
        </li>
        <li class="foot-guide-li" @click="toProfile" v-else>
          <img src="../../assets/user.png" alt="">
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
      default: 'Home'
    }
  },
  data() {
    return {

      whatPage: [
        {_is: false},
        {_is: false},
        {_is: false},
        {_is: false}
      ]
    }
  },

  components: {},

  computed: {},

  methods: {
    toProfile() {
      window.location.href = 'profile.html';
    },
    toSearch() {
      window.location.href = 'search.html';

    },
    toIndex() {
      window.location.href = 'index.html';

    },
    toOrder() {
      window.location.href = 'order.html';

    },



  },

  mounted() {
    console.log(this.page)
  },

  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .foot-guide ul {
    background-color: #fff;
    position: fixed;
    z-index: 100;
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

    img {
      width: 1.2rem;
      margin-top: .2rem;
    }
    span {
      @include sc(.6rem,#666);
    }
  }
  .chosen {
    color: #3190e8!important;
  }
</style>
