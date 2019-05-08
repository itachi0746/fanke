<template>
  <div class="screen-detail" ref="screen">
    <Header :headName="headName"></Header>
    <!--轮播图 开始-->
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide @click="" v-for="(item,index) in resData.Imgs" :key="index">
        <img :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--轮播图 结束-->

    <div class="screen-data">
      <h5>{{resData.Name}}</h5>
      <!--<p class="screen-desc">{{resData.Desc}}</p>-->

      <p class="screen-desc mt5">点击日期查看屏幕的广告位状态</p>
      <!--<p class="screen-desc">步骤2: 选择广告位数量, 点击添加</p>-->
      <!--<p class="screen-desc">步骤3: 点击下方的购买按钮</p>-->
      <!--<p class="screen-desc">备注: </p>-->
    </div>
    <div class="action-bar">
      <ul>
        <li></li>
        <!--<li></li>-->
        <li @click="handleMap">
          <i class="el-icon-location"></i><span>屏幕位置</span>
        </li>
      </ul>
    </div>
    <!--<div class="sel-mode">-->
      <!--<el-switch-->
        <!--v-model="multiMode"-->
        <!--active-text="多选模式"-->
        <!--inactive-text="单选模式">-->
      <!--</el-switch>-->
    <!--</div>-->
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
          <span>广告位总数: </span>
          <span class="AD-num">{{curDayObj.Total}}</span> 个
          <span class="right">
            <span>单价: </span>
            ¥<span class="UP-num">{{ curDayObj.Price }}</span>
          </span>
        </p>
        <p>
          <span>剩余广告位: </span>
          <span class="AD-num">{{curDayObj.Remain}}</span> 个
        </p>
        <p>
          <span>使用中的广告位: </span>
          <span class="AD-num">{{curDayObj.UseNum}}</span> 个
        </p>
      </div>

      <!--<div class="data-box">-->
        <!--<p>-->
          <!--<i class="data-spot"></i>-->
          <!--<span class="data-tag-font">选择想购买的广告位数量 :</span>-->
        <!--</p>-->
        <!--<p class="number" v-if="curDayObj">-->

          <!--<button :class="['button','decrease', {disabled:num<=1}]" @click="reduceNum">-</button>-->
          <!--<input id="number" type="number" :value="num" readonly>-->
          <!--<button :class="['button','increase', {disabled:num>=curDayObj.Remain}]" @click="addNum">+</button>-->
          <!--<el-button size="small" type="primary" class="right" @click="addSelected" :disabled="curDayObj.Remain===0">-->
            <!--添加-->
          <!--</el-button>-->

        <!--</p>-->
      <!--</div>-->
      <!--<div class="data-box">-->
        <!--<p class="">-->
          <!--<i class="data-spot"></i>-->
          <!--<span class="data-tag-font">您已选择的广告位 :</span>-->

        <!--</p>-->
        <!--<section v-if="selected.length">-->
          <!--<p class="sel-p" v-for="(item,index) in selected" @click="clickSelP(index)" :class="{active:hoverNum===index}" :key="item.Date">-->
            <!--<el-row>-->
              <!--<el-col :span="16">-->
                <!--<span>{{item.Date}}</span>-->
                <!--广告位数量:-->
                <!--<span>{{item.Count}}</span>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<i class="el-icon-close right" @click="delSelected($event)" :data-date="item.Date"></i>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <!--&lt;!&ndash;<span>{{item.Date}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;广告位数量:&ndash;&gt;-->
            <!--&lt;!&ndash;<span>{{item.Count}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="el-icon-close right" @click="delSelected($event)" :data-date="item.Date"></i>&ndash;&gt;-->
          <!--</p>-->
        <!--</section>-->
        <!--<section v-else>-->
          <!--<p>暂无</p>-->
        <!--</section>-->
      <!--</div>-->
    </div>
    <!--操作部分-->
    <!--<div class="actionBar">-->
      <!--<div class="prize-box">-->
        <!--<section>-->
          <!--<span>应付: </span>-->
          <!--<span> ¥</span>-->
          <!--<span class="sum-prize">{{ sumPrice }}</span>-->
        <!--</section>-->
      <!--</div>-->
      <!--<ul>-->
        <!--<li class="shop-car" @click="addToBasket">加入购物车</li>-->
        <!--<li class="buy-btn" @click="handleOrder">购买</li>-->
      <!--</ul>-->
    <!--</div>-->

    <!--loading-->
    <Loading v-show="isLoading"></Loading>
    <!--地图-->
    <Map @hide-map="handleMap" :coordinate="{'Latitude':resData.Latitude,'Longitude':resData.Longitude,'Name':resData.Name,'x':resData.Name.length/2*14}" v-if="showMap"></Map>
    <!--<div class="iosBtm" v-if="isIOS"></div>-->
    <!--商品详情-->
    <div class="screen-dtl">
      <header>
        <div class="head-font">
          屏幕详情
        </div>
      </header>
      <div class="screen-property">
        <div v-if="resData.PositionTypeName">
          <section>使用类型 </section>
          <section>{{resData.PositionTypeName}}</section>
        </div>
        <div v-if="resData.ScreenType">
          <section>屏幕类型 </section>
          <section>{{resData.ScreenType}}</section>
        </div>
        <div v-if="resData.ScreenParameters">
          <section>分辨率 </section>
          <section>{{resData.ScreenParameters}}</section>
        </div>
        <div v-if="resData.ScreenViewSize">
          <section>媒体面积 </section>
          <section>{{resData.ScreenViewSize}}</section>
        </div>
        <div v-if="resData.CarFlowrate">
          <section>车流 </section>
          <section>{{resData.CarFlowrate}}</section>
        </div>
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
//  import Calendar from 'vue-calendar-component'
  import Calendar from '../../../components/calendar/calendar.vue'
  import Header from '../../../components/header/header.vue'
  import Footer from '../../../components/footer/footer.vue'
  import Loading from '../../../components/common/loading.vue'
  import Map from '../../../components/common/map.vue'
  import {Message} from 'element-ui'
  import {postData} from '@/server'
  import {getUrlParms, IOSConfig} from '@/config/utils'

  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css'

  export default {
    data() {
      return {
        headName: '屏幕详情',
        Id: '',
//        markDate: [],  // 标记日期
        markDay1: '', // 标记开始日期
        markDay2: '', // 标记结束日期
        timeStampStart: 0 + '',  //日历
        timeStampOver: 0 + '',
        oneDay: 86400000,  // 一天的毫秒数
        num: 1,  // 已选择数量(广告位)
        sumNum: 0,  // 已添加的数量
        UP: null,  // 单价
        resData: {},  // 响应返回的data
        days: [],  // 向后一个月的数据
        curDayObj: null,  // 当前显示的某天的obj
        selected: [],  // 已选择的广告位
        itemId: 0,  // 所选择时段的id
        isLoading: false,
        showMap: false,
        multiMode: false, // 多选模式
        hoverNum: -1, // 是否点中
        Ads: [], // 轮播图s
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
//          loop: true,
//          autoplay: {
//            disableOnInteraction: false,
//          },
        },
      }
    },

    components: {
      Calendar,
      Header,
      Loading,
      Footer,
      swiper,
      swiperSlide,
      Map,
      Message,
//      Row,
//      Col
    },

    computed: {

      markDate () {
        let markDateArr = [], SD, ED, temp1, temp2, dValue, days;
        if (this.markDay1 && this.markDay2) {
          temp1 = this.getTimeStamp(this.markDay1);
          temp2 = this.getTimeStamp(this.markDay2);
          if (temp1 < temp2) {
            SD = temp1;
            ED = temp2
          } else {
            ED = temp1;
            SD = temp2
          }
          dValue = ED - SD;
          days = (dValue / this.oneDay);
          days++;
          markDateArr = this.getMarkDateArr(SD, days);
        }
        return markDateArr
      },
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
      /**
      * @method 点击选中的时段
      * @param {Number} index 下标
      */
      clickSelP(index) {
        this.hoverNum = index
      },
      /**
      * @method 根据日期string 获得时间戳
      * @param {String} date 日期,例如'2019/3/12'
      */
      getTimeStamp(date) {
        let result = new Date(date).getTime() + '';
//        result = parseInt(result.substr(0, 10));
        result = parseInt(result);
        return result
      },
      /**
      * @method 得到要标记日期的数组
      * @param {Number} startDate  开始日期的时间戳(毫秒)
      * @param {Number} days  天数
      */
      getMarkDateArr(startDate, days) {
        let theArr = [], theDateStr, dateObj, Y, M, D;
        for (let i = 0; i < days; i++) {
          let tempDate = startDate;
          tempDate += this.oneDay * i;
          dateObj = new Date(tempDate);
          Y = dateObj.getFullYear();
          M = dateObj.getMonth() + 1;
          D = dateObj.getDate();
          M = M < 10 ? '0' + M : M;// 月份小于10在前面加上0
          D = D < 10 ? '0' + D : D;// 日子小于10在前面加上0

          theDateStr = Y + '-' + M + '-' + D;
          theArr.push(theDateStr)
        }
        return theArr
      },
      clickDay(data) {  //选中某天
        console.log(data);
        if (this.multiMode) {
          if (this.markDay1 && this.markDay2) {
            this.markDay1 = this.markDay2 = '';
            this.markDay1 = data
          }
          else if (!this.markDay1) {
            this.markDay1 = data
          } else {
            this.markDay2 = data
          }
        } else {
          this.markDay1 = this.markDay2 = '';
        }
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
        let arr, m, d, str;
        arr = data.split('/');
        d = parseInt(arr[2]);
        d = d < 10 ? '0' + d : d;// 日子小于10在前面加上0
        m = parseInt(arr[1]);
        m = m < 10 ? '0' + m : m;// 月份小于10在前面加上0
        str = arr[0] + '-' + m + '-' + d;

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
        if (this.multiMode) { // 多选模式
          this.selected = [];// 先清空已选中的
          this.sumNum = this.num; // 记录选中的广告位数量
          let hasInconformity = false; // 是否有不符合广告位数量的项
          for (let i = 0; i < this.markDate.length; i++) {
            let theDate = this.markDate[i];
            for (let j = 0; j < this.days.length; j++) {
              let theDayObj = this.days[j];
              if (theDate === theDayObj.Date) {
//                console.log(i,j);
                if (theDayObj.Remain < this.sumNum) { // 如果剩余的广告位少于用户选中的, 先排除
//                  this.markDate[i] = ''
                  theDate = '';
                  hasInconformity = true
                }
                break
              }
            }
            if (!theDate) continue;// 空日期跳过
            let newItem = {
              'PsId': this.Id,
              'Date': theDate,
              'Count': this.sumNum,  // 数量
              'Price': this.UP,  // 单价
              'Amount': this.UP * this.sumNum  // 总价
            };
            this.selected.push(newItem);
          }
          if (hasInconformity) {
            Message({
              type: 'warning',
              message: '多选模式下,广告位不足的日期将不会被选中!'
            });
          }

          return
        }
        const repeated = this.isRepeated(this.curDayObj.Date);
        this.sumNum = this.num; // 记录选中的广告位数量
        if (!repeated) {  // 不是重复的
          let newItem = {
            'PsId': this.Id, // 当前的产品的id
            'Date': this.curDayObj.Date, // 日期
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
       * @method 购买下单,跳转订单确认
       */
      handleOrder() {
        if (!this.selected.length) {
          console.log('没选商品')
          return
        }
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
          console.log('on iphone/mac');
          let MB = window.getComputedStyle(this.$refs.screen).marginBottom;
          this.$refs.screen.style.marginBottom = parseInt(MB) + 30 + 'px';
          console.log(this.$refs.screen.style.marginBottom)
        }
      },

      handleMap() {
        this.showMap = !this.showMap;
      },

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
        console.log(res);
        this.resData = res.Data;
//        this.Ads = this.resData.Imgs;
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
    watch: {
      multiMode () {
        if (this.multiMode) {
          this.selected = [] // 清空选中的广告位
        } else {
          this.selected = []; // 清空选中的广告位
          this.markDay1 = this.markDay2 = '' // 清除标记的日期
        }
      },
      selected () {
        if (!this.selected.length) {
          this.hoverNum = -1
        }
      },
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

    /*.screen-desc:nth-child(3) {*/
      /*margin-top: .5rem;*/
    /*}*/
    .mt5 {
      margin-top: 0.5rem;
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
      /*color: rgb(51, 51, 51);*/
      border: 1px solid #dadada;
      color: #666;

      &>div {
        display: flex;
        border-bottom: 1px solid #dadada;
      }
      &>div>section {
        padding: .5rem 0;
        white-space:nowrap;
      }
      &>div:nth-last-child(1) {
        border-bottom: none;
      }
      &>div>section:nth-child(2) {
        flex: 1;
        padding-left: 1rem;
      }
      &>div>section:nth-child(1) {
        width: 5rem;
        text-align: right;
        padding-right: 1rem;
        border-right: 1px solid #dadada;

      }
    }
    .dtl-main {
      text-indent: 2em;
      margin-top: 5px;
      font-size: .8rem;
      line-height: 25px;
      padding-top: 5px;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */

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
    padding: 0.5rem 1rem .5rem;

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
      li:nth-child(1) {
        flex: 2;
      }
    }
  }

  .sel-mode {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
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

    .sel-p {
      border-radius: 4px;
      margin-top: 5px;
      -webkit-transition: all .3s;
      transition: all .3s;
    }
    .sel-p.active {
      background-color: #f5f7fa;
      color: #409EFF;
    }
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
