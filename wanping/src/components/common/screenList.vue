<template>
  <div class="screenList">
    <ul>
      <li v-for="(item,index) in screenList" :key="item.Id">
        <section class="screen-left">
          <img class="screenImg" :src="item.Img" alt="">
        </section>
        <section class="screen-right">
          <h5>
            {{ item.Name }}
            <span class="right screen-param">
              <span>屏幕参数:</span>
              <span>{{ item.ScreenParameters }}</span>
            </span>
          </h5>
          <p class="screen-desc">{{ item.Desc }}</p>
          <p class="screen-price">
            <span>¥</span>
            <span>{{ item.Prize }}</span>
            <span>起</span>
            <button>点击选择</button>
          </p>

        </section>
      </li>

    </ul>
  </div>
</template>

<script>
  import {postData} from '../../server'

  export default {
    data() {
      return {
        screenList: []
      }
    },

    components: {},

    computed: {},

    methods: {},

    created() {
      const url = 'http://www.bai.com/GetScreenList';
      postData(url).then((res) => {
        console.log(res)
        this.screenList = res.screenList;
      })
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .screenList {
    background-color: #fff;

    li {
      padding: .5rem;
      border-bottom: 1px solid #ddd;
      @include fj;

    }
  }

  .screenImg {
    @include wh(3rem, 3rem);
    display: block;

  }

  .screen-right {
    flex: auto;
    -webkit-flex: auto;
  }

  .screen-left {
    margin-right: .5rem;
  }

  .screen-desc {
    @include sc(.6rem, #666);
  }

  .screen-price {
    span {
      @include sc(.7rem, $blue);
    }
    span:nth-child(2) {
      font-size: 1rem;
    }
    button {
      background-color: #be0000;
      float: right;
      padding: .3rem;
      @include sc(.7rem, #fff);
      @include borderRadius(5px);

    }
  }

  .screen-param {
    /*padding-left: 1rem;*/

    span {
      @include sc(.65rem, #ffa351);

    }
  }
</style>
