var satellite = new AMap.TileLayer.Satellite();
var roadNet = new AMap.TileLayer.RoadNet();
var theInnerLayer = null;


var traffic = new AMap.TileLayer.Traffic({
    'autoRefresh': true,     //是否自动刷新，默认为false
    'interval': 180,         //刷新间隔，默认180s
});
var building = new AMap.Buildings({
    zooms: [16, 18],
    zIndex: 10,
    heightFactor: 2//2倍于默认高度，3D下有效
});
var theMap = new AMap.Map('container', {
    pitch: 0,
    mapStyle: 'amap://styles/99b69d2aec4586ce512170d26fb97898',
   // mapStyle: 'amap://styles/whitesmoke',
    viewMode: '3D',// 地图模式
    center: [113.275824, 22.994826],
    features: ['bg', 'building','point'],
    zoom: 7,
    keyboardEnable: false,
    layers: [
            //satellite,
           // building,
            roadNet
    ]
});


theMap.on('complete', function () {

    //获取
   // var ambientLight = theMap.AmbientLight;   //获取环境光
   // var directionLight = theMap.DirectionLight; //获取平行光
    //修改
   // theMap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
  //  theMap.DirectionLight = new AMap.Lights.DirectionLight([-6, -2, 14], [1, 1, 1], 0.5);
});

var map = Loca.create(theMap);
var theHeartLayer = Loca.visualLayer({
    container: map,
    type: 'heatmap',
    // 基本热力图
    shape: 'normal'
});

//监听放大缩小事件
//theMap.on('zoom', function (arg) {


//});
var theLayers = theMap.getLayers();
for (var i = 0; i < theLayers.length; i++) {
    var theLayer = theLayers[i];
    if (theLayer.CLASS_NAME == 'AMap.IndoorMap') {
        theLayer.hideFloorBar();
        theInnerLayer = theLayer;
        theInnerLayer.off('complete');
        //theInnerLayer.off('floor_complete');
        theInnerLayer.on('click', function () {

        });

    }
}
theInnerLayer.on('complete', function (arg) {
    console.log('室内图层加载完!');
    //debugger;
    var theBuilding = null;
    setInterval(function () {
        var theZoom = theMap.getZoom();
        if (theZoom < 16) {
            theBuilding = null;
            $('#DivButton').empty();
            return;
        }
        var theLastBuilding = theBuilding;
        theBuilding = theInnerLayer.getSelectedBuilding();
        if (theBuilding != theLastBuilding) {

            if (!theBuilding) {
                console.log('未找到建筑物!');
                return;
            }
            //找到图层了
            console.log('jiazaiwancheng@!1');
            $('#DivButton').empty();
            //floor_complete
            var theFloors = theBuilding.floor_details.floor_nonas;
            var theFloorIndex = theBuilding.floor_details.floor_indexs;
            for (var i = 0; i < theFloors.length; i++) {
                var theName = theFloors[i];
                var theIndex = theFloorIndex[i];
                $('<button data-index=' + theIndex + '>' + theName + '</button>').click(function () {
                    var theCurrentIndex = $(this).data('index');
                    theInnerLayer.showFloor(theCurrentIndex);
                    var theCurrentBuild = theInnerLayer.getSelectedBuilding();
                    var theLnt = theCurrentBuild.lnglat;
                    
                    TestRli2(theLnt.lng, theLnt.lat);

                }).appendTo($('#DivButton'));
                console.log(theFloors[i]);
                //开始显示楼层
                //theBuilding.showFloor();
            };
        }
    }, 500);
});
//theMap.on('click', function (e) {
//    console.log(e);
//});
var theMaxZoom = 18;
var theCurrentZoom = 1;
/*var theTimer = window.setInterval(function () {
        var  theZoomValue=theMap.getZoom();
        if (theCurrentZoom >= theMaxZoom) {
            window.clearInterval(theTimer);
            return;
        }
    console.log(theZoomValue);
        //map.zoomIn();
        theMap.setZoom(theCurrentZoom++);
    }, 500);*/


