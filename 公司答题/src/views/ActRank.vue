<template>
  <div class="actInfoBody actRank">
    <div class="poupMainInfo">
      <div class="poupLine">
        <p>当前排名：(只显示前10名)</p>
        <div style="padding:0rem 0.5rem">
          <table class="rankTable" cellspacing="0" cellpadding="0">
            <thead>
            <tr style="line-height: 1rem;">
              <th>排行</th>
              <th>头像</th>
              <th>昵称</th>
              <th>成绩</th>
            </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="rankHeight">
        <table id="rankInfoBox" class="rankTable" cellspacing="0" cellpadding="0" style="margin-top: 0;">
          <tbody>
          <tr class="rankInfo" v-for="(user, index) in Users" :key="index">
            <td>No.{{user.Rank}}</td>
            <td>
              <div class="userImg manImg" v-if="user.Logo">
                <img :src="user.Logo" alt="用户头像">
              </div>
              <div class="userImg manImg" v-else>
                <img :src="defaultLogo" alt="默认头像">
              </div>

            </td>
            <td class="userName">{{user.Name}}</td>
            <td>{{user.Score}}<span class="scoreUnit">分</span></td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div class="poupSlideBar">
      <div class="slideBarTip"></div>
    </div>

  </div>

</template>

<script>

  export default {
    data: function () {
      return {
        Users: [],
        defaultLogo: require('../assets/manImg.jpg')

      }
    },
//
//  components: {},
//
//    computed: {
//      logo() {
//        if (this.Users.logo === '' ||
//          this.Users.logo === undefined ||
//          this.Users.logo === null) {
//          return this.defaultLogo
//        } else {
//          return this.Users.logo
//        }
//
//      }
//    },
//  methods: {}

    mounted: function () {  // 请求排名

      const url = '/exam/Rank';
      this.$http({
        url: url,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
//      console.log(res.data, '请求成功');
        this.Users = res.data.Data;
        console.log('this.Users', this.Users)
      }).catch(err => {
        console.log(err, '请求错误');
//        alert('出错啦')

      })

    },
//
//  beforeDestroy: function() {}
  }
</script>

<style>


  .poupMainInfo {
    height: 25.25rem;
    overflow-y: auto;
  }

  /*排行榜*/
  .actInfoBody {
    color: #ffffff;
    font-size: 0.7rem;
    padding: 0 1rem;
    position: relative;
  }

  .poupLine {
    /*font-size: .6rem;*/
    /*line-height: .9rem;*/
    padding: 2px 0;
    margin-top: .7rem;
    position: relative;
  }

  .rankTable {
    width: 100%;
    margin-top: .55rem;
    text-align: center;
    table-layout: fixed;
    font-size: .7rem;
    color: #FFF;
  }

  #rankHeight {
    overflow-y: hidden;
    padding: 0rem .5rem;
    -webkit-overflow-scrolling: touch;
  }

  .rankTable {
    width: 100%;
    margin-top: .55rem;
    text-align: center;
    table-layout: fixed;
    font-size: .7rem;
    color: #FFF;
    border-collapse: collapse;
  }

  .rankInfo {
    line-height: 2.75rem;
    border-bottom: 1px solid #ffffff;
  }

  .rankTable .userImg {
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    border-radius: 999px;
  }

  .userImg img {
    width: 100%;
    height: 100%;
    vertical-align: top;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;

  }

  .rankTable .userName {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .actRank .poupSlideBar {
    left: 6rem;

  }
</style>
