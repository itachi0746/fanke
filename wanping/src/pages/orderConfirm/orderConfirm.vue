<template>
  <div id="app">
    <OrderConfirm></OrderConfirm>
  </div>
</template>

<script>
  import OrderConfirm from './modules/orderConfirm.vue'
  export default {
    name: 'App',
    components: {
      OrderConfirm
    },

  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
