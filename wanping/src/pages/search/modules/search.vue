<template>
  <!--搜索  开始-->
  <div class="search-page">
    <Header :headName="headName"></Header>
    <form class="search-form">
      <input type="search" name="search" placeholder="请输入商家或地址名称" class="search-input">
      <input type="submit" name="submit" class="search-submit">
    </form>

    <section class="search-history">
      <h4 class="title">搜索历史</h4>
      <ul>
        <li class="history-list">
          <span class="history-text ellipsis">aa</span>
          <i class="fa fa-times"></i>
        </li>
      </ul>
      <footer class="clear-history">清空历史记录</footer>
    </section>

    <Footer :page="page"></Footer>
  </div>
  <!--搜索  结束-->
</template>

<script>
  import Footer from '../../../components/footer/footer.vue'
  import Header from '../../../components/header/header.vue'


  export default {
    data() {
      return {
        headName: '搜索',
        page: 'Search'

      }
    },

    components: {
      Footer, Header
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
      font-weight: bold;
      padding: 0 0.25rem;
    }

    input {
      height: 1.5rem;
    }
  }

  .search-history {
    .title {
      font-size: 0.7rem;
      line-height: 2rem;
      text-indent: 0.5rem;
      font-weight: bold;
      color: #666;
    }
    .clear-history {
      background-color: #fff;
      color: #3190e8;
      font: 0.8rem/2rem "Microsoft YaHei";
      font-weight: bold;
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
    }
    .fa {

      @include sc(.8rem,#666);
    }
  }


</style>
