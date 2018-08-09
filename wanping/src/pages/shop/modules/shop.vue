<template>
  <div class="shop">
    <div class="shopData">
      <h5>我是商家名称</h5>
      <span>商家信息</span>
    </div>

    <ScreenList></ScreenList>
  </div>
</template>

<script>
  import ScreenList from '@/components/common/screenList'

  export default {
    data() {
      return {}
    },

    components: {
      ScreenList
    },

    computed: {},

    methods: {},

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .shop {
    /*padding: .5rem;*/
  }
  .shopData {
    padding: .5rem;
    border-bottom: 0.5rem solid #ddd;

    h5 {
      font-weight: bold;
    }
   span {
     @include sc(12px,#666);
   }
  }
</style>
