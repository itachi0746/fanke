<template>
  <div class="actInfoBody actDesc">
    <div class="poupMainInfo">
      <div class="poupLine">
        <div class="mainTitle">活动奖品</div>
        <div v-html="activityData.PrizeDesc">

          <!--{{ activityData.PrizeDesc }}-->

        </div>
      </div>
      <div class="poupLine">
        <div class="mainTitle">活动时间</div>
        <div>
          {{ activityData.TimeDesc }}
        </div>
      </div>
      <div class="poupLine">
        <div class="mainTitle">主办单位</div>
        <div>
          <p>本次活动主办单位为 - {{ activityData.SponsorDesc }}</p>
        </div>
      </div>
      <!--<div class="poupLine">-->
        <!--<div class="mainTitle">技术支持</div>-->
        <!--<div>-->
          <!--<p>-->
            <!--页面技术由-->
            <!--<a class="skillName" onclick="return false" href="">{{TechnicalSupport}}</a>-->
            <!--提供，技术支持方仅提供页面技术，不承担由活动引起的相关法律责任-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
      <div class="poupLine">
        <div class="mainTitle">活动说明</div>
        <div id="DescBox" v-html="activityData.Desc">

          <!--{{ activityData.Desc }}-->
        </div>
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
        TechnicalSupport: '接入信息',
        point: 80,
        activityData: {},
      }
    },
//
//  components: {},
//
//  computed: {},
//
//  methods: {}
    created() {
    },
    mounted() {
      // 请求活动描述
      const url = '/exam/ActivityDetail';
//      const DescBox = document.querySelector('#DescBox');
      this.$http({
        url: url,
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
//      console.log('活动描述',res.data)
        this.activityData = res.data.Data;
//        DescBox.innerHTML = this.activityData.Desc;

        console.log('this.activityData', this.activityData)
      }).catch(err => {
        console.log(err, '请求错误');
//        alert('出错啦')

      })
    },

//    activated: function () {
//      console.log(3)
//    },
//    deactivated: function () {
//      console.log(4)
//    }
//
//  beforeDestroy: function() {}
  }
</script>

<style>
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

  .mainTitle {
    background: #fff;
    color: #000;
    display: inline-block;
    padding: 0.2rem 0.4rem;
    margin-bottom: .55rem;
    /*margin-left: 1rem;*/
  }

  .poupMainInfo {
    height: 24rem;
    overflow-y: auto;
  }

  .skillName {
    color: #fff000;
  }

  .actDesc .poupSlideBar {
    left: 1rem;

  }
</style>
