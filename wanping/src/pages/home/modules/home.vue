<template>
  <div id="home">

    <!--选地区-->
    <aFilter></aFilter>
    <!--轮播图 开始-->
    <swiper :options="swiperOption" ref="mySwiper" v-if="banner.length">
      <swiper-slide v-for="(item,index) in banner" :key="item.Id">
        <img :src="item.Img" alt="banner">
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
          <div class="recommend-item" v-for="(item,index) in recommend" :key="item.Id">
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
    <screenListAll></screenListAll>
    <Footer :page="page"></Footer>

  </div>

</template>

<script>
  import screenListAll from 'components/common/screenListAll'
  import Footer from 'components/footer/footer'
  import aFilter from './filter'
//  import BScroll from 'better-scroll'
  import {postData} from '@/server'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'Home',
    data() {
      return {
        page: 'Home',
        recommend: [],
        banner: [],
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
      const url = 'http://www.bai.com/recommend';
      postData(url).then(res => {
        console.log(res)
        this.recommend = res.Data
      });

      const url2 = 'http://www.bai.com/banner';
      postData(url2).then(res => {
        console.log(res)
        this.banner = res.Data;

      });

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },

    mounted() {
//      即定时器 20ms
      this.$nextTick(() => {

      });

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
    components: {
      aFilter,
      screenListAll,
      Footer,
      swiper,
      swiperSlide
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
    top: 1.6rem;
    height: 5rem;
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
    padding-left: .8rem;
    padding-bottom: .3rem;
  }

  .recommend-item-wrap {
    width: 50rem;
    /*width: auto;*/

  }

  .recommend-item {
    margin-left: 0.5rem;
    float: left;
    img, div, p {
      width: 5rem;
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
