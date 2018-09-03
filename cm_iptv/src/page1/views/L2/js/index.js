var rightContent = document.getElementById('right-content');
var leftMenu = document.getElementById('left-menu');
var rightMenu = document.getElementById('right-menu');
var myScroll = document.getElementById('scroll');
var myScrollBar = document.getElementById('scroll-bar');

var leftLi = leftMenu.getElementsByTagName('li');
var rightLi = rightMenu.getElementsByTagName('li');

window.onload = function () {
  // onload中  图片已加载完成
  rightLi[0].focus();
  rightLi[rightLi.length - 1].style.marginBottom = 0 + 'px';
  // console.log(rightLi)

  window.document.onkeypress = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue)
    changeFocus(keyValue)
// return true;

    if (keyValue === 13) {
      window.location.href = '../L3/index.html';
    }
  }


};

var nowFocus = 0;

// 焦点切换
function changeFocus(keyValue) {
  var all = rightLi.length;
  if (keyValue === 97) {
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyValue === 100) {
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  // console.log(allLi[nowFocus],nowFocus)
  rightLi[nowFocus].focus();
  moveUl(nowFocus, rightMenu);
}

var t = 0;  // ul的top
var h = rightLi[0].clientHeight;  // 每个li的高度

// 原比例
var scale1 = rightContent.clientHeight / rightMenu.clientHeight;
// 自定义缩小比列
var scale2 = myScroll.clientHeight / rightContent.clientHeight;
var h1 = myScroll.clientHeight * scale1;
//  自定义滚动条的高度
myScrollBar.style.height = h1 + 'px';

// 移动菜单
function moveUl(index, target) {
  // var all = rightLi.length;
  // t += h;
  //
  // if (index >= all - 1) {
  //   t = rightMenu.clientHeight - rightContent.clientHeight;
  // }
  // if (index === 0) {
  //   t = 0;
  // }
  // console.log(rightContent.scrollTop)
  // target.style.top = t + 'px';

  var st = rightContent.scrollTop;
  // rightMenu.style.top = -st + 'px';
    console.log(st);
    console.log(rightMenu.style.top);
  myScrollBar.style.top = st * scale1 * scale2 + 'px';
  // myScrollBar.style.top = st * scale1 + 'px';
  console.log('myScrollBar',myScrollBar.style.top);

}

// 页面跳转
function toL2Page(index) {
  window.location.href = '../L2/index.html';
}



