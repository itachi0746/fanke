<template>
  <div id="shoplist">
    <!--商家列表-->
    <div class="shoplist-container">
      <div class="shoplist-item" v-for="(item, index) in screenList" :key="item.Id" @click="toScreen($event)"
           :id="item.Id">
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
            <span>{{item.DiscountDesc}}</span>
          </div>

        </div>
      </div>

    </div>
    <p class="empty_data" v-if="!isEnd">加载更多</p>
    <p class="empty_data" v-else>没有更多了</p>
  </div>
</template>

<script>
  import {postData, link} from '../../server'

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
//    props: {
//      searchResult: Array
//    },

//  components: {},

//  computed: {},

    methods: {
      getData() {
        this.loadMoreSwitch = false;

        const url = '/GetProducts';
        const data = {
          pageindex: this.page
        };
        postData(url, data).then((res) => {
          console.log(res)
          this.screenList = this.screenList.concat(res.Data.Models);
          this.loadMoreSwitch = true;
          this.sum = res.PageCount  // 总页数
        })

      },
      toScreen(event) {
        const targetId = event.currentTarget.id;
        GoToPage("screen","screen.html",{id:targetId});
       // window.location.href = 'screen.html?id=' + targetId;
      },
      // 获取窗口滚动条高度
      getScrollTop() {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
//        console.log(scrollTop)
        return scrollTop;
      },
//获取窗口可视范围的高度
      getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
          clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
//        console.log(clientHeight)
        return clientHeight;
      }
    },

    created() {

      this.getData()
    },
    mounted() {

      window.onload = () => {

        /*监听加载更多*/
//        $(window).scroll(() => {
////          console.log(1)
//          if (this.loadMoreSwitch) {
////            console.log(2)
////
//            if (this.page >= this.sum) {
//              this.isEnd = true;  // 没有更多了
//              return;
//            }
//            // 当滚动到最底部以上50像素时， 加载新内容
//            // 核心代码
//            if ($('#app').height() - $(window).scrollTop() - $(window).height() < 50) {
//              this.page++;
//              this.getData();
//              console.log('下拉加载更多')
//            }
//          }
//
//        });

//
        window.onscroll = () => {
          if (this.loadMoreSwitch) {
            if (this.page >= this.sum) {
              this.isEnd = true;  // 没有更多了
              return;
            }
            // 当滚动到最底部以上50像素时， 加载新内容
            // 核心代码
            let appH = document.getElementById("app").offsetHeight,
              wt = this.getScrollTop(),
              wh = this.getClientHeight();
            console.log(appH, wt, wh);
            if (appH - wt - wh < 100) {
              this.page++;
              this.getData();
              console.log('下拉加载更多')
            }

          }
        }


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
