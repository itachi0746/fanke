
var pointControl
$(function () {

  var tabArr = ['客运站,铁路,机场,港口','服务区','收费站','高速','高速路网'];
  var tabDomNameArr = ['#tab2','#tab3','#tab4','#tab5','#tab6'];
  var newTabArr = tabArr.map(function (item,index) {
    return {
      name: item,
      class: tabDomNameArr[index]
    }
  });
  var nowTab = tabArr[0];
  //postionType-位置类别：1场站，2服务区，3收费站
  var positionType = 1;
  var curPosition;  // 目前位置 点击marker 预警 变化

  // console.log(newTabArr)
  var tabBoxes = $('.tab-box');
  var tabBoxes2 = $('.tab-box2 .tab-box2-li');
  var tabBoxes3 = $('.tab-box3 .tab-box2-li');
  var tabBoxes4 = $('.tab-box4 .tab-box2-li');
  var tabBoxes5 = $('.tab-box5 .tab-box2-li');

  var title = $('.title');
  pointControl = new PlacePointView(theMap);
  init();
  // console.log(pointControl.PlacePoints)


  function init() {
    console.log('切换到:',nowTab);
    initCalendar();

    // 点击标题
    title.on('click',function () {
      pointControl.ReturnDefualt();  // 默认视角
      pointControl.showMarkers();  // 显示点标记
      showTabs();
      hideCurLocaction();
      hideTab2();
      $('#floor').addClass('dn');

    });

    for (var i = 0; i < tabBoxes.length; i++) {
      var box = tabBoxes[i];
      $(box).on('click',clickTab)
    }
    for (var j = 0; j < tabBoxes2.length; j++) {
      var box2 = tabBoxes2[j];
      var box3 = tabBoxes3[j];
      var box4 = tabBoxes4[j];
      var box5 = tabBoxes5[j];
      // 交通枢纽绑定
      $(box2).on('click',function () {
        clickTab2(tabBoxes2,this)
      })
      // 服务区绑定
      $(box3).on('click',function () {
        clickTab2(tabBoxes3,this)
      })
      // 收费站
      $(box4).on('click',function () {
        clickTab2(tabBoxes4,this)
      })
      $(box5).on('click',function () {
        clickTab2(tabBoxes5,this)
      })
    }
    arrowBindClick();
    dongchaTabBindClick();
    addStation();

    // jiankongEvent();
    getYJData();

    // clickTop3Li();

    // 先显示枢纽点
    pointControl.showPoints('客运站,铁路,机场,港口');
    // console.log('theDataObject:',pointControl.markes)
    markerBindClick();
    // tab2InitEchart();
    // tab2InitEchart2();
    // tab4InitEchart();
    // tab4InitEchart2();
    // tab3InitEchart();
    // tab3InitEchart2();
    // tab3InitEchart3();
    // initCalendar();
    // addStation();

    // 调试
    // hideTabs()
  }
  var isHideStation = true;
  // 添加交通枢纽

  function addStation() {
    var gonglu = '福田汽车客运站CBG|\n' +
      '龙岗长途汽车客运站|\n' +
      '罗湖汽车站|\n' +
      '深圳汽车站|\n' +
      '广东省汽车客运站|\n' +
      '广州芳村汽车客运站|\n' +
      '广州市汽车客运站|\n' +
      '广州市天河客运站|\n' +
      '茂名市客运中心站|\n' +
      '香洲长途站|\n' +
      '佛山汽车站|\n' +
      '河源汽车总站|\n' +
      '中山汽车总站|\n' +
      '中山小榄客运站|\n' +
      '江门汽车客运站|\n' +
      '惠州汽车总站|\n' +
      '东莞汽车总站|\n' +
      '东莞长安车站|\n' +
      '潮州汽车客运站|\n' +
      '清远汽车客运站|\n'

    var tielu = '深圳北站|\n' +
      '深圳西站|\n' +
      '深圳站|\n' +
      '广州北站|\n' +
      '广州东站|\n' +
      '广州南站|\n' +
      '广州站|\n' +
      '惠州站|\n' +
      '东莞东|\n' +
      '东莞站|\n' +
      '虎门站|\n' +
      '潮汕站|\n' +
      '佛山西站|\n' +
      '珠海站|'

    var shuiluminhang = '湛江徐闻海安港|\n' +
      '深圳宝安国际机场|\n' +
      '白云国际机场二号航站楼|\n' +
      '广州白云国际机场|\n' +
      '湛江机场|\n' +
      '揭阳机场|'

    var tieluArr = tielu.trim().split('|');
    var gongluArr = gonglu.trim().split('|');
    var shuiluminhangArr = shuiluminhang.trim().split('|');

    // console.log(tieluArr)
    for (var i = 0; i < tieluArr.length; i++) {
      var t = tieluArr[i].replace(/[\r\n]/g,"");
      if(!t) {
        console.log(t);
        continue
      }
      var stationDom = $('<li>'+ t +'</li>');
      stationDom.on('click',function () {
        var name = $(this).text();
        var curPosDataBox = $('#cur-pos-data-box');
        var tabBoxCur = $('#tab-box-cur');
        var arrows = tabBoxCur.find('.arrow');
        tabBoxCur.find('.up').addClass('dn');
        tabBoxCur.find('.down').removeClass('dn');

        curPosDataBox.hide(300);
        isHideStation = true;

        goToPointByName(name)
      })
      $('#station-box-1').find('ul').append(stationDom);
      // $('#station-box-1').find('ul').append($('<li>'+ t +'</li>'));
    }
    for (var j = 0; j < gongluArr.length; j++) {
      // console.log(1111)
      var g = gongluArr[j].replace(/[\r\n]/g,"");
      // debugger
      if(!g) {
        // console.log(t);
        continue
      }
      var stationDom2 = $('<li>'+ g +'</li>');
      stationDom2.on('click',function () {
        isHideStation = true;
        var name = $(this).text();
        var curPosDataBox = $('#cur-pos-data-box');

        var tabBoxCur = $('#tab-box-cur');
        var arrows = tabBoxCur.find('.arrow');
        tabBoxCur.find('.up').addClass('dn');
        tabBoxCur.find('.down').removeClass('dn');

        curPosDataBox.hide(300)
        goToPointByName(name)
      })
      $('#station-box-2').find('ul').append(stationDom2);
    }
    for (var k = 0; k < shuiluminhangArr.length; k++) {
      var s = shuiluminhangArr[k].replace(/[\r\n]/g,"");
      if(!s) {
        // console.log(t);
        continue
      }
      var stationDom3 = $('<li>'+ s +'</li>');
      stationDom3.on('click',function () {
        isHideStation = true;
        var name = $(this).text();
        var curPosDataBox = $('#cur-pos-data-box');
        var tabBoxCur = $('#tab-box-cur');
        var arrows = tabBoxCur.find('.arrow');
        tabBoxCur.find('.up').addClass('dn');
        tabBoxCur.find('.down').removeClass('dn');
        curPosDataBox.hide(300);
        goToPointByName(name)
      })
      $('#station-box-3').find('ul').append(stationDom3);
    }
  }

  // 根据名字移动到地点  name 字符串
  function goToPointByName(name) {
    var clickTarget = pointControl.findPointByName(name);
    if(clickTarget) {
      var lng = clickTarget['地址'][0].lnglat.split(',')[0];
      var lat = clickTarget['地址'][0].lnglat.split(',')[1];
      var arg = {
        P:lat,
        R:lng,
        lat: lat,
        lng: lng
      };
      // console.log(clickTarget['地址'][0].lnglat)
      pointControl.MoveToPoint(arg,18)
    }
  }

  /**
   * 日历初始化
   */
  function initCalendar() {
    var myDate = new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var date = y + '-' + m + '-' + day;

    // 交通枢纽
    laydate.render({
      elem:'#tab-li2-cld'
      ,value: date
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
      ,done: function(value, date, endDate){
      // console.log(value); //得到日期生成的值，如：2017-08-18
      // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
      // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        tab2Li2Echart1reqData(value);
    }
    })

    laydate.render({
      elem:'#tab-li3-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
      ,range: true
    })
    laydate.render({
      elem:'#tab-li3-cld2'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
      ,range: true
    })

    // 服务区
    laydate.render({
      elem:'#tab-li4-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#tab-li4-cld2'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#sskl-cld2'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })

    // 收费站
    laydate.render({
      elem:'#tab4-klqs-cld2'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#tab4-m-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#tab4-big-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
      ,range: true
    })

    // 高速路段
    laydate.render({
      elem:'#tab5-klqs-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#tab5-klqs-cld2'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#tab5-big-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
      ,range: true
    })

  }

  // 隐藏tab2
  function hideTab2() {
    var temp;
    if(nowTab==='客运站,铁路,机场,港口') {
      temp = $('#tab2');
    }
    if(nowTab==='服务区') {
      temp = $('#tab3');
    }
    if(nowTab==='收费站') {
      temp = $('#tab4');
    }
    if(nowTab==='高速') {
      temp = $('#tab5');
    }
    if(nowTab==='高速路网') {
      // temp = $('#tab3');
    }

    temp.addClass('vh');
    var tabs = temp.find('.tab-box2-li');
    for (var j = 0; j < tabs.length; j++) {
      var obj = tabs[j];
      $(obj).removeClass('active');
    }
    var liTabBox = temp.find('.li-tab-box');
    for (var i = 0; i < liTabBox.length; i++) {
      var obj1 = liTabBox[i];
      $(obj1).css('visibility','hidden');
    }
  }

  // 主tab点击事件
  function clickTab() {
    for (var j = 0; j < tabBoxes.length; j++) {
      var obj = tabBoxes[j];
      $(obj).removeClass('tab-box-active');
    }
    $(this).addClass('tab-box-active');

    var t = $(this).data('name');
    nowTab = t;
    console.log('切换到:',t);

    if(nowTab===tabArr[0]) {
      positionType = 1;  // 场站type
    }
    if(nowTab===tabArr[1]) {
      positionType = 2;  // 服务区type
    }
    if(nowTab===tabArr[2]) {
      positionType = 3;  // 收费站type
    }
    if(nowTab==='高速') {

    }
    if(nowTab==='高速路网') {

    }

    pointControl.ReturnDefualt();
    pointControl.showPoints(t);  // 放大点
    markerBindClick();
  }

  // tab2点击事件 目标,this
  function clickTab2(target,me) {
    // console.log(target,me);

    // 隐藏
    $('.arrow.up').addClass('dn');
    $('.arrow.down').removeClass('dn');
    isHideStation = true;
    // 组织冒泡
    $(me).find('.li-tab-box').on('click',function (e) {
      e.stopPropagation()
    });
    if(me.dataset.name==='实时监控') {
      jiankongEvent(me)
    }

    if($(me).hasClass('active')) {  // 如果点击的是已经active的tab
      $(me).removeClass('active');
      $(me).find('.li-tab-box').css('visibility','hidden')
      return
    }
    for (var j = 0; j < target.length; j++) {
      var obj = target[j];
      $(obj).removeClass('active');
      $(obj).find('.li-tab-box').css('visibility','hidden')
    }
    $(me).addClass('active');
    $(me).find('.li-tab-box').css('visibility','visible')
    // myChart.resize();


    initTab2(me.dataset.name);
  }

  function initTab2(tab2Name) {
    if(nowTab===tabArr[0]&&tab2Name==='实时客流') {  // 交通枢纽
      // 请求客流量数据
      getRealTimeFlowData();

      tab2Li2InitEchart();
      tab2Li2InitEchart2();
      initCalendar();
    }
    if(nowTab===tabArr[0]&&tab2Name==='旅客洞察') {
      getPassengerData();

      tab2Li3InitEchart1();
      tab2Li3InitEchart2();
      tab2Li3InitEchart3();
      tab2Li3InitEchart4();
    }
    if(nowTab===tabArr[0]&&tab2Name==='旅客趋势') {
      tab2Li4InitEchart();
      tab2Li4InitEchart2();
    }

    if(nowTab===tabArr[1]&&tab2Name==='实时客流') {  // 服务区

      tab3Li2InitEchart();
      tab3Li2InitEchart2();
    }
    if(nowTab===tabArr[1]&&tab2Name==='旅客洞察') {
      tab3Li3InitEchart();
      tab3Li3InitKLHX2();
      guishufenxiChart();
    }
    if(nowTab===tabArr[1]&&tab2Name==='旅客趋势') {
      tab3Li4InitEchart()
    }

    if(nowTab===tabArr[2]&&tab2Name==='实时客流') {  // 收费站
      tab4Li2initEchart();
      tab4Li2initEchart2();
      tab4Li2InitEchart3();
    }
    if(nowTab===tabArr[2]&&tab2Name==='旅客洞察') {
      tab4Li3InitEchart1();
      tab4Li3InitEchart2();
    }
    if(nowTab===tabArr[2]&&tab2Name==='旅客趋势') {
      tab4Li4InitEchart1();
      tab4Li4InitEchart2();
    }

    if(nowTab===tabArr[3]&&tab2Name==='实时客流') {  // 高速路段
      tab5Li2initEchart1();
      tab5Li2initEchart2();
    }
    if(nowTab===tabArr[3]&&tab2Name==='旅客趋势') {
      tab5Li3InitEchart1();
      tab5Li3InitEchart2();
      tab5Li3initEchart3();
    }

  }

  function getmaxLen(tgt) {
    // var videoList = $(id);
    var videoList = tgt;

    var listLis = videoList.find('li');
    var liLen = parseInt($(listLis[0]).css('width'));
    var listLisLen = liLen * listLis.length;
    // debugger
    var maxLen = listLisLen - parseInt(videoList.css('width'));

    console.log('maxLen:',maxLen);
    return maxLen
  }

  var ageObj = {
    0: '6-11岁',
    1: '12-15岁',
    2: '16-18岁',
    3: '19-22岁',
    4: '23-25岁',
    5: '26-35岁',
    6: '36-45岁',
    7: '46-55岁',
    8: '56-65岁',
    9: '66岁以上'
  };


  function jiankongEvent(whichLi) {
    var tgt = $(whichLi);
    // var addBox = $('.add-box');
    // var videoPlayBox2 = $('.video-play-box2');
    // var closeIcon = $('.close-icon');
    console.log(tgt)
    var addBox = tgt.find('.add-box');
    var videoPlayBox2 = tgt.find('.video-play-box2');
    var closeIcon = tgt.find('.close-icon');

    addBox.on('click',function () {
      videoPlayBox2.addClass('db');

    });
    closeIcon.on('click',function () {
      videoPlayBox2.removeClass('db');

    });
    //可拖拽的进度条
    var theScale = function (btn, bar) {
      this.btn = document.getElementById(btn);
      this.bar = document.getElementById(bar);
      this.init();
    };
    theScale.prototype = {
      init: function () {
        var f = this, g = document, b = window, m = Math;
        f.btn.onmousedown = function (e) {
          var x = (e || b.event).clientX;
          var l = this.offsetLeft;
          var max = f.bar.offsetWidth - this.offsetWidth;
          g.onmousemove = function (e) {
            var thisX = (e || b.event).clientX;
            var to = m.min(max, m.max(-2, l + (thisX - x)));
            f.btn.style.left = to + 'px';
            // f.ondrag(m.round(m.max(0, to / max) * 100), to);
            f.ondrag((to / max), to,tgt);
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
          };
          g.onmouseup = new Function('this.onmousemove=null');
        };
      },
      ondrag: function (percent, x, target) {  // 百分比,位移距离

        var ul = target.find('.video-list').find('ul');
        console.log(ul)
        var maxLen = getmaxLen(target.find('.video-list'));

        // console.log(percent)
        ul.css('left',(-1*percent*maxLen)+'px')
      }
    };

    new theScale('tuodong', 'line');
    new theScale('tuodong2', 'line2');
    new theScale('tuodong3', 'line3');
    // console.log('dis:',tuodong.dis)


  }


  // 后去预警数据
  function getYJData() {
    var url = 'terminal/getTerminalWarningList.do';
    var data = {

    };
    $.axpost(url,data,function (data) {
      // console.log(data);

      if(data && data.isSuccess) {
        var yongji = $('#yongji');
        var shizhong = $('#shizhong');
        var shushi = $('#shushi');
        var ss = {
          name: '舒适',
          dom: shushi,
          icon: 'top3-icon3',
          data: data.data.listTerminal_ss
        };
        var sz = {
          name: '适中',
          dom: shizhong,
          icon: 'top3-icon2',
          data: data.data.listTerminal_sz
        };
        var yj = {
          name: '拥挤',
          dom: yongji,
          icon: 'top3-icon1',
          data: data.data.listTerminal_yj
        };

        var dataArr = [ss,sz,yj];
        for (var i = 0; i < dataArr.length; i++) {
          var item = dataArr[i];
          // debugger
          for (var j = 0; j < item.data.length; j++) {
            var temp = item.data[j];
            var num;
            if(temp.userCnt>=10000) {
              num = temp.userCnt.toString();
              num = num.slice(0, num.length - 4);
              temp.userCnt = parseInt(num);
            }
          }

          addLiToUl(item)
        }

      }
    });

    function addLiToUl(item) {
      var index = 0;
      for (var i = 0; i < item.data.length; i++) {
        var liData = item.data[i];
        index++;
        var liDom = '<li class="top3-li" title="'+ liData.postionName +'">\n' +
          '<i class="'+ item.icon +'">'+ index +'</i>\n' +
          '<p><label class="p-name ellipsis">' + liData.postionName + '</label> <span>当前客流 <i class="num">'+liData.userCnt +'</i>万人</span></p>\n' +
          '</li>';
        var temp = $(liDom);

        temp.on('click',function () {
          // debugger
          var name = $(this).find('.p-name').text();
          goToPointByName(name);
          pointControl.hideMarkers();
        })
        item.dom.append(temp)
      }

      item.dom.parent().find('.yj-num').text(item.data.length+'处');
    }

    // var yongji = $('#yongji');
    // var data = moniData;
    // var num = 1;
    // for (var i = 0; i < data.length; i++) {
    //   var liData = data[i];
    //   var liDom = '<li class="top3-li" title="'+ liData.name +'">\n' +
    //     '<i class="top3-icon1"> '+ num +'</i>\n' +
    //     '<p><label class="p-name ellipsis">' + liData.name + '</label> <span>当前客流 <i class="num">22</i>万人</span></p>\n' +
    //     '</li>';
    //   num++;
    //   yongji.append($(liDom))
      // $(yongji.find('li')[i]).data('name','123')

      // console.log($(yongji.find('li')[0]).data('pos'))
      // var curLi = yongji.find('li')[i];
      // curLi.dataset.name = liData.name;
      // curLi.dataset.lng = liData.pos.lng;
      // curLi.dataset.lat = liData.pos.lat;
      // curLi.dataset.zoom = liData.zoom;

    // }

  }


  // 点击预警
  function clickTop3Li() {
    var yujingLiArr = $('.top3-li');
    for (var i = 0; i < yujingLiArr.length; i++) {
      var li = yujingLiArr[i];
      $(li).on('click',function () {
        var name = $(this).find('.p-name').text();
        goToPointByName(name)
      })
    }


  }

  // 清空位置图片
  function initCenterBG() {
    var imgBox = $('#center-img');
    imgBox.empty();
    for (var i = 0; i < 2; i++) {
      var newImage = new Image();
      newImage.src = 'yjzx/img/menu/icon_lower_center.png';
      imgBox.append(newImage)

    }
  }

  // 隐藏tab,显示tab2
  function hideTabs() {
    var tab = $('#tab');
    var tabBox = tab.find('.tab-box');
    var noActive;
    // console.log(tab)
    pointControl.hideMarkers();
    curPosition = this.C.extData['枢纽名称'];

    initCenterBG();
    if(curPosition.length>4) {
      var imgBox = $('#center-img');
      var temp = curPosition.length - 4;
      var img = imgBox.find('img')[0];

      for (var j = 0; j < temp; j++) {
        var newImage = new Image();
        newImage.src = img.src;
        // console.log('temp:',temp)
        imgBox.append(newImage)
      }
    }
    $('#tab-name').text(curPosition);

    // tab移动
    for (var i = 0; i < tabBox.length; i++) {
      var tabLi = $(tabBox[i]);
      tabLi.css('top','-102px');
      noActive = tabLi.attr('class').indexOf('tab-box-active') == '-1';

      if(noActive) {
        tabLi.css('z-index','-1')
        tabLi.addClass('vh')
      } else {
        tabLi.css('z-index','10')
      }
    }
    showCurLocaction();

    var tabBoxCur = $('#tab-box-cur');
    // var tab2 = $('#tab2');
    tabBoxCur.find('.up').removeClass('dn');
    tabBoxCur.find('.down').addClass('dn');
    // tab2.removeClass('vh');
    $('#floor').removeClass('dn');

    showWhichTab()
  }

  /**
  * 交通枢纽-实时客流 获取实时客流量
  */
  function getRealTimeFlowData() {
    // debugger
    var url = 'terminal/selectTerminalFlowRealtime.do?'+'postionType='+positionType+'&postionName='+curPosition;
    var url2 = 'terminal/selectTerminalIn.do?'+'postionType='+positionType+'&postionName='+curPosition;
    var url3 = 'terminal/selectTerminalOut.do?'+'postionType='+positionType+'&postionName='+curPosition;
    var url4 = 'terminal/selectTerminalHourAdd.do?'+'postionType='+positionType+'&postionName='+curPosition;

    var data = {

    };
    $.axpost(url,data,function (data) {
      if(data.data&&data.isSuccess) {
        // console.log(data);
        $('#tab2 .sskl-num').text(data.data.userCnt)
      }
    });
    $.axpost(url2,data,function (data) {
      if(data.data&&data.isSuccess) {
        // console.log(data);
        $('#tab2 .sskl-in').text(data.data.userIn)
      }
    });
    $.axpost(url3,data,function (data) {
      if(data.data&&data.isSuccess) {
        // console.log(data);
        $('#tab2 .sskl-out').text(data.data.userOut)
      }
    });
    $.axpost(url4,data,function (data) {
      if(data.data&&data.isSuccess) {
        // console.log(data);
        $('#tab2 .sskl-hour-add').text(data.data.userPerhourAdd)
      }
    });

  }

  /**
   * 交通枢纽-旅客洞察 获取当天旅客量
   */
  function getPassengerData(date) {
    var d;
    d = date?date:'';
    var url = 'terminal/selectTerminalPassenger.do?'+'postionType='+positionType+'&postionName='+curPosition+'&countDate='+d;

    $.axpost(url,{},function (data) {

      if(data.data&&data.isSuccess) {
        // console.log('getPassengerData:',data);

        $('#tab2 .scroll-box .total-psg').text(data.data[0].travelers);
        $('#tab2 .scroll-box .arrival-psg').text(data.data[0].arrivalValue);
        $('#tab2 .scroll-box .leave-psg').text(data.data[0].leaveValue);
      }
    });
  }

  function showWhichTab() {
    // 交通枢纽
    if(nowTab===tabArr[0]) {
      $('#tab2').removeClass('vh');
    }
    // 服务区
    if(nowTab===tabArr[1]) {
      $('#tab3').removeClass('vh');

    }
    // 收费站
    if(nowTab===tabArr[2]) {
      $('#tab4').removeClass('vh');

    }
    // 高速路网
    if(nowTab===tabArr[3]) {
      $('#tab5').removeClass('vh');

    }
    if(nowTab===tabArr[4]) {
      // $('#tab2').removeClass('vh');
    }

  }

  // 显示tab
  function showTabs() {
    var dis = 102;
    var tab = $('#tab');
    var tabBox = tab.find('.tab-box');
    for (var i = 0; i < tabBox.length; i++) {
      var tabLi = $(tabBox[i]);
      tabLi.css('z-index','1')
      tabLi.removeClass('vh')
      tabLi.css('top',(dis*i)+'px')
    }
  }

  function clickArrow(tabName,arrows) {
    if(isHideStation) {
      isHideStation = false;
      // debugger
      $('#cur-pos-data-box').show(300)
    } else {
      $('#cur-pos-data-box').hide(300)
      isHideStation = true;

    }
    for (var j = 0; j < arrows.length; j++) {
      var a2 = arrows[j];
      $(a2).toggleClass('dn')
    }
    var n = newTabArr[tabName];

    var tabBox2LiArr = $(n).find('.tab-box2-li');
    // var tabBox2LiArr = $('.tab-box2 .tab-box2-li');

    // 左边tab去除active
    for (var i = 0; i < tabBox2LiArr.length; i++) {
      var t = tabBox2LiArr[i];
      $(t).removeClass('active');
      $(t).find('.li-tab-box').css('visibility','hidden')
    }
  }

  function arrowBindClick() {
    // console.log($('#tab-box-cur .arrow'))
    var tabBoxCur = $('#tab-box-cur');
    var curPosDataBox = $('#cur-pos-data-box');
    var arrows = tabBoxCur.find('.arrow');

    // 阻止冒泡
    curPosDataBox.on('click',function (e) {
      // console.log('e',e);
      e.stopPropagation()
    });

    tabBoxCur.on('click',function () {
      // for (var j = 0; j < arrows.length; j++) {
      //   var a2 = arrows[j];
      //   $(a2).toggleClass('dn')
      // }
      // isHideStation = false;
      clickArrow(nowTab,arrows)

    })
  }

  function dongchaTabBindClick() {
    var dongchaTabs = $('.dongcha-tab');
    for (var i = 0; i < dongchaTabs.length; i++) {
      var t = dongchaTabs[i];
      $(t).on('click',function () {
        for (var j = 0; j < dongchaTabs.length; j++) {
          var t = dongchaTabs[j];
          $(t).removeClass('active')
        }
        $(this).addClass('active');

      })
    }
  }

  function showCurLocaction() {
    var tabBoxCur = $('#tab-box-cur');
    var curPosDataBox = $('#cur-pos-data-box');
    // tabBoxCur.show(300);
    tabBoxCur.removeClass('dn');
    tabBoxCur.find('.arrow.up').removeClass('dn');
    tabBoxCur.find('.arrow.down').addClass('dn');

    curPosDataBox.show(300)
    isHideStation = false;
  }

  function hideCurLocaction() {
    var tabBoxCur = $('#tab-box-cur');
    var curPosDataBox = $('#cur-pos-data-box');
    // tabBoxCur.hide(300);
    tabBoxCur.addClass('dn');
    // tabBoxCur.find('.arrow.up').removeClass('dn');
    // tabBoxCur.find('.arrow.down').addClass('dn');
    curPosDataBox.hide(300);
    isHideStation = true;
  }

  // 地图点绑定点击事件
  function markerBindClick() {
    for (var k = 0; k < pointControl.markes.length; k++) {
      var m = pointControl.markes[k];
      // console.log(m.C.position) 点的经纬度
      // console.log(m.C.extData['枢纽名称'])
      // debugger
      m.on('click',hideTabs)
    }
  }

  // 交通枢纽图表
  var tab2Li2Echart1;
  function tab2Li2InitEchart(dateParam) {
    var SSKL = $('#SSKL');
    if(!tab2Li2Echart1) {
      tab2Li2Echart1 = echarts.init(SSKL[0]);
    }
    option = null;
    var date = [];

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }

    option = {
      title: {
        text: '实时客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '时点',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '实时客流',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#183d74' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(62,139,230)',
          },
          data: [],
        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };
    if(dateParam) {
      tab2Li2Echart1reqData(dateParam);
    } else {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var datestr = year+'-'+month+'-'+day;
      // console.log('现在是:',datestr);
      tab2Li2Echart1reqData(datestr);
    }


    if (option && typeof option === "object") {
      tab2Li2Echart1.setOption(option, true);
    }
  }

  function tab2Li2Echart1reqData(date) {
    $('#SSKL-cld-box').hide();
    tab2Li2Echart1.showLoading();    //加载动画
    var url = 'terminal/selectTerminalFlowTrend.do?postionType='+ positionType +'&postionName='+ curPosition +'&countDate='+date;
    $.axpost(url,{},function (data) {
      console.log('tab2Li2InitEchart',data);
      var d = [];
      // d = data.data;
      for (var i = 0; i < data.data.length; i++) {
        var obj = data.data[i];

        d.push(obj.userCnt);
      }
      // debugger
      $('#SSKL-cld-box').show();
      tab2Li2Echart1.hideLoading();    //隐藏加载动画
      tab2Li2Echart1.setOption({
        series: [
          {
            name: '实时客流',
            data: d
          }
        ]
      })
    })
  }

  var tab2Li2Echart2;
  function tab2Li2InitEchart2() {
    var dom = $('#ZLSC1');
    if(!tab2Li2Echart2) {
      tab2Li2Echart2 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-24'];

    option = {
      title: {
        text: '实时驻留时长分析',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      // legend: {
      //   data: ['小时', '人数']
      // },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      yAxis:  {
        type: 'value',
        name: '占比',
        // 分割线
        splitLine: {
          show: false
        },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: date,
        name: '小时',
        nameGap: '5',
        // padding: [10, 10, 0, 0],
        // axisLabel: {
        //   interval: 0,
        //   rotate: 45,
        //   //倾斜度 -90 至 90 默认为0
        //   margin: 10,
        //   textStyle: {
        //     // fontWeight: "bolder",
        //     // color: "#000000"
        //   }
        // },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      series: [
        {
          name: '占比',
          type: 'bar',
          stack: '总量',
          barWidth: '50%',
          // 柱子颜色
          itemStyle: {
            color: 'rgb(70,158,228)'
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          },
          data: []
        },
      ]
    };

    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var datestr = year+'-'+month+'-'+day;
    tab2Li2Echart2reqData(datestr);

    if (option && typeof option === "object") {
      tab2Li2Echart2.setOption(option, true);
    }
  }

  function tab2Li2Echart2reqData(date) {
    tab2Li2Echart2.showLoading();    //加载动画
    var url = 'terminal/selectTerminalFlowLinger.do?postionType='+ positionType +'&postionName='+ curPosition +'&countDate='+date;
    $.axpost(url,{},function (data) {
      console.log('tab2Li2Echart2',data);
      var d = [];
      for (var i = 0; i < data.data.length; i++) {
        var obj = data.data[i];
        // d.push(obj.timeZb);
        d[parseInt(obj.timeGroup)] = obj.timeZb;
      }
      // debugger

      tab2Li2Echart2.hideLoading();    //隐藏加载动画

      tab2Li2Echart2.setOption({
        series: [
          {
            name: '占比',
            data: d
          }
        ]
      })
    })

  }

  var tab2Li4Echart;
  function tab2Li4InitEchart() {
    var dom = $('#KLQS');
    if(!tab2Li4Echart) {
      tab2Li4Echart = echarts.init(dom[0]);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    var myDate = new Date();//获取系统当前时间
    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.3) * 10) + data[data.length - 1]);
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }
    //
    // for (var i = 0; i < 25; i++) {  // 时间(小时)
    //   date.push(i);
    //   // addData(false);
    // }
    for (var i = 0; i < 12; i++) {  // 模拟数据
      // date.push(i);
      addData();
    }

    option = {
      title: {
        text: '每日总客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '日期',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: true
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '客流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ad9955' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(255,215,93)'
          },
          data: data,
          // 在Y轴显示指标线(虚线)
          // markLine: {
          //         silent: true,
          //         data: [{
          //             yAxis: 50
          //         }, {
          //             yAxis: 100
          //         }, {
          //             yAxis: 150
          //         }, {
          //             yAxis: 200
          //         }, {
          //             yAxis: 300
          //         }]
          //     }
        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };

    // setInterval(function () {
    //   addData(true);
    //   // console.log(data);
    //
    //   tab2Li4Echart.setOption({
    //     xAxis: {
    //       data: date
    //     },
    //     series: [
    //       {
    //         name: '实时',
    //         data: data
    //       },
    //       {
    //         name: '预测',
    //         data: data2
    //       },
    //     ]
    //   });
    // }, 500);
    ;
    if (option && typeof option === "object") {
      tab2Li4Echart.setOption(option, true);
    }
  }

  var tab2Li4Echart2;
  function tab2Li4InitEchart2() {
    var dom = $('#LKQS');
    if(!tab2Li4Echart2) {
      tab2Li4Echart2 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    var myDate = new Date();//获取系统当前时间
    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.3) * 10) + data[data.length - 1]);
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }
    //
    // for (var i = 0; i < 25; i++) {  // 时间(小时)
    //   date.push(i);
    //   // addData(false);
    // }
    for (var i = 0; i < 12; i++) {  // 模拟数据
      // date.push(i);
      addData();
    }
    option = {
      title: {
        text: '旅客趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['出发旅客量', '到达旅客量'],
        textStyle: {
          color: 'rgb(221,243,255)'
        }
      },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      yAxis:  {
        type: 'value',
        name: '人数',
        // 分割线
        splitLine: {
          show: false
        },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      xAxis: {
        type: 'category',
        data: date,
        name: '日期',
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      series: [
        {
          name: '出发旅客量',
          type: 'bar',
          stack: '总量',
          barWidth: '50%',
          itemStyle: {
            color: 'rgb(97,80,218)'
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '到达旅客量',
          type: 'bar',
          stack: '总量',
          barWidth: '50%',
          itemStyle: {
            color: 'rgb(254,157,79)'
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },

      ]
    };

    // setInterval(function () {
    //   addData(true);
    //   // console.log(data);
    //
    //   tab2Li4Echart2.setOption({
    //     xAxis: {
    //       data: date
    //     },
    //     series: [
    //       {
    //         name: '实时',
    //         data: data
    //       },
    //       {
    //         name: '预测',
    //         data: data2
    //       },
    //     ]
    //   });
    // }, 500);
    ;
    if (option && typeof option === "object") {
      tab2Li4Echart2.setOption(option, true);
    }
  }

  var tab2Li3Echart1;
  function tab2Li3InitEchart1() {
    var dom = $('#ZLSC');
    if(!tab2Li3Echart1) {
      tab2Li3Echart1 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-24'];

    option = {

      title: {
        text: '驻留时长分析',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      // legend: {
      //   data: ['小时', '人数']
      // },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      yAxis:  {
        type: 'value',
        name: '人数',
        // 分割线
        splitLine: {
          show: false
        },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      xAxis: {
        type: 'category',
        data: date,
        name: '小时',
        nameGap: '5',
        // padding: [10, 10, 0, 0],
        // axisLabel: {
        //   interval: 0,
        //   rotate: 45,
        //   //倾斜度 -90 至 90 默认为0
        //   margin: 10,
        //   textStyle: {
        //     // fontWeight: "bolder",
        //     // color: "#000000"
        //   }
        // },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      series: [
        {
          name: '人数',
          type: 'bar',
          stack: '总量',
          barWidth: '50%',
          // 柱子颜色
          itemStyle: {
            color: 'rgb(70,158,228)'
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          },
          data: []
        },


      ]
    };

    tab2Li3Echart1reqData();

    if (option && typeof option === "object") {
      tab2Li3Echart1.setOption(option, true);
    }
  }

  function tab2Li3Echart1reqData(date) {
    tab2Li3Echart1.showLoading();    //加载动画
    var d;
    d = date?date:'';
    var url = 'terminal/selectTerminalLinger.do?postionType='+ positionType +'&postionName='+ curPosition +'&countDate='+d;
    $.axpost(url,{},function (data) {
      console.log('tab2Li3Echart1',data);
      var dataArr = [];
      for (var i = 0; i < data.data.length; i++) {
        var obj = data.data[i];
        // debugger
        dataArr[parseInt(obj.timeGroup)] = obj.timeValue;
      }

      tab2Li3Echart1.hideLoading();    //隐藏加载动画
      tab2Li3Echart1.setOption({
        series: [
          {
            name: '人数',
            data: dataArr
          }
        ]
      })
    })
  }

  var tab2Li3Echart2;
  function tab2Li3InitEchart2() {
    var dom = document.getElementById("KLHX");
    if(!tab2Li3Echart2) {
      tab2Li3Echart2 = echarts.init(dom);
    }
    // console.log(echarts.version)
    var app = {};
    option = null;
    app.title = '环形图';

    option = {
      title: {
        text: '客流画像',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      // tooltip: {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b}: {c} ({d}%)"
      // },
      // legend: {
      //   orient: 'vertical',
      //   x: 'left',
      //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      // },
      series: [
        {
          name: '客流画像',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          animation: false,
          itemStyle: {
            color:'rgb(104,228,255)',
            borderColor:'#0a214b',
            borderWidth:15
          },
          label: {
            // normal: {
            //   show: true,
            //   position: 'center'
            // },
            silent: true,
            normal: {
              // \n\n可让文字居于牵引线上方，很关键
              //  {b}  代表显示的内容标题
              // {c}代表数据
              formatter: '{b}\n{c}% ',
              fontSize:  20,

              // textAlign: 'left',//'left'、 'center'、 'right'，
              // textVerticalAlign: 'bottom',//文字垂直对齐方式，可取值：'top'、 'middle'、 'bottom'，默认根据 textPosition 计算。
              //rich: {
              //    b: {
              //        font: '16px Microsoft YaHei',
              //        textFill: 'rgb(104,228,225)'
              //    },
              //    c: {
              //        font: '24px Microsoft YaHei',
              //        textFill: 'white'
              //    }
              //},
              borderWidth: 10,
              borderRadius: 4,
              padding: [0, -10],
              rich: {
                // b: {
                //   color: 'green',
                //   fontSize: 12,
                //   lineHeight: 20
                // },
                c: {
                  fontSize: 26,
                  lineHeight: 20,
                  color: 'white'
                }
              }
            },

            emphasis: {
              show: true,
              textStyle: {
                fontSize: '25',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            // {value: 335, name: '直接访问'},
            // {value: 310, name: '邮件营销'},
            // {value: 234, name: '联盟广告'},
            // {value: 135, name: '视频广告'},
            // {value: 1548, name: '搜索引擎'}
          ]
        }
      ]
    };

    tab2Li3Echart2ReqData();

    if (option && typeof option === "object") {
      tab2Li3Echart2.setOption(option, true);
    }
  }

  function tab2Li3Echart2ReqData(date) {
    tab2Li3Echart2.showLoading();    //加载动画
    var d;
    d = date?date:'';
    var url = 'terminal/selectTerminalSexAge.do?postionType='+ positionType +'&postionName='+ curPosition +'&countDate='+d;
    $.axpost(url,{},function (data) {
      console.log('tab2Li3Echart2',data);
      var dataArr = [];
      for (var i = 0; i < data.data.terminalAgeList.length; i++) {
        var obj = data.data.terminalAgeList[i];
        // debugger
        dataArr.push({
          name: ageObj[obj.ageGroup],
          value: obj.ageZb
        })
      }
      console.log('dataArr:',dataArr);

      tab2Li3Echart2.hideLoading();    //隐藏加载动画
      tab2Li3Echart2.setOption({
        series: [
          {
            name: '人数',
            data: dataArr
          }
        ]
      })


      var dom = $("#KLHX").parent();
      for (var j = 0; j < data.data.terminalSexList.length; j++) {
        var obj1 = data.data.terminalSexList[j];
        if(obj1.sex===1) {
          dom.find('.hm.man span').text(obj1.manZb+'%')
        } else {
          dom.find('.hm.woman span').text(obj1.manZb+'%')
        }
      }

    })
  }

  var tab2Li3Echart3;
  function tab2Li3InitEchart3() {
    var dom = document.getElementById("laiyuan");
    if(!tab2Li3Echart3) {
      tab2Li3Echart3 = echarts.init(dom);
    }
    var app = {};
    option = null;
    app.title = '环形图';
    var colors = ['rgb(252,162,34)','rgb(152,113,253)','rgb(38,229,225)'];

    option = {
      title: {
        text: '来源洞察',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        // x: 'top',
        top: '90%',
        data: ['境外', '省内', '省外'],
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '来源洞察',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '境外',itemStyle: {color:colors[0]}},
            {value: 310, name: '省内',itemStyle: {color:colors[1]}},
            {value: 234, name: '省外',itemStyle: {color:colors[2]}}
          ]
        }
      ]
    };
    ;
    if (option && typeof option === "object") {
      tab2Li3Echart3.setOption(option, true);
    }

  }

  var tab2Li3Echart4;
  function tab2Li3InitEchart4() {
    var dom = document.getElementById("quxiang");
    if(!tab2Li3Echart4) {
      tab2Li3Echart4 = echarts.init(dom);
    }
    var app = {};
    option = null;
    app.title = '环形图';
    var colors = ['rgb(252,162,34)','rgb(152,113,253)','rgb(38,229,225)'];

    option = {
      title: {
        text: '去向洞察',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        // x: 'top',
        top: '90%',
        data: ['境外', '省内', '省外'],
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '去向洞察',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '境外',itemStyle: {color:colors[0]}},
            {value: 310, name: '省内',itemStyle: {color:colors[1]}},
            {value: 234, name: '省外',itemStyle: {color:colors[2]}}

          ]
        }
      ]
    };

    if (option && typeof option === "object") {
      tab2Li3Echart4.setOption(option, true);
    }

  }

  // 服务区图表
  var tab3Li2Echart;
  function tab3Li2InitEchart() {
    var dom = document.getElementById("tab3li2-chart1");
    if(!tab3Li2Echart) {
      tab3Li2Echart = echarts.init(dom);
    }
    var option = null;
    option = {
      title: {
        text: '实时驻留时长分析',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        name: '小时',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        type: 'value',
        name: '占比',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          align: 'middle',
          // verticalAlign: 'middle'

        },
        // 柱子颜色
        itemStyle: {
          color: 'rgb(70,158,228)'
        },
        barWidth: '50%',

      }]
    };
    ;
    if (option && typeof option === "object") {
      tab3Li2Echart.setOption(option, true);
    }
  }

  var tab3Li2Echart2;
  function tab3Li2InitEchart2() {
    if(!tab3Li2Echart2) {
      tab3Li2Echart2 = echarts.init(document.getElementById('tab3li2-chart2'));
    }
    var option = {
      title: {
        text: '实时客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        //show:true,
        axisPointer: {
          type: 'line',
          show: true,
          label: {
            show: true
          }
        },
        backgroundColor: 'transparent',
        formatter: function (params) {
          return params[params.length - 1].data;
        }
      },

      legend: {
        show:false,
        textStyle: {
          color: '#557398',
        },
        data: ['搜索引擎']
      },
      /* visualMap:{
           show:false,
           seriesIndex:1,
       },*/
      /*legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },*/
      /* grid: {
           left: '3%',
           right: '4%',
           bottom: '3%',
           containLabel: true
       },*/
      grid: {
        left: '5%',
        right: '10%',
        top: '15%',
        bottom: '5%',
        // width: 1194,
        // height: 236,
        containLabel: true
      },
      /*toolbox: {
          feature: {
              saveAsImage: {}
          }
      },*/
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '(时点)',
        axisLine: {
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        name: '(人数/万)',
        splitLine: {show: false},
        axisLine: {
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },

      },
      series: [

        {
          name: '搜索引擎',
          type: 'line',
          z: 2,
          //stack: '总量',
          smooth: true,
          data: [820, 932, 901, 934, 1290, 1330],
          lineStyle: {
            normal: {
              color: 'rgb(70,158,228)'//rgba(55,255,75
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(70,158,228,0.3)'
                }, {
                  offset: 0.5, color: 'rgba(70,158,228,0.15)'
                }, {
                  offset: 1, color: 'rgba(70,158,228,0)'
                }]
              }
            }
          },
        },
        {
          name: '搜索引擎',
          symbol: 'none',
          z: 3,
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: 'rgb(70,158,228)',
                type: 'dotted'  //'dotted'虚线 'solid'实线
              }
            }
          },
          smooth: true,
          //stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        },


      ]
    };
    tab3Li2Echart2.setOption(option);
  }

  var tab3Li3Echart;
  function tab3Li3InitKLHX2() {
    var dom = document.getElementById("KLHX2");
    if(!tab3Li3Echart) {
      tab3Li3Echart = echarts.init(dom);
    }
    // console.log(echarts.version)
    var app = {};
    option = null;
    app.title = '环形图';

    option = {
      title: {
        text: '客流画像',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      // tooltip: {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b}: {c} ({d}%)"
      // },
      // legend: {
      //   orient: 'vertical',
      //   x: 'left',
      //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      // },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          animation: false,
          itemStyle: {
            color:'rgb(104,228,255)',
            borderColor:'#0a214b',
            borderWidth:10
          },
          label: {
            // normal: {
            //   show: true,
            //   position: 'center'
            // },
            silent: true,
            normal: {
              // \n\n可让文字居于牵引线上方，很关键
              //  {b}  代表显示的内容标题
              // {c}代表数据
              formatter: '{b}\n{c} ',
              fontSize:  20,

              // textAlign: 'left',//'left'、 'center'、 'right'，
              // textVerticalAlign: 'bottom',//文字垂直对齐方式，可取值：'top'、 'middle'、 'bottom'，默认根据 textPosition 计算。
              //rich: {
              //    b: {
              //        font: '16px Microsoft YaHei',
              //        textFill: 'rgb(104,228,225)'
              //    },
              //    c: {
              //        font: '24px Microsoft YaHei',
              //        textFill: 'white'
              //    }
              //},
              borderWidth: 20,
              borderRadius: 4,
              padding: [0, -10],
              rich: {
                // b: {
                //   color: 'green',
                //   fontSize: 12,
                //   lineHeight: 20
                // },
                c: {
                  fontSize: 26,
                  lineHeight: 20,
                  color: 'white'
                }
              }
            },

            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
          ]
        }
      ]
    };
    ;
    if (option && typeof option === "object") {
      tab3Li3Echart.setOption(option, true);
    }
  }

  var tab3Li3Echart1;
  function tab3Li3InitEchart() {
    var dom = document.getElementById("tab3li3-chart1");
    if(!tab3Li3Echart1) {
      tab3Li3Echart1 = echarts.init(dom);
    }
    option = null;
    option = {
      title: {
        text: '全天驻留时长分析',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['0-1', '1-2', '3-4', '4-5', '5-6', '6-7', '7-8','8-24'],
        name: '小时',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        type: 'value',
        name: '人数/万',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130,50],
        type: 'bar',
        // 数据显示位置
        label: {
          show: true,
          position: 'top',
          align: 'middle',
          // verticalAlign: 'middle'

        },
        // 柱子颜色
        itemStyle: {
          color: 'rgb(70,158,228)'
        },
        barWidth: '50%',

      }]
    };
    ;
    if (option && typeof option === "object") {
      tab3Li3Echart1.setOption(option, true);
    }
  }

  var tab3Li4Echart1;
  function tab3Li4InitEchart() {
    var dom = $('#tab3li4-chart1');
    if(!tab3Li4Echart1) {
      tab3Li4Echart1 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    var myDate = new Date();//获取系统当前时间
    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.3) * 10) + data[data.length - 1]);
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }
    //
    // for (var i = 0; i < 25; i++) {  // 时间(小时)
    //   date.push(i);
    //   // addData(false);
    // }
    for (var i = 0; i < 12; i++) {  // 模拟数据
      // date.push(i);
      addData();
    }

    option = {
      title: {
        text: '每日总客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '日期',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '客流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ad9955' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(255,215,93)'
          },
          data: data,
          // 在Y轴显示指标线(虚线)
          // markLine: {
          //         silent: true,
          //         data: [{
          //             yAxis: 50
          //         }, {
          //             yAxis: 100
          //         }, {
          //             yAxis: 150
          //         }, {
          //             yAxis: 200
          //         }, {
          //             yAxis: 300
          //         }]
          //     }
        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };

    // setInterval(function () {
    //   addData(true);
    //   // console.log(data);
    //
    //   tab3Li4Echart1.setOption({
    //     xAxis: {
    //       data: date
    //     },
    //     series: [
    //       {
    //         name: '实时',
    //         data: data
    //       },
    //       {
    //         name: '预测',
    //         data: data2
    //       },
    //     ]
    //   });
    // }, 500);
    ;
    if (option && typeof option === "object") {
      tab3Li4Echart1.setOption(option, true);
    }
  }

  function tab3Li4InitEchart2() {
    var dom = document.getElementById("tab3li4-chart2");
    var myChart = echarts.init(dom);
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    option = {
      title: {
        text: '车辆趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      legend: {
        data: ['进入车辆', '离开车辆'],
        textStyle: {
          color: 'rgb(221,243,255)'
        }
      },
      grid: {
        left: '5%',
        right: '10%',
        bottom: '5%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.1],
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      xAxis: {
        type: 'category',
        data: date,
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      series: [
        {
          name: '进入车辆',
          type: 'bar',
          barGap: 0,
          // 柱子颜色
          itemStyle: {
            color: 'rgb(97,80,218)'
          },
          data: [18203, 23489, 29034, 104970, 131744, 630230,131744]
        },
        {
          name: '离开车辆',
          type: 'bar',
          barGap: 0,
          // 柱子颜色
          itemStyle: {
            color: 'rgb(254,158,79)'
          },
          data: [19325, 23438, 31000, 121594, 134141, 681807,151744]
        }
      ]
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  }

  var guishufenxi;
  function guishufenxiChart() {
    var dom = document.getElementById("guishufenxi");
    if(!guishufenxi) {
      guishufenxi = echarts.init(dom);
    }
    var app = {};
    option = null;
    app.title = '环形图';
    var colors = ['rgb(252,162,34)','rgb(152,113,253)','rgb(38,229,225)'];

    option = {
      title: {
        text: '归属分析--类别占比',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        // x: 'top',
        top: '90%',
        data: ['境外', '省内', '省外'],
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '来源洞察',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '境外',itemStyle: {color:colors[0]}},
            {value: 310, name: '省内',itemStyle: {color:colors[1]}},
            {value: 234, name: '省外',itemStyle: {color:colors[2]}}
          ]
        }
      ]
    };

    if (option && typeof option === "object") {
      guishufenxi.setOption(option, true);
    }
  }

  // 收费站图表
  var tab4Li2Echart1;
  function tab4Li2initEchart() {
    var dom = $('#tab4-zlsc');
    if(!tab4Li2Echart1) {
      tab4Li2Echart1 = echarts.init(dom[0]);
    }
    var date = ['0-1','1-2','3-4','5-6','6-7','7-8','8-24'];

    var option = {
      title: {
        text: '实时驻留时长分析',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      // legend: {
      //   data: ['小时', '人数']
      // },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      yAxis:  {
        type: 'value',
        name: '人数',
        // 分割线
        splitLine: {
          show: false
        },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      xAxis: {
        type: 'category',
        data: date,
        name: '小时',
        nameGap: '5',
        // padding: [10, 10, 0, 0],
        // axisLabel: {
        //   interval: 0,
        //   rotate: 45,
        //   //倾斜度 -90 至 90 默认为0
        //   margin: 10,
        //   textStyle: {
        //     // fontWeight: "bolder",
        //     // color: "#000000"
        //   }
        // },
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      series: [
        {
          name: '人数',
          type: 'bar',
          stack: '总量',
          barWidth: '50%',
          // 柱子颜色
          itemStyle: {
            color: 'rgb(70,158,228)'
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight'
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },


      ]
    };

    if (option && typeof option === "object") {
      tab4Li2Echart1.setOption(option, true);
    }
  }

  var tab4Li2Echart2;
  function tab4Li2initEchart2() {
    var dom = $('#tab4-klqs');
    if(!tab4Li2Echart2) {
      tab4Li2Echart2 = echarts.init(dom[0]);
    }

    option = null;
    var date = [];

    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.4) * 10 + data[data.length - 1]));
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }


    option = {
      title: {
        text: '实时客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '时点',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '实时',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#183d74' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(62,139,230)',
          },
          data: data,

        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };

    if (option && typeof option === "object") {
      tab4Li2Echart2.setOption(option, true);
    }

  }

  var tab4Li2Echart3;
  function tab4Li2InitEchart3() {
    var dom = document.getElementById("tab4-klhx");
    if(!tab4Li2Echart3) {
      tab4Li2Echart3 = echarts.init(dom);
    }
    var app = {};
    option = null;
    app.title = '环形图';

    option = {
      title: {
        text: '客流画像',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      // tooltip: {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b}: {c} ({d}%)"
      // },
      // legend: {
      //   orient: 'vertical',
      //   x: 'left',
      //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      // },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          animation: false,
          itemStyle: {
            color:'rgb(104,228,255)',
            borderColor:'#0a214b',
            borderWidth:10
          },
          label: {
            // normal: {
            //   show: true,
            //   position: 'center'
            // },
            silent: true,
            normal: {
              // \n\n可让文字居于牵引线上方，很关键
              //  {b}  代表显示的内容标题
              // {c}代表数据
              formatter: '{b}\n{c} ',
              fontSize:  20,

              // textAlign: 'left',//'left'、 'center'、 'right'，
              // textVerticalAlign: 'bottom',//文字垂直对齐方式，可取值：'top'、 'middle'、 'bottom'，默认根据 textPosition 计算。
              //rich: {
              //    b: {
              //        font: '16px Microsoft YaHei',
              //        textFill: 'rgb(104,228,225)'
              //    },
              //    c: {
              //        font: '24px Microsoft YaHei',
              //        textFill: 'white'
              //    }
              //},
              borderWidth: 20,
              borderRadius: 4,
              padding: [0, -10],
              rich: {
                // b: {
                //   color: 'green',
                //   fontSize: 12,
                //   lineHeight: 20
                // },
                c: {
                  fontSize: 26,
                  lineHeight: 20,
                  color: 'white'
                }
              }
            },

            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
          ]
        }
      ]
    };
    ;
    if (option && typeof option === "object") {
      tab4Li2Echart3.setOption(option, true);
    }


  }

  var tab4Li3Echart1;
  function tab4Li3InitEchart1() {
    var dom = document.getElementById("tab4-zlsc-day");
    if(!tab4Li3Echart1) {
      tab4Li3Echart1 = echarts.init(dom);
    }
    option = null;
    option = {
      title: {
        text: '全天驻留时长分析',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
          // fontWeight:400
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['0-1', '1-2', '3-4', '4-5', '5-6', '6-7', '7-8','8-24'],
        name: '小时',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        type: 'value',
        name: '人数/万',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130,50],
        type: 'bar',
        // 数据显示位置
        label: {
          show: true,
          position: 'top',
          align: 'middle',
          // verticalAlign: 'middle'

        },
        // 柱子颜色
        itemStyle: {
          color: 'rgb(70,158,228)'
        },
        barWidth: '50%',

      }]
    };
    ;
    if (option && typeof option === "object") {
      tab4Li3Echart1.setOption(option, true);
    }
  }

  var tab4Li3Echart2;
  function tab4Li3InitEchart2() {
    if(!tab4Li3Echart2) {
      tab4Li3Echart2 = echarts.init(document.getElementById('tab4-zlsc2'));
    }
    var date = [];

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }
    var option = {
      title: {
        text: '实时驻留时长',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        //show:true,
        axisPointer: {
          type: 'line',
          show: true,
          label: {
            show: true
          }
        },
        backgroundColor: 'transparent',
        formatter: function (params) {
          return params[params.length - 1].data;
        }
      },

      legend: {
        show:true,
        textStyle: {
          color: '#557398',
        },
        data: ['搜索引擎']
      },
      /* visualMap:{
           show:false,
           seriesIndex:1,
       },*/
      /*legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },*/
      /* grid: {
           left: '3%',
           right: '4%',
           bottom: '3%',
           containLabel: true
       },*/
      grid: {
        left: '5%',
        right: '10%',
        top: '25%',
        bottom: '10%',
        // width: 1194,
        // height: 236,
        containLabel: true
      },
      /*toolbox: {
          feature: {
              saveAsImage: {}
          }
      },*/
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '(小时)',
        axisLine: {
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        data: date
      },
      yAxis: {
        type: 'value',
        name: '(人数)',
        splitLine: {show: false},
        axisLine: {
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },

      },
      series: [

        {
          name: '搜索引擎',
          type: 'line',
          z: 2,
          //stack: '总量',
          smooth: true,
          data: [820, 932, 901, 934, 1290, 1330],
          lineStyle: {
            normal: {
              color: 'rgb(70,158,228)'//rgba(55,255,75
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(70,158,228,0.3)'
                }, {
                  offset: 0.5, color: 'rgba(70,158,228,0.15)'
                }, {
                  offset: 1, color: 'rgba(70,158,228,0)'
                }]
              }
            }
          },
        },
        {
          name: '搜索引擎',
          symbol: 'none',
          z: 3,
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: 'rgb(70,158,228)',
                type: 'dotted'  //'dotted'虚线 'solid'实线
              }
            }
          },
          smooth: true,
          //stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        },


      ]
    };
    tab4Li3Echart2.setOption(option);
  }

  var tab4Li4Echart1;
  function tab4Li4InitEchart1() {
    var dom = $('#tab4-zklqs');
    if(!tab4Li4Echart1) {
      tab4Li4Echart1 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    var myDate = new Date();//获取系统当前时间


    option = {
      title: {
        text: '每日总客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '日期',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '客流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ad9955' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(255,215,93)'
          },
          data: []
        }
      ]
    };

    if (option && typeof option === "object") {
      tab4Li4Echart1.setOption(option, true);
    }
  }

  var tab4Li4Echart2;
  function tab4Li4InitEchart2() {
    var dom = document.getElementById("tab4-clqs");
    if(!tab4Li4Echart2) {
      tab4Li4Echart2 = echarts.init(dom);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    option = {
      title: {
        text: '车辆趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      legend: {
        data: ['进入车辆', '离开车辆'],
        textStyle: {
          color: 'rgb(221,243,255)'
        }
      },
      grid: {
        left: '5%',
        right: '10%',
        bottom: '5%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.1],
        name: '数量',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      xAxis: {
        type: 'category',
        data: date,
        name: '日期',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      series: [
        {
          name: '进入车辆',
          type: 'bar',
          barGap: 0,
          // 柱子颜色
          itemStyle: {
            color: 'rgb(97,80,218)'
          },
          data: [18203, 23489, 29034, 104970, 131744, 630230,131744]
        },
        {
          name: '离开车辆',
          type: 'bar',
          barGap: 0,
          // 柱子颜色
          itemStyle: {
            color: 'rgb(254,158,79)'
          },
          data: [19325, 23438, 31000, 121594, 134141, 681807,151744]
        }
      ]
    };

    if (option && typeof option === "object") {
      tab4Li4Echart2.setOption(option, true);
    }
  }

  // 高速路段图表
  var tab5Li2Echart1;
  function tab5Li2initEchart1() {
    var dom = $('#tab5-klqs');
    if(!tab5Li2Echart1) {
      tab5Li2Echart1 = echarts.init(dom[0]);
    }

    option = null;
    var date = [];

    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.4) * 10 + data[data.length - 1]));
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }


    option = {
      title: {
        text: '实时客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '时点',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '实时',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#183d74' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(62,139,230)',
          },
          data: data,

        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };

    if (option && typeof option === "object") {
      tab5Li2Echart1.setOption(option, true);
    }

  }

  var tab5Li2Echart2;
  function tab5Li2initEchart2() {
    var dom = $('#tab5-yxsd');
    if(!tab5Li2Echart2) {
      tab5Li2Echart2 = echarts.init(dom[0]);
    }

    option = null;
    var date = [];

    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.4) * 10 + data[data.length - 1]));
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }


    option = {
      title: {
        text: '实时平均通行速度',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '时点',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '(km/h)',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '实时',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#183d74' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(62,139,230)',
          },
          data: data,

        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };

    if (option && typeof option === "object") {
      tab5Li2Echart2.setOption(option, true);
    }

  }

  var tab5Li3Echart1;
  function tab5Li3InitEchart1() {
    var dom = $('#tab5-klqs-week');
    if(!tab5Li3Echart1) {
      tab5Li3Echart1 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    var myDate = new Date();//获取系统当前时间


    option = {
      title: {
        text: '每周总客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '日期',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '客流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ad9955' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(255,215,93)'
          },
          data: []
        }
      ]
    };

    if (option && typeof option === "object") {
      tab5Li3Echart1.setOption(option, true);
    }
  }

  var tab5Li3Echart2;
  function tab5Li3InitEchart2() {
    var dom = $('#tab5-clqs-week');
    if(!tab5Li3Echart2) {
      tab5Li3Echart2 = echarts.init(dom[0]);
    }
    option = null;
    var date = ['12月1日','12月2日','12月3日','12月4日','12月5日','12月6日','12月7日'];

    var myDate = new Date();//获取系统当前时间


    option = {
      title: {
        text: '每周总车流量趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '日期',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          //倾斜度 -90 至 90 默认为0
          margin: 10,
          textStyle: {
            // fontWeight: "bolder",
            // color: "#000000"
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '辆',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '客流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ad9955' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(255,215,93)'
          },
          data: []
        }
      ]
    };

    if (option && typeof option === "object") {
      tab5Li3Echart2.setOption(option, true);
    }
  }

  var tab5Li3Echart3;
  function tab5Li3initEchart3() {
    var dom = $('#tab5-clfb-week');
    if(!tab5Li3Echart3) {
      tab5Li3Echart3 = echarts.init(dom[0]);
    }

    option = null;
    var date = [];

    var data = [Math.round(Math.random() * 150)];
    // var data2 = [Math.random() * 160];


    function addData() {
//    now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
      // date.push(hour);
      if(data.length>=24) {
        data = [Math.round(Math.random() * 150)];
        // data2 = [Math.random() * 160];
      }
      data.push((Math.round(Math.random() - 0.4) * 10 + data[data.length - 1]));
      // data2.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      // hour >= 23? hour = 0: hour++;

      // if (shift) {
      //   // date.shift();
      //   data.shift();
      // }

//    now = new Date(+new Date(now) + oneDay);
    }

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }


    option = {
      title: {
        text: '每周车辆类型分布',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          // fontWeight:400
        }
      },
      tooltip: {
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '时点',
        data: date,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数/万',
        // 轴 样式
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(133,168,184)'
          }
        },
        // 分割线
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '实时',
          type: 'line',
          smooth: true,
          symbol: 'none',
          stack: 'a',
          label: {
            normal: {
              show: true
            }
          },
          // 填充区域样式
          areaStyle: {
            normal: {
              // color: 'rgb(62,139,230)',
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#183d74' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,0,0,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          lineStyle: {
            color: 'rgb(62,139,230)',
          },
          data: data,

        },
        // {
        //   name: '预测',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'none',
        //   stack: 'a',
        //   // areaStyle: {
        //   //   normal: {
        //   //   }
        //   // },
        //   lineStyle: {
        //     type: 'dotted'
        //   },
        //   data: data2
        // }
      ]
    };

    if (option && typeof option === "object") {
      tab5Li3Echart3.setOption(option, true);
    }

  }
});
