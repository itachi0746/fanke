<template>
  <div id="app">
    <!--<router-view/>-->
    <Cart></Cart>
  </div>
</template>

<script>
  import Cart from './modules/cart.vue'

  export default {
    name: 'App',
    components: {
      Cart
    },
  }
</script>

<style lang="scss">
  @import 'src/style/common';
  .bscroll-vertical-scrollbar {
    width: 5px!important;
  }
  .bscroll-indicator {
    border: none!important;
  }
</style>
