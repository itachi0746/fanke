var BUl = document.getElementById('B-ul');
var RUl = document.getElementById('R-ul');
var btn = document.getElementById('play');

var BLi = BUl.getElementsByTagName('li');
var RLi = RUl.getElementsByTagName('li');


var Rindex = 0;  // 右菜单下标
var Bindex = 0;  // xia菜单下标
var onT = true;  // 焦点是否在上
var onBtn = false;

// 焦点切换(当前有焦点的元素的下标,键值,数组)   'UP' 'DOWN' 'LEFT' 'RIGHT'
var changeFocusB = function (nowFocus, kt, arr) {
  var all = arr.length;

  if (kt === 'RIGHT') {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  if (kt === 'LEFT') {  // 按左
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }

  if (kt === 'UP') {  // 按上
    onT = true;
    initDom(arr);
    if(nowFocus<=1) {
      onBtn = true;
      btn.classList.add('active');
    } else {
      onBtn = false;
      RLi[Rindex].classList.add('active');
    }
    return
  }
  Bindex = nowFocus;
  // arr[Bindex].classList.add('active');
  activeDom(Bindex,arr)
};
var changeFocusT = function (nowFocus, kt, arr) {
  if(onBtn) {
    if(kt==='RIGHT') {  // 按右
      onBtn = false;
      btn.classList.remove('active');
      RLi[Rindex].classList.add('active');

    }
    if(kt==='DOWN') {  // 按下
      onBtn = false;
      onT = false;
      BLi[Bindex].classList.add('active');
    }
  } else {
    // var all = arr.length;

    if (kt === 'LEFT') {  // 按左
      onBtn = true;
      initDom(arr);
      btn.classList.add('active');
    }
    if (kt === 'UP') {  // 按上
      if(nowFocus >= 1) {
        nowFocus--;
        Rindex = nowFocus;
        activeDom(Rindex,arr);
      }
    }
    if (kt === 'DOWN') {  // 按下
      if(nowFocus >= 1) {
        Rindex = nowFocus;
        onT = false;
        onBtn = false;
        initDom(arr);
        BLi[Bindex].classList.add('active');
      } else {
        nowFocus++;
        Rindex = nowFocus;
        activeDom(Rindex,arr);
      }
    }
  }


};

// var changeFocusBtn = function (kt) {
//   if(kv==='RIGHT') {
//     onBtn = false;
//     RLi[Rindex].focus();
//
//   }
//   if(kv==='DOWN') {
//     onBtn = false;
//     onT = false;
//     BLi[Bindex].focus();
//   }
// }

// window.onload = function () {
//   // onload中  图片已加载完成
//   RLi[Rindex].focus();
//
//
//   window.document.onkeydown = function (keyEvent) {
//     keyEvent = keyEvent ? keyEvent : window.event;
//     var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
//     console.log(keyValue);
//     onT?changeFocusT(Rindex,keyValue,RLi):changeFocusB(Bindex,keyValue,BLi);
//
//     if (keyValue === 13) {  // 按OK
//       // nextPage(Rindex)
//     }
//       if (keyValue === 8) {  // 按返回
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
  onT?changeFocusT(Rindex,keyType,RLi):changeFocusB(Bindex,keyType,BLi);
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


// 页面跳转
function nextPage(index) {
  window.location.href = '../L3/index.html?' + 'id=' + index;
}



