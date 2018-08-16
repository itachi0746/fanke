const Mock = require('mockjs');
const Random = Mock.Random;
let arr = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()[]"
};

// ==============================================================================
// 首页的产品列表 Id:id,  Name:显示屏名称, Price:价格, Flowrate:人流量
const pFun = function () {
  let arr = [];

  // for (let i = 1; i <= n; i++) {
    let newItem = {
      'Id|+1': 1, Name: '显示屏'+Random.string( 'number', 3 ), 'Price|+10': 100, Flowrate: '1000'
    };
    arr.push(newItem)
  // }

  return arr
};

let screenListAll = {
  'Data|5': pFun(),
  Success: true,
  Code: null
};

Mock.mock('http://www.bai.com/screenListAll', {
  'data': screenListAll,
});

// ==============================================================================
// 首页的推荐列表 Id:id,  Name:显示屏名称, Price:价格, Img:产品图片
let recommend = {
  'Data|5': [
    {
      'Id|+1': 1, Name: '屏幕名字',
      Img: Random.dataImage('100x140')
    }
  ],
  Success: true,
  Code: null
};

Mock.mock('http://www.bai.com/recommend', {
  'data': recommend,
});

// ==============================================================================
// 首页banner  Id:id,  Name:显示屏名称, Img:banner图片
let banner = {
  'Data': [
    {
      Id: '1', Name: '',
      Img: Random.dataImage('375x100')
    },
    {
      Id: '2', Name: '',
      Img: Random.dataImage('375x100')
    },
    {
      Id: '3', Name: '',
      Img: Random.dataImage('375x100')
    }
  ],
  Success: true,
  Code: null
};

Mock.mock('http://www.bai.com/banner', {
  'data': banner,
});

// ==============================================================================
// 首页的城市列表  'Id': id, Name: 显示屏名称, children: []
const PList = function () {
  let placeList = [{'Id': 1, Name: '全部', children: []}];
  for (let i = 2; i < 16; i++) {
    let newplace = {
      'Id': i,
      Name: Random.cname(),
      children: [
        {Name: Random.cname(), Number: Random.natural(1, 10)},
        {Name: Random.cname(), Number: Random.natural(1, 10)},
        {Name: Random.cname(), Number: Random.natural(1, 10)}
      ]
    };
    placeList.push(newplace)
  }

  return placeList
};



let city = {
  'Data': PList,
  Success: true,
  Code: null
};


Mock.mock('http://www.bai.com/city', {
  'data': city,
});

// ==============================================================================
// 商家页  获取商家的屏幕列表  'Id': id, Name: 显示屏名称, Img: 产品图, Price: 价格, Desc: 描述, ScreenParameters: 屏幕参数
let screenListShop = {
  'Data|5': [
    {
      'Id|+1': 1, Name: 'LED广告屏',
      Img: Random.dataImage('60x60'),
      Price: Random.natural(1000, 2000),
      Desc: '屏幕描述文字',
      ScreenParameters: '100×100'
    }
  ],
  Success: true,
  Code: null
};

Mock.mock('http://www.bai.com/screenListShop', {
  'data': screenListShop,
});

export default Mock
