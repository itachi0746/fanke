<template>
  <div class="screen-detail" ref="screen">
    <Header :headName="headName"></Header>
    <!--轮播图 开始-->
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide @click="" v-for="(item,index) in resData.Imgs" :key="index">
        <img :src="item" alt="轮播图">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--轮播图 结束-->

    <div class="screen-data">
      <h5>{{resData.Name}}</h5>
      <p class="screen-desc">{{resData.Desc}}</p>

      <p class="screen-desc">Step1: 点击日期查看大屏的剩余广告位</p>
      <p class="screen-desc">Step2: 选择广告位数量, 点击添加</p>
      <p class="screen-desc">Step3: 点击下方的购买按钮</p>
      <!--<p class="screen-desc">备注: </p>-->
    </div>
    <div class="action-bar">
      <ul>
        <li>

        </li>
        <li>

        </li>
        <li @click="handleMap">
          <i class="el-icon-location"></i><span>大屏位置</span>
        </li>
      </ul>
    </div>
    <div class="calendar">
      <Calendar v-on:choseDay="clickDay"
                v-on:changeMonth="changeDate" :agoDayHide="timeStampStart"
                :markDate="markDate" :futureDayHide="timeStampOver"></Calendar>
    </div>
    <div class="data-container">
      <div class="data-box" v-if="curDayObj">
        <p>
          <i class="data-spot"></i>
          <span class="data-tag-font">{{curMonth}}月 {{curDay}}日 :  </span>
        </p>
        <p>
          <span>剩余广告位: </span>
          <span class="AD-num">{{curDayObj.Remain}}</span> 个
          <span class="right">
            <span>单价: </span>
            ¥<span class="UP-num">{{ curDayObj.Price }}</span>
          </span>
        </p>


      </div>

      <div class="data-box">
        <p>
          <i class="data-spot"></i>
          <span class="data-tag-font">选择想购买的广告位数量 :</span>
        </p>
        <p class="number" v-if="curDayObj">

          <button :class="['button','decrease', {disabled:num<=1}]" @click="reduceNum">-</button>
          <input id="number" type="number" :value="num" readonly="readonly">
          <button :class="['button','increase', {disabled:num>=curDayObj.Remain}]" @click="addNum">+</button>
          <el-button size="small" type="primary" class="right" @click="addSelected" :disabled="curDayObj.Remain===0">
            添加
          </el-button>

        </p>
      </div>
      <div class="data-box">
        <p class="">
          <i class="data-spot"></i>
          <span class="data-tag-font">您已选择的广告位 :</span>

        </p>
        <section v-if="selected.length">
          <p v-for="(item,index) in selected" :key="item.Date">
            <span>{{item.Date}}</span>
            广告位数量:
            <span>{{item.Count}}</span>
            <i class="el-icon-close right" @click="delSelected($event)" :data-date="item.Date"></i>
          </p>
        </section>
        <section v-else>
          <p>暂无</p>
        </section>
      </div>
      <!--<div class="prize-box">-->
        <!--&lt;!&ndash;<section>&ndash;&gt;-->
        <!--&lt;!&ndash;<span>已选择数量: </span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="sum-num"> {{ sumNum }}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span>个</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</section>&ndash;&gt;-->
        <!--<section>-->
          <!--<span>应付: </span>-->
          <!--<span> ¥</span>-->
          <!--<span class="sum-prize">{{ sumPrice }}</span>-->
        <!--</section>-->
      <!--</div>-->


    </div>
    <!--操作部分-->
    <div class="actionBar">
      <div class="prize-box">
        <!--<section>-->
        <!--<span>已选择数量: </span>-->
        <!--<span class="sum-num"> {{ sumNum }}</span>-->
        <!--<span>个</span>-->
        <!--</section>-->
        <section>
          <span>应付: </span>
          <span> ¥</span>
          <span class="sum-prize">{{ sumPrice }}</span>
        </section>
      </div>
      <ul>
        <li class="shop-car" @click="addToBasket">加入购物车</li>
        <li class="buy-btn" @click="handleOrder">购买</li>
      </ul>
    </div>

    <!--loading-->
    <Loading v-show="isLoading"></Loading>
    <!--地图-->
    <Map @hide-map="handleMap" :coordinate="{'Latitude':resData.Latitude,'Longitude':resData.Longitude,'Name':resData.Name,'x':resData.Name.length/2*14}" v-if="showMap"></Map>
    <!--<div class="iosBtm" v-if="isIOS"></div>-->
    <!--商品详情-->
    <div class="screen-dtl">
      <header>
        <div class="head-font">
          大屏详情
        </div>
      </header>
      <div class="screen-property">
        <!--<div>使用类型: {{resData.PositionTypeName}}</div>-->
        <div>分辨率: {{resData.ScreenParameters}}</div>
        <!--<div>屏幕类型: {{resData.ClsName}}</div>-->
      </div>
      <div class="dtl-main" v-html="resData.DtlDesc">
      <!--<div class="dtl-main" v-html="test">-->
        <!--{{resData.DtlDesc}}-->
      </div>
    </div>
    <div class="fillBtm"></div>

    <Footer></Footer>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component'
  import Header from '../../../components/header/header.vue'
  import Footer from '../../../components/footer/footer.vue'
  import Loading from '../../../components/common/loading.vue'
  import Map from '../../../components/common/map.vue'
  import {postData} from '@/server'
  import {getUrlParms, IOSConfig} from '@/config/utils'

  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css'

  export default {
    data() {
      return {
        headName: '屏幕详情',
        Id: '',
        markDate: [],  // 标记日期
        timeStampStart: 0 + '',  //日历
        timeStampOver: 0 + '',
        oneDay: 86400000,  // 一天的毫秒数
        num: 1,  // 已选择数量
        sumNum: 0,  // 已添加的数量
        UP: null,  // 单价
        resData: {},  // 响应返回的data
        days: [],  // 向后一个月的数据
        curDayObj: null,  // 当前显示的某天的obj
        selected: [],  // 已选择的广告位
        itemId: 0,  // 所选择时段的id
        isLoading: false,
        showMap: false,
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
//          loop: true,
//          autoplay: {
//            disableOnInteraction: false,
//          },
        },
//        test: '<p>ffffff烦烦test烦烦烦烦烦烦烦方法灌灌灌灌灌灌灌灌灌灌灌灌灌红红火火恍恍惚惚</p><img src="http://tpc.googlesyndication.com/simgad/5843493769827749134" alt=""><span>nihao你好</span>'
      }
    },

    components: {
      Calendar,
      Header,
      Loading,
      Footer,
      swiper,
      swiperSlide,
      Map
    },

    computed: {
      oneMonth() {
        return this.oneDay * 29
      },
      sumPrice() {  // 遍历各天,计算总价
        let result = 0;
        if (this.selected.length) {
          this.selected.forEach((item) => {
            result += item.Amount;
          });
        }
        return result
      },
      curMonth() {
        if (this.curDayObj !== null) {
          return this.curDayObj.Date.split('-')[1];
        }
      },
      curDay() {
        if (this.curDayObj !== null) {
          return this.curDayObj.Date.split('-')[2];
        }
      },
      isIOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac')
          return true
        }
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      },

    },

    methods: {
      clickDay(data) {  //选中某天
        console.log(data);
        this.num = 1;
        this.findDay(data)
      },
      changeDate(data) {
//        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },
      addNum() {
        if (this.curDayObj !== null) {
          this.num < this.curDayObj.Remain ? this.num++ : this.num
        }
      },
      reduceNum() {
        this.num > 1 ? this.num-- : this.num
      },

      //从1970年开始的毫秒数,减去一天的毫秒数,然后截取10位变成
      timest() {
        let a = Date.parse(new Date());
        let yesterday = (a - this.oneDay).toString();
        let oneMonth = (a + this.oneMonth).toString();
//        console.log(tmp)
        yesterday = yesterday.substr(0, 10);
        oneMonth = oneMonth.substr(0, 10);
        return [yesterday, oneMonth];
      },
      findDay(data) {  // 遍历日期数组 找到点击的是哪一天
        let arr, d, str;
        arr = data.split('/');
        d = parseInt(arr[2]);
        d = d < 10 ? '0' + d : d;
        str = arr[0] + '-' + arr[1] + '-' + d;

        console.log('findDay:', str);

        for (let i = 0; i < this.days.length; i++) {
//          console.log(str, this.days[i].Date)
          if (this.days[i].Date === str) {
            this.curDayObj = this.days[i];
//            console.log(this.days[i]);
            break
          }
        }
      },
      addSelected() {  // 选择广告位
        const repeated = this.isRepeated(this.curDayObj.Date);
        this.sumNum = this.num;
        if (!repeated) {  // 不是重复的
          let newItem = {
            'PsId': this.Id,
            'Date': this.curDayObj.Date,
            'Count': this.sumNum,  // 数量
            'Price': this.UP,  // 单价
            'Amount': this.UP * this.sumNum  // 总价
          };
          this.itemId++;
          this.selected.push(newItem);
        } else {  // 重复的
          repeated.Count += this.sumNum;  // 重新计算数量
          repeated.Count = repeated.Count > this.curDayObj.Remain ? this.curDayObj.Remain : repeated.Count;  // 防止超出
          repeated.Amount = repeated.Count * repeated.Price;  // 重新计算总价

        }

      },
      /**
       * @method 判断是否有重复,并返回结果
       * @param {String} date 日期
       */
      isRepeated(date) {
        let temp = null;

        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i].Date === date) {
            temp = this.selected[i];
            break
          }
        }
        return temp

      },
      delSelected(event) {  // 删除选中的时段
        const Tdate = event.target.getAttribute('data-date');
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i].Date === Tdate) {
//            console.log(index, item.id);
            this.selected.splice(i, 1);
            break;
          }
        }
      },

      buy() {  // 购买 确认下单

        let data = {
          name: this.resData.Name,
          id: this.Id,
          sumPrice: this.sumPrice,
          items: this.selected
        };
        GoToPage('orderConfirm', 'orderConfirm.html', {})

      },
      addToBasket() {  // 添加到购物车
        this.isLoading = true;
        const url = '/AddToBasket';

        postData(url, this.selected).then((res) => {
          console.log('AddToBasket', res);
//          console.log(this.selected);
          this.isLoading = false;
          GoToPage('cart', 'cart.html', {})
        });
      },
      /**
       * @method 购买
       */
      handleOrder() {
        this.isLoading = true;
//        const url = '/ConfirmOrder';
        const url = '/PlaceOrder';
        const data = {
          "FromBasket": false,
          "items": this.selected
        };
        postData(url, data).then((res) => {
          console.log(res);
          this.isLoading = false;
          GoToPage('orderConfirm', 'orderConfirm.html', {'id': res.Data, 'fromBasket': false})
        })
      },
      /**
       * @method ios微信浏览器底部操作栏兼容
       */
      calIOSMargin() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac')
          let MB = window.getComputedStyle(this.$refs.screen).marginBottom;
          console.log(MB)
          console.log(parseInt(MB))
          this.$refs.screen.style.marginBottom = parseInt(MB) + 30 + 'px';
          console.log(this.$refs.screen.style.marginBottom)
        }
      },

      handleMap() {
        this.showMap = !this.showMap;
      },
      /**
       * @method 计算购物车中的项,把项的ItemId加入数组中并返回
       */
