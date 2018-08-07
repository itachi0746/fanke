<template>
  <div :class="{musicBox: true, hide: _musicHide}">
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
  import {EventBus} from '../eventBus/eventBus';

  export default {
    props: ['musicHide'],

    data: function () {
      return {
        music: true,
        localBGMsrc: require('../assets/music/bg_music.mp3'),
        serverBGMsrc: '',
        BGM: null,
        _musicHide: true
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
      this._musicHide = this.musicHide
//      console.log(EventBus.musicShow)
    },
    watch: {

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
