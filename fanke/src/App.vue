<template>
  <div id="app">
    <Music :musicHide="musicHide"></Music>
    <router-view></router-view>

  </div>
</template>

<script>

  import Music from './components/Music.vue'
//  import {EventBus} from './eventBus/eventBus';

  export default {
    data() {
      return {
        musicHide: true
      }
    },

    name: 'App',
    components: {
      Music
    },
    mounted() {
      window.addEventListener('contextmenu', function(e){  // 关闭长按菜单
        e.preventDefault();
      });
    }

  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  .gameResultPart {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;

  }

  [v-cloak] {
    display: none;
  }


</style>
