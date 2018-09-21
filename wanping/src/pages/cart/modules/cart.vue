<template>
  <!--购物车 开始-->
  <div class="shopping-cart">
    <Header :headName="headName" :editState="delFlag" @onEdit="handleEdit"></Header>

    <section v-if="cart.length === 0" class="empty-states">
      <span>这里是空的，快去逛逛吧</span>
    </section>
    <section v-else class="items">
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
                <img src="../../../assets/item.png" alt="">
              </div>
              <div class="detail-box-r">
                <p>
                  <span>{{item.PsName}}</span>
                </p>

                <p class="item-pay">
                  <span class="pay-num">数量: {{item.Amount}}</span>

                  <span class="pay-span"><i>¥</i>{{item.Total}}</span>

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

    <section class="confrim-order">
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
      <div class="btn" v-if="!this.delFlag">
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
  </div>
  <!--购物车 结束-->
</template>

<script>
  import Header from '../../../components/header/header.vue'
  import {postData} from '@/server'

  export default {
    data() {
      return {
        page: 'Cart',
        headName: '购物车',
        cart: [],
        checkAllFlag: false,  // 是不是全选了
        selectedNum: 0,
        delFlag: false,
      }
    },

    components: {
      Header
    },

    computed: {
      totalPrice() {
        let result = 0;
        this.cart.forEach(item => {
//            item.Checked ? result += item.Total : result;
          item.Checked && (result += parseFloat(item.Total));
        });
        return result
      }
    },

    created() {
//      const url = 'http://www.bai.com/GetBaskets';
      const url = '/GetBaskets';
      postData(url).then((res) => {
          console.log(res);
          this.cart = res.Data;
          console.log(1111)
        }
      )
    },

    methods: {
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
        this.cart = cart.filter(function (item) {
          return !item.Checked
        });
        // 重置 被选商品数量、全选状态、删除状态
        this.selectedNum = 0;
        this.checkAllFlag = false;
        this.delFlag = !this.delFlag;
      },
      /**
       * @method 点击编辑
       */
      handleEdit() {
//        console.log('isedint')
        this.delFlag = !this.delFlag;
        console.log(this.delFlag)

      }

    },

    mounted() {
//      产品名字
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
    bottom: 0;
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
    padding-top: 60px;
    font-size: 18px;
    color: #AEB0B7;
    text-align: center;
  }
</style>
