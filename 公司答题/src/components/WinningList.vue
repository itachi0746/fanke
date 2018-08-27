<template>
  <div class="WL" id="WL" v-if="WL">
    <ul class="WL-p">
      <!--<li v-for="(item,index) in WL" :key="">-->
        <!--{{item.PrizeTime}}-->
        <!--恭喜-->
        <!--<span class="WL-name">-->
          <!--{{item.UserName}}-->
        <!--</span>-->
        <!--获得{{item.PrizeName}}！-->
      <!--</li>-->
      <li>
        22222222222222
        恭喜
        <span class="WL-name">
          吾问无为谓
        </span>获得呜呜呜!
      </li>
      <li>
        22222222222222
        恭喜
        <span class="WL-name">
          吾问无为谓无无无
        </span>获得呜呜呜!
      </li>
      <li>
        22222222222222
        恭喜
        <span class="WL-name">
          吾问无为谓无无无
        </span>获得呜呜呜!
      </li>

    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        WL: [],
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
        this.WL = res.data.Data;

        this.$nextTick(() => {
          // DOM 现在更新了
          // `this` 绑定到当前实例
          $("#WL").myScroll({
            speed: 60,//数值越大,速度越慢
            rowHeight: 20//li的高度
          })
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
        jq.fn.myScroll = function (options) {
          //默认配置
          let defaults = {
            speed: 40,  //滚动速度,值越大速度越慢
            rowHeight: 24 //每行的高度
          };

          let opts = $.extend({}, defaults, options), intId = [];

          function marquee(obj, step) {

            obj.find("ul").animate({
              marginTop: '-=1'
            }, 0, function () {
              let s = Math.abs(parseInt($(this).css("margin-top")));
              if (s >= step) {
                $(this).find("li").slice(0, 1).appendTo($(this));
                $(this).css("margin-top", 0);
              }
            });
          }

          this.each(function (i) {
            let sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
            intId[i] = setInterval(function () {
              if (_this.find("ul").height() <= _this.height()) {
                clearInterval(intId[i]);
              } else {
                marquee(_this, sh);
              }
            }, speed);

            _this.hover(function () {
              clearInterval(intId[i]);
            }, function () {
              intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                  clearInterval(intId[i]);
                } else {
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
    top: 74%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 15.5rem;
    height: 1.5rem;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
  }

  .WL li {
    font-size: .6rem;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .15rem;
    white-space: nowrap;

  }
  .WL-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*display: inline-block;*/
    /*max-width: 4.75rem;*/
    flex: 4;
    position: relative;
    /*top: .2rem;*/
  }

</style>