AMap.plugin('AMap.DistrictSearch', function () {
    // 创建行政区查询对象
    var district = new AMap.DistrictSearch({
        // 返回行政区边界坐标等具体信息
        extensions: 'all',
        // 设置查询行政区级别为 区
        level: 'province'
    });

    district.search('广东省', function (status, result) {
        // 获取朝阳区的边界信息
        var bounds = result.districtList[0].boundaries
        if (!bounds) {
            console.log("未获取到数据!");
            return;
        }

        var theBigBounds = null;
        window.theMap = theMap;
        for (var i = 0, l = bounds.length; i < l; i++) {

            var theBound = bounds[i];
            var polygon = {};
            //var polygon = new AMap.Polygon({
            //    map: window.theMap,
            //    strokeWeight: 1,
            //    borderWeight: 200, // 线条宽度，默认为 1
            //    path: theBound,
            //    strokeOpacity: 1,
            //    zIndex: 1,
            //    fillOpacity: 0.5,
            //    fillColor: '#0f0c21',
            //    strokeColor: 'blue'
            //});

            if (theBound.length >= 10000) {
                theBigBounds = theBound;
            }
            //  polygons.push(polygon);

        }
        showLine(theBigBounds);

    })
});

//var marker = new AMap.Marker({
//    position: new AMap.LngLat(113.275824, 22.994826),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//    title: '广州南站'
//});

function showLine(thePaths) {
    console.log("开始绘制线！");
    if (!thePaths) {
        console.log("未找到最大的轮廓");
        return;
    }
    var theIndex = 1;
    var thePoints = [];
    thePoints.push(thePaths[0]);
    console.log("开始执行");

    var theTimer = window.setInterval(function () {
        console.log(theIndex);
        thePoints.push(thePaths[theIndex]);
        theIndex++;
        for (var j = 0; j < 500; j++) {
            if (theIndex < thePaths.length) {
                thePoints.push(thePaths[theIndex]);
                theIndex++;
            }
            else {
                break;
            }
        }

        if (theIndex >= thePaths.length) {
            // debugger;
            window.clearInterval(theTimer);
            if (thePoints.length > 0) {
                var polyline = new AMap.Polyline({
                    path: thePoints,
                    map: window.theMap,
                    //strokeWeight: 100,
                    borderWeight: 8, // 线条宽度，默认为 1
                    strokeColor: 'white'//, // 线条颜色
                    //lineJoin: 'round' // 折线拐点连接处样式
                });
                thePoints = [];
            }
            console.log("绘图结束！");

            ShowMark();
            var theValue = 1;
            thePitchTimer = window.setInterval(function (me) {
                console.log("角度:" + theValue);
                if (theValue > 45) {
                    window.clearInterval(thePitchTimer);
                    return;
                }
                else {
                    theMap.setPitch(theValue);
                }
                theValue = theValue + 1;
            }, 10);

            return;
        }
        if (thePoints.length > 10) {
            //debugger;
            var polyline = new AMap.Polyline({
                path: thePoints,
                map: window.theMap,
                borderWeight: 2, // 线条宽度，默认为 1
                strokeColor: 'white'//, // 线条颜色
                //lineJoin: 'round' // 折线拐点连接处样式
            });
            var theLastPoint = thePoints[thePoints.length - 1];
            thePoints = [];
            thePoints.push(theLastPoint);

            console.log("开始绘制线！");
        }

    }, 1);



}

var theMarks = [];
var theMaxLevel = 18;

