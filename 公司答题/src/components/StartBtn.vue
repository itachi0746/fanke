<template>
  <div class="bottom">
    <div v-if="success">
      <!--<router-link :to="{name: 'gamePage', params: {questions: questions}}" replace>-->
        <!--<img class="animated tada" src="../assets/startBtn.png"/>-->
      <!--</router-link>-->
      <router-link :to="{name: 'gamePage'}">
        <img class="animated tada" src="../assets/startBtn.png" @click=""/>
      </router-link>
    </div>
    <div v-else>
      <img src="../assets/startBtn-1.png"/>
    </div>

    <p>
       已有{{joinNum}}人参加活动
     </p>
  </div>
</template>

<script>
  import { EventBus } from '../eventBus/eventBus';

  export default {

    data: function () {
      return {
        joinNum: null,
        success: false
      }
    },

    mounted: function () {
      // 请求活动数据
      const url = '/exam/ActivityInfo';
      this.$http({
        url: url,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
        console.log(res.data, '请求活动数据成功');

        EventBus.music = res.data.Data.Music;
        this.success = res.data.Success;  // 活动是否过期
        this.joinNum = res.data.Data.ParticipantsCount;

      }).catch(err => {
        console.log(err, '请求错误');
//        this.joinNum = res.data.Data.ParticipantsCount;

//        alert('出错啦')
      });

      // 请求问题数据
//      const url2 = '/exam/GetQuestions';
//      this.$http({
//        url: url2,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
//        method: 'post',//请求方式
//        //这里可以添加axios文档中的各种配置
//      }).then(res => {
//        console.log(res.data, '请求问题数据成功');
//        this.questions = res.data.Data;
////        console.log('Home',this.questions)
//      }).catch(err => {
//        console.log(err, '请求错误');
//      })


    },
    methods: {

    }
  }
</script>

<style>
  .bottom .animated {
    animation-delay: 1.5s;
    -webkit-animation-delay: 1.5s;
  }
  .bottom {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
  }

  .bottom img {
    width: 10rem;
  }

  .bottom p {
    color: #fff;
    text-shadow: rgb(125, 73, 25) -1px -1px 0px, rgb(125, 73, 25) 0px -1px 0px, rgb(125, 73, 25) 1px -1px 0px, rgb(125, 73, 25) 1px 0px 0px, rgb(125, 73, 25) 1px 1px 0px, rgb(125, 73, 25) 0px 1px 0px, rgb(125, 73, 25) -1px 1px 0px, rgb(125, 73, 25) -1px 0px 0px;
  }
</style>
