<template>
  <div class="musicBox">
    <audio id="music" :src="BGMsrc" loop="loop" autoplay="autoplay"></audio>

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
    data: function () {
      return {
        music: true,
        BGMsrc: '',
        BGM: document.querySelector("#music")
      }
    },

//  components: {},

//  computed: {},

    methods: {
      musicControl: function () {
        this.music = !this.music;
        console.log(this.BGM)
        this.music ? this.BGM.play() : this.BGM.pause()
      }
    },

    mounted() {
      this.BGM = EventBus.music
    },

//  beforeDestroy: function() {}
  }
</script>

<style>
  .musicBox {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 5;
  }

  .musicBox img {
    width: 2rem;

  }
</style>
