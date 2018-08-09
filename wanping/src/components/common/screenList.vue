<template>
  <div class="screenList">
    <ul>
      <li>
        <section class="screen-left">
          <img class="screenImg" src="@/assets/lm.jpg" alt="">
        </section>
        <section class="screen-right">
          <h5>屏幕名称</h5>
          <p class="screen-desc">屏幕描述</p>
          <p class="screen-price">
            <span>¥</span>
            <span>1000</span>
            <span>起</span>
            <button>点击选择</button>
          </p>

        </section>
      </li>
      <li>
        <section class="screen-left">
          <img class="screenImg" src="@/assets/lm.jpg" alt="">
        </section>
        <section class="screen-right">
          <h5>屏幕名称</h5>
          <p class="screen-desc">屏幕描述</p>
          <p class="screen-price">
            <span>¥</span>
            <span>1000</span>
            <span>起</span>
            <button>点击选择</button>
          </p>

        </section>
      </li>
      <li>
        <section class="screen-left">
          <img class="screenImg" src="@/assets/lm.jpg" alt="">
        </section>
        <section class="screen-right">
          <h5>屏幕名称</h5>
          <p class="screen-desc">屏幕描述</p>
          <p class="screen-price">
            <span>¥</span>
            <span>1000</span>
            <span>起</span>
            <button>点击选择</button>
          </p>

        </section>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted() {},

  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .screenList {
    background-color: #fff;

    li {
      padding: .5rem;
      border-bottom: 1px solid #ddd;
      @include fj;

    }
  }
  .screenImg {
    @include wh(3rem,3rem);
    display: block;

  }
  .screen-right {
    flex: auto;
    -webkit-flex: auto;
  }
  .screen-left {
    margin-right: .5rem;
  }
  .screen-desc {
    @include sc(.6rem,#666);
  }
  .screen-price  {
    span {
      @include sc(.7rem , $blue);
    }
    span:nth-child(2) {
      font-size: 1rem;
    }
    button {
      background-color: #be0000;
      float: right;
      padding: .3rem;
      @include sc(.7rem , #fff);
      @include borderRadius(5px);

    }
  }
</style>
