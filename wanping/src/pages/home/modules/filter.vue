<template>
  <!--  开始-->
  <div class="filter-box">
    <!--筛选条件-->
    <div class="sort-container">
      <div class="sort-item" @click="toggleFilter">
        <span>城市</span>
        <i class="fa fa-caret-down"></i>
      </div>
      <div class="sort-item">
        <span>地区</span>
        <i class="fa fa-caret-down"></i>
      </div>
      <div class="sort-item">
        <span>特色</span>
        <i class="fa fa-caret-down"></i>
      </div>

    </div>

    <div :class="['filter-container', {hide:isHide}]">
      <div class="filter-head">
        <div>
          <span>地区</span>
        </div>
        <div>
          <span>地点</span>
        </div>
      </div>
      <div class="category-container">
        <div class="wrapper category-left" ref="wrapper" id="category-left">
          <ul class="content">

            <li :class="['category-left-li', {category_active:index===activeIndex}]"
                v-for="(item,index) in spaceList" :key="item.Id" @click="toggleLi(index)">
              <div>
                <span>{{ item.Name }}</span>
              </div>
              <div>
                <span class="category_count">{{ item.children.length }}</span>
                <i class="fa fa-angle-right"></i>
              </div>
            </li>

          </ul>
        </div>
        <div class="wrapper category-right" ref="wrapper" id="category-right">

          <ul class="content">
            <li class="category-right-li" v-for="(item,index) in areaList"
            @click="doSelectArea">
              <div>
                <span>{{ item.Name }}</span>
              </div>
              <div>
                <span class="category_count">{{ item.Number }}</span>
              </div>
            </li>
          </ul>

        </div>

      </div>
    </div>
    <!--遮罩层-->
    <div class="back-cover" :class="{hide:isHide}" @touchmove.prevent></div>

  </div>
  <!--  结束-->
</template>

<script>
  import {postData} from '@/server'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        isHide: true,
        isActive: false,  // 当前是哪个
        activeIndex: 0,  // 当前的下标
        spaceList: [],  // 城市列表(包含地区)
      }
    },

    components: {},

    computed: {
      areaList() {  // 地区列表
        if(this.spaceList.length>0) {
          return this.spaceList[this.activeIndex].children;
        }
      }
    },

    methods: {
      toggleLi(index) {
        this.activeIndex = index
      },
      toggleFilter() {
        this.isHide = !this.isHide

      },
      doSelectArea() {
        // TODO
      }
    },

    created() {
      postData('http://www.bai.com/city').then((res) => {
        console.log(res)
        this.spaceList = res.Data;
//        this.areaList =
        //      即定时器 20ms
        this.$nextTick(() => {
          this.scroll = new BScroll('#category-left', {
            //开启点击事件 默认为false
            click: true
          });
          this.scroll2 = new BScroll('#category-right', {
            //开启点击事件 默认为false
            click: true
          })
        });

        }
      )
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
    top: 0rem;
    right: 0;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    z-index: 13;
  }

  .sort-item {
    margin: .2rem 0;
    font-size: .7rem;
    color: #ddd;
    width: 33.3%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    border-right: 1px solid #ececec;

    span {
      padding-right: .7rem;
    }
    span, i {
      position: relative;
      left: .5rem;
    }
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

  .wrapper, .category-left {
    width: 100%;
    position: relative;
    top: 0px;
    overflow: hidden;
    z-index: 1;
  }

  .wrapper, .category-right {
    width: 100%;
    /*position: relative;*/
    /*top: 0px;*/
    overflow-y: auto;
    z-index: 1;
  }

  .category-left {
    -webkit-box-flex: 2;
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
    background-color: #f1f1f1;
    height: 20rem;

    .category-left-li {
      @include fj;
      padding: 0.2rem 0.5rem;
    }
    .category_active {
      background-color: #fff;
    }
    .fa {
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
</style>
