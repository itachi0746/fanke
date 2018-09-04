var UL = document.getElementById('menu');
var allLi = UL.getElementsByTagName('li');
console.log(allLi);


window.onload = function () {
  // onload中  图片已加载完成
  allLi[0].focus();

  window.document.onkeypress = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue)
    changeFocus(keyValue)
// return true;

    if (keyValue === 13) {
      window.location.href = '../L2/index.html';
    }
  }
};

var nowFocus = 0;

// 焦点切换
function changeFocus(keyValue)  {
  var all = allLi.length;
  if (keyValue === 97) {
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyValue === 100) {
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  // console.log(allLi[nowFocus],nowFocus)
  allLi[nowFocus].focus();
  moveUl(nowFocus);
}
// 移动菜单
function moveUl(index) {
  if(index===4) {
    UL.style.left = '-302px';
  }
  if(index===0) {
    UL.style.left = '0px';

  }
}
// 页面跳转
function toL2Page(index) {
  window.location.href = '../L2/index.html';
}