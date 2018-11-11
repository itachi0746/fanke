<template>
  <div id="shoplist">
    <!--商家列表-->
    <ul class="shoplist-container">
      <li class="shoplist-item" v-for="(item) in screenList" :key="item.Id" @click="toScreen($event)"
          :data-pid="item.Id">
        <div class="img-box">
          <img :src="item.Img" alt="">
        </div>
        <div class="desc-box">
          <p class="shop-name">
            <span class="ellipsis">
              {{ item.Name }}
            </span>

          </p>
          <div class="shop-data">
            <div class="shop-price">
              <span>¥</span>
              <span>{{ item.Price }}</span>
              <span></span>
            </div>
            <span class="flow">
              人流量: 约{{ item.Flowrate }}/h
            </span>
          </div>
          <div class="shop-data2">
            <div class="distance">
              <span>km</span>
            </div>
          </div>

          <!--促销-->
          <!--<div class="discount">-->
          <!--<div v-show="item.HasSales">-->
          <!--<span class="_cu">促</span>-->
          <!--<span>{{item.SalesDesc}}</span>-->
          <!--</div>-->
          <!--<div v-show="item.HasDiscount">-->
          <!--<span class="_hui">惠</span>-->
          <!--<span>{{item.DiscountDesc}}</span>-->
          <!--</div>-->
          <!--</div>-->
        </div>

      </li>

    </ul>
    <p class="empty_data" v-if="!isEnd">加载更多</p>
    <p class="empty_data" v-else>没有更多了</p>
  </div>
</template>

<script>
  import {postData, link} from '../../server'
  //  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        screenList: [],
        page: 1, // 一开始一页
        sum: 1,  // 最多可以有几页
        loadMoreSwitch: true,
        isEnd: false,
        latitude: 0,
        longitude: 0
      }
    },
    props: {
      sortId: String
    },

//  components: {},

    watch: {
      sortId(newVaule, oldVaule) {
        console.log(newVaule, oldVaule);
        this.screenList = [];
        this.getData();
      }
    },

    methods: {
      moneyChange(num, accuracy) {
        const tranReg = new Map([
          [9, 'b'], [6, 'm'], [3, 'k']
        ]);
        let ac = accuracy || 0;
        let length = typeof num === 'number' ? num.toString().length : num.length,
          result = num;
        tranReg.forEach((item, index) => {
          result = length > (index >= 6 ? index - 1 : index) ?
            (length = 0, (Math.round(num / 10 ** (index - ac)) / 10 ** ac) + item) : result;
        });
        return result;
      },

      getUserLocation() {
        let that = this;
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        try {
          if (ua.match(/MicroMessenger/i) === "micromessenger") {
            //在微信中打开
            if (wx) {  // 判断wx
              wx.ready(() => {
                wx.getLocation({
                  type: 'wgs84',
                  success: (res) => {
                    console.log('获取位置信息成功');
                    that.latitude = res.latitude;
                    that.longitude = res.longitude;
                    that.getData();
                  },
                  fail: (res) => {
                    console.log('获取位置信息失败');
                  }
                })
              })
            }
          }
        }
        catch(err) {
          console.log('err:',err)
        }


//
        if (window.location.hostname === 'localhost') {
          console.log('在localhost');
          this.getData();
        }

      },

      getData() {
        this.loadMoreSwitch = false;

        const url = '/GetProducts';
//        const url = 'http://www.bai.com/screenListAll';

        const data = {
          pageindex: this.page,
          OrderBy: this.sortId
        };
        postData(url, data).then((res) => {
          console.log(res)
          this.screenList = this.screenList.concat(res.Data.Models);
          this.loadMoreSwitch = true;
          this.sum = res.Data.PageCount;  // 总页数
//          console.log(this.sum)
          this.$emit('loaded', true);

          // 数字转化
          this.screenList.forEach((item) => {
            let result = '', num;
            if (item.Flowrate >= 10000) {
              num = item.Flowrate.toString();
              result = '.' + num.slice(-4)[0] + result;
              num = num.slice(0, num.length - 4);
              item.Flowrate = num + result + '万';

            }
          })
        })
      },
      toScreen(event) {
        const targetId = event.currentTarget.getAttribute('data-pid');
//        window.location.href = "screen.html?" + 'pid=1'
        GoToPage("screen", "screen.html", {'pid': targetId});
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
      },

    },

    created() {
      this.getUserLocation();
    },
    mounted() {

      window.onload = () => {
        /*监听加载更多*/
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
//            console.log(appH, wt, wh);
            if (appH - wt - wh < 100) {
              this.$emit('loaded', false);
              this.page++;
              this.getData();
              console.log('上拉加载更多')
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
    display: flex;
    width: 100%;
    border-top: 1px solid #f5f5f5;
    padding: .5rem;
    background-color: #fff;
  }

  .shop-name {
    font-size: .9rem;
    width: 100%;
    display: flex;

    span:nth-child(1) {
      @include sc(.8rem, #000);
      width: 12rem;
    }

  }

  .shop-data {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .flow {
      @include sc(.7rem, #666);
      text-align: right;
    }
  }

  .shop-data2 {
    display: flex;
    justify-content: flex-end;
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
    background-color: $bc;
  }

  .img-box {
    display: flex;
    align-items: center;
    /*margin-right: .5rem;*/
    img {
      width: 5rem;
      height: 5rem;
    }
  }

  .desc-box {
    padding-left: .5rem;
    flex: 1;
  }

  .distance {
    @include sc(.7rem, #666);

  }

</style>
