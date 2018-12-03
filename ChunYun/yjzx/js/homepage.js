
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
    getTop3Data();

    clickTop3Li()

    // 先显示枢纽点
    pointControl.showPoints('客运站,铁路,机场,港口');
    // console.log('theDataObject:',pointControl.markes)
    markerBindClick();

    // 调试
    hideTabs()
    tab2InitEchart();
    tab3InitEchart();
  }

  function hideTab2() {
    var tab2 = $('#tab2');
    // tab2.hide(300);
    tab2.addClass('dn');
    for (var j = 0; j < tabBoxes2.length; j++) {
      var obj = tabBoxes2[j];
      $(obj).removeClass('active');
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
    tab2.removeClass('vh')

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
        $(obj).find('.li-tab-box').css('display','none')
      }
    })
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
  var myChart;
  function tab2InitEchart() {
    var SSKL = $('#SSKL');
    myChart = echarts.init(SSKL[0]);
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

  function tab3InitEchart() {
    var dom = document.getElementById("KLHX");
    var myChart = echarts.init(dom);
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
              // color:'rgb(104,228,255)',
            borderColor:'#0a214b',
            borderWidth:5
          },
          label: {
            // normal: {
            //   show: true,
            //   position: 'center'
            // },
            normal: {
              // \n\n可让文字居于牵引线上方，很关键
              //  {b}  代表显示的内容标题
              // {c}代表数据
              formatter: '{b}\n{c} ',

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
              padding: [0, -70],
              rich: {
                b: {
                  color: 'red',
                  fontSize: 12,
                  lineHeight: 20
                },
                c: {
                  fontSize: 12,
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
});




