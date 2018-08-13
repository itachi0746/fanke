<template>
  <div id="app">
    <Video></Video>
  </div>
</template>

<script>
  import Video from './modules/video.vue'
  export default {
    name: 'App',
    components: {
      Video
    },

  }
</script>

<style lang="scss">
  @import 'src/style/common';

</style>
