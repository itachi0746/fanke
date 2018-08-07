<!-- 背景图  -->
<template>
  <div :class="{bg1: beforeStart, bg2: !beforeStart}"></div>
</template>

<script>
export default {
  props: {
    beforeStart: Boolean
  },
//  data:function () {
//    return {
//      isBg1: beforeStart,
//      isBg2: !beforeStart
//    }
//  },
//
//  components: {},
//
//  computed: {},
//
//
//  methods: {}
}

</script>

<style>
  .bg1,.bg2 {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99;
  }
  .bg1 {
    background: url('../assets/bg1.png') no-repeat;
    background-size: contain;
  }

  .bg2 {
    background: url('../assets/bg2.png') no-repeat;
    background-size: contain;
  }

</style>
