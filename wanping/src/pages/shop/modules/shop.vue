<template>
  <div class="shop">
    <Header :headName="headName"></Header>
    <div v-if="ads.length">
      <el-carousel height="10rem">
        <el-carousel-item v-for="(item,index) in ads" :key="index">
          <!--<h3>{{ item }}</h3>-->
          <img :src="item.ImageUrl" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="shopData">
      <h5>{{ resData.Name }}</h5>
      <!--<span>商家信息</span>-->
    </div>

    <ScreenList></ScreenList>
    <Footer></Footer>
  </div>
</template>

<script>
  import ScreenList from 'components/common/screenList'
  import Header from 'components/header/header'
  import Footer from 'components/footer/footer'
  import {Message} from 'element-ui'
  import {getUrlParms,IOSConfig} from '@/config/utils'
  import {postData} from '../../../server'

  export default {
    data() {
      return {
        headName: '商家详情',
        resData: {},
        ads: []
      }
    },

    components: {
      ScreenList,
      Header,
      Footer
    },

    computed: {},

    methods: {},

    created() {
      const args = getUrlParms();
      let theId = null;
//      debugger
      if (process.env.NODE_ENV === 'production') {
        theId = args.bizid;
      } else {
        theId = '16167f6f559346ccb113aee153c88675'
      }
      if (theId) {
        const url = '/GetBusiness';
        const data = {
          'bizId': theId
        };
        postData(url,data).then((res) => {
          console.log(res);
          this.resData = res.Data;
          this.ads = res.Data.Ads
        })
      } else {
        console.log('没有bizid');
        Message({
          type: 'error',
          message: '获取店铺信息失败!'
        });
      }
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .shop {
    /*padding: .5rem;*/
  }
  .shopData {
    padding: .5rem;
    border-bottom: 0.5rem solid #ddd;

    h5 {
      font-weight: bold;
    }
   span {
     @include sc(12px,#666);
   }
  }
  .el-carousel__item {

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
