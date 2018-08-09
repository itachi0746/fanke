<template>
  <!--通用头部1  开始-->
  <div>
    <section class="head">
      <header>
        <div class="back">

          <i class="fa fa-angle-left left"></i>
        </div>
        <div class="head-font">

          <span>{{ title }}</span>
        </div>

      </header>
    </section>
  </div>
  <!--通用头部1  结束-->
</template>

<script>

  export default {
    props: {
      headName: String
    },
    data() {
      return {
        title: this.headName
      }
    },

    components: {},

    computed: {},

    methods: {},

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .head {
    width: 100%;

    header {
      width: 100%;
      padding: .3rem .5rem;
      border-bottom: 0.05rem solid #f5f5f5;
      /*display: flex;*/
      background-color: $blue;
      position: relative;

      .back {
        overflow: hidden;
        width: 20%;
      }
      .head-font {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 50%;
        color: #fff;
        text-align: center;

        span {
          font-weight:bold;
          color: #fff;
        }
      }
    }

    .fa {
      font-size: 1.5em;
      color: #fff;
    }
  }
</style>
