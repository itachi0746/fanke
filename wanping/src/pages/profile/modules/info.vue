<template>
  <!--  开始-->
  <div>
    <Header :headName="headName"></Header>

    <section class="profile-info">
      <section class="headportrait">
        <input type="file" class="profileinfopanel-upload">
        <h2>头像</h2>
        <div class="headportrait-div">
          <img src="../../../assets/default.jpg" class="headportrait-div-top">
          <span class="headportrait-div-bottom">
             <i class="fa fa-angle-right"></i>

          </span>
        </div>
      </section>
      <a href="#" class="info-router">
        <section class="headportrait headportraitwo">
          <h2>用户名</h2>
          <div class="headportrait-div">
            <p>qwer1111</p>
            <span class="headportrait-div-bottom">
              <i class="fa fa-angle-right"></i>

            </span>
          </div>
        </section>
      </a>

      <section class="bind-phone">
        账号绑定
      </section>
      <section class="info-router">
        <section class="headportrait headportraitwo headportraithree">
          <h2>
            <i class="fa fa-mobile-phone"></i>
            手机</h2>
          <div class="headportrait-div">
            <p></p>
            <span class="headportrait-div-bottom">
              <i class="fa fa-angle-right"></i>

            </span>
          </div>
        </section>
      </section>
      <section class="bind-phone">
        安全设置
      </section>
      <a href="#" class="info-router">
        <section class="headportrait headportraitwo headportraithree"><h2>
          登录密码</h2>
          <div class="headportrait-div">
            <p>修改</p>
            <span class="headportrait-div-bottom">
              <i class="fa fa-angle-right"></i>

            </span>
          </div>
        </section>
      </a>
      <section class="exitlogin">退出登录</section>
    </section>
  </div>
  <!--  结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'

  export default {
    data() {
      return {
        headName: '账户信息'
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
  @import 'src/style/mixin.scss';

  .profile-info {
    @include wh(100%, 3.1rem);
    .profileinfopanel-upload {
      display: block;
      position: absolute;
      opacity: 0;
      top: 2.35rem;
      left: 0;
      @include wh(100%, 3.1rem);
    }
    .headportrait {
      margin-top: .4rem;
      padding: .5rem .5rem;
      @include fj(space-between);
      align-items: center;
      border-top: 1px solid #ddd;
      background: #fff;

      h2 {
        @include sc(.7rem, #333);
        font-weight: 500;
        display: flex;
        align-items: center;
      }
      .headportrait-div {
        display: flex;
        align-items: center;
        span {
          display: inline-block;

          svg {
            @include wh(100%, 100%);
          }
        }
        .headportrait-div-top {
          @include wh(2rem, 2rem);
          @include borderRadius(50%);
          vertical-align: middle;
          margin-right:.5rem;
        }
        .headportrait-div-bottom {
          @include wh(.66667rem, 1.4rem);

        }
      }
    }
    .headportraitwo {
      margin-top: 0;
      padding: .5rem;
      border-bottom: 1px solid #ddd;

      .headportrait-div {
        @include fj(left)
        p {
          text-align: left;
          line-height: 1.39rem;
          @include sc(.7rem, #999);
          margin-right: .2rem;
          font-weight: 100;
          font-family: Arial;
        }
        .headportrait-div-bottom {
          top: 0;
        }
      }
    }
    .headportraithree {
      border-bottom: 1px solid #ddd;

      .fa-mobile-phone {
        @include sc(1rem,$blue);
        margin-right: .5rem;
      }
    }
    .bind-phone {
      padding: .5rem;
      @include sc(.5rem, #666);
    }
    .exitlogin {
      width: 96%;
      margin: 1.3rem auto 0;
      line-height: 1.5rem;
      @include borderRadius(5px);
      text-align: center;
      background: #d8584a;
      @include sc(.7rem, #fff);
      padding: .3rem 0;
    }
    .exitlogin:active {
      opacity: .8;
      background: #C1C1C1;
    }
  }

</style>
