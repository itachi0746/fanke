
var pointControl
$(function () {
  var tabBoxes = $('.tab-box');
  var tabBoxes2 = $('.tab-box2 li');


  var title = $('.title');
  pointControl = new PlacePointView(theMap);
  init();

  function init() {
    // 点击左上标题
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
      $(box2).on('click',clickTab2)
    }
    arrowBindClick();
    dongchaTabBindClick();
    jiankongEvent();
    getTop3Data();

    clickTop3Li();

    // 先显示枢纽点
    pointControl.showPoints('客运站,铁路,机场,港口');
    // console.log('theDataObject:',pointControl.markes)
    markerBindClick();
    tab2InitEchart();
    tab2InitEchart2();
    tab4InitEchart();
    tab4InitEchart2();
    tab3InitEchart();
    tab3InitEchart2();
    tab3InitEchart3();
    initCalendar();

    // 调试
    // hideTabs()
  }

  function initCalendar() {
    // 日历初始化
    laydate.render({
      elem:'#tab-li2-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })

    laydate.render({
      elem:'#tab-li3-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })

    laydate.render({
      elem:'#tab-li4-cld'
      ,type:'date'//默认为date
      ,trigger:'click'//默认为click，即点击后出现日历框
    })

  }
  function hideTab2() {
    var tab2 = $('#tab2');
    // tab2.hide(300);
    tab2.addClass('vh');
    for (var j = 0; j < tabBoxes2.length; j++) {
      var obj = tabBoxes2[j];
      $(obj).removeClass('active');
    }
    var liTabBox = tab2.find('.li-tab-box');
    for (var i = 0; i < liTabBox.length; i++) {
      var obj1 = liTabBox[i];
      $(obj1).css('visibility','hidden');
    }
  }

  // tab点击事件
  function clickTab() {
    for (var j = 0; j < tabBoxes.length; j++) {
      var obj = tabBoxes[j];
      $(obj).removeClass('tab-box-active');
    }
    $(this).addClass('tab-box-active');

    var t = $(this).data('name');
    // debugger
    if(t=='高速路网'){  // 显示高速路网图层
      window.location.href = '/ChunYun/GaoSuLuWang/index.html';
      return
    }
    pointControl.ReturnDefualt();
    pointControl.showPoints(t);  // 放大点
    markerBindClick();
  }

  // tab2点击事件
  function clickTab2() {
    // 隐藏
    $('.arrow.up').addClass('dn');
    $('.arrow.down').removeClass('dn');
    // 组织冒泡
    $(this).find('.li-tab-box').on('click',function (e) {
      e.stopPropagation()
    });


    if($(this).hasClass('active')) {  // 如果点击的是已经active的tab
      $(this).removeClass('active');
      $(this).find('.li-tab-box').css('visibility','hidden')
      return
    }
    for (var j = 0; j < tabBoxes2.length; j++) {
      var obj = tabBoxes2[j];
      $(obj).removeClass('active');
      $(obj).find('.li-tab-box').css('visibility','hidden')
    }
    $(this).addClass('active');
    $(this).find('.li-tab-box').css('visibility','visible')
    // myChart.resize();
  }

  function getmaxLen() {
    var videoList = $('#video-list');
    var listLis = videoList.find('li');
    var liLen = parseInt($(listLis[0]).css('width'));
    var listLisLen = liLen * listLis.length;
    // debugger
    var maxLen = listLisLen - parseInt(videoList.css('width'));

    console.log('maxLen:',maxLen);
    return maxLen
  }

  function jiankongEvent() {
    var addBox = $('.add-box');
    var videoPlayBox2 = $('.video-play-box2');
    var closeIcon = $('.close-icon');
    addBox.on('click',function () {
      videoPlayBox2.addClass('db');

    });
    closeIcon.on('click',function () {
      videoPlayBox2.removeClass('db');

    });
    
    var dis;
    var maxLen = getmaxLen();
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
            f.ondrag((to / max), to);
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
          };
          g.onmouseup = new Function('this.onmousemove=null');
        };
      },
      ondrag: function (percent, x) {  // 百分比,位移距离
        var ul = $('#video-list').find('ul');
        // console.log(percent)
        ul.css('left',(-1*percent*maxLen)+'px')
      }
    };
    var tuodong = new theScale('tuodong', 'line');
    console.log('dis:',tuodong.dis)


    // var lineLen = 560;  // 线总长
    // var tuodongLen = 50;  // 拖动div长度
    // var dis;  // 拖动的距离


    // tuodong[0].onmousedown = function (e) {
    //
    //   var x1 = e.clientX;
    //   console.log('down');
    //   document.onmousemove = function(e) {
    //     console.log('move');
    //     var x2 = e.clientX;
    //     dis = x2 - x1;
    //     if(dis>=0) {
    //       if(dis>=(lineLen-tuodongLen)) {
    //         tuodong.css('left',lineLen-tuodongLen+'px');
    //       } else {
    //         tuodong.css('left',dis+'px');
    //       }
    //     } else {
    //       tuodong.css('left','0px');
    //
    //     }
    //   }
    // }
    //
    // document.onmouseup = function() {
    //   console.log('up');
    //
    //   document.onmousemove = null;
    //
    // }

  }


  // 模拟数据
  function getTop3Data() {
    var yongji = $('#yongji');
    var data = moniData;
    var num = 1;
    for (var i = 0; i < data.length; i++) {
      var liData = data[i];
      var liDom = '<li title="'+ liData.name +'">\n' +
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

  function clickTop3Li() {
    var top3Li = $('#yongji li');
    top3Li.on('click',function () {
      var arg = {
        P:this.dataset.lat,
        R:this.dataset.lng,
        lat: this.dataset.lat,
        lng: this.dataset.lng
      };
      // debugger
      pointControl.MoveToPoint(arg,this.dataset.zoom)
    })
    // console.log('moniData',moniData)
    // for (var i = 0; i < top3Li.length; i++) {
    //   var li = top3Li[i];
    //   li.attr('data-name',moniData.)
    // }
  }

  // 隐藏tab,显示tab2
  function hideTabs() {
    var tab = $('#tab');
    var tabBox = tab.find('.tab-box');
    var noActive;
    // console.log(tab)
    pointControl.hideMarkers();
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
    var tab2 = $('#tab2');
    tabBoxCur.find('.up').removeClass('dn');
    tabBoxCur.find('.down').addClass('dn');
    tab2.removeClass('vh');
    $('#floor').removeClass('dn');
  }

  // 显示tab
  function showTabs() {
    var dis = 102;
    var tab = $('#tab');
    var tabBox = tab.find('.tab-box');
    var noActive;
    for (var i = 0; i < tabBox.length; i++) {
      var tabLi = $(tabBox[i]);
      // tabLi.css('z-index','auto')
      // tabLi.show()
      tabLi.css('z-index','1')
      tabLi.removeClass('vh')

      tabLi.css('top',(dis*i)+'px')
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
    // for (var i = 0; i < arrows.length; i++) {
    //   var a = arrows[i];
    //   $(a).on('click',function () {
    //     for (var j = 0; j < arrows.length; j++) {
    //       var a2 = arrows[j];
    //       $(a2).toggleClass('dn')
    //     }
    //   })
    //
    // }
    // var a = arrows[i];
    tabBoxCur.on('click',function () {
      for (var j = 0; j < arrows.length; j++) {
        var a2 = arrows[j];
        $(a2).toggleClass('dn')
      }
      // 隐藏左边tab
      for (var j = 0; j < tabBoxes2.length; j++) {
        // debugger
        var obj = tabBoxes2[j];
        $(obj).removeClass('active');
        $(obj).find('.li-tab-box').css('visibility','hidden')
      }
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
      // console.log(m)
      m.on('click',hideTabs)
    }
  }
  // var myChart;
  function tab2InitEchart() {
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

  function tab2InitEchart2() {
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

  function tab4InitEchart() {
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

  function tab4InitEchart2() {
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

  function tab3InitEchart() {
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

  function tab3InitEchart2() {
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

  function tab3InitEchart3() {
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

});




