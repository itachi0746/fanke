<template>
  <!--游戏过程页-->
  <div class="gamePart">
    <div class="bg2"></div>
    <UserImg></UserImg>
    <!--<Music></Music>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import UserImg from '../components/UserImg.vue'
  //  import Music from '../components/Music.vue'
  import {EventBus} from '../eventBus/eventBus';


  export default {
    data: function () {
      return {
        questions: []
      }
    },
//
    components: {
      UserImg,
//    Music
    },
//
//  computed: {},
//
//  methods: {}
//
    mounted: function () {

      // 请求问题数据
      const url2 = '/exam/GetQuestions';
      this.$http({
        url: url2,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
        console.log(res.data, '请求问题数据成功');
        if (res.data.Success) {
          this.questions = res.data.Data;

          const _id = this.questions[0].QuestionId;
//    console.log('gamepage',this.questions)
          this.$router.push({name: 'question', params: {questions: this.questions, id: _id}})
        }


      }).catch(err => {
        console.log(err, '请求错误');
//        alert('出错啦')

      });


    },
    watch: {
      // 检测动态路由来回切换 并修改数据
      $route(to, from) {
        console.log('to', to.name, 'from', from.name);
        if (to.name === 'gamePage') {
          //      请求问题数据
          const url = '/exam/GetQuestions';
          this.$http({
            url: url,
            method: 'post',//请求方式
            //这里可以添加axios文档中的各种配置
          }).then(res => {
            console.log(res.data, '请求成功');
            if (res.data.Success) {
              console.log('再来一次游戏')

              this.questions = res.data.Data;

              const _id = this.questions[0].QuestionId;
              this.$router.push({name: 'question', params: {questions: this.questions, id: _id}})
            }
          }).catch(err => {
            console.log(err, '请求错误');
//            alert('出错啦')

          })
        }
      }
    }
  }
</script>

<style>
  .gamePart {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
  }

  .bg2 {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99;
    background: url('../assets/bg2.jpg') no-repeat;
    background-size: 100% 100%;
  }
</style>
