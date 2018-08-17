<template>
  <div class="screen-detail">
    <Header :headName="headName"></Header>
    <div class="screen-data">
      <h5>{{resData.Name}}</h5>
      <p class="screen-desc">{{resData.Desc}}</p>
    </div>
    <div class="calendar">
      <Calendar v-on:choseDay="clickDay"
                v-on:changeMonth="changeDate" :agoDayHide="timeStamp" :markDate="markDate"></Calendar>
    </div>
    <div class="data-container">
      <div class="data-box">
        <p>
          <i class="data-spot"></i>
          <span class="data-tag-font">{{nowMonth}}月 {{nowDay}}日 :  </span>
        </p>
        <p v-if="this.curDayObj">
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
          <!--<el-button size="small" type="primary" :class="['right',{disabled: true}]" @click="addSelected">添加</el-button>-->
          <el-button size="small" type="primary" class="right" @click="addSelected" :disabled="curDayObj.Remain===0">添加</el-button>

        </p>
      </div>
      <div class="data-box">
        <p class="">
          <i class="data-spot"></i>
          <span class="data-tag-font">您已选择的广告位 :</span>

        </p>
        <section v-if="selected.length">
          <p v-for="(item,index) in selected" :key="item.id">
            <span>{{item.day}}</span>
            广告位数量:
            <span>{{item.num}}</span>
          </p>
        </section>
        <section v-else>
           <p>暂无</p>
        </section>
      </div>
      <div class="prize-box">
        <section>
          <span>已选择数量: </span>
          <span class="sum-num"> {{ num }}</span>
          <span>个</span>
        </section>
        <section>
          <span>应付: </span>
          <span> ¥</span>
          <span class="sum-prize">{{ sumPrice }}</span>
        </section>
      </div>

      <ActionBar :sumPrice="sumPrice"></ActionBar>
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';
  import ActionBar from '../../../components/footer/actionBar.vue'
  import Header from '../../../components/header/header.vue'
  import {postData} from '../../../server'


  export default {
    data() {
      return {
        headName: '屏幕详情',
        markDate: [],  // 标记日期
        timeStamp: 0 + '',
        oneDay: 86400000,  // 一天的毫秒数
        num: 1,  // 已选择数量
        UP: null,  // 单价
        resData: {},  // 响应返回的data
        days: [],  // 向后一个月的数据
        nowMonth: null,  // 现在几月
        nowDay: null,  // 现在几号
        curDayObj: null,  // 当前显示的某天的obj
        selected: [],  // 已选择的广告位
        itemId: 0,  // 所选择时段的id
      }
    },

    components: {
      Calendar,
      ActionBar,
      Header
    },

    computed: {
      sumPrice() {  // 总价
        if (this.UP !== null && this.UP > 0) {
          return this.num * this.UP
        }
      },
    },

    methods: {
      clickDay(data) {  //选中某天
        console.log(data);
        this.num = 1;
        this.findDay(data)
      },
      changeDate(data) {
        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },
      addNum() {
        if(this.curDayObj!==null) {
          this.num < this.curDayObj.Remain ? this.num++ : this.num
        }
      },
      reduceNum() {
        this.num > 1 ? this.num-- : this.num
      },

      //从1970年开始的毫秒数,减去一天的毫秒数,然后截取10位变成
      timest() {
        let tmp = (Date.parse(new Date()) - this.oneDay).toString();
//        console.log(tmp)
        tmp = tmp.substr(0, 10);
        return tmp;
      },
      findDay(data) {  // 遍历日期数组 找到点击的是哪一天
        this.days.forEach((item, index) => {
          if (item.Date === data) {
            this.curDayObj = item;
//            console.log(this.curDayObj)
          }
        })
      },
      addSelected() {
        let newItem = {
          id: this.itemId,
          day: this.curDayObj.Date,
          num: this.num
        };
        this.itemId++;
        this.selected.push(newItem);
      }

//      dateFormat(date) {
//        date = typeof date === 'string' ? new Date(date.replace(/\-/g, '-')) : date;
//        let month = date.getMonth() + 1;
//        month = month < 10 ? '0' + month : month;
//        let day = date.getDate();
//        day = day < 10 ? '0' + day : day;
//        return date.getFullYear() + '-' + month + '-' + day;
//      },
    },
    created() {
      const myDate = new Date();
      this.nowMonth = myDate.getMonth() + 1;
      this.nowDay = myDate.getDate();
//      const YMD = this.dateFormat(myDate);

      const url = '/Detail';
      postData(url).then((res) => {
        console.log(res)
        this.resData = res.Data;
        this.days = res.Data.DayStates;  // 日期数组
        this.UP = this.days[0].Price;  // 今天的产品的单价
        this.curDayObj = this.days[0]  // 当前显示的天
      });


    },

    mounted() {
      this.timeStamp = this.timest();
//      let arg=utils.getUrlParms();
//      console.log(arg)
//      let id=arg["id"];

    },

    beforeDestroy() {
    }

  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .screen-data {
    padding: .5rem;
    /*border-bottom: .5rem solid #7c7c7c;*/
  }

  .screen-desc {
    @include sc(.6rem, #666);
  }

  .data-container {
    padding: .5rem;
    margin-bottom: 4.3rem;
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
    position: fixed;
    bottom: 2.3rem;
    left: 0;
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
    border-top: 1px solid $blue;
    border-bottom: 1px solid $blue;
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


</style>
