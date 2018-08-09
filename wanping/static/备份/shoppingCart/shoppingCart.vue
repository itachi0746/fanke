<template>
  <!--购物车 开始-->
  <div class="shopping-cart">
    <Header :headName="headName"></Header>

    <section class="items">
      <div class="item">
        <div class="shop">
          <div class="title-shop">
            <div class="tcont">
              <div class="shopcb">
                <i class="fa fa-circle-o"></i>
              </div>
              <div class="shop-name">
                <span>商家名字</span>
                <i class="fa fa-angle-right"></i>
              </div>
              <div class="state">
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pdt-shop">
          <div>
            <i class="fa fa-circle-o"></i>
          </div>
          <div class="item-detail">
            <div class="img-box">
              <img src="../../assets/item.png" alt="">
            </div>
            <div class="detail-box-r">
              <p>
                <span>产品名字 信息xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
              </p>
              <p class="pay">
                <i>¥</i><span>1000</span>

                <span class="number">
                  <button class="decrease disabled">-</button>
                  <input id="number" type="number" value="1" readonly="readonly">
                  <button class="increase">+</button>
                </span>
              </p>
            </div>


          </div>
        </div>

      </div>
    </section>

    <section class="confrim-order">
      <div class="ft-cb">
        <i class="fa fa-circle-o"></i>

      </div>
      <div class="ft-all">
        <span>全选</span>
      </div>
      <div class="pay">
        <span>合计：</span>
        <span>¥0.00</span>
      </div>
      <div class="btn">
        <span>结算(</span>
        <span>0</span>
        <span>)</span>

      </div>
    </section>
  </div>
  <!--购物车 结束-->
</template>

<script>
  import Header from '../../components/header/header.vue'


  export default {
    data() {
      return {
        headName: '购物车'

      }
    },

    components: {
      Header
    },

    computed: {},

    methods: {},

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";


  .item {
    margin-top: .5rem;
    background-color: #fff;
    margin-bottom: 1px;

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

          .fa {
            @include sc(1rem, #969696);

          }
        }
        .shop-name {
          flex: 2;
          display: flex;
          align-items: center;

          .fa {
            @include sc(1rem, #969696);
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
            @include sc(.8rem, #969696);
          }
          .pay {
            padding-left: .5rem;
            width: 100%;
            i, span {
              color: $payColor;
            }
            span {
              font-size: 1rem;
            }
            .number {
              @include wh(7rem,100%);
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
    @include wh(100%,2.4rem);
    box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);


    div {
      font-size: .8rem;
    }

    .ft-cb {
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .fa {
        @include sc(1rem,#969696);
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
</style>
