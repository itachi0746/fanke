<template>
  <div id="home" ref="homepage">
    <div class="city-wrapper" v-if="showCity">
      <v-distpicker type="mobile" :theExtH="theExtH" @selected="onSelected" @city="onCity" @province="onProvince" :province="curPoisition.province.value" :city="curPoisition.city.value" :area="curPoisition.area.value"></v-distpicker>
    </div>
    <Loading v-show="isLoading"></Loading>
    <!--选地区-->
    <aFilter ref="af" :isShowCity="showCity" @sort="handleSort" @fenlei2="handleFenLei" @change-city="handleChangeCity"></aFilter>
    <div class="fill-div"></div>
    <!--轮播图 开始-->
    <swiper :options="swiperOption" ref="mySwiper" v-if="Ads.length">
      <swiper-slide v-for="(item, index) in Ads" :key="item.Index">
        <img :src="item.ImageUrl" alt="" @click="clickBanner(item.LinkAddress)">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <!--<div v-if="Ads.length">-->
      <!--<el-carousel height="10rem">-->
        <!--<el-carousel-item v-for="(item,index) in Ads" :key="item.Index">-->
          <!--<img :src="item.ImageUrl" alt="" @click="clickBanner(item.LinkAddress)">-->
        <!--</el-carousel-item>-->
      <!--</el-carousel>-->
    <!--</div>-->
    <!--轮播图 结束-->

    <!--推荐列表 开始-->
    <div class="recommend-container">
      <div class="recommend-title">
        <span>热门推荐</span>
      </div>
      <div class="recommend-item-container">
        <div class="recommend-item-wrap">
          <div class="recommend-item" v-for="(item) in Recommends" :key="item.Id" @click="toScreen($event)" :data-pid="item.Id">
            <div>
              <img :src="item.Img" alt="">
            </div>
            <!--<p class="ellipsis">-->
              <!--{{item.Name}}-->
            <!--</p>-->
            <div class="item-name">
              {{item.Name}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--推荐列表 结束-->

    <!--分割条-->
    <div class="division"></div>
    <screenListAll @loaded="handleLoad" :sort-obj="sortObj" :fenlei-obj="fenleiObj" :city-name="cityName"></screenListAll>
    <Footer :page="page"></Footer>
    <!--<div class="iosBtm" v-if="isIOS"></div>-->

  </div>

</template>

<script>
  import screenListAll from 'components/common/screenListAll'
  import Loading from 'components/common/loading'
  import Footer from 'components/footer/footer'
  import aFilter from './filter'
  import VDistpicker from '../../../components/city/Distpicker.vue'
  import {postData} from '@/server'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'Home',
    data() {
      return {
        Ads: [],
        page: 'Home',
        isLoading: false,
        Recommends: [],
        sortObj: {'id':'1','sortType':'1'},  // 排序对象
        fenleiObj: {'ClsId': ''},
        showCity: false,
        theExtH: 0,
        cityName: {
          city:{
            value: ''
          },
          area:{
            value: ''
          }
        },
        addAllArea: false,
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          autoplay: {
            disableOnInteraction: false,
          },
        },
        curPoisition: {
          city:{
            value: ''
          },
          area:{
            value: ''
          },
          province: {
            value: ''
          }
        }
      }
    },
    created() {
      const url = '/GetAds';
      postData(url).then(res => {
//        console.log(res)
        this.Ads = res.Data
      });

      const url1 = '/GetRecommends';
      postData(url1).then(res => {
//        console.log(res)
        this.Recommends = res.Data
      });

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      isIOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac');
          return true
        }
      }
    },

    mounted() {

    },
    methods: {
      clickBanner(address) {
//        console.log(add);
        if(address) {
          window.location.href = address;
        } else {
          console.log('没有链接地址');
        }
      },

      toScreen(e) {
        const targetId = e.currentTarget.getAttribute('data-pid');
        console.log(targetId);
        GoToPage('screen','screen.html',{'pid':targetId})
      },
      handleLoad(loaded) {
//        this.isLoading = !loaded
      },
      /**
       * @method 排序
       */
      handleSort(obj) {
        this.sortObj = obj;
//        debugger
      },
      handleFenLei(obj) {
        this.fenleiObj = obj;
      },
      handleChangeCity(params) {
//        debugger
        this.showCity = params[1];// 是否显示城市选择
        this.theExtH = params[0];// 分类filter高度
      },
      onSelected(d) {
//        console.log(d)
        console.log(d.province.value + ' | ' + d.city.value + ' | ' + d.area.value);

//        this.showCity = !this.showCity;
        this.showCity = false;
        this.cityName = d;
        this.curPoisition = d;

      },
      onProvince(d) {
        console.log('onProvince:',d);
        this.curPoisition.province.value = d.value;
      },
      onCity(d) {
        console.log('oncity:',d)
        this.curPoisition.city.value = d.value;

        let ul = document.querySelectorAll('.address-container ul')[0];
        let firstLi = ul.querySelectorAll('li')[0];
//        let cl = firstLi.classList;
//        console.log(cl)
      },

    },
    components: {
      aFilter,
      screenListAll,
      Footer,
      swiper,
      swiperSlide,
      Loading,
      VDistpicker
//      city
    },

    beforeDestroy: function () {
//      clearTimeout(this.timer1)
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .swiper-container {
    width: 100%;
    position: relative;
    height: 10rem;

    img {
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: #f9ce04!important;
    }
  }

  .recommend-container {
    width: 100%;
    margin-top: .5rem;
    /*height: 10rem;*/
    overflow: hidden;
  }

  .recommend-item-container {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
    padding-left: .5rem;
  }

  .recommend-title {
    font-size: .75rem;
    padding: .3rem 0 .3rem .8rem;

  }

  .recommend-item-wrap {
    width: 100rem;
    /*width: auto;*/
  }

  .recommend-item {
    padding-right: 0.5rem;
    float: left;
    img, div, p {
      width: 5rem;
    }
    div {
      background-color: #ffffff;
    }
    img {
      height: 7rem;

    }
    p {
      font-size: .75rem;
      padding-left: .2rem;
      text-align: center;
    }
  }

  .division {
    width: 100%;
    height: .5rem;
  }


  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 0px;
    height: 0px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }

  .iosBtm {
    width: 100%;
    height: 3.5rem;
  }

  .fill-div {
    height: 1.65rem;
  }
  .city-wrapper {
    position: fixed;
    /*top: 0;*/
    top: 1.65rem;
    bottom: 0;
    width: 100%;
    z-index: 999999;
    background-color: #fff;
  }
  .item-name {
    word-wrap: break-word;
    word-break: normal;
    font-size: .75rem;
    padding-left: .2rem;
    text-align: center;
    /*height: 3rem;*/
  }


</style>
