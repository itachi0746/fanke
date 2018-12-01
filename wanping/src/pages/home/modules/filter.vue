<template>
  <!--  开始-->
  <div class="filter-box">
    <!--<city v-show="showCity"></city>-->
    <!--筛选条件-->
    <!--<div class="sort-container">-->

      <!--<div class="sort-item" @click="sort" data-id="1" data-sortType="0">-->
        <!--<span :class="[{span_active:'1'===activeIndex}]">-->
          <!--距离-->
          <!--<i class="el-icon-d-caret"></i>-->
        <!--</span>-->

      <!--</div>-->
      <!--<div class="sort-item" @click="sort" data-id="2" data-sortType="0">-->
        <!--<span :class="[{span_active:'2'===activeIndex}]">-->
          <!--价格-->
          <!--<i class="el-icon-d-caret"></i>-->
        <!--</span>-->

      <!--</div>-->
      <!--<div class="sort-item" @click="sort" data-id="3" data-sortType="0">-->
        <!--<span :class="[{span_active:'3'===activeIndex}]">-->
          <!--人流量-->
          <!--<i class="el-icon-d-caret"></i>-->
        <!--</span>-->
      <!--</div>-->
    <!--</div>-->

    <div class="sort-container">

      <div class="sort-item" @click="fenlei">
        <span :class="[{span_active:'0'===activeIndex2}]">
          分类
          <i class="el-icon-caret-bottom" v-show="!isShow"></i>
          <i class="el-icon-caret-top" v-show="isShow"></i>
        </span>
      </div>
      <div class="sort-item" @click="shaixuan">
        <span :class="[{span_active:'1'===activeIndex2}]">
          筛选
          <i class="el-icon-caret-bottom" v-show="!showShaixuan"></i>
          <i class="el-icon-caret-top" v-show="showShaixuan"></i>
        </span>
      </div>
      <div class="sort-item" @click="changeCity">
        <span :class="[{span_active:'2'===activeIndex2}]">
          切换城市
          <i class="el-icon-caret-bottom" v-show="!showShaixuan"></i>
          <i class="el-icon-caret-top" v-show="showShaixuan"></i>
        </span>
      </div>
    </div>

    <!--遮罩层-->
    <div class="back-cover" ref="cover" @click="toggleFilter" v-show="isShow || showShaixuan"></div>

    <!--室内外分类-->
    <div class="item_options" ref="item_options" v-show="isShow">
      <ul>
        <li v-for="(item) in clsArr" :data-id="item.Data.ClsId" @click="fenlei2" :class="{selected:item.Data.ClsId===activeClsId}">
          {{item.Data.ClsName}}
          <i class="el-icon-check" v-show="item.Data.ClsId===activeClsId"></i>
        </li>
      </ul>
    </div>
    <!--屏分类-->
    <div class="item_options2" v-show="showShaixuan">
      <ul>
        <li v-for="(item) in shaiXuanArr" @click="sort" :data-id="item.id" :class="{selected:item.id===activeIndex}">
          {{item.name}}
          <i class="el-icon-check" v-show="item.id===activeIndex"></i>

        </li>

      </ul>
    </div>
  </div>
  <!--  结束-->
</template>

<script>
  import {postData, link} from '@/server'
//  import city from '../../../components/common/chooseCity.vue'
  //  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        isShow: false,
        showShaixuan: false,
//        showCity: false,
        activeIndex: '1',  // 当前的下标
        activeClsId: '',
        activeIndex2: '',
