<template>
  <div id="app">
    <!--<router-view/>-->
    <Home></Home>
  </div>
</template>

<script>
  import Home from './modules/home.vue'

  export default {
    name: 'App',
    components: {
      Home
    },
  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
