<template>
  <div id="awardDetailBox" class="poupMain bg hide isAngular" style="display: block;">
    <!--<div id="forJZCouponBg" style="display: none;">-->
      <!--<div class="tipsBox">-->
        <!--<div class="contain">建站商城优惠券无奖品详情页<br><a href="javascript:;"-->
                                                 <!--onclick="window.open('http://hd.fkw.com/news/11181')">了解更多</a></div>-->
      <!--</div>-->
    <!--</div>-->
    <div id="awardDetailScrollBox">
      <!--<div id="awardDeailBg" class="bgfix hide"></div>-->
      <div class="awardCloseIcon" @click="_goBack"></div>
      <div class="awardDetail">
        <div class="hostName"
             style="padding: 0.7rem 2.2rem 1rem 0.7rem; text-align: left; color: rgb(255, 255, 255); word-break: break-word; text-decoration: none;">

        </div>
        <div class="awardName layerId-22 defBgColor" title="" style="cursor: pointer; position: relative;">
          价值100元礼品
        </div>
        <div class="awardSubTitle layerId-23 defBgColor" title=""></div>
        <div class="awardCodeTime codeTimeFixedRange layerId-1 defBgColor" title=""
             style="cursor: pointer; position: relative;"><em>兑奖期限</em>：<span class="codeBgTime">2018.06.27</span>
          - <span class="codeEndTime">2018.07.04</span></div>
        <div class="codeTimeFixedTerm hide layerId-2 defBgColor" title="" style="display: none;">中奖后<span
          class="codeBgTime">当</span>天生效，有效天数<span class="codeEndTime">30</span>天
        </div>
        <div id="awardCollectionBtn">收藏兑奖券</div>
        <div class="awardDetailWarp"></div>
      </div>
      <div class="codeImgBox">
        <div id="codeStatusBox" class="hide" style="padding-top:1.25rem;color:#777">
          <div id="codeStatusBtn"></div>
          <div id="codeStatusInfo">商家已将该兑奖码设置为作废<br>详情请联系商家</div>
          <div id="codeStatusTips" class="hide"><em style="font-style: normal;">请先<span
            class="giftNameA">兑奖券</span>，<span class="targetDateMin">1</span>天后可用</em></div>
        </div>

        <div id="codeDetailInfoBox">
          <img class="codeImg" src="http://hd.faisco.cn/manage/qrCode.jsp?cmd=qrurl&amp;siteUrl=888888"
               style="display: none;">
          <div class="codeLine"><span id="codeName">兑奖码</span>：<span
            style=" max-width: 8.7rem;word-wrap: break-word;display: inline-block; vertical-align: middle;"
            class="code selectText">888888</span><span class="copy">复制券码</span></div>
          <div class="codeOptInfo layerId-29 defBgColor" title="" style="cursor: pointer; position: relative;">
            凭券联系现场工作人员兑奖
          </div>
          <div class="codeOptInfo_Gift" style="display: none;">凭券联系现场工作人员兑奖</div>
          <div class="redPacketTip hide"></div>
        </div>

      </div>
      <div class="awardBtnList">

        <div style="height:0.4rem;"></div>
        <!--兑奖券详情弹出层 -->
        <div id="ticketDetailBox">
          <p class="ticketitle"><span class="text">兑奖券详情</span></p>
          <div class="ticketInfo">
            <div class="itemList dateLine codeTimeFixedRange layerId-3 defBgColor" title=""
                 style="cursor: pointer; position: relative;">
              <div class="title">有效日期</div>
              <div class="abox">
                <span class="beginTime">2018-06-27</span>至<span class="endTime">2018-07-04</span>
              </div>
            </div>
            <div class="itemList dateLine codeTimeFixedTerm hide layerId-4 defBgColor" title=""
                 style="display: none;">
              <div class="title">有效日期</div>
              <div class="abox">
                中奖后<span class="codeBgTime">当</span>天生效，有效天数<span class="codeEndTime">30</span>天
              </div>
            </div>
            <div class="itemList timelimitLine layerId-24 defBgColor" title=""
                 style="cursor: pointer; position: relative;">
              <div class="title">可用时段</div>
              <div class="abox">
                <div class="timelimit">周一至周日</div>
              </div>
            </div>
            <div class="itemList addressLine layerId-25 defBgColor" title=""
                 style="cursor: pointer; position: relative;">
              <div class="title titleAdress">兑奖地址</div>
              <div class="abox">
                <div class="address">方圆E时光</div>
              </div>
            </div>
            <div class="itemList noticeLine layerId-26 defBgColor" title=""
                 style="cursor: pointer; position: relative; z-index: auto;">
              <div class="title titleNotice">兑奖须知</div>
              <div class="abox">
                <div class="notice">
                  <pre style="word-wrap: break-word;"><span style="color: #999;">不填写则不显示</span></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form action=""></form>
        <div id="useStoreBox" class="initHide" style="display: none;">
          <div class="storeTitle">
            <span class="text">适用门店</span><span class="storeNumText">（<span id="storeNum">5</span>个）</span>
            <span class="moreBtn">更多</span>
          </div>
          <div class="storeInfoBox">
            <div class="locationBtn" onclick="HdGame.openStoreLocation(this)"></div>
            <div class="info">
              <div class="storeNameBox"><span id="storeName"></span><span id="distance"></span></div>
              <div class="storeAdress"></div>
            </div>
          </div>
        </div>
        <div style="height:0.4rem;"></div>
        <a style="text-decoration:none;">
          <div class="servicePhone awardDetailBtn layerId-30 defBgColor" title=""
               style="cursor: pointer; position: relative; z-index: 700;"><span class="text">客服电话（未开启）</span><span
            class="phoneIcon"></span><span class="phoneText"></span>
            <div id="layerId-30moveFrameLeft" class="moveFrame"
                 style="border-left-width: 1px; left: 0px; top: 0px; width: 0px; height: 37px; border-color: rgb(220, 220, 220); background: transparent;"></div>
            <div id="layerId-30moveFrameRight" class="moveFrame"
                 style="border-right-width: 1px; left: 319px; top: 0px; width: 0px; height: 37px; border-color: rgb(220, 220, 220); background: transparent;"></div>
            <div id="layerId-30moveFrameTop" class="moveFrame"
                 style="border-top-width: 1px; left: 0px; top: 0px; width: 320px; height: 0px; border-color: rgb(220, 220, 220); background: transparent;"></div>
            <div id="layerId-30moveFrameBottom" class="moveFrame"
                 style="border-bottom-width: 1px; left: 0px; top: 36px; width: 320px; height: 0px; border-color: rgb(220, 220, 220); background: transparent;"></div>
            <!--<div id="layerId-30moduleLayer" class="moduleLayer" _mousein="0"-->
                 <!--style="margin: 0px; left: 284px; top: -25px;"><a class="item tool" hidefocus="true"-->
                                                                  <!--href="javascript:;">编辑</a></div>-->
          </div>
        </a>
        <a id="awardCusBtnInfo" href="javascript:;" style="text-decoration:none;">
          <div class="awardCusBtn awardDetailBtn weui-cell__bd layerId-27 defBgColor"
               style="border-top: none; cursor: pointer; position: relative; z-index: auto;" title=""><span
            class="text" style="display: none;">了解更多</span><span class="textDef hide" style="display: inline;">自定义按钮（未开启）</span>
            <div class="cell__ft"></div>
          </div>
        </a>
        <div style="height:3.15rem;"></div>
      </div>
    </div>
    <div class="hide homePoupMask codeCopyDetailMask">
      <div class="codeCopyDetailPoup">
        长按以下文字复制券码<br>
        <div class="copyCode selectText"></div>
      </div>
    </div>
    <div class="hide bgfix codeDetailImgBox" style="display: none;">
      <div class="absCenter imgBox">
        <img class="codeImg" style="width: 9rem; height: 9rem; display: none;"
             src="http://hd.faisco.cn/manage/qrCode.jsp?cmd=qrurl&amp;siteUrl=888888">
      </div>
    </div>

    <div id="bottomCusBtnBox">
      <a id="bottomCusBtnInfo" href="javascript:;" style="text-decoration:none;">
        <div class="bottomCusBtn cusBtn disableBtn layerId-28 defBgColor" style="border-top: none; cursor: default;"
             title=""><span class="text">立即兑奖</span></div>
      </a>
      <!--<a id="WxCusBtnInfo" href="javascript:;" style="text-decoration:none;" class="hide"><div class="awardCusBtn cusBtn" style="border-top:none;"><span class="text">自定义按钮（未开启）</span><span class="textDef hide">自定义按钮（未开启）</span><div class="cell__ft"></div></div></a>-->
      <!--<a id="WxCusBtnInfo" href="javascript:;" style="text-decoration:none;"><div class="cusBtn" style="border-top:none;"><span class="text">领取微信卡券</span><div class="cell__ft"></div></div></a>-->
    </div>

  </div>
