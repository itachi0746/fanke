<template>
  <!--我的资料  开始-->
  <div class="profile">
    <Header :headName="headName"></Header>
    <a href="#">
      <section class="profile-link">
        <img class="privateImage" src="../../../assets/default.jpg" alt="">
        <div class="user-info">
          <p>qwe123</p>
          <p>
            <i class="fa fa-mobile-phone"></i>
            <span class="icon-mobile-number">没绑定手机号</span>
          </p>
        </div>
        <div class="arrow">
          <i class="fa fa-angle-right"></i>
        </div>
      </section>
    </a>
    <section class="balance">
      <div>
        <span>我的余额</span>
        <p>
          <span class="b-num">0.00</span>
          <span>元</span>
        </p>

      </div>
    </section>
    <section class="profile-1reTe">
      <a href="#" class="myItem">
        <aside>
          <i class="fa fa-list-ul"></i>
        </aside>
        <div class="myItem-div">
          <span>我的订单</span>
          <span>
            <i class="fa fa-angle-right"></i>
          </span>
        </div>
      </a>
      <a href="#" class="myItem">
        <aside>
          <i class="fa fa-file-video-o"></i>
        </aside>
        <div class="myItem-div">
          <span>我的视频</span>
          <span>
            <i class="fa fa-angle-right"></i>
          </span>
        </div>
      </a>
    </section>


    <Footer :page="page"></Footer>
  </div>
  <!--我的资料  结束-->
</template>

<script>
  import Header from '../../../components/header/header.vue'
  import Footer from '../../../components/footer/footer.vue'

  export default {
    data() {
      return {
        headName: '我的',
        page: 'Profile'
      }
    },

    components: {
      Header, Footer
    },

    computed: {},

    methods: {


    },

    mounted() {
//      this.$router.beforeEach((to, from, aaa) => {
//        // ...
//        console.log(to);
//        console.log(from);
//        this.aaa()
//
//      })
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .profile {
    background-color: $bc;
  }

  .balance {
    width: 100%;
    background: #fff;
    padding: 0.5rem;

    div {
      justify-content: space-between;
      align-items: center;
      display: flex;

      .b-num {
        @include sc(1.5rem, $payColor)
      }

    }
    span {
      @include sc(.8rem, #666)

    }
  }

  .profile-link {
    display: flex;
    padding: .7rem .5rem;
    background-color: $blue;
    margin-top: .2rem;

    .arrow {
      display: flex;
      align-items: center;

      .fa {
        color: #fff;
      }
    }

  }

  .privateImage {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    vertical-align: middle;
  }

  .user-info {
    flex: 1;
    margin-left: .5rem;
    justify-content: space-around;
    flex-direction: column;
    display: flex;

    p {
      font-weight: 700;
      font-size: 0.8rem;
      color: #fff;

      .icon-mobile-number {
        display: inline-block;
        font-size: 0.6rem;
        color: #fff;
      }
      .fa {
        width: 0.5rem;
        height: 0.75rem;
        display: inline-block;
        vertical-align: middle;
        line-height: 0.75rem;
        color: #fff;
      }
    }
  }

  .profile-1reTe {
    margin-top: .4rem;
    background: #fff;

    .myItem {
      padding-left: 1.5rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f1f1f1;

      aside {
        display: flex;
        align-items: center;
        width: 0.7rem;
        height: 0.7rem;
        margin-left: -.866667rem;
        margin-right: .266667rem;
      }

      .myItem-div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: .5rem .3rem .5rem .2rem;
        font-size: 0.8rem;
      }

      .fa {
        @include sc(.8rem, #666)
      }
    }
  }
</style>
