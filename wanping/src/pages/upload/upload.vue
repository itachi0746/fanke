<template>
  <div id="app">
    <!--<router-view/>-->
    <Upload></Upload>
  </div>
</template>

<script>
  import Upload from './modules/upload.vue'

  export default {
    name: 'App',
    components: {
      Upload
    },
  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
