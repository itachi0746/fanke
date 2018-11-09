<template>
  <!--  开始-->
  <div class="filter-box">
    <!--筛选条件-->
    <div class="sort-container">

      <div class="sort-item" @click="sort">
        <span data-id="1" :class="[{span_active:'1'===activeIndex}]">
          距离
          <i class="icon iconfont icon-xiajiantou"></i>
        </span>

      </div>
      <div class="sort-item" @click="sort">
        <span data-id="2" :class="[{span_active:'2'===activeIndex}]">价格</span>
        <!--<i class="icon iconfont icon-xiajiantou"></i>-->
      </div>
      <div class="sort-item" @click="sort">
        <span data-id="3" :class="[{span_active:'3'===activeIndex}]">人流量</span>
        <!--<i class="icon iconfont icon-xiajiantou"></i>-->
      </div>
    </div>

    <!--<div class="filter-container" v-show="!isHide">-->
      <!--<div class="filter-head">-->
        <!--<div>-->
          <!--<span>地区</span>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span>地点</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="category-container">-->
        <!--<div class="wrapper category-left" ref="wrapper" id="category-left">-->
          <!--<ul class="content" id="C1">-->

            <!--<li :class="['category-left-li', {category_active:index===activeIndex}]"-->
                <!--v-for="(item,index) in spaceList" :key="item.Id" @click="toggleLi(index)">-->
              <!--<div>-->
                <!--<span>{{ item.Name }}</span>-->
              <!--</div>-->
              <!--<div>-->
                <!--<span class="category_count">{{ item.children.length }}</span>-->
                <!--<i class="icon iconfont icon-youjiantou1"></i>-->
              <!--</div>-->
            <!--</li>-->

          <!--</ul>-->

        <!--</div>-->
        <!--<div class="wrapper category-right" ref="wrapper" id="category-right">-->

          <!--<ul class="content">-->
            <!--<li class="category-right-li" v-for="(item,index) in areaList"-->
                <!--@click="doSelectArea">-->
              <!--<div>-->
                <!--<span>{{ item.Name }}</span>-->
              <!--</div>-->
              <!--<div>-->
                <!--<span class="category_count">{{ item.Number }}</span>-->
              <!--</div>-->
            <!--</li>-->
          <!--</ul>-->

        <!--</div>-->

      <!--</div>-->
    <!--</div>-->
    <!--遮罩层-->
    <!--<div class="back-cover" @click="toggleFilter" v-show="!isHide"></div>-->

  </div>
  <!--  结束-->
</template>

<script>
  import {postData, link} from '@/server'
//  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        isHide: true,
//        isActive: false,  // 当前是哪个
        activeIndex: '1',  // 当前的下标
//        spaceList: [],  // 城市列表(包含地区)
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
//        this.isHide = !this.isHide;
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
       * @method 按人流排序
       */
      sort(event) {
//        console.log(event.target.getAttribute("data-id"));
//        console.log(event.currentTarget)
        const id = event.target.getAttribute("data-id");
//        console.log(typeof id)
        this.activeIndex = id;
        this.$emit('sort',id)
      },

    },

    created() {
//      postData('/GetAreas').then((res) => {
//          this.spaceList = res.Data;
//        }
//      )
    },
    mounted() {

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
    z-index: 13;
  }

  .sort-item {
    height: 1.65rem;
    font-size: .7rem;
    color: #666;
    flex: 1;
    display: flex;

    border-right: 1px solid #ececec;

    span {
      color: #666;
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
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .filter-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
    width: 100%;
  }

  .span_active {
    color: #000!important;
  }

  .iconfont {
    font-size: .7rem;
  }
</style>
