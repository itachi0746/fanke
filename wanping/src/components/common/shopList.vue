<template>
  <div id="shoplist">
    <!--商家列表-->
    <div class="shoplist-container">
      <div class="shoplist-item" v-for="(shop,index) in shopList" :key="index">
        <a href="shop.html">
          <p class="shop-name">
            {{ shop.Name }}
            <span class="right">
            人流量: {{ shop.Flowrate }}/h
          </span>
          </p>
          <div class="oh">
            <div class="left shop-price">
              <span>¥</span>
              <span>{{ shop.Prize }}</span>
              <span>起</span>
            </div>
            <div class="left screen-param">
              <span>屏幕参数:</span>
              <span>100*100</span>
            </div>

          </div>
          <div class="discount">
            <div>
              <span class="_cu">促</span>
              <span>促销描述</span>
            </div>
            <div>
              <span class="_hui">惠</span>
              <span>优惠描述</span>
            </div>

          </div>

        </a>
      </div>

    </div>
    <p class="empty_data">没有更多了</p>
  </div>
</template>

<script>
  import {postData} from '../../server'
//  import BScroll from 'better-scroll'

export default {
  data () {
    return {
      shopList: []
    }
  },

//  components: {},

//  computed: {},

//  methods: {}

  created() {
    const url = 'http://www.bai.com/GetShop';
    postData(url).then((res) => {
//      console.log(res)
      this.shopList = res.shopList;
    })
  },
  mounted() {

    this.$nextTick(() => {


    });
    setTimeout(()=> {
      const wh = window.innerHeight;
      const bh = document.querySelector('#app').offsetHeight;
      console.log(wh,bh)
    },1000)

  }

//  beforeDestroy: function() {}
}
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  /*商家列表*/
  #shoplist {
    height: 100%;
    overflow-y: auto;
  }
  .shoplist-item {
    width: 100%;
    border-top: 1px solid $bc;
    padding: .5rem;
  }
  .shop-name {
    font-size: .9rem;

    span {
      /*font-size: .7rem;*/
      @include sc(.7rem , #666);
    }
  }
  .shop-price  {
    span {
      @include sc(.7rem , $blue);
    }
    span:nth-child(2) {
      font-size: 1rem;
    }

  }
  .screen-param  {
    padding-left: 1rem;

    span {
      @include sc(.7rem , #ffa351);

    }
  }
  .discount span {
    @include sc(.7rem , #666);

  }
  .discount ._cu {
    @extend %_cu;
  }
  .discount ._hui {
    @extend %_hui;
  }

  .empty_data {
    font-size: 0.6rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
    margin-bottom: 2.3rem;
    background-color: #fff;
  }

</style>
