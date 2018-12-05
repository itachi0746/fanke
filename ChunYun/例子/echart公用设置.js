var dom = document.getElementById("tab3li2-chart3");
var myChart = echarts.init(dom);
// console.log(echarts.version)
var app = {};
option = null;

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
  legend: {
    data: ['出发旅客量', '到达旅客量'],
    textStyle: {
      color: 'rgb(221,243,255)'
    }
  },
  yAxis: {
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
}

if (option && typeof option === "object") {
  myChart.setOption(option, true);
}