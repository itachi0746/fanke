<template>
  <!--搜索  开始-->
  <div class="search-page">
    <Loading v-show="isLoading"></Loading>
    <Header :headName="headName"></Header>
    <form class="search-form">
      <input type="search" name="search" placeholder="请输入商家或地址名称" class="search-input" v-model="searchValue"
             @input="checkInput">
      <input type="submit" name="submit" class="search-submit" @click.prevent="searchTarget('')">
    </form>

    <section v-if="businessList.length">
      <h4 class="title">搜索结果</h4>
      <ul class="list_container">
        <li class="list_li" v-for="(item,index) in businessList" :key="item.Id" @click="toScreen($event)"
            :data-pid="item.Id">
          <section class="item_left">
            <img :src="item.Img" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <section class="oh">
                <p class="left">
                  {{item.BusinessName}}
                </p>
              </section>
              <section>
                <span>{{item.Name}}</span>
              </section>
              <section class="oh">
                <p class="left">
                  人流量:{{item.Flowrate}}/h
                </p>
                <p class="right price">
                  <span>¥</span>
                  <span>{{ item.Price }}</span>
                  <span>起</span>
                </p>
              </section>

            </div>
          </section>
        </li>
      </ul>
      <p class="empty_data">没有更多了</p>
    </section>

    <section class="search-history" v-if="searchHistory.length&&showHistory">
      <h4 class="title">搜索历史</h4>
      <ul>
        <li class="history-list" v-for="(item, index) in searchHistory" :key="index">
          <span class="history-text ellipsis" @click="searchTarget(item)">{{item}}</span>
          <i class="icon iconfont icon-i-close" @click="deleteHistory(index)"></i>
        </li>
      </ul>
      <footer class="clear-history" @click="clearAllHistory">清空历史记录</footer>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>

    <Footer :page="page"></Footer>
    <!--<div class="iosBtm" v-if="isIOS"></div>-->

  </div>
  <!--搜索  结束-->
</template>

