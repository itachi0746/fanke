<template>
  <div id="app">
    <Screen></Screen>
  </div>
</template>

<script>
  import Screen from './modules/productDetail.vue'

  export default {
    name: 'App',
    components: {
      Screen
    },
  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
