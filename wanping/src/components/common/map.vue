<template>
  <!--  开始-->
  <div class="my-map" id="my-map">
    <section class="head" ref="head" id="head">
      <header>
        <div class="back" @click="hideMap">
          <i class="icon iconfont icon-zuojiantou"></i>
        </div>
        <div class="head-font">
          <span>大屏位置</span>
        </div>
        <div class="edit">
        </div>
      </header>
    </section>
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
      <bm-marker :position="center" :dragging="true" animation="">
        <bm-label ref="label" :content="name" :labelStyle="{color: 'black', fontSize : '15px'}" :offset="{width: 0, height: 30}"/>
      </bm-marker>
    </baidu-map>
  </div>
  <!--  结束-->
</template>

<script>

  export default {
    data() {
      return {
        center: {lng: 0, lat: 0},
        zoom: 3,
        name: ''
      }
    },

    props: {
      coordinate: Object,
    },
    components: {
    },

    computed: {},

    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map);
        this.center.lng = this.coordinate.Longitude;
        this.center.lat = this.coordinate.Latitude;
        this.name = this.coordinate.Name;
        this.zoom = 15;


//        this.rePos();

      },
      hideMap() {
        this.$emit('hide-map')
      },

      rePos() {
        let mylab;
        console.log(this.$refs.label)
        this.$nextTick(() => {
//          console.log(this.$refs.label.$el.style.height)

//          console.log(document.getElementsByClassName('BMapLabel'));
          mylab = document.getElementsByClassName('BMapLabel');
          console.log(mylab)
          console.log(JSON.stringify(mylab))
        })
      }
    },

    created() {},

    mounted() {
      console.log('map:',this.coordinate);

    },

    beforeDestroy() {}
  }
</script>

<style lang='scss' scoped>
  .my-map {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    /*background-color: #0000ff;*/
  }
  .map {
    width: 100%;
    height: 94%;
  }
  /*隐藏百度左下的logo*/
  /deep/ .anchorBL {
    display: none;
  }

  .head {
    width: 100%;
    height: 6%;
    background-color: #000000;


    header {
      width: 100%;
      padding: .3rem .5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #000000;

      .back {
        overflow: hidden;
        flex: 1;
      }
      .head-font {
        flex: 3;
        color: #fff;
        text-align: center;

        span {
          font-weight: bold;
          color: #fff;
        }
      }
      .edit {
        flex: 1;

      }
    }

    i {
      font-size: 1rem;
      color: #fff;
    }
  }
</style>
