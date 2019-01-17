var pointControl;

$(function () {
  window.mapbase = new MapBase();
  pointControl = new PlacePointView(theMap);
  var name = '广州南站';
  var pepNum = 1000;
  var defaultZoom = 16;
  var positionType = 1;
  var curPosition = '广州南站';
  var lnglat = lntlat = new AMap.LngLat(113.269391,22.988766);
  mapbase.drawReli(name, pepNum);
  theMap.setZoomAndCenter(defaultZoom, lnglat);

  var thePlaceZoomObj = {  // 不同地点的缩放级别
    // '深圳西站': 20,
    // '湛江机场': 19,
  };

  function init() {
    $('#back-icon').on('click',function () {
      $('#search-box').hide();
    });
    $('#place-sel').on('click',function () {
      $('#search-box').show();
      showSearchCB()
    });
    reqWeather(curPosition);
    getYJData();
    // var chartBoxH = $('#chart').height();

    searchTabBindClick();
    tab2Li2InitEchart()
  }
  init();


  /**
   * 改变input的值
   * @param val
   */
  function changeInput1(val) {
    $('#input1').val(val);
  }
  /**
   * 显示搜索框后
   */
  function showSearchCB() {
    getResultListH();

    clearResultList();
    var tabBox = $('#tab-box');
    var resultList = $('#result-list');
    var theTabLi = tabBox.find('li');
    for (var i = 0; i < theTabLi.length; i++) {
      var liDom = theTabLi[i];
      if($(liDom).hasClass('active')) {
        // console.log(i)
        var theText = $(liDom).text();
        var theArr = pointControl.getPlacePoints(theText);
        for (var j = 0; j < theArr.length; j++) {
          var point = theArr[j];
          var theName = point['枢纽名称'];
          var liStr = '<li>'+theName+'</li>';
          var theLiDom = $(liStr);
          theLiDom.data('name',theText);
          // console.log(theLiDom.attr('name'));
          // debugger
          resultLiClick(theLiDom);

          resultList.append(theLiDom)
        }
        // debugger
        break
      }

    }
  }

  // positionType映射
  var tabMap = {
    '铁路': 1,
    '客运站': 1,
    '机场': 1,
    '服务区': 2
  };

  /**
   * 点击搜索结果li
   */
  function resultLiClick(dom) {
    dom.on('click',function () {
      var searchBox = $('#search-box');
      var theText = $(this).text();
      var theTabName = $(this).data('name');
      var type = tabMap[theTabName];
      // debugger
      if(!type) {
        console.log('没有找到类型');
        return
      }
      positionType = type;
      curPosition = theText;
      changeInput1(curPosition);
      goToPointByName(curPosition);
      tab2Li2Echart1reqData(returnDate());

      searchBox.hide();

    })
  }

  /**
   * 根据名字移动到地点
   * @param name 地点名称
   */
  function goToPointByName(name) {
    var clickTarget = pointControl.findPointByName(name);
    if (!clickTarget) {
      console.log('没有匹配的地点:', clickTarget);
      return
    }
    // debugger
    if (clickTarget) {
      // console.log(clickTarget)
      var lng = clickTarget['地址'][0].lnglat.split(',')[0];
      var lat = clickTarget['地址'][0].lnglat.split(',')[1];
      var arg = {
        P: lat,
        R: lng,
        lat: lat,
        lng: lng
      };
      var theZoom = thePlaceZoomObj[name] || 17;
      // debugger
      pointControl.MoveToPoint(arg, theZoom);
      reqWeather(name);
      // if (nowTab === tabArr[0] || nowTab === tabArr[1] || nowTab === tabArr[2]) {
      //   drawTheRectangle(name);
      // }
      // if (nowTab === tabArr[0] || nowTab === tabArr[1]) {
      //   // debugger
      //   reqWeather(name);
        reqReliData(name);
      //   addCamLi(name);
      // }
      getYJData()
    }
  }

  /**
   * 动态给搜索结果box高度
   */
  function getResultListH() {
    var searchBox = $('#search-box');
    var sHeader = $('.s-header');
    var tabBox = $('#tab-box');
    var resultList = $('#result-list');
    var rlOuter = $('#rl-outer');
    // console.log(searchBox.height(),sHeader.outerHeight(),tabBox.outerHeight());
    var theH = searchBox.height() - sHeader.outerHeight() - tabBox.outerHeight();
    // debugger
    rlOuter.height(theH);
    // console.log(rlOuter.height())
  }
  /**
   * 清空搜索列表
   */
  function clearResultList() {
    var resultList = $('#result-list');
    resultList.empty();
  }

  /**
   * 请求天气数据
   * @param name
   */
  function reqWeather(name) {
    var url = 'postionAreaWeather/getPostionAreaWeather.do?postionName=' + name;
    $.axpost(url, {}, function (data) {
      // console.log('天气:',data.data);
      // debugger
      if (data.isSuccess && data.data.length) {
        // debugger
        var theData = data.data[0];
        // console.log(theData);
        var theIconMap = {
          "阵雨": "小雨"
        };
        var weatherName;
        $('#weather').text(theData.WEATHER_TYPE_12);
        // $('#wind').text('' + theData.WIND_DIRECTION_12);
        var minTemp = parseFloat(theData.MIN_TEMP_24);
        var maxTemp = parseFloat(theData.MAX_TEMP_24);
        var averageTemp = (minTemp + maxTemp) / 2;
        // $('#temperature').text(theData.MIN_TEMP_24 + '℃ - ' + theData.MAX_TEMP_24 + '℃');
        $('#temperature').text(averageTemp.toFixed(1) + '℃');

        // $('#weather-date').text(theData.DDATETIME.split(' ')[0]);
        $('#wind-speed').text(theData.WIND_SPEED_12);
        weatherName = theData.WEATHER_TYPE_12;
        if (weatherName == '阵雨') {
          weatherName = theIconMap['阵雨']
        }
        var imgUrl = 'mobile/snjc/img/weather/' + weatherName + '.png';
        $('#weather-img').attr('src', imgUrl);
      }
    })
  }

  /**
   * 获取3级预警数据
   */
  function getYJData() {
    var url, keyName, theNumKey;
    if (positionType === 1) {
      url = 'terminal/getTerminalWarningList.do';
      keyName = 'listTerminal';
    }
    else if (positionType === 2) {
      url = 'serviceArea/getServiceAreaWarningList.do';
      keyName = 'listServiceArea';
    } else {
      return
    }

    var data = {};
    $.axpost(url, data, function (data) {
      if (data && data.isSuccess) {
        // debugger

        var ss = {
          name: '舒适',
          color: 'color-div1',
          pointClass: 'point3',
          data: data.data[keyName + '_ss'],
        };
        var sz = {
          name: '适中',
          color: 'color-div2',
          pointClass: 'point2',
          data: data.data[keyName + '_sz'],

        };
        var yj = {
          name: '拥挤',
          color: 'color-div3',
          pointClass: 'point1',
          data: data.data[keyName + '_yj']
        };

        var dataArr = [ss, sz, yj];
        for (var i = 0; i < dataArr.length; i++) {
          var obj = dataArr[i];
          for (var j = 0; j < obj.data.length; j++) {
            var theData = obj.data[j];
            if(theData.postionName===curPosition) {
              // debugger
              $('#color-div').attr('class',obj.color);
              break
            }
          }
        }

      }
    });
  }
  /**
   * tab绑定点击
   */
  function searchTabBindClick() {
    var tabBox = $('#tab-box');
    var resultList = $('#result-list');
    var theTabLi = tabBox.find('li');
    // debugger
    for (var i = 0; i < theTabLi.length; i++) {
      var tab = theTabLi[i];
      $(tab).on('click',function () {
        for (var k = 0; k < theTabLi.length; k++) {
          var theTab = theTabLi[k];
          $(theTab).removeClass('active');
        }
        $(this).addClass('active');

        var tabName = $(this).text();
        // debugger
        clearResultList();
        var theText = $(this).text();
        var theArr = pointControl.getPlacePoints(theText);
        // debugger
        for (var j = 0; j < theArr.length; j++) {
          var point = theArr[j];
          var theName = point['枢纽名称'];
          var liStr = '<li>'+theName+'</li>';
          var theLiDom = $(liStr);
          theLiDom.data('name',tabName);
          resultLiClick(theLiDom);
          resultList.append(theLiDom)
        }
      })
    }
  }

  /**
   * 请求热力数据
   * @param name
   */
  function reqReliData(name) {
    // debugger
    var url;
    if (positionType === 1) {
      url = 'terminal/selectTerminalFlowRealtime.do?' + 'postionType=' + positionType + '&postionName=' + name;
    }
    if (positionType === 2) {
      url = 'serviceArea/selectServiceFlowRealtime.do?' + 'postionType=' + positionType + '&postionName=' + name;
    }
    $.axpost(url, {}, function (data) {
      // console.log(data);
      // debugger
      if (data.isSuccess && !isEmptyObject(data.data)) {
        var pepNum = data.data.userCnt;
        // var theName = data.data.postionName;
        // var theData,infoWindow;
        // var lnglat = pointControl.findPointPosition(curPosition).split(',').map(function (t) { return parseFloat(t) });

        // debugger
        // return
        // if (isCLickFloor) {
        //   theData = {
        //     name: theName,
        //     data1: '当前楼层人数: ' + pepNum + '人',
        //     data2: ''
        //   };
        //   infoWindow = new AMap.InfoWindow({
        //     isCustom: true,  //使用自定义窗体
        //     content: createInfoWindow(theData),
        //     // content: createInfoWindow2(theData),
        //     offset: new AMap.Pixel(11, 0),
        //     position: new AMap.LngLat(lnglat[0],lnglat[1])
        //   });
        //   infoWindow.open(theMap);
        // } else {
        //   // debugger
        //   theData = {
        //     name: theName,
        //     data1: '当前人数: ' + pepNum + '人',
        //     data2: ''
        //   };
        //   infoWindow = new AMap.InfoWindow({
        //     isCustom: true,  //使用自定义窗体
        //     content: createInfoWindow(theData),
        //     // content: createInfoWindow2(theData),
        //     offset: new AMap.Pixel(11, 0),
        //     position: new AMap.LngLat(lnglat[0],lnglat[1])
        //   });
        //   infoWindow.open(theMap);
        // }
        mapbase.drawReli(name, pepNum);
      }
    })
  }

  var tab2Li2Echart1;
  function tab2Li2InitEchart() {
    var SSKL = $('#chart');
    if (!tab2Li2Echart1) {
      tab2Li2Echart1 = echarts.init(SSKL[0]);
    }
    option = null;
    var date = [];

    for (var i = 0; i < 25; i++) {  // 时间(小时)
      date.push(i);
    }

    option = {
      title: {
        show: false,
        text: '实时客流趋势',
        textStyle: {
          color: 'rgb(221,243,255)',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
        }
      },
      tooltip: {  // 提示框样式
        trigger: 'axis',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
        // formatter: "{c}人",
        formatter: function (params) {
          console.log(params)
          return params[params.length - 1].data[1] + '人';
        },
        backgroundColor: '#065f89',
        padding: 10,
        borderColor: '#28eefb',
        borderWidth: 1,
        axisPointer: {
          lineStyle: {
            color: '#68e5ff'
          }
        },
        show:false
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '5%',
        top: '15%',
        // height: 400,
        containLabel: true
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
        axisLabel: {
          interval: 3
        }
      },
      yAxis: {
        boundaryGap: [0, '50%'],
        type: 'value',
        name: '人数',
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
          // stack: 'a',
          label: {
            normal: {
              show: false
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
                  offset: 0, color: '#68e5ff' // 0% 处的颜色
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
        }
      ]
    };

    tab2Li2Echart1reqData(returnDate());

    if (option && typeof option === "object") {
      tab2Li2Echart1.setOption(option, true);
    }
  }

  function tab2Li2Echart1reqData(date) {
    tab2Li2Echart1.showLoading();    //加载动画
    var url = 'terminal/selectTerminalFlowTrend.do?postionType=' + positionType + '&postionName=' + curPosition + '&countDate=' + date;
    $.axpost(url, {}, function (data) {
      // if(data.isSuccess&&data.data.length) {
      if (data.isSuccess) {
        // console.log('tab2Li2InitEchart',data);
        var d = [];
        if (data.data.length) {
          for (var i = 0; i < data.data.length; i++) {
            var obj = data.data[i];
            var tempArr = obj.countTime.split('-');
            var hour = strDelZero(tempArr[tempArr.length - 1]);
            var objArr = [hour, obj.userCnt];
            d.push(objArr);
          }
        }
        // console.log(d);

        // debugger
        tab2Li2Echart1.hideLoading();    //隐藏加载动画
        tab2Li2Echart1.setOption({
          series: [
            {
              name: '实时客流',
              data: d
            }
          ]
        })

        tab2Li2Echart1.resize();

      }
    });
  }
});