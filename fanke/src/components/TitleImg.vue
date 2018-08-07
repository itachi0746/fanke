<template>
    <div class="title animated bounceInDown">
      <img src="../assets/title.png">
    </div>

</template>

<script>
//  import animate from 'animate.css'
  export default {
//  data () {
//    return {
//      isShow: true
//    }
//  },
//
//  components: {},
//
//  computed: {},
//
//  mounted: function () {
//    this.addClass()
//  },
//
//  methods: {}
  }
</script>

<style scoped>
  .title {
    width: 100%;
    text-align: center;
    position: relative;
    top: 2.5rem;
  }
  .title,.animated {
    animation-delay: 0.5s;
    -webkit-animation-delay: 0.5s;
  }
   img {
    width: 90%;
  }
</style>
