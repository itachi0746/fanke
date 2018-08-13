const Mock = require('mockjs');
const Random = Mock.Random;

let shopList = [
  {'Id|+1': 1, Name: '万达广场', 'Prize|+10': 100, Flowrate: '1000'}
];

Mock.mock('http://www.bai.com/GetShop', {
  'shopList|4': shopList,
});

let recommend = [
  {
    Id: '1', Name: '万达广场万达广场万达广场万达广场',
    Img: Random.dataImage('100x140', '#4A7BF7')
  }
];

Mock.mock('http://www.bai.com/GetRmd', {
  'recommend|4-6': recommend,
});

let banner = [
  {
    Id: '1', Name: '',
    Img: Random.dataImage('375x100', 'lightblue')
  },
  {
    Id: '2', Name: '',
    Img: Random.dataImage('375x100', 'red')
  },
  {
    Id: '3', Name: '',
    Img: Random.dataImage('375x100', 'lightgreen')
  }
];

Mock.mock('http://www.bai.com/GetBanner', {
  'banner': banner,
});

export default Mock
