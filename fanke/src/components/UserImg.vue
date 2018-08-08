<template>
  <div class="box">
    <img :src="logo"/>
  </div>
</template>

<script>
  import {EventBus} from '../eventBus/eventBus'

  export default {
    data: function () {
      return {
//        logo: '',
        defaultLogo: require('../assets/manImg.jpg'),
        userLogo: EventBus.userData.Logo
      }
    },
//
//  components: {},
//
    computed: {
      logo() {
        if (this.userLogo === '' ||
          this.userLogo === undefined ||
          this.userLogo === null) {
          return this.defaultLogo
        } else {
          return this.userLogo
        }

      }
    },
//
//  methods: {}
//
//  mounted: function() {},
//
//  beforeDestroy: function() {}
  }
</script>

<style>
  .box {
    position: absolute;
    left: 1rem;
    top: 0.5rem;

  }

  .box img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
</style>
