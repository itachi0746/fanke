<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>


export default {


  name: 'App',


}

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    position: relative;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
  }
  /*.gamePart {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: relative;*/
    /*z-index: 10;*/
    /*display: none;*/
  /*}*/
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
