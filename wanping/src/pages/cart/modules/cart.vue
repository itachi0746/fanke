<template>
  <!--购物车 开始-->
  <div class="shopping-cart">
    <Header :headName="headName" :editState="delFlag" @onEdit="handleEdit"
            @headerHeight="getHeight" :a="oktoGetH"></Header>

    <section v-if="cart.length === 0" class="empty-states">
      <span>这里是空的，快去逛逛吧</span>
    </section>
    <section v-else class="items" ref="wrapper" id="wrapper">
      <ul>
        <li class="item" v-for="(item,index) in cart" :key="item.ItemId">
          <div class="shop">
            <div class="title-shop">
              <div class="tcont">
                <div class="shopcb" @click="selGood($event)" :id="item.ItemId">
                  <i class="icon iconfont icon-unchecked" v-show="!item.Checked"></i>
                  <i class="icon iconfont icon-checked" v-show="item.Checked"></i>
                </div>
                <div class="shop-name">
                  <span>{{item.BusinessName}}</span>
                  <i class="icon iconfont icon-youjiantou1"></i>
                </div>

              </div>
            </div>
          </div>

          <div class="pdt-shop">
            <!--<div>-->
            <!--<i class="fa fa-circle-o" v-show="!item.checked"></i>-->
            <!--<i class="fa fa-check-circle-o" v-show="item.checked"></i>-->
            <!--</div>-->
            <div class="item-detail">
              <div class="img-box">
                <img :src="item.Img" alt="">
              </div>
              <div class="detail-box-r">
                <p>
                  <span>{{item.PsName}}</span>
                </p>

                <p class="item-pay">
                  <span class="pay-num">数量: {{item.Total}}</span>

                  <span class="pay-span"><i>¥</i>{{item.Amount}}</span>

                  <!--<span class="number">-->
                  <!--<button class="decrease disabled">-</button>-->
                  <!--<input id="number" type="number" value="1" readonly="readonly">-->
                  <!--<button class="increase">+</button>-->
                  <!--</span>-->
                </p>

              </div>


            </div>
          </div>

        </li>

      </ul>
    </section>
    <div class="fillBtm"></div>
    <section class="confrim-order" ref="confirmOrder">
      <div class="ft-cb" @click="selAll">
        <i class="icon iconfont icon-unchecked" v-show="!checkAllFlag"></i>
        <i class="icon iconfont icon-checked" v-show="checkAllFlag"></i>

      </div>
      <div class="ft-all">
        <span>全选</span>
      </div>
      <div class="pay">
        <div v-if="!this.delFlag">
          <span>合计：</span>
          <span>¥{{totalPrice}}</span>
        </div>
      </div>
      <div class="btn" v-if="!this.delFlag" @click="handleOrder">
        <span>结算(</span>
        <span>{{selectedNum}}</span>
        <span>)</span>
      </div>
      <div class="btn" v-if="this.delFlag" @click="doDel">
        <span>删除(</span>
        <span>{{selectedNum}}</span>
        <span>)</span>
      </div>
    </section>
    <Loading v-show="isLoading"></Loading>
    <Footer :page="page" @footerHeight="getHeight" :a="oktoGetH"></Footer>
  </div>
  <!--购物车 结束-->
</template>

