<template>
  <div class="musicBox" v-show="!musicHide">
    <audio id="music" :src="localBGMsrc" loop="loop" autoplay="autoplay"></audio>

    <div v-if="music">
      <img @click="musicControl" src="../assets/musicOn.png"/>
    </div>
    <div v-else>
      <img @click="musicControl" src="../assets/musicOff.png"/>
    </div>
  </div>
</template>

<script>
  //  import {EventBus} from '../eventBus/eventBus';

  export default {

    data() {
      return {
        music: true,
        localBGMsrc: require('../assets/music/bg_music.mp3'),
        serverBGMsrc: '',
        musicHide: true

      }
    },

//  components: {},

//  computed: {},

    methods: {
      musicControl: function () { // 音乐按钮点击
        this.music = !this.music;
        this.music ? this.BGM.play() : this.BGM.pause();
//        console.log(this.BGM.paused)
      }
    },

    mounted() {
      this.BGM = document.querySelector("#music");
//      console.log(this.BGM)

      //--创建页面监听，等待微信端页面加载完毕 触发音频播放
      document.addEventListener('WeixinJSBridgeReady', ()=> {
//        console.log(this)
        this.BGM.play()
      })
    },

    watch: {
      // 检测动态路由来回切换 并修改数据
      $route(to, from) {
//        console.log('music:', to.name)
//        console.log('music:', from.name)
        to.name === 'question' ? this.musicHide = false : this.musicHide = true;
//        if (to.name === 'question') {
//          this.musicHide = false
//        }
//        else {
//          this.musicHide = true
//        }

      }
    }

//  beforeDestroy: function() {}
  }
</script>

<style>
  .musicBox {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 11;
    /*display: none;*/

  }

  .musicBox img {
    width: 2rem;

  }

  .hide {
    display: none;
  }
</style>
