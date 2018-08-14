const Mock = require('mockjs');
const Random = Mock.Random;

let shopList = [
  {'Id|+1': 1, Name: '万达广场', 'Prize|+10': 100, Flowrate: '1000'}
];

Mock.mock('http://www.bai.com/GetShop', {
  'shopList|5': shopList,
});

let recommend = [
  {
    'Id|+1': 1, Name: '万达广场万达广场万达广场万达广场',
    Img: Random.dataImage('100x140')
  }
];

Mock.mock('http://www.bai.com/GetRmd', {
  'recommend|4-6': recommend,
});

let banner = [
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
];

Mock.mock('http://www.bai.com/GetBanner', {
  'banner': banner,
});

const pdtList = function () {
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


Mock.mock('http://www.bai.com/GetPlace', {
  'Place': pdtList,
});

let screenList = [
  {
    'Id|+1': 1, Name: 'LED广告屏',
    Img: Random.dataImage('60x60'),
    Prize: Random.natural(1000, 2000),
    Desc: '屏幕描述文字',
    ScreenParameters: '100×100'
  }
];

Mock.mock('http://www.bai.com/GetScreenList', {
  'screenList|4-8': screenList,
});

export default Mock
