<template>
  <div id="shoplist">
    <!--商家列表-->
    <div class="shoplist-container">
      <div class="shoplist-item" v-for="(item,index) in screenList" :key="item.Id" @click="toScreen($event)" :id="item.Id">
        <p class="shop-name">
          {{ item.Name }}
          <span class="right">
          人流量: {{ item.Flowrate }}/h
        </span>
        </p>
        <div class="oh">
          <div class="left shop-price">
            <span>¥</span>
            <span>{{ item.Price }}</span>
            <span>起</span>
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
      </div>

    </div>
    <p class="empty_data" v-if="!isEnd">加载更多</p>
    <p class="empty_data" v-else>没有更多了</p>
  </div>
</template>

<script>
  import {postData} from '../../server'
//  import Store from '@/config/store'

  export default {
    data() {
      return {
        screenList: [],
        page: 1, // 一开始一页
        sum: 5,  // 最多可以有几页
        loadMoreSwitch: true,
        isEnd: false
      }
    },

//  components: {},

//  computed: {},

    methods: {
      getData() {
        this.loadMoreSwitch = false;

        const url = 'http://www.bai.com/screenListAll';
        postData(url).then((res) => {
//      console.log(res)
          this.screenList = this.screenList.concat(res.Data);
          this.loadMoreSwitch = true;

        })

      },
      toScreen(event) {
//        Store.save('SCREEN_ID',)
        const target = event.currentTarget;
//        console.log(target)
        window.location.href = 'screen.html'
      }
    },

    created() {
      this.getData()
    },
    mounted() {

      window.onload = () => {

        /*监听加载更多*/
        $(window).scroll(()=> {
//          console.log(1)
          if (this.loadMoreSwitch) {
//            console.log(2)
//
            if (this.page >= this.sum) {
              this.isEnd = true;  // 没有更多了
              return;
            }
            // 当滚动到最底部以上50像素时， 加载新内容
            // 核心代码
            if ($('#app').height() - $(window).scrollTop() - $(window).height() < 50) {
              this.page++;
              this.getData();
              console.log('下拉加载更多')
            }
          }

        });
      }

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
      @include sc(.7rem, #666);
    }
  }

  .shop-price {
    span {
      @include sc(.7rem, $blue);
    }
    span:nth-child(2) {
      font-size: 1rem;
    }

  }

  .discount span {
    @include sc(.7rem, #666);

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
