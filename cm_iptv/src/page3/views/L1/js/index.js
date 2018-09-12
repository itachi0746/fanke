// var rightContent = document.getElementById('right-content');
var LUl = document.getElementById('left-ul');
var RUl = document.getElementById('right-ul');
var box = $('.box');

var leftLi = LUl.getElementsByTagName('li');
var rightLi = RUl.getElementsByTagName('li');

var Boxindex = 0;
var Rindex = 0;  // 右菜单下标
var Lindex = 0;  // 左菜单下标
var onR = true;  // 焦点是否在右菜单
var onBox = true;

// 焦点切换(当前有焦点的元素的下标,键值,数组)  38 40 37 39


var changeFocusL = function (nowFocus, kv, arr) {
  var all = arr.length;

  if (kv === 39) {  // 按右
    if(Lindex <=4) {
      onBox = true;
      Boxindex = 0;
      box[Boxindex].focus();

    } else {
      Rindex = 0;
      rightLi[Rindex].focus();

    }

    Lindex = nowFocus;
    // rightLi[Rindex].focus();
    onR = true;
    return
  }

  if (kv === 38) {  // 按上
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (kv === 40) {  // 按下
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  // $(leftLi[0]).removeClass('LActive');
  Lindex = nowFocus;
  arr[nowFocus].focus();

};


var changeFocusR = function (nowFocus, kv, arr) {
  if(onBox) {
    if(kv === 37) {  // 按左
      if(Boxindex<=0) {
        onBox = false;
        onR = false;
        leftLi[Lindex].focus();
      }else {
        Boxindex--;
        box[Boxindex].focus();
      }
    }
    if(kv === 39) {  // 按右
      Boxindex>=1?Boxindex=0:Boxindex++;
      box[Boxindex].focus();
    }
    if(kv === 40) {  // 按下
      // if(Boxindex===0) {
      onBox = false;
      rightLi[Rindex].focus();
      // }
    }

  } else {

    var all = arr.length;
    if (kv === 39) {  // 按右
      nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
      Rindex = nowFocus;
      arr[nowFocus].focus();

    }
    if (kv === 37) {  // 按左
      if (nowFocus === 0) {
        onR = false;
        // changeFocus(Lindex,kv,leftLi);
        leftLi[Lindex].focus();
        return
      } else {
        nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
        Rindex = nowFocus;
        arr[nowFocus].focus();
      }
    }

    if (kv === 38) {  // 按上
      if(nowFocus <= 2) {
        Boxindex = 0;
        box[Boxindex].focus();
      } else {
        Boxindex = 1;
        box[Boxindex].focus();
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

window.onload = function () {
  // onload中  图片已加载完成
  box[Boxindex].focus();
  // $(leftLi[Lindex]).find('.is-active').toggleClass('show');
  // rightLi[rightLi.length - 1].style.marginBottom = 0 + 'px';
  // console.log(rightLi)

  window.document.onkeydown = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue);
    onR?changeFocusR(Rindex,keyValue,rightLi):changeFocusL(Lindex,keyValue,leftLi);

    if (keyValue === 13) {  // 按OK
      nextPage(Rindex)
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