//显示标点内容
function ShowMark(theType) {
    //先清除标点
    theMap.remove(theMarks);
    var thePoints = {
        "广州南站": { "latitude": 22.9874720000, "longitude": 113.2685860000, "type": "铁路" },
        // "深圳火车站": { "latitude": 22.5319900000, "longitude": 114.1176800000 },
        "深圳北站": { "latitude": 22.6097250000, "longitude": 114.0291130000, "type": "铁路" },
        //"广州东站": { "latitude": 23.1505660000, "longitude": 113.3249000000 },
        //"广州火车站": { "latitude": 23.1494150000, "longitude": 113.2572910000 },
        //"广州北站": { "latitude": 23.3774050000, "longitude": 113.2037940000 },
        //"深圳西站": { "latitude": 22.5275730000, "longitude": 113.9073060000 },
        //"深圳东站": { "latitude": 22.6019860000, "longitude": 114.1199340000 },
        "珠海站": { "latitude": 22.2153960000, "longitude": 113.5496410000, "type": "铁路" },
        //"白云国际机场": { "latitude": 23.3896270000, "longitude": 113.3076480000 },
        "白云国际机场": { "latitude": 23.396544, "longitude": 113.306199, "type": "民航", 'maxLevel': 17 },
        //"宝安国际机场": { "latitude": 22.6333600000, "longitude": 113.8145490000 },
        "宝安国际机场": { "latitude": 22.62506, "longitude": 113.812809, "type": "民航" },
        //"珠海金湾国际机场": { "latitude": 22.0057560000, "longitude": 113.3819450000 },
        //"揭阳潮汕国际机场": { "latitude": 23.5463610000, "longitude": 116.5092740000 }
    };
    for (var name in thePoints) {
        var theItem = thePoints[name];
        if (theType && theType != theItem.type) {
            continue;
        }
        var marker = new AMap.Marker({
            position: new AMap.LngLat(theItem.longitude, theItem.latitude),// 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: name,
            // content: name,
            zIndex: 10000,
            label: name,
            extData: theItem
            // animation: "AMAP_ANIMATION_DROP"
        });
        marker.on('click', function (arg) {
            //var thelng = arg.lnglat;

            var thelng = arg.target.getPosition();// new AMap.LngLat(113.2685860000, 22.9874720000);
            var theCurrentMaxLevel = arg.target.getExtData().maxLevel || theMaxLevel;
            //{ "latitude": , "longitude":  }
            var theZoom = theMap.getZoom();
            if (theZoom <= 8) {
                MoveToPoint(thelng, theCurrentMaxLevel);
            }
            else {
                ReturnDefualt();
            }
        })
        theMarks.push(marker);
        theMap.add(marker);
    }
}

//开始导航到指定点
function MoveToPoint(lntlat, maxZoom) {
    console.log("开始导航到指定点!");
    var theZoom = theMap.getZoom();
    var thePitchTimer = window.setInterval(function () {
        if (theZoom > maxZoom) {
            window.clearInterval(thePitchTimer);
            console.log("结束导航到指定点!");
            return;
        }
        theMap.setZoomAndCenter(theZoom++, lntlat);
    }, 10);
    theMap.off('indoor_create');
    theMap.on('indoor_create', function (arg) {
        debugger;
        //theMap.indoorMap.showIndoorMap('B000A856LJ', 5);
    })
}
//结束导航到指定点
function ReturnDefualt(defaultZoom, lntlat) {
    console.log("开始导航到该蓝图!");
    var theZoom = theMap.getZoom();
    defaultZoom = defaultZoom || 7;
    var lntlat = lntlat || new AMap.LngLat(113.275824, 22.994826)
    var thePitchTimer = window.setInterval(function () {
        if (theZoom < defaultZoom || theZoom <= 1) {
            window.clearInterval(thePitchTimer);
            console.log("结束导航到该蓝图!");
            return;
        }
        theMap.setZoomAndCenter(theZoom--, lntlat);
    }, 10);
}
function Switch2D() {
    var theValue = 45;
    var thePitch = theMap.getPitch();
    if (thePitch <= 0) {
        return;
    }
    var thePitchTimer = window.setInterval(function (me) {
        console.log("角度:" + theValue);
        if (theValue < 0) {
            window.clearInterval(thePitchTimer);
            return;
        }
        else {
            theMap.setPitch(theValue);
        }
        theValue = theValue - 1;
    }, 10);
}
function Switch3D() {
    var theValue = 1;
    var thePitch = theMap.getPitch();
    if (thePitch >= 45) {
        return;
    }
    var thePitchTimer = window.setInterval(function (me) {
        console.log("角度:" + theValue);
        if (theValue > 45) {
            window.clearInterval(thePitchTimer);
            return;
        }
        else {
            theMap.setPitch(theValue);
        }
        theValue = theValue + 1;
    }, 10);
}
function SwitchView(viewName) {
    ReturnDefualt();
    ShowMark(viewName);
    theMap.remove(traffic);
    if (viewName == "公路") {
        theMap.add(traffic);
        Switch2D();
        theMap.setFeatures(['bg', 'building', 'point']);
        AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {

            //图层切换控件
            theMap.addControl(new BasicControl.LayerSwitcher({
                position: 'rt'
            }));
        });
        theMap.remove(satellite);
    }
    else {
        Switch3D();
        theMap.setFeatures(['bg', 'building']);
        theMap.clearControl();
        theMap.add(satellite);
        theMap.remove(traffic);
    }
}
function TestMove() {
    var thePoint = new AMap.LngLat(113.306199, 23.396544);
    theMap.panTo(thePoint);

}
//AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {

