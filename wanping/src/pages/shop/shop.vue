<template>
  <div id="app">
    <Shop></Shop>
  </div>
</template>

<script>
  import Shop from './modules/shop.vue'

  export default {
    name: 'App',
    components: {
      Shop
    },

  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
