
var pointControl
$(function () {
  // var nowTab = '客运站,铁路,机场,港口';
  var nowTab = '服务区';
  // var nowTab = '收费站';
  // var nowTab = '高速';
  // var nowTab = '高速路网';

  var tabArr = ['客运站,铁路,机场,港口','服务区','收费站','高速','高速路网'];
  var tabDomNameArr = ['#tab2','#tab3','#tab4','#tab5','#tab6'];
  var newTabArr = tabArr.map(function (item,index) {
    return {
      name: item,
      class: tabDomNameArr[index]
    }
  });

  // console.log(newTabArr)
  var tabBoxes = $('.tab-box');
  var tabBoxes2 = $('.tab-box2 li');
  var tabBoxes3 = $('.tab-box3 li');


  // console.log(gonglu)

  var title = $('.title');
  pointControl = new PlacePointView(theMap);
  init();
  console.log(pointControl.PlacePoints)

  function init() {
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
      // $(box2).on('click',clickTab2)
      // 交通枢纽绑定
      $(box2).on('click',function () {
        clickTab2(tabBoxes2,this)
      })
      // 服务站绑定
      $(box3).on('click',function () {
        clickTab2(tabBoxes3,this)
      })
    }
    arrowBindClick();
    dongchaTabBindClick();
    addStation();

    // jiankongEvent();
    getTop3Data();

    clickTop3Li();

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

    console.log(tieluArr)
    for (var i = 0; i < tieluArr.length; i++) {
      var t = tieluArr[i].replace(/[\r\n]/g,"");
      // t.replace(/[\r\n]/g,"");
      if(!t) {
        console.log(t);
        continue
      }
      var stationDom = $('<li>'+ t +'</li>');
      stationDom.on('click',function () {
        var name = $(this).text();
        var curPosDataBox = $('#cur-pos-data-box');
        curPosDataBox.hide(300)
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
        var name = $(this).text();
        var curPosDataBox = $('#cur-pos-data-box');
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
        var name = $(this).text();
        var curPosDataBox = $('#cur-pos-data-box');
        clickArrow()
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

  function initCalendar() {
    // 日历初始化
    laydate.render({
      elem:'#tab-li2-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })

    // $('#tab-li2-cld').val(laydate.now(0, 'YYYY-MM-DD'));

    laydate.render({
      elem:'#tab-li3-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })
    laydate.render({
      elem:'#tab-li3-cld2'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })

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
      // temp = $('#tab3');
    }
    if(nowTab==='高速') {
      // temp = $('#tab3');
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
    // debugger
    if(t=='高速路网'){  // 显示高速路网图层
      window.location.href = '/ChunYun/GaoSuLuWang/index.html';
      return
    }

    pointControl.ReturnDefualt();
    pointControl.showPoints(t);  // 放大点
    markerBindClick();
  }

  // tab2点击事件 目标,this
  function clickTab2(target,me) {
    // 隐藏
    $('.arrow.up').addClass('dn');
    $('.arrow.down').removeClass('dn');
    // 组织冒泡
    $(me).find('.li-tab-box').on('click',function (e) {
      e.stopPropagation()
    });
    // console.log(me.dataset.name)
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
    // console.log('dis:',tuodong.dis)


  }


  // 模拟数据
  function getTop3Data() {
    var yongji = $('#yongji');
    var data = moniData;
    var num = 1;
    for (var i = 0; i < data.length; i++) {
      var liData = data[i];
      var liDom = '<li class="top3-li" title="'+ liData.name +'">\n' +
        '<i class="top3-icon1"> '+ num +'</i>\n' +
        '<p><label class="p-name ellipsis">' + liData.name + '</label> <span>当前客流 <i class="num">22</i>万人</span></p>\n' +
        '</li>';
      num++;
      yongji.append($(liDom))
      // $(yongji.find('li')[i]).data('name','123')

      // console.log($(yongji.find('li')[0]).data('pos'))
      var curLi = yongji.find('li')[i];
      curLi.dataset.name = liData.name;
      curLi.dataset.lng = liData.pos.lng;
      curLi.dataset.lat = liData.pos.lat;
      curLi.dataset.zoom = liData.zoom;

    }

  }

  function getTop3Data2() {

  }

  // 点击预警
  function clickTop3Li() {
    var yujingLiArr = $('.top3-li');
    for (var i = 0; i < yujingLiArr.length; i++) {
      var li = yujingLiArr[i];
      $(li).on('click',function () {
        var name = $(this).find('.p-name').text();
        // console.log(name);
        // for (var j = 0; j < pointControl.PlacePoints.length; j++) {
        //   var p = pointControl.PlacePoints[j];
        //   // console.log(p['枢纽名称'])
        //   if(name===p['枢纽名称']) {
        //     console.log(name)
        //     return
        //   }
        // }
        // console.log(pointControl.findPointByName(name))
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
      newImage.src = 'img/menu/icon_lower_center.png';
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
    var targetName = this.C.extData['枢纽名称'];

    initCenterBG();
    if(targetName.length>4) {
      var imgBox = $('#center-img');
      var temp = targetName.length - 4;
      var img = imgBox.find('img')[0];

      for (var j = 0; j < temp; j++) {
        var newImage = new Image();
        newImage.src = img.src;
        // console.log('temp:',temp)
        imgBox.append(newImage)
      }
    }
    $('#tab-name').text(targetName);



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

  function showWhichTab() {
    if(nowTab==='客运站,铁路,机场,港口') {
      $('#tab2').removeClass('vh');
      tab2Li2InitEchart();
      tab2Li2InitEchart2();
      tab2Li4InitEchart();
      tab2Li4InitEchart2();
      tab2Li3InitEchart();
      tab2Li3InitEchart2();
      tab2Li3InitEchart3();
      initCalendar();
    }
    if(nowTab==='服务区') {
      $('#tab3').removeClass('vh');
      tab3Li2InitEchart();
      tab3Li2InitEchart2();
      tab3Li2InitEchart3();
      tab3Li3InitEchart();
      tab3Li3InitEchart2();
      tab3Li4InitEchart();
      tab3Li4InitEchart2();
      initCalendar();

    }
    if(nowTab==='收费站') {
      // $('#tab2').removeClass('vh');
    }
    if(nowTab==='高速') {
      // $('#tab2').removeClass('vh');
    }
    if(nowTab==='高速路网') {
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
    for (var j = 0; j < arrows.length; j++) {
      var a2 = arrows[j];
      $(a2).toggleClass('dn')
    }
    // 左边tab去除active
    var n = newTabArr[tabName];

    var tabBox2LiArr = $(n).find('.tab-box2-li');
    // var tabBox2LiArr = $('.tab-box2 .tab-box2-li');

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

      clickArrow(nowTab,arrows)
      // 左边tab去除active
      // if(nowTab==='客运站,铁路,机场,港口') {
      //   var tabBox2LiArr = $('.tab-box2 .tab-box2-li');
      //   for (var i = 0; i < tabBox2LiArr.length; i++) {
      //     var t = tabBox2LiArr[i];
      //     $(t).removeClass('active');
      //     $(t).find('.li-tab-box').css('visibility','hidden')
      //
      //   }
      // }
      // if(nowTab==='服务区') {
      //   var tabBox2LiArr = $('.tab-box3 .tab-box2-li');
      //   for (var i = 0; i < tabBox2LiArr.length; i++) {
      //     var t = tabBox2LiArr[i];
      //     $(t).removeClass('active');
      //     $(t).find('.li-tab-box').css('visibility','hidden')
      //
      //   }
      // }

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
    curPosDataBox.show(300)
  }

  function hideCurLocaction() {
    var tabBoxCur = $('#tab-box-cur');
    var curPosDataBox = $('#cur-pos-data-box');
    // tabBoxCur.hide(300);
    tabBoxCur.addClass('dn');
    tabBoxCur.find('.arrow.up').removeClass('dn');
    tabBoxCur.find('.arrow.down').addClass('dn');
    curPosDataBox.hide(300)
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
  function tab2Li2InitEchart() {
    var SSKL = $('#SSKL');
    var myChart = echarts.init(SSKL[0]);
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
      // addData(false);
    }
    for (var i = 0; i < 12; i++) {  // 模拟数据
      // date.push(i);
      addData();
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
    //   myChart.setOption({
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
      myChart.setOption(option, true);
    }
  }

  function tab2Li2InitEchart2() {
    var dom = document.getElementById("KLHX");
    var myChart = echarts.init(dom);
    console.log(echarts.version)
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
      myChart.setOption(option, true);
    }


  }

  function tab2Li4InitEchart() {
    var dom = $('#KLQS');
    var myChart = echarts.init(dom[0]);
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
    //   myChart.setOption({
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
      myChart.setOption(option, true);
    }
  }

  function tab2Li4InitEchart2() {
    var dom = $('#LKQS');
    var myChart = echarts.init(dom[0]);
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
    //   myChart.setOption({
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
      myChart.setOption(option, true);
    }
  }

  function tab2Li3InitEchart() {
    var dom = $('#ZLSC');
    var myChart = echarts.init(dom[0]);
    option = null;
    var date = ['0-1','1-2','3-4','5-6','6-7','7-8','8-24'];

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
          data: [320, 302, 301, 334, 390, 330, 320]
        },


      ]
    };

    // setInterval(function () {
    //   addData(true);
    //   // console.log(data);
    //
    //   myChart.setOption({
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
      myChart.setOption(option, true);
    }
  }

  function tab2Li3InitEchart2() {
    var dom = document.getElementById("laiyuan");
    var myChart = echarts.init(dom);
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
      myChart.setOption(option, true);
    }

  }

  function tab2Li3InitEchart3() {
    var dom = document.getElementById("quxiang");
    var myChart = echarts.init(dom);
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
      myChart.setOption(option, true);
    }

  }

  // 服务区图表
  function tab3Li2InitEchart() {
    var dom = document.getElementById("tab3li2-chart1");
    var myChart = echarts.init(dom);
    option = null;
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
      myChart.setOption(option, true);
    }
  }

  function tab3Li2InitEchart2() {
      var Chart4 = echarts.init(document.getElementById('tab3li2-chart2'));
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
      Chart4.setOption(option);
  }

  function tab3Li2InitEchart3() {
    var dom = document.getElementById("tab3li2-chart3");
    var myChart = echarts.init(dom);
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
      myChart.setOption(option, true);
    }


  }

  function tab3Li3InitEchart() {
    var dom = document.getElementById("tab3li3-chart1");
    var myChart = echarts.init(dom);
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
      myChart.setOption(option, true);
    }
  }

  function tab3Li3InitEchart2() {
    var Chart4 = echarts.init(document.getElementById('tab3li3-chart2'));
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
        show:true,
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
          color: '#fff',
        },
        data: ['搜索引擎','搜索引擎2']
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
        name: '(小时)',
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
          z: 1,
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
          z: 2,
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

        {
          name: '搜索引擎2',
          z: 1,
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: 'rgb(170,158,228)',
                type: 'solid'  //'dotted'虚线 'solid'实线
              }
            }
          },
          smooth: true,
          //stack: '总量',
          data: [520, 1032, 800, 900, 1290, 1400]
        },
        {
          name: '搜索引擎2',
          symbol: 'none',
          z: 2,
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: 'rgb(170,158,228)',
                type: 'dotted'  //'dotted'虚线 'solid'实线
              }
            }
          },
          smooth: true,
          //stack: '总量',
          data: [520, 1032, 800, 900, 1290, 1400, 1000]
        },


      ]
    };
    Chart4.setOption(option);
  }

  function tab3Li4InitEchart() {
    var dom = $('#tab3li4-chart1');
    var myChart = echarts.init(dom[0]);
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
    //   myChart.setOption({
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
      myChart.setOption(option, true);
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
});




