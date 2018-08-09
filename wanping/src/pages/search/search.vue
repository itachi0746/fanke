<template>
  <div id="app">
    <Search></Search>
  </div>
</template>

<script>
  import Search from './modules/search.vue'

  export default {
    name: 'App',
    components: {
      Search
    }
  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
