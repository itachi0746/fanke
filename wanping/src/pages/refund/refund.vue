<template>
  <div id="app">
    <!--<Refund></Refund>-->
    <router-view/>

  </div>
</template>

<script>
//  import Refund from './modules/refund.vue'

  export default {
    name: 'App'
//    components: {
//      Refund
//    },
  }
</script>

<style lang="scss">
  @import 'src/style/common';
  .el-message-box__btns button:nth-child(2) {
    margin-left: 40px;
  }
</style>