//      handleItems() {
//        let arr = [];
//        this.selected.forEach((item)=> {
//          let newItem = {
//            "PsId": item.PsId,  // 产品id
//            "Count": item.Count,  // 广告位数量
//            "Date": item.Date,  // 日期
//            "Amount": item.Amount,  // 总价
//            "Price": item.Price  // 价格
//          };
//          arr.push(newItem)
//
//        });
//        return arr
//      }


    },

    created() {
//      IOSConfig();
      const args = getUrlParms();
      this.Id = args.pid;
//      console.log(args);

      const url = '/Detail';
      const data = {
        id: this.Id
      };
      postData(url, data).then((res) => {
        console.log(res)
        this.resData = res.Data;
        this.days = res.Data.DayStates;  // 日期数组
        this.UP = this.days[0].Price;  // 今天的产品的单价

        this.curDayObj = this.days[0]  // 当前显示的天
      });


    },

    mounted() {
      this.timeStampStart = this.timest()[0];
      this.timeStampOver = this.timest()[1];
      console.log('screen  mounted',)
//      this.calIOSMargin();
    },

    beforeDestroy() {
    }

  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .screen-data {
    padding: .5rem;

    h5 {
      font-weight: bold;
      color: #000;
    }

    .screen-desc:nth-child(3) {
      margin-top: .5rem;
    }
  }

  .screen-dtl {
    margin: .5rem;

    header {
      height: 1.5rem;
      border-bottom: 2px solid #42aef3;

    }

    .head-font {
      background: #3297f5;
      /*width: 92px;*/
      width: 4.2rem;
      margin-bottom: 5px;
      /*margin-left: .5rem;*/
      color: #fff;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      font-size: .8rem;
    }
    .screen-property {
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: .8rem;
      color: rgb(51, 51, 51);
    }
    .dtl-main {
      text-indent: 2em;
      margin-top: 5px;
      font-size: .8rem;
      line-height: 25px;
      padding-top: 5px;

      /deep/ * {
        padding: 0;
        margin: 0;
      }
      /deep/ img {
        max-width: 100%;
      }
      /deep/ p {
        font-size: .8rem;
        /*line-height: 20px;*/
        font-family: "Microsoft Yahei", Arial, sans-serif;

      }
      /deep/ span {
        font-size: .8rem;
        /*line-height: 24px;*/
        font-family: "Microsoft Yahei", Arial, sans-serif;

      }
      /deep/ h1,h2,h3,h4,h5,h6{
        font-family: "PT Sans","SF UI Display", ".PingFang SC","PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;
        text-rendering:optimizelegibility;margin-bottom:1em;font-weight:bold; line-height: 1.2rem;
      }

    }
    .dtl-main >>> * {
      padding: 0;
      margin: 0;
    }
    .dtl-main >>> img {
      max-width: 100%;
    }
    .dtl-main >>> p,span {
      font-size: 14px;
      line-height: 20px;
      font-family: "Microsoft Yahei", Arial, sans-serif;

    }

    .markDiv >>> h1,h2,h3,h4,h5,h6{
      font-family: "PT Sans","SF UI Display", ".PingFang SC","PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;
      text-rendering:optimizelegibility;margin-bottom:1em;font-weight:bold; line-height: 1.8rem;
    }
  }

  .action-bar {
    padding: 0 1rem .5rem;

    ul {
      display: flex;

      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          @include sc(.75rem, #000);
        }

        .el-icon-location {
          font-size: .9rem;
        }
      }
    }
  }

  .screen-desc {
    @include sc(.7rem, #666);
  }

  .data-container {
    padding: .5rem;
    p {
      position: relative;
      height: 1.3rem;
    }
  }

  .data-box {
    padding-left: 1rem;
    font-size: .8rem;
    margin-top: .5rem;

  }

  .prize-box {
    /*position: fixed;*/
    /*bottom: 2.3rem;*/
    /*left: 0;*/
    background-color: #fff;
    border-top: 1px solid #dddddd;
    width: 100%;
    height: 2rem;
    padding: 0 .5rem;
    @include fj;

    section {
      display: flex;
      align-items: center;

    }

    span {
      @include sc(.7rem, #666);
    }

    .sum-num {
      @include sc(.9rem, $blue)

    }
    .sum-prize {
      @include sc(.9rem, $payColor)

    }
  }

  .AD-num {
    color: $blue;

  }

  .UP-num {
    color: $payColor;

  }

  .calendar {
    border-top: 1px solid #ededed;
  }

  .data-tag-font {
    @include sc(.7rem, #7c7c7c);
  }

  .data-spot {
    @include wh(.25rem, .25rem);
    background-color: $blue;
    position: absolute;
    left: -.75rem;
    top: .5rem;
  }

  .number {
    @include wh(100%, 100%);
    border-radius: 3px;
    margin-bottom: .7rem;
    /*float: right;*/

    input[type=number] {
      line-height: 1.2rem;
      height: 1.5rem;
      width: 3rem;
      text-align: center;
      font-size: .7rem;
      font-weight: 700;
      border: 1px solid #e3e3e3;
      background-color: #e3e3e3;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      margin: 0;
      float: left;
    }

    .button {
      outline: 0;
      line-height: 1.2rem;
      height: 1.5rem;
      width: 2rem;
      font-size: 1rem;
      font-weight: 700;

      border: 1px solid #e3e3e3;
      background-color: #e3e3e3;
      float: left;

    }
    .decrease {
      border-right: 2px solid #fff;
    }
    .increase {
      border-left: 2px solid #fff;
    }
    .disabled {
      color: #bbbbbb;
    }
    .right {
      height: 1.5rem;
      width: 5rem;
    }
    .add {
      width: 4rem;
      height: 1.5rem;
      background-color: $blue;
      color: #ffffff;
      line-height: 1.5rem;
      @include borderRadius(5px)
    }

  }

  .actionBar {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 2.3rem;
    width: 100%;
    height: 4.3rem;
    box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);

    ul {
      width: 100%;
      @include fj;

    }

    li {
      flex: 1;
      text-align: center;
      line-height: 2.3rem;
      font-weight: bold;
      @include sc(.9rem, #fff);

    }
    .shop-car {
      background-color: #FF9500;
    }
    .buy-btn {
      background-color: #FF0036;
    }

  }

  .el-icon-close {
    margin: .2rem .2rem 0 0;
  }


  .fillBtm {
    width: 100%;
    height: 6.8rem;
  }

  .iosBtm {
    width: 100%;
    height: 4.5rem;
  }

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

</style>
