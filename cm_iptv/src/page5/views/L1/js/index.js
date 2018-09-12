var BUl = document.getElementById('B-ul');
var RUl = document.getElementById('R-ul');
var btn = document.getElementById('play');

var BLi = BUl.getElementsByTagName('li');
var RLi = RUl.getElementsByTagName('li');


var Rindex = 0;  // 右菜单下标
var Bindex = 0;  // 左菜单下标
var onT = true;  // 焦点是否在上
var onBtn = false;

// 焦点切换(当前有焦点的元素的下标,键值,数组)   38 40 37 39


var changeFocusB = function (nowFocus, kv, arr) {
  var all = arr.length;

  if (kv === 39) {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  if (kv === 37) {  // 按左
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }

  if (kv === 38) {  // 按上
    onT = true;
    if(nowFocus<=1) {
      onBtn = true;
      btn.focus();
    } else {
      onBtn = false;
      RLi[Rindex].focus();
    }
    return
  }
  // if (kv === 40) {  // 按下
  //   nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  // }
  // $(leftLi[0]).removeClass('LActive');
  Bindex = nowFocus;
  arr[nowFocus].focus();

};
var changeFocusT = function (nowFocus, kv, arr) {
  if(onBtn) {
    if(kv===39) {  // 按右
      onBtn = false;
      RLi[Rindex].focus();

    }
    if(kv===40) {  // 按下
      onBtn = false;
      onT = false;
      BLi[Bindex].focus();
    }
  } else {
    var all = arr.length;
    // if (kv === 39) {  // 按右
    //   onBtn = true;
    //   nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
    // }
    if (kv === 37) {  // 按左
      onBtn = true;
      btn.focus();
      // return
    }

    if (kv === 38) {  // 按上
      if(nowFocus >= 1) {
        nowFocus--;
        arr[nowFocus].focus();
        Rindex = nowFocus;

      } else {
        // nowFocus++;
        // arr[nowFocus].focus();
      }
    }
    if (kv === 40) {  // 按下
      if(nowFocus >= 1) {
        Rindex = nowFocus;
        onT = false;
        onBtn = false;
        BLi[Bindex].focus();

      } else {
        nowFocus++;
        Rindex = nowFocus;
        arr[nowFocus].focus();
      }
    }
  }


};

// var changeFocusBtn = function (kv) {
//   if(kv===39) {
//     onBtn = false;
//     RLi[Rindex].focus();
//
//   }
//   if(kv===40) {
//     onBtn = false;
//     onT = false;
//     BLi[Bindex].focus();
//   }
// }

window.onload = function () {
  // onload中  图片已加载完成
  RLi[Rindex].focus();


  window.document.onkeydown = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue);
    onT?changeFocusT(Rindex,keyValue,RLi):changeFocusB(Bindex,keyValue,BLi);

    if (keyValue === 13) {  // 按OK
      // nextPage(Rindex)
    }
    if (keyValue === 71) {  // 按返回
      // nextPage(Rindex)
      window.location.back();
    }
  }


};


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



