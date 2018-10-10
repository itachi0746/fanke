<template>
  <div id="home">
    <Loading v-show="isLoading"></Loading>
    <!--选地区-->
    <!--<aFilter ref="af"></aFilter>-->
    <!--轮播图 开始-->
    <swiper :options="swiperOption" ref="mySwiper" v-if="Ads.length">
      <swiper-slide v-for="(item,index) in Ads" :key="item.Index" @click="">
        <img :src="item.ImageUrl" alt="Ads">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <!--轮播图 结束-->

    <!--推荐列表 开始-->
    <div class="recommend-container">
      <div class="recommend-title">
        <span>热门推荐</span>
      </div>
      <div class="recommend-item-container">
        <div class="recommend-item-wrap">
          <div class="recommend-item" v-for="(item,index) in Recommends" :key="item.Id" @click="toScreen($event)" :data-pid="item.Id">
            <div>
              <img :src="item.Img" alt="">
            </div>
            <p class="ellipsis">
              {{item.Name}}
            </p>
          </div>
        </div>
      </div>

    </div>
    <!--推荐列表 结束-->

    <!--分割条-->
    <div class="division"></div>
    <screenListAll @loaded="handleLoad"></screenListAll>
    <Footer :page="page"></Footer>

  </div>

</template>

<script>
  import screenListAll from 'components/common/screenListAll'
  import Loading from 'components/common/loading'
  import Footer from 'components/footer/footer'
//  import aFilter from './filter'
//  import BScroll from 'better-scroll'
  import {postData} from '@/server'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'Home',
    data() {
      return {
        Ads: [],
        page: 'Home',
        isLoading: true,
        Recommends: [],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          autoplay: {
            disableOnInteraction: false,
          },
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
        console.log(res)
        this.Recommends = res.Data
      });

//      const url2 = '/GetProducts';
//      postData(url2).then(res => {
//        console.log(res)
//
//      });

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },

    mounted() {


//      this.timer1 = setTimeout(() => {
//        this.scroll = new BScroll('#category-left', {
//          //开启点击事件 默认为false
//          click: true
//        });
//        this.scroll2 = new BScroll('#category-right', {
//          //开启点击事件 默认为false
//          click: true
//        })
//      }, 30);

    },
    methods: {
      toScreen(e) {
        const targetId = e.currentTarget.getAttribute('data-pid');
        console.log(targetId);
        GoToPage('screen','screen.html',{'pid':targetId})
      },
      handleLoad(loaded) {
        if(loaded) {
          this.isLoading = false;
        } else {
          this.isLoading = true;
        }
      }
    },
    components: {
//      aFilter,
      screenListAll,
      Footer,
      swiper,
      swiperSlide,
      Loading
    },

    beforeDestroy: function () {
//      clearTimeout(this.timer1)
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";


  .swiper-container {
    /*margin-top: 1.6rem;*/
    width: 100%;
    position: relative;
    /*top: 1.6rem;*/
    height: 7rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .recommend-container {
    width: 100%;
    margin-top: 1.5rem;
    height: 10rem;
    overflow: hidden;
  }

  .recommend-item-container {
    overflow-x: scroll;

  }

  .recommend-title {
    font-size: .75rem;
    /*padding-left: .8rem;*/
    /*padding-bottom: .3rem;*/
    padding: .3rem 0 .3rem .8rem;
  }

  .recommend-item-wrap {
    width: 100rem;
    /*width: auto;*/

  }

  .recommend-item {
    margin-left: 0.5rem;
    float: left;
    img, div, p {
      width: 5rem;
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
    background-color: #e2e2e2;
  }


</style>
