<template>
  <div class="WL" id="WL">
    <ul class="WL-p">
      <li>yyyy-MM-dd HH:mm:ss: 恭喜xxxx1中了xxxxxxx</li>
      <li>yyyy-MM-dd HH:mm:ss: 恭喜xxxx2中了xxxxxxx</li>
      <li>yyyy-MM-dd HH:mm:ss: 恭喜xxxx3中了xxxxxxx</li>
      <li>yyyy-MM-dd HH:mm:ss: 恭喜xxxx4中了xxxxxxx</li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        WL:[]
      }
    },

    components: {},

    computed: {},

    created() {
      this.i2($);

      // 请求中奖名单
      const url = '/exam/GetPrizeUsers';
      this.$http({
        url: url,
        method: 'post',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(res => {
        console.log(res.data, '请求中奖名单成功');
//        EventBus.userData = res.data.Data

        $("#WL").myScroll({
          speed:60,//数值越大,速度越慢
          rowHeight:20//li的高度
        })
      }).catch(err => {
        console.log(err, '请求错误');
//        alert('出错啦')

      });
    },
    mounted() {
//      $(".WL-p").RollTitle({line:1,speed:800,timespan:1});



    },

    beforeDestroy() {
    },

    methods: {

      i2(jq) {
        jq.fn.myScroll = function(options){
          //默认配置
          let defaults = {
            speed:40,  //滚动速度,值越大速度越慢
            rowHeight:24 //每行的高度
          };

          let opts = $.extend({}, defaults, options),intId = [];

          function marquee(obj, step){

            obj.find("ul").animate({
              marginTop: '-=1'
            },0,function(){
              let s = Math.abs(parseInt($(this).css("margin-top")));
              if(s >= step){
                $(this).find("li").slice(0, 1).appendTo($(this));
                $(this).css("margin-top", 0);
              }
            });
          }

          this.each(function(i){
            let sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
              if(_this.find("ul").height()<=_this.height()){
                clearInterval(intId[i]);
              }else{
                marquee(_this, sh);
              }
            }, speed);

            _this.hover(function(){
              clearInterval(intId[i]);
            },function(){
              intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                  clearInterval(intId[i]);
                }else{
                  marquee(_this, sh);
                }
              }, speed);
            });

          });

        }
      }
    }
  }
</script>

<style lang='css' scoped>
.WL {
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15rem;
  height:1.5rem;
  background: rgba(0,0,0,.5);
  overflow: hidden;
}
.WL li {
  font-size: .7rem;
  color: #fff;
}
  .WL-p {
    /*height:8rem;*/
    overflow: hidden;
    /*background-color: cadetblue;*/
    text-align: center;
  }
</style>
