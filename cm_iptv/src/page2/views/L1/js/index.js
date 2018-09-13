

// var rightContent = document.getElementById('right-content');
var leftMenu = document.getElementById('left-ul');
var rightMenu = document.getElementById('right-ul');
var bb = document.getElementById('bb');
console.log(bb)

var leftLi = leftMenu.getElementsByTagName('li');
var rightLi = rightMenu.getElementsByTagName('li');


var Rindex = 0;  // 右菜单下标
var Lindex = 0;  // 左菜单下标
var onR = true;  // 焦点是否在右菜单


// 焦点切换(当前有焦点的元素的下标,键值,数组)  38 40 37 39 | 38 40 37 39

var changeFocusL = function (nowFocus, keyValue, arr) {
  var all = arr.length;

  if (keyValue === 39) {  // 按右
    Lindex = nowFocus;
    rightLi[Rindex].focus();
    onR = true;
    return
  }

  if (keyValue === 38) {  // 按上
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyValue === 40) {  // 按下
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  $(leftLi[0]).removeClass('LActive');
  Lindex = nowFocus;
  arr[nowFocus].focus();

};
var changeFocusR = function (nowFocus, keyValue, arr) {
  var all = arr.length;

  if (keyValue === 39) {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  if (keyValue === 37) {  // 按左
    if (nowFocus === 0 || nowFocus === 3) {
      onR = false;
      leftLi[Lindex].focus();
      return
    } else {
      nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
    }
  }

  if (keyValue === 38) {  // 按上
    nowFocus >= 3 ? nowFocus -= 3 : nowFocus;
  }
  if (keyValue === 40) {  // 按下
    nowFocus < 3 ? nowFocus += 3 : nowFocus;
  }
  Rindex = nowFocus;
  arr[nowFocus].focus();
  // moveUl(nowFocus,rightMenu)
};

window.onload = function () {

// var n = new Navigation();
// n.disableDefaultNavigation();
  // onload中  图片已加载完成
  // rightLi[Rindex].focus();
    bb.focus();


  window.document.onkeydown = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    // alert('onkeydown',keyValue);
    // onR?changeFocusR(Rindex,keyValue,rightLi):changeFocusL(Lindex,keyValue,leftLi);

    if (keyValue === 13) {  // 按OK
      nextPage(Rindex)
    }
    if (keyValue === 8) {  // 按返回
      // nextPage(Rindex)

        // window.location.back(-1);
    }
  };

    // window.document.onkeypress = function (keyEvent) {
    //     keyEvent = keyEvent ? keyEvent : window.event;
    //     var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    //     // alert('onkeypress',keyValue);
    // }


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
function moveUl(i,ul) {


}

// 页面跳转
// function nextPage(index) {
//   window.location.href = '../L3/index.html?' + 'id=' + index;
// }



