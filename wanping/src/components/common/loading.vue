<template>
  <!--  loading开始-->
  <div class="loading-mask">
    <i class="icon iconfont icon-loading animation_rotate"></i>
  </div>
  <!--  结束-->
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

  created() {},

  mounted() {},

  beforeDestroy() {}
}
</script>

<style lang='scss' scoped>
  .icon {
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .loading-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0,0,0,.3);
  }
  @keyframes Rotate{
    0%   {
      -webkit-transform: translate(-50%,-50%) rotate(0deg);
      -moz-transform: translate(-50%,-50%) rotate(0deg);
      -ms-transform: translate(-50%,-50%) rotate(0deg);
      -o-transform: translate(-50%,-50%) rotate(0deg);
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100% {
      -webkit-transform: translate(-50%,-50%) rotate(360deg);
      -moz-transform: translate(-50%,-50%) rotate(360deg);
      -ms-transform: translate(-50%,-50%) rotate(360deg);
      -o-transform: translate(-50%,-50%) rotate(360deg);
      transform: translate(-50%,-50%) rotate(360deg);
    }
  }

  .animation_rotate{
    animation: Rotate 2s linear infinite;
  }

</style>
