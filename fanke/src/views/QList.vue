<template>
  <!--问题-->
  <div class="QBox">
    <div class="question">
      <div :class="{ animated: true, slideOutUp: isSlide }" v-if="questions">
        <p class="questionNum">{{ questions[Num].QuestionNo + '/' + questions.length }}</p>
        <p class="questionText">{{ questions[Num].QuestionDesc }}</p>
        <img v-lazy="questions[Num].QuestionImage" alt="题目图片"
             @click.stop="imgClick($event)" :key="questions[Num].QuestionImage">

      </div>
      <div :class="{ animated: true, optionBox: true, slideOutDown: isSlide }" v-if="questions">
        <!--选项-->
        <div class="option" v-for="(item, index) in questions[Num].Items" :key="index">
          <p class="normalP" @click="flag && checkAnswer()" :id="questions[Num].Items[index].ItemId">
            {{item.ItemDesc}}</p>

        </div>

      </div>

    </div>
  </div>

</template>

<script>

  export default {
//    props: {
//      questions: Array,
//
//    },
    data: function () {
      return {
        questions: [],
        target: {},
        isSlide: false,  // 动画开关
        Num: 0,  // 第几条问题
        flag: true,  // 点击开关
        btnRight: require('../assets/btnRight.png'),
        btnWrong: require('../assets/btnWrong.png')

      }
    },
    computed: {
      // 下一题的id
      _id: function () {
//      console.log(this.questions[this.Num].QuestionNo)
        let temp = this.questions[this.Num].QuestionNo;
        temp++;
        return temp
      }
    },
//    beforeCreate() {
//      console.log('beforeCreate:',this.$route.params.questions,'and',this.questions)
//
//    },
    created() {
//      console.log('created:', this.$route.params.questions, 'and', this.questions)
      this.questions = this.$route.params.questions;

    },
//    beforeMount() {
//      console.log('beforeMount:',this.$route.params.questions,'and',this.questions)
//    },
//
    mounted () {
//      console.log('mounted:',this.$route.params.questions,'and',this.questions)

    },
    methods: {
      imgClick(e) {
        e.preventDefault()
      },
      nextQ: function () {
        //  切换去下一个问题,相同的路由, 只是id不同 显示不同的问题
//        console.log(this._id)
//        console.log('aa',this.questions[this.Num],this.questions[this.Num].QuestionImage)

        clearTimeout(this.timer);
        this.$router.replace({name: 'question', params: {questions: this.questions, id: this._id}});
      },

      checkAnswer: function () {
        console.log('this.questions', this.questions);
//        console.log('checkAnswer');

        this.flag = false;
        // `event` 是原生 DOM 事件
        this._event = event;
//        this.hasAnswer = true;
        const questionId = this.questions[this.Num].QuestionId;
        const itemId = this._event.target.id;
        console.log(questionId, itemId);

        //请求问题答案

        const url = '/exam/CheckQuestion';
        this.$http({
          url: url,//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
          method: 'post',//请求方式
          data: {
            QuestionId: questionId,
            ItemId: itemId
          },
          //这里可以添加axios文档中的各种配置
        }).then(res => {
//          console.log(res.data.Data, '请求成功');
//        正确答案
          const rightAnswer = res.data.Data.Items[0].ItemId;
          if (event) {
            if (this._event.target.id === rightAnswer) {  // 回答正确

              this._event.target.style.background = 'url(' + this.btnRight + ') 0% 0% / 100% 100% no-repeat';

            } else {  // 错误

              this._event.target.style.background = 'url(' + this.btnWrong + ') 0% 0% / 100% 100% no-repeat';
              this._event.target.classList.add('shakeLR');

            }
            this.isSlide = true;
            if (this._id <= this.questions.length) {   // 题目还未答完
//              console.log(1);
              this.timer = setTimeout(() => {
                this.nextQ();
              }, 1400)

            } else {  // 题目答完 转去答题结果页
//              console.log('this._id:',this._id)
//              console.log(2);
              setTimeout(() => {
                this.$router.push('/gamePage/gameResult')
              }, 1400)
//              this.$router.push({ name: 'question', params: {questions: this.questions, id: this._id}});
            }

          }

        }).catch(err => {
          console.log(err, '请求错误');
        });
      }


    },
    watch: {
      // 检测动态路由来回切换 并修改数据
      $route(to, from) {
        this.isSlide = false;
        this.flag = true;
        console.log('flag:', this.flag);

        this.Num++;
        this._event.target.style.background = '';
        this._event.target.classList.remove('shakeLR');

      }
    }
  }
</script>

<style>
  .QBox .animated {
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }

  .QBox {

    position: relative;
    width: 100%;
    height: 100%;
  }

  .question {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 11rem;
  }

  .question img {
    width: 10.75rem;
    height: 8rem;
  }

  .optionBox {
    margin-top: 1rem;

  }

  .option {
    margin-bottom: 1rem;
    width: 10.75rem;
    height: 1.75rem;
  }

  .option .rightP, .option .wrongP, .option .normalP {
    font-size: 0.8rem;
    /*padding: .2rem 1rem;*/
    padding-left: 1rem;
    color: #ffffff;
    width: 9.75rem;
    height: 1.75rem;
    line-height: 1.70rem;
    display: inline-block;
    position: relative;
    left: 0;

  }

  .option .normalP {
    background: url("../assets/btnDefault.png") no-repeat;
    background-size: 100% 100%;

  }

  .option .rightP {
    background: url("../assets/btnRight.png") no-repeat;
    background-size: 100% 100%;

  }

  .option .wrongP {
    background: url("../assets/btnWrong.png") no-repeat;
    background-size: 100% 100%;

  }

  .questionText {
    word-wrap : break-word;
    font-size: 0.8rem;
    color: rgb(112, 0, 252);
    text-shadow: rgb(255, 255, 255) -1px -1px 0px, rgb(255, 255, 255) 0px -1px 0px, rgb(255, 255, 255) 1px -1px 0px, rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 1px 1px 0px, rgb(255, 255, 255) 0px 1px 0px, rgb(255, 255, 255) -1px 1px 0px, rgb(255, 255, 255) -1px 0px 0px;
  }

  .questionNum {
    font-size: 0.9rem;
    color: #fe3311;
    text-shadow: -1px -1px 0 #fff, 0px -1px 0 #fff, 1px -1px 0 #fff, 1px 0 0 #fff, 1px 1px 0 #fff, 0px 1px 0 #fff, -1px 1px 0 #fff, -1px 0 0 #fff;
  }

  @-webkit-keyframes shakeLR /* Safari 和 Chrome */
  {
    0% {
      left: 0rem;
    }
    25% {
      left: -1rem;
    }
    50% {
      left: 0rem;
    }
    75% {
      left: 1rem;
    }
    100% {
      left: 0rem;
    }
  }

  @keyframes shakeLR {
    0% {
      left: 0rem;
    }
    25% {
      left: -1rem;
    }
    50% {
      left: 0rem;
    }
    75% {
      left: 1rem;
    }
    100% {
      left: 0rem;
    }
  }

  .shakeLR {
    -webkit-animation: shakeLR linear 0.7s;
    -o-animation: shakeLR linear 0.7s;
    animation: shakeLR linear 0.7s;
  }
</style>