<script>
  import Header from '../../../components/header/header.vue'
  import Footer from '../../../components/footer/footer.vue'
  import Loading from '../../../components/common/loading.vue'
  import {postData} from '@/server'
  import {getUrlParms,IOSConfig} from '@/config/utils'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        page: 'Cart',
        headName: '购物车',
        cart: [],
        checkAllFlag: false,  // 是不是全选了
        selectedNum: 0,
        delFlag: false,
        isLoading : false,
        WH: null, // 窗口高度
        times: 0,
        oktoGetH: false,
        options: {
          //开启点击事件 默认为false
          click: true,
//            probeType: 3,
          pullUpLoad: {
            threshold: -20 // 当上拉距离超过20px时触发 pullingUp 事件
          },
          scrollbar: {
            fade: true
          }
        }
      }
    },

    components: {
      Header,
      Loading,
      Footer
    },

    computed: {
      totalPrice() {
        let result = 0;
        this.cart.forEach(item => {
//            item.Checked ? result += item.Amount : result;
          item.Checked && (result += parseFloat(item.Amount));
        });
        return result
      },
      isIOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
          console.log('on iphone/mac')
          return true
        }
      }
    },

    created() {
//      IOSConfig();
//      const data = getUrlParms();
//      console.log(data);
//      const url = 'http://www.bai.com/GetBaskets';
      const url = '/GetBaskets';
      postData(url).then((res) => {
          console.log(res);
          this.cart = res.Data;

          this.$nextTick(() => {
            this.init_scroll();
          });
          this.oktoGetH = true;
        }
      )
    },

    methods: {
      //获取窗口可视范围的高度
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
       * @method 用窗口高度减去头部脚部高度 计算主要内容wrapper的高度
       * @param {String} h 高度
       */
      getHeight(h) {
        this.times++;
        console.log(h);
        this.WH -= h;
        if (this.times === 2) {
          let confirmOrderH = this.$refs.confirmOrder.offsetHeight;
//          console.log(confirmOrderH);
          this.$refs.wrapper.style.height = this.WH - confirmOrderH + 'px';
        }
      },
      init_scroll() {
        if (!this.scroll) {
          this.scroll = new BScroll('#wrapper', this.options);
        } else {
          this.scroll.refresh();
        }

        console.log(this.scroll);
      },
      /**
       * @method 选择商品
       * @param {Object} e 事件对象
       */
      selGood(e) {
//        console.log(e);
        const id = e.currentTarget.id;

        this.cart.every(item => {
          if (item.ItemId === id) {
//            debugger
            item.Checked = !item.Checked;
            if (item.Checked) {
              this.selectedNum++
            } else {
              this.selectedNum--
            }
//            debugger
            // 设置全选
            this.selectedNum === this.cart.length
              ? this.checkAllFlag = true
              : this.checkAllFlag = false;
            return false
          }
          return true
        })
      },
      /**
       * @method 全选
       */
      selAll() {
        this.checkAllFlag = !this.checkAllFlag;
        if (this.checkAllFlag) {
          this.selectedNum = this.cart.length;
          this.cart.forEach(item => {
            item.Checked = true;
          })
        } else {
          this.selectedNum = 0;
          this.cart.forEach(item => {
            item.Checked = false;
          })
        }
      },
      /**
       * @method 删除购车中的项目
       */
      doDel() {
        let cart = this.cart;
        let arrData = this.calCart();

        this.cart = cart.filter(function (item) {
          return !item.Checked
        });
        // 重置 被选商品数量、全选状态、删除状态
        this.selectedNum = 0;
        this.checkAllFlag = false;
        this.delFlag = !this.delFlag;

        postData('/RemoveBasket',arrData).then((res) => {
          console.log('删除成功',res)
        })
      },
      /**
       * @method 点击编辑
       */
      handleEdit() {
//        console.log('isedint')
        this.delFlag = !this.delFlag;
        console.log(this.delFlag)

      },
      /**
       * @method 计算购物车中的项,把项的ItemId加入数组中并返回
       */
      calCart() {
        let arr = [];
        for (let item of this.cart) {
          if(item.Checked) {
            arr.push(item.ItemId);
          }
        }
        console.log(arr);
        return arr
      },
      /**
       * @method 结算
       */
      handleOrder() {
        this.isLoading = true;
//        const url = '/ConfirmOrder';
        const url = '/PlaceOrder';
        const data = {
          "FromBasket": true,
          "items": this.handleItems()
        };
        postData(url, data).then((res) => {
          console.log(res);
          this.isLoading = false;
          GoToPage('orderConfirm','orderConfirm.html',{'id':res.Data,"fromBasket": true})
        })
      },
      /**
       * @method 计算购物车中的项,把选中的项的ItemId加入数组中并返回
       */
      handleItems() {
        let arr = [];
        this.cart.forEach((item)=> {
          if(item.Checked) {
            let newItem = {
              "BasketDtlId": item.ItemId,  // 购物车明细id
            };
            arr.push(newItem)
          }
        });
        return arr
      },

    },

    mounted() {
      this.WH = this.getClientHeight();
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .items {
    /*margin-bottom: 2.4rem;*/
    height: 29rem;
    overflow-y: scroll;
    cursor: pointer;
  }

  .item {
    margin-top: .5rem;
    background-color: #fff;
    margin-bottom: 1px;
    min-height: 7.65rem;

    .title-shop {
      width: 100%;
      /*height: 1rem;*/
      /*padding-left: .5rem;*/
      padding: .3rem .5rem;
      background: #fff;
      position: relative;

      .tcont {
        display: flex;
        @include wh(100%, auto);
        font-size: .8rem;

        .shopcb {
          display: flex;
          align-items: center;
          margin-right: .5rem;

          .icon {
            @include sc(1rem, #000);

          }
          .icon.icon-checked {
            color: red;
          }
        }
        .shop-name {
          flex: 2;
          display: flex;
          align-items: center;

          .icon {
            @include sc(.8rem, #969696);
            margin-left: .5rem;
          }
        }
        .state {
          margin-right: .5rem;
          text-align: right;
          flex: 1;

          span {
            @include sc(.7rem, #969696);
          }
        }
      }
    }

    .pdt-shop {
      display: flex;
      padding: .5rem .5rem;
      border-top: 1px solid #f5f5f5;
      @include wh(100%, 6rem);

      div {
        display: flex;
        align-items: center;
      }
      .fa {
        @include sc(1rem, #969696);
      }
      .item-detail {
        flex: 1;

        .img-box {
          display: flex;
          margin-left: .5rem;

          @include wh(5rem, 100%);

          img {
            @include wh(100%, 100%);
          }

        }
        .detail-box-r {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-direction: column;
          height: 100%;

          p {
            word-break: break-all;
            @include sc(.8rem, #333);
          }
          .item-pay {
            padding-left: .5rem;
            width: 100%;
            @include fj();
            align-items: center;
            i, .pay-span {
              color: $payColor;
            }
            .pay-num {
              @include sc(.7rem, #333);
            }
            span {
              font-size: 1rem;
            }
            .number {
              @include wh(7rem, 100%);
              border-radius: 3px;
              float: right;

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

              button {
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

            }

          }
        }

      }
    }

  }

  .confrim-order {
    display: flex;
    position: fixed;
    bottom: 2.3rem;
    background-color: #fff;
    @include wh(100%, 2.4rem);
    box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);

    div {
      font-size: .8rem;
    }

    .ft-cb {
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        @include sc(1rem, #000);
      }
      .icon.icon-checked {
        color: red;
      }
    }
    .ft-all {
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pay {
      flex: 1;
      align-items: center;
      display: flex;
      justify-content: flex-end;
      span:nth-child(2) {
        color: $payColor;
      }

    }
    .btn {
      width: 5rem;
      margin-left: .5rem;
      background-color: $payColor;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: #fff;

      }
    }

  }

  .empty-states {
    padding-top: 3rem;
    font-size: .9rem;
    color: #AEB0B7;
    text-align: center;
  }

  .fillBtm {
    width: 100%;
    height: 5.8rem;
  }


</style>
