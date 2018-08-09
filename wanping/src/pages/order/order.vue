<template>
  <div id="app">
    <MyOrder></MyOrder>
  </div>
</template>

<script>
  import MyOrder from './modules/myOrder.vue'
  export default {
    name: 'App',
    components: {
      MyOrder
    },

  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
