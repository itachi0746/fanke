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
              <span>{{ item.Distance }}</span>
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
      sortObj: {
        type: Object,
        default: function() {
          return {'id':'1','sortType':'0'}
        }
      },

    },

//  components: {},

    watch: {
      sortObj(newVaule, oldVaule) {
//        debugger
        console.log(newVaule, oldVaule);
        this.screenList = [];
        this.getData();
      }
    },

    methods: {

      /**
       * @method 初始化
       */
      initApp() {
        try {
          this.getUserLocation();
//          await this.UpdateLocation();
        } catch (err) {
          console.log('initApp:',err);
        }
      },

      /**
       * @method 获取用户位置,wx是后台注入的对象
       */
      getUserLocation() {
//        debugger
        let that = this;
        try {
          console.log('that:',that)
          if (wx) {  // 判断wx
            wx.ready(() => {
              wx.getLocation({
                type: 'wgs84',
                success: (res) => {
                  console.log('获取位置信息成功');
                  that.latitude = res.latitude;
                  that.longitude = res.longitude;
                  this.UpdateLocation();
                },
                fail: (res) => {
                  console.log('获取位置信息失败');
                }
              })
            })
          } else {
            console.log('不在微信浏览器或没wx对象');

          }
        }
        catch (err) {
          console.log('err:', err);
        }

      },

      /**
       * @method 请求获取数据
       */
      getData() {
//        debugger
        this.loadMoreSwitch = false;

        const url = '/GetProducts';
//        const url = 'http://www.bai.com/screenListAll';
        console.log('this.sortObj',this.sortObj)
        const data = {
          pageindex: this.page,
          OrderBy: this.sortObj.id,
          OrderType: this.sortObj.sortType
        };
        postData(url, data).then((res) => {
          console.log(res)
          this.screenList = this.screenList.concat(res.Data.Models);
          this.loadMoreSwitch = true;
          this.sum = res.Data.PageCount;  // 总页数
//          console.log(this.sum)
          this.$emit('loaded', true);

          this.dateFormatting();
        })
      },
      toScreen(event) {
        const targetId = event.currentTarget.getAttribute('data-pid');
        GoToPage("screen", "screen.html", {'pid': targetId});
      },
      /**
       * @method 获取窗口滚动条高度
       */
      getScrollTop() {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      },
      /**
       * @method 获取窗口可视范围的高度
       */
      getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
          clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
      },
      /**
       * @method 格式化数据
       */
      dateFormatting() {
        // 数字转化
        this.screenList.forEach((item) => {
          let result = '', num;
          if (item.Flowrate >= 10000) {
            num = item.Flowrate.toString();
            result = '.' + num.slice(-4)[0] + result;
            num = num.slice(0, num.length - 4);
            item.Flowrate = num + result + '万';
          }

          let result2 = '', num2;
          item.Distance = Math.round(item.Distance);
//          console.log(item.Distance);
          if(item.Distance >= 1000) {
            num2 = item.Distance.toString();
            result2 = '.' + num2.slice(-3)[0] + result2;
            num2 = num2.slice(0, num2.length - 3);
            item.Distance = num2 + result2 + 'km';
          }
        });

      },
      /**
       * @method 向后台发送经纬度
       */
      UpdateLocation() {
//        debugger
        const url = '/UpdateLocation';
        console.log('this.latitude,this.longitude:',this.latitude,this.longitude);

        postData(url,{latitude:this.latitude,longitude:this.longitude}).then((res) => {
          console.log('UpdateLocation:',res);
          this.getData();
        })
      }
    },

    created() {
//      this.getUserLocation();
      this.initApp();
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
    /*margin-bottom: .25rem;*/
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
      @include sc(.7rem, $payColor);
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
