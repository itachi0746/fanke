// var rightContent = document.getElementById('right-content');
var LUl = document.getElementById('left-ul');
var RUl = document.getElementById('right-ul');

var leftLi = LUl.getElementsByTagName('li');
var rightLi = RUl.getElementsByTagName('li');
var box = document.getElementsByClassName('box');

var Boxindex = 0;
var Rindex = 0;  // 右菜单下标
var Lindex = 0;  // 左菜单下标
var onR = false;  // 焦点是否在右菜单
var onBox = false;  // 右上

// 焦点切换(当前有焦点的元素的下标,键值,数组)  38 40 37 39
var changeFocusL = function (nowFocus, kv, arr) {
  var all = arr.length;

  if (kv === 'RIGHT') {  // 按右
    if(Lindex <=4) {
      onBox = true;
      Boxindex = 0;
      box[Boxindex].classList.add('active');
    } else {
      Rindex = 0;
      rightLi[Rindex].classList.add('active');
    }
    Lindex = nowFocus;
    onR = true;
    return
  }

  if (kv === 'UP') {  // 按上
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (kv === 'DOWN') {  // 按下
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  Lindex = nowFocus;
  activeDom(Lindex,leftLi)
};


var changeFocusR = function (nowFocus, kv, arr) {
  if(onBox) {
    if(kv === 'LEFT') {  // 按左
      if(Boxindex<=0) {
        onBox = false;
        onR = false;
        initDom(box);
        leftLi[Lindex].classList.add('active');
      }else {
        Boxindex--;
        activeDom(Boxindex,box);
      }
    }
    if(kv === 'RIGHT') {  // 按右
      Boxindex>=1?Boxindex=0:Boxindex++;
      activeDom(Boxindex,box);
    }
    if(kv === 'DOWN') {  // 按下
      // if(Boxindex===0) {
      onBox = false;
      initDom(box);
      rightLi[Rindex].classList.add('active');
      // }
    }

  } else {

    var all = arr.length;
    if (kv === 'RIGHT') {  // 按右
      nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
      Rindex = nowFocus;
      activeDom(Rindex,arr)
    }
    if (kv === 'LEFT') {  // 按左
      if (nowFocus === 0) {
        onR = false;
        initDom(arr);
        leftLi[Lindex].classList.add('active');
        return
      } else {
        nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
        Rindex = nowFocus;
        activeDom(Rindex,arr)
      }
    }

    if (kv === 'UP') {  // 按上
      initDom(arr);

      if(nowFocus <= 2) {

        Boxindex = 0;
        box[Boxindex].classList.add('active');
      } else {
        Boxindex = 1;
        box[Boxindex].classList.add('active');
      }
      onBox = true;
      Rindex = nowFocus;
    }
    // if (kv === 40) {  // 按下
    //   nowFocus < 3 ? nowFocus += 3 : nowFocus;
    //   // arr[nowFocus].focus();
    // }
    // Rindex = nowFocus;
    // arr[nowFocus].focus();
  }


};

// window.onload = function () {
//   // onload中  图片已加载完成
//   // $(leftLi[Lindex]).find('.is-active').toggleClass('show');
//   // rightLi[rightLi.length - 1].style.marginBottom = 0 + 'px';
//   // console.log(rightLi)
//
//   window.document.onkeydown = function (keyEvent) {
//     keyEvent = keyEvent ? keyEvent : window.event;
//     var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
//     console.log(keyValue);
//       // alert(keyValue)
//
//       // onR?changeFocusR(Rindex,keyValue,rightLi):changeFocusL(Lindex,keyValue,leftLi);
//
//     if (keyValue === 13) {  // 按OK
//       // nextPage(Rindex)
//     }
//       if (keyValue === 8 || keyValue === '8') {  // 按返回
//           // nextPage(Rindex)
//           window.location.back(-1);
//       }
//   }
// };


window.onload = function () {

  // onload中  图片已加载完成
  document.onirkeypress = keyEvent;
  document.onkeypress = keyEvent;

};
function keyEvent(event) {
  event = event ? event : window.event;
  var keyType = getKeyBoardType(event.keyCode);
  console.log(keyType);
  if(keyType === 'BACK') {
    location.href = 'http://211.139.180.160:8090/GDEpg/epg/login!index.action?itvAccount='+ GetQueryString('itvAccount');
    return
  }
  onR?changeFocusR(Rindex,keyType,rightLi):changeFocusL(Lindex,keyType,leftLi);
}
function activeDom(i,arr) {
  for(var m=0;m<arr.length;m++) {
    arr[m].classList.remove('active')
  }
  arr[i].classList.add('active');

}
function initDom(arr) {
  for(var m=0;m<arr.length;m++) {
    arr[m].classList.remove('active')
  }
}


// var t = 0;  // ul的top
// // var h = rightLi[0].clientHeight;  // 每个li的高度
//
// // 原比例
// var scale1 = rightContent.clientHeight / rightMenu.clientHeight;
// // 自定义缩小比列
// var scale2 = myScroll.clientHeight / rightContent.clientHeight;
// var h1 = myScroll.clientHeight * scale1;
// //  滚动条的高度
// myScrollBar.style.height = h1 + 'px';

// 移动菜单
function moveUl() {

  var st = rightContent.scrollTop;
  rightContent.scrollTop = '0px';  // scrollTop跟top同时用会使位置错误, 先把scrollTop归0, 再使用top移动元素
  rightMenu.style.top = -st + 'px';
  console.log(st);
  console.log(rightMenu.style.top);
  myScrollBar.style.top = st * scale1 * scale2 + 'px';  // 缩小后的
  // myScrollBar.style.top = st * scale1 + 'px';  // 缩小前的
  console.log('myScrollBar', myScrollBar.style.top);

}

// 页面跳转
function nextPage(index) {
  window.location.href = '../L3/index.html?' + 'id=' + index;
}



