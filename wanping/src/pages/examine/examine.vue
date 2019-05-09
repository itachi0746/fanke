<template>
  <div id="app">
    <OrderDetail></OrderDetail>
  </div>
</template>

<script>
  import OrderDetail from './modules/examine.vue'
  export default {
    name: 'App',
    components: {
      OrderDetail
    },

  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