//    //添加一个缩放控件
//    /* map.addControl(new BasicControl.Zoom({
//         position: 'lt'
//     }));

//     //缩放控件，显示Zoom值
//     map.addControl(new BasicControl.Zoom({
//         position: 'lb',
//         showZoomNum: true
//     }));*/

//    //图层切换控件
//    //theMap.addControl(new BasicControl.LayerSwitcher({
//    //    position: 'rt'
//    //}));
//});

function TestRli(lng,lat) {
    //var map = Loca.create(theMap);
    //var layer = Loca.visualLayer({
    //    container: map,
    //    type: 'heatmap',
    //    // 基本热力图
    //    shape: 'normal'
    //});
    lng = lng || 113.23;
    lat = lat || 23.16;
    var theValue = Math.floor((Math.random() * 10));
    layer = theHeartLayer;
    var list = [];
    var i = -1, length = heatmapData.length;
    while ((i + theValue) < length) {
        var item = heatmapData[i + theValue];
        i = i + theValue;
        if (!item) {
            break;
        }
        list.push({
            coordinate: [item.lng - (116.41427945507813 - lng), item.lat - (39.89947319300864 - lat)],
            count: item.count
        })
    }

    layer.setData(list, {
        lnglat: 'coordinate',
        value: 'count'
    });

    layer.setOptions({
        style: {
            radius: 30,
            color: {
                0.5: '#2c7bb6',
                0.65: '#abd9e9',
                0.7: '#ffffbf',
                0.9: '#fde468',
                1.0: '#d7191c'
            }
        }
    });

    layer.render();
}

function TestRli2(lng, lat) {
    //var map = Loca.create(theMap);
    //var layer = Loca.visualLayer({
    //    container: map,
    //    type: 'heatmap',
    //    // 基本热力图
    //    shape: 'normal'
    //});
    lng = lng || 113.23;
    lat = lat || 23.16;
    var theValue = Math.floor((Math.random() * 10));
    layer = theHeartLayer;
    var list = [];
    var i = -1, length = 400;
    while (++i < length) {
        //var item = heatmapData[i + theValue];
        //i = i + theValue;
       
        list.push({
            coordinate: [lng + Math.random() / 1000, lat + Math.random() / 1000],
            count: Math.floor((Math.random() * 100))
        })
    }

    layer.setData(list, {
        lnglat: 'coordinate',
        value: 'count'
    });

    layer.setOptions({
        style: {
            radius: 30,
            color: {
                0.5: '#2c7bb6',
                0.65: '#abd9e9',
                0.7: '#ffffbf',
                0.9: '#fde468',
                1.0: '#d7191c'
            }
        }
    });

    layer.render();
}
function TestView() {
    var colors = [];
    // 传入 AMap.Map 实例
    var map = Loca.create(theMap);
    var layer = Loca.visualLayer({
        container: map,
        type: 'point',
        shape: 'circle'
    });

    layer.setData(citys, {
        lnglat: 'lnglat'
    });

    layer.setOptions({
        style: {
            // 支持动态回调，为每一个点设置半径
            radius: function (obj) {
                // 城市类型，0：省会直辖市，1：地级市，2：区县
                var style = obj.value.style;
                var r;
                if (style == 0) {
                    r = 6;
                } else if (style == 1) {
                    r = 3;
                } else {
                    r = 1.5;
                }

                return r;
            },
            color: '#47aff7',
            borderColor: '#c3faff',
            borderWidth: 1,
            opacity: 0.8
        }
    });

    layer.render();
}
// 将创建的点标记添加到已有的地图实例：


//加载图层展示
//AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
//    //启动页面
//    initPage(SimpleMarker);
//});

//function initPage(SimpleMarker) {

//    //创建SimpleMarker实例
//    new SimpleMarker({
//        //前景文字
//        iconLabel: '广州南站',
//        //图标主题
//        iconTheme: 'default',
//        //背景图标样式
//        iconStyle: 'red',
//        //...其他Marker选项...，不包括content
//        map: theMap,
//        position: [113.275824, 22.994826]
//    });


//}


