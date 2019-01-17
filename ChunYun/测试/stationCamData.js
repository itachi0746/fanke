// 场站摄像头id
var theCamArr = [
  {
    "name":"省汽车客运站",
    "data": [
      ["广州 省汽车站 1楼售票入口","44010600001310000440","省站内部"],
      ["广州 省汽车站 1楼候车室","44010600001310000443","省站内部"],
      ["广州 省汽车站 2楼候车室","44010600001310000445","省站内部"],
      ["广州 省汽车站 2楼售票","44010600001310000446","省站内部"],
      ["广州 省汽车站 1楼售票","44010600001310000447","省站内部"],
      ["广州 省汽车站 1楼售票入口","44010600001310000440","省站内部"],
      ["广州 省汽车站 出口","44010600001310000448","省站内部"]
    ]
  },
  {
    "name":"广州白云国际机场",
    "data": [
      ["1.B7号门到达厅通道","33000000001310001544","机场"],
      ["2.A区到达厅通道","33000000001310001545","机场"],
      ["出发大厅1","33000000001310001922","机场"],
      ["机场出口后广场","18052906511310019685","收费广场"],
      ["机场出口前广场","18052906511310019734","收费广场"],
      ["机场入口后广场","18052906511310019786","收费广场"]
    ]
  },
  {
    "name":"芳村汽车客运站",
    "data": [
      ["广州 芳村客运站 066 候车大厅","44010600001310000470","芳村站内部"],
      ["广州 芳村客运站 058 候车大厅入口","44010600001310000476","芳村站内部"],
      ["广州 芳村客运站 051 售票大厅1","44010600001310000480","芳村站内部"],
      ["广州 芳村客运站 045 南广场2","44010600001310000473","芳村站内部"],
      ["广州 芳村客运站 049 前广场","44010600001310000481","芳村站内部"]
    ]
  },
  {
    "name":"广州东站",
    "data": [
      ["东站售票大厅","44010600001310000537","东站内部"],
      ["广州 东站候车大厅","44010600001310000541","东站内部"],
      ["广州 东站客运站出入口","44010600001310000542","东站内部"],
      ["广州 东站客运站入站","44010600001310000544","东站内部"],
      ["106#10.161西室外出站球","33000000001310001521","东站"],
      ["701#11.59四楼进候车通道","33000000001310001526","东站"]
    ]
  },
  {
    "name":"广州南站",
    "data": [
      ["东广场1#球机","33000000001310001931","南站"],
      ["西广场2#球机","33000000001310001941","南站"],
      ["西广场1#球机","33000000001310001942","南站"],
      ["广州  南客站144负二候车厅球机03","44010600001310000675","南站内部"],
      ["广州  南客站 137负二售票厅球机01","44010600001310000676","南站内部"],
      ["广州 南客站 059负一候车厅球机03","44010600001310000678","南站内部"],
      ["广州 南客站 024首层进站前厅","44010600001310000680","南站内部"]
    ]
  },
  {
    "name":"广州火车站",
    "data": [
      ["行包广场正面-左（球）","33000000001310001902","火车站"],
      ["东票厅广场正面-右（球）","33000000001310001903","火车站"],
    ]
  },
  {
    "name":"天河汽车客运站",
    "data": [
      ["广州 天河站 西售票厅(西) 408","44010600001310000662","天河站内部"],
      ["广州 天河站 东门入口 514","44010600001310000665","天河站内部"],
      ["广州 天河站 二楼东售票区 702","44010600001310000669","天河站内部"],
      ["广州 天河站 候车大厅西 611","44010600001310000670","天河站内部"],
      ["广州 天河站 大候车室中 610","44010600001310000671","天河站内部"],
      ["广州 天河站 二楼售票厅 412","44010600001310000672","天河站内部"],
      ["广州 天河站 前广场 404","44010600001310000673","天河站内部"],
      ["广州 天河站 落客区","44010600001310000653","天河站内部"],
      ["广州 天河站 一楼候车室西入口 614","44010600001310000658","天河站内部"],
    ]
  },
  {
    "name":"广州汽车客运站",
    "data": [
      ["广州 市汽车客运站车辆出口","44010600001310000451","市站内部"],
      ["广州 市汽车客运站车辆入口","44010600001310000452","市站内部"],
      ["广州 市汽车客运站一楼候乘区","44010600001310000462","市站内部"],
      ["广州 流花车站票厅","44010600001310000463","市站内部"],
      ["广州 市汽车客运站东票厅","44010600001310000464","市站内部"],
      ["广州 市汽车客运站二楼候车室","44010600001310000461","市站内部"],
      ["广州 市汽车客运站三楼候车室","44010600001310000460","市站内部"],
    ]
  },

];

// 高速摄像头id
var theRoadCamObj = {
  '机场高速': ['18052906511310019734','18052906511310019786']
}