</template>

<script>

export default {
//  data: function () {
//    return {
//    }
//  },
//
//  components: {},
//
//  computed: {},
//
  methods: {
    _goBack: function () {
      this.$router.go(-1);
    }
  }
//
//  mounted: function() {},
//
//  beforeDestroy: function() {}
}
</script>

<style>
  #awardDetailBox.isAngular {
    overflow-y: hidden;
  }

  #awardDetailBox {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    font-size: .7rem;
    color: #fff;
    background-color: #f0eff4;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  #awardDetailScrollBox {
    height: 100%;
    overflow-y: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }
  .awardCloseIcon {
    width: 2.25rem;
    height: 2.25rem;
    background: url('../assets/close.png') no-repeat;
    background-size: 70%;
    background-position: center;
    position: absolute;
    right: .25rem;
    top: .25rem;
    z-index: 202;
  }
  .awardDetail {
    width: 100%;
    background-color: #35a4de;
    text-align: center;
    position: relative;
    padding-bottom: .5rem;
  }
  .awardDetail .awardName {
    font-size: 1.25rem;
    word-break: break-word;
  }
  .awardDetail .awardCodeTime,
  .awardDetail .codeTimeFixedTerm {
    font-size: .55rem;
    line-height: 1rem;
  }
  #awardCollectionBtn {
    width: 5rem;
    height: 1rem;
    border-radius: .5rem;
    background-color: rgba(0,0,0,0.3);
    margin: .3rem auto 0;
    line-height: 1rem;
    font-size: .6rem;
  }
  .awardDetail .awardDetailWarp {
    height: 4px;
    width: 100%;
    background: url('../assets/kqbd.png');
    position: absolute;
    bottom: 0;
  }
  .codeImgBox {
    text-align: center;
    color: #666;
    background-color: #fff;
    padding-bottom: .5rem;
  }
  #codeStatusBtn {
    width: 4.5rem;
    height: 1.75rem;
    line-height: 1.75rem;
    background-color: #d9d9d9;
    border-radius: .2rem;
    margin: 0 auto .5rem;
  }
  #codeDetailInfoBox {
    padding-top: .2rem;
    position: relative;
  }
  .codeImgBox .codeImg {
    width: 7.25rem;
    height: 7.25rem;
    margin-top: .7rem;
  }
  .codeImgBox .codeLine {
    margin-bottom: .1rem;
    padding-top: .4rem;
    color: #333;
  }
  .selectText {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    word-wrap: break-word;
    max-width: 10rem;
    display: inline-block;
  }
  .codeImgBox .copy {
    display: inline-block;
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    border-radius: .2rem;
    background-color: #35a4de;
    margin-left: .3rem;
    color: #fff;
    cursor: pointer;
  }
  .defBgColor {
    background-color: rgba(0,0,0,0);
  }
  .awardBtnList {
    position: relative;
  }
  #ticketDetailBox {
    background: #fff;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: .6rem .65rem;
    color: #000;
    z-index: 5000;
  }
  .isAngular #ticketDetailBox .ticketitle {
    font-size: .7rem;
    padding-bottom: .5rem;
    border-bottom: solid .05rem #d5d5d5;
    line-height: .7rem;
    position: relative;
  }
  #ticketDetailBox .ticketInfo {
    padding-top: .3rem;
  }
  .isAngular #ticketDetailBox .itemList {
    font-size: .6rem;
    padding: .3rem 0;
  }
  #ticketDetailBox .itemList .title {
    float: left;
    color: #666;
  }
  #ticketDetailBox .itemList .abox {
    width: auto;
    margin-left: 3.52rem;
  }
  #ticketDetailBox .itemList {
    font-size: .6rem;
    padding: .3rem 0;
  }
  #ticketDetailBox .itemList .abox div {
    width: 100%;
  }
  #ticketDetailBox .itemList {
    font-size: .6rem;
    padding: .3rem 0;
  }
  #awardDetailBox .awardDetailBtn {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    height: 1.75rem;
    color: #333;
    line-height: 1.75rem;
    padding-left: .6rem;
    background-color: #fff;
    font-size: .7rem;
  }
  #awardDetailBox .servicePhone .phoneIcon {
    float: right;
    width: 1.75rem;
    height: 1.75rem;
    background: url('../assets/hpoc.png') no-repeat;
    background-size: 100%;
  }
  #awardDetailBox .servicePhone .phoneText {
    float: right;
  }
  #awardCusBtnInfo .cell__ft {
    text-align: right;
    color: #999;
    padding-right: 13px;
    position: relative;
  }
  .hide {
    display: none;
  }
  .homePoupMask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: none;
    background-color: rgba(0,0,0,.85);
    z-index: 99999;
  }
  .codeCopyDetailPoup {
    margin: 6rem auto auto;
    width: 11rem;
    min-height: 4rem;
    background: #FFF;
    border-radius: .2rem;
    color: #000;
    text-align: center;
    line-height: 1.8rem;
    font-size: .8rem;
    padding: 1rem;
  }
  .codeCopyDetailPoup .copyCode {
    color: #329fea;
    font-size: 1.2rem;
    word-wrap: break-word;
  }
  .selectText {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    word-wrap: break-word;
    max-width: 10rem;
    display: inline-block;
  }
  .codeDetailImgBox {
    z-index: 10001;
    background: #fff;
  }
  .bgfix {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .codeDetailImgBox .imgBox {
    top: 0;
    bottom: 0;
    width: 9rem;
    height: 11rem;
    text-align: center;
  }
  .absCenter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .isAngular #bottomCusBtnBox, .isAngular #immediaAward {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2.75rem;
    background-color: #f0effc;
    z-index: 999;
  }
  .isAngular #bottomCusBtnBox, .isAngular #immediaAward {
  background-color: #fff;
  }
  #bottomCusBtnBox .cusBtn, #immediaAward .cusBtn, #awardCusBtnInfo .cusBtn {
    width: 15.25rem;
    height: 1.75rem;
    line-height: 1.75rem;
    text-align: center;
    font-size: .8rem;
    color: #fff;
    border-radius: .2rem;
    background-color: #06bb04;
    border: .05rem solid #31ab30;
    margin: .5rem auto;
  }
</style>