//        spaceList: [],  // 城市列表(包含地区)
        clsArr: [],
        selectClsId: '',  // 选中的类别id
        shaiXuanArr: [
          {name:'距离优先',id:'1'},
          {name:'价格优先',id:'2'},
          {name:'人流优先',id:'3'},
          {name:'尺寸优先',id:'4'},
        ]
      }
    },

    components: {},

    computed: {
      areaList() {  // 地区列表
        if (this.spaceList.length > 0) {
          return this.spaceList[this.activeIndex].children;
        }
      }
    },

    methods: {
//      init_scroll() {
//        if (!this.scroll) {
//          this.scroll = new BScroll('#category-left', {
//            //开启点击事件 默认为false
//            click: true
//          });
//          this.scroll2 = new BScroll('#category-right', {
//            //开启点击事件 默认为false
//            click: true
//          });
//        } else {
//          this.scroll.refresh();
//          this.scroll2.refresh();
//        }
//        console.log(this.scroll);
//      },
//
//      toggleLi(index) {
//        this.activeIndex = index
//      },
//      toggleFilter() {
//        this.isShow = !this.isShow;
////        this.timer1 = setTimeout(() => {
////          this.init_scroll();
////        },1000)
//        this.$nextTick(() => {
//          this.init_scroll();
//        });
//        console.log(this.scroll);
//
//      },
//      doSelectArea() {
//        // TODO
//      }

      /**
       * @method 排序
       */
      sort(event) {

        let id = event.currentTarget.getAttribute("data-id");
        let sortType = event.currentTarget.getAttribute("data-sortType");

        this.activeIndex = id;
        this.$emit('sort', {'id': id, 'sortType': sortType});
        sortType = sortType === '0' ? '1' : '0';
        event.currentTarget.setAttribute("data-sortType",sortType);
        this.isShow = false;
        this.showShaixuan = false;

        console.log('sort')
      },
      toggleFilter() {
        this.isShow = false;
        this.showShaixuan = false;
      },
      /**
       * @method 显示屏分类
       */
      fenlei() {
        this.isShow = !this.isShow;
        this.showShaixuan = false
        this.activeIndex2 = '0';
      },
      /**
       * @method 显示排序筛选
       */
      shaixuan() {
        this.showShaixuan = !this.showShaixuan;
        this.isShow = false;
        this.activeIndex2 = '1';

      },
      /**
       * @method 点击排序
       */
      fenlei2() {
        let id = event.currentTarget.getAttribute("data-id");
        this.activeClsId = id;
        this.$emit('fenlei2', {'ClsId': id});
        this.isShow = false;
        this.showShaixuan = false;
      },
      changeCity() {
        console.log(11111)
        this.$emit('change-city')
      }

    },

    created() {
//      postData('/GetAreas').then((res) => {
//          this.spaceList = res.Data;
//        }
//      )
    },
    mounted() {
      const url = '/GetCls';
      postData(url, {}).then((res) => {
        console.log('GetCls:', res);
        this.clsArr = res.Data;
        console.log(this.clsArr)
      })
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .sort-container {
    background-color: #fff;
    border-bottom: 1px solid #ececec;
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 130;
  }

  .sort-item {
    height: 1.65rem;
    font-size: .7rem;
    color: #666;
    flex: 1;
    display: flex;

    border-right: 1px solid #ececec;

    span {
      color: #797979;
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /*span, i {*/
    /*position: relative;*/
    /*left: .5rem;*/
    /*}*/
  }

  .sort-item:nth-child(3) {
    border: none;
  }

  /*地点筛选*/
  .filter-container {
    width: 100%;
    /*height: 1.6rem;*/
    position: relative;
    z-index: 11;
    /*top: 1.65rem;*/
    background-color: #fff;
    font-size: .7rem;
    line-height: 1.6rem;

  }

  .filter-head {
    text-align: center;
    overflow: hidden;
    position: relative;
    z-index: 11;
    display: none;

    div {
      float: left;
      width: 50%;
    }
    span {
      display: inline-block;
      width: 4rem;
      height: 1.6rem;
      border-bottom: 2px solid $blue;
    }
  }

  .category-container {
    width: 100%;
    /*position: fixed;*/
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    z-index: 10;
    /*top: 3.3rem;*/
    left: 0;
    border-top: 0.025rem solid #e4e4e4;
    background-color: #fff;

  }

  .wrapper {
    /*position: relative;*/
    overflow: hidden;
    z-index: 1;
    /*top: 0;*/
  }

  .category-left {
    -webkit-box-flex: 2;
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
    background-color: #f1f1f1;
    height: 20rem;
    /*position: relative;*/

    .category-left-li {
      @include fj;
      padding: 0.2rem 0.5rem;
      min-height: 1.5rem;
    }
    .category_active {
      background-color: #fff;
    }
    i {
      font-size: .7rem;
      padding-left: .2rem;
      color: #878787;
    }
  }

  .category-right {
    -webkit-box-flex: 3;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    background-color: #fff;
    padding-left: 0.5rem;
    height: 20rem;

    .category-right-li {
      @include fj;
      padding: 0.2rem 0.8rem;
    }
  }

  .category_count {
    color: #878787;
  }

  .back-cover {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .filter-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
  }

  .span_active {
    color: #000!important;
  }

  .iconfont {
    font-size: .7rem;
  }

  /*.selected-state {*/
    /*width: 100%;*/
    /*position: relative;*/
    /*z-index: 120;*/
    /*background-color: #fff;*/
    /*display: flex;*/

    /*section {*/
      /*width: 4rem;*/
    /*}*/

    /*ul {*/
      /*display: flex;*/
      /*flex: 1;*/
      /*padding: 0 35px 0 10px;*/

      /*li {*/
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*color: #e93b3d;*/
        /*padding: 0 .5rem;*/
        /*font-size: .7rem;*/
        /*height: 2.25rem;*/

      /*}*/
    /*}*/

  /*}*/

  .item_options,.item_options2 {
    width: 100%;
    position: relative;
    z-index: 120;

    ul {

      li {
        height: 2.25rem;
        background-color: #fff;
        border-bottom: 1px solid #ececec;
        padding: 0 35px 0 10px;
        color: #333;
        font-size: .7rem;
        display: flex;
        justify-content:space-between;
        align-items: center;
      }
      li.selected {
        color: #e93b3d;
      }
    }
  }

</style>