<script>
  import Footer from '../../../components/footer/footer.vue'
  import Header from '../../../components/header/header.vue'
  import Loading from '../../../components/common/loading.vue'
  import {MessageBox,Message} from 'element-ui'
  import {getStore, setStore} from '../../../config/store'
  import {postData} from '../../../server/index'
  import {getUrlParms} from '@/config/utils'

  export default {
    data() {
      return {
        headName: '搜索',
        page: 'Search',
        searchValue: '', // 搜索内容
        businessList: [], // 搜索返回的结果
        searchHistory: [], // 搜索历史记录
        showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
        emptyResult: false, // 搜索结果为空时显示
        isLoading: false
      }
    },

    components: {
      Footer, Header, Loading
    },

    computed: {
      isIOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac')
          return true
        }
      }
    },

    methods: {
      /**
       * @method 点击跳转
       */
      toScreen(event) {
        const targetId = event.currentTarget.getAttribute('data-pid');
        GoToPage("screen", "screen.html", {'pid': targetId});
      },
      //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
      async searchTarget(historyValue) {
        this.isLoading = true;
        if (historyValue) {
          this.searchValue = historyValue;
        }
        else if (!this.searchValue) {
          this.isLoading = false;
          MessageBox.alert('搜索不能为空', '提示', {
            confirmButtonText: '确定',
          });
          return
        }

        //隐藏历史记录
        this.showHistory = false;
        //获取搜索结果
        const url = '/GetProducts';
        const data = {
          'KeyWords': this.searchValue
        };
        this.businessList = await postData(url, data).then((res) => {
          this.isLoading = false;
          return res.Data.Models
        });
        this.dateFormatting();
        console.log(this.businessList);
        this.emptyResult = !this.businessList.length;

        /**
         * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
         * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
         */
        let history = getStore('searchHistory');
        console.log(history);
        if (history) {
          let checkrepeat = false;
          this.searchHistory = JSON.parse(history);
          this.searchHistory.forEach(item => {
            if (item == this.searchValue) {
              checkrepeat = true;
            }
          });
          if (!checkrepeat) {
            this.searchHistory.push(this.searchValue)
          }
        } else {
          this.searchHistory.push(this.searchValue)
        }
        setStore('searchHistory', this.searchHistory)
      },
      //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
      checkInput() {
        if (this.searchValue === '') {
          this.showHistory = true; //显示历史记录
          this.businessList = []; //清空搜索结果
          this.emptyResult = false; //隐藏搜索为空提示
        }
      },
      //点击删除按钮，删除当前历史记录
      deleteHistory(index) {
        this.searchHistory.splice(index, 1);
        setStore('searchHistory', this.searchHistory);
      },
      //清除所有历史记录
      clearAllHistory() {
        this.searchHistory = [];
        setStore('searchHistory', this.searchHistory);
      },
      /**
       * @method 格式化数据
       */
      dateFormatting() {
        // 数字转化
        this.businessList.forEach((item) => {
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
          if (item.Distance >= 1000) {
            num2 = item.Distance.toString();
            result2 = '.' + num2.slice(-3)[0] + result2;
            num2 = num2.slice(0, num2.length - 3);
            item.Distance = num2 + result2 + 'km';
          }
        });

      },
    },

    mounted() {
      if (getStore('searchHistory')) {
        this.searchHistory = JSON.parse(getStore('searchHistory'));
      }
    },
    created() {
      const args = getUrlParms();
//      console.log(args)
      if (args.bizid) {
        console.log('有bizid');
        this.isLoading = true;
        //隐藏历史记录
        this.showHistory = false;
        const url = '/GetProducts';
        const data = {
          'bizid': args.bizid
        };
        postData(url, data).then((res) => {
          this.isLoading = false;
          this.businessList = res.Data.Models;
          this.emptyResult = !this.businessList.length;
          this.dateFormatting();
          console.log(this.businessList);

//          debugger
        });

      } else {
        console.log('没有bizid');
//        Message({
//          type: 'error',
//          message: '获取店铺信息失败!'
//        });
      }
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .list_container {
    background-color: #fff;
  }

  .search_none {
    margin: 0 auto;
    @include sc(0.65rem, #333);
    line-height: 1.75rem;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }

  .list_li {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    border-bottom: 0.025rem solid $bc;
    .item_left {
      margin-right: 0.25rem;
      .restaurant_img {
        @include wh(2.5rem, 2.5rem);
      }
    }
    .item_right {
      font-size: 0.55rem;
      flex: 1;
      .item_right_text {
        padding-bottom: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        p {
          line-height: .9rem;
        }
        .price {
          color: $payColor;
        }
        .pay_icon {
          margin-bottom: -0.08rem;
        }
      }
      .item_right_detail {
        margin-top: 0.25rem;
        li {
          font-size: 0;
          span {
            font-size: .5rem;
            vertical-align: middle;
            display: inline-block;
            margin-bottom: 0.2rem;
          }
          .activities_icon {
            @include sc(.5rem, #fff);
            font-weight: bold;
            padding: .04rem;
            border-radius: 0.15rem;
            margin-right: 0.125rem;
          }
          .only_phone {
            color: #FF6000;
          }
        }
      }
    }
  }

  .search-form {
    display: flex;
    background-color: #fff;
    padding: 0.5rem;

    .search-input {
      flex: 4;
      border: 0.025rem solid #e4e4e4;
      font-size: 0.65rem;
      color: #333;
      border-radius: 0.125rem;
      background-color: #f2f2f2;
      font-weight: bold;
      padding: 0 0.25rem;
    }
    .search-submit {
      flex: 1;
      border: 0.025rem solid #3190e8;
      margin-left: .2rem;
      font-size: 0.65rem;
      color: #fff;
      border-radius: 0.125rem;
      background-color: #3190e8;
      /*font-weight: bold;*/
      padding: 0 0.25rem;
    }

    .search-submit:active {
      background-color: #2e88db;
      border-color: #2e88db;
    }

    input {
      height: 1.5rem;
    }
  }

  .title {
    font-size: 0.7rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    /*font-weight: bold;*/
    color: #666;
  }

  .search-history {

    .clear-history {
      background-color: #fff;
      color: #3190e8;
      font: 0.8rem/2rem "Microsoft YaHei";
      /*font-weight: bold;*/
      text-align: center;
    }
    .history-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 0.025rem solid #e4e4e4;
      font: 0.7rem/2rem "Microsoft YaHei";
      padding: 0 0.5rem;
    }
    .history-text {
      display: inline-block;
      width: 80%;
      color: #666666;
    }
    .icon {
      @include sc(.7rem, #666);
    }
  }

  .empty_data {
    font-size: 0.6rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
    margin-bottom: 2.3rem;
    background-color: #fff;
  }

  // 促  惠  字体效果
  .discount ._cu {
    @include wh(.8rem, .8rem);
    color: #ffffff;
    @include borderRadius(2px);
    display: inline-block;
    text-align: center;
    background-color: orange;
    margin-right: .2rem;
  }

  .discount ._hui {
    @include wh(.8rem, .8rem);
    color: #ffffff;
    @include borderRadius(2px);
    display: inline-block;
    text-align: center;
    background-color: #ff8298;
    margin-right: .2rem;

  }

  .iosBtm {
    width: 100%;
    height: 3.5rem;
  }

</style>

