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
    watch: {
      // 检测动态路由来回切换 并修改数据
      $route(to, from) {
        console.log('home:',to.name)
        console.log('home:',from.name)
        if(to.name==='gamePage') {
          this.musicHide = false
        }
        if(to.name==='home') {
          this.musicHide = true
        }
      }
    }

  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
    position: relative;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
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
