var UL = document.getElementById('menu');
var allLi = UL.getElementsByTagName('li');
var a1 = document.getElementById('a1');
// console.log(allLi);


var index = 0;  // 标记当前焦点元素

// 焦点切换(当前有焦点的元素的下标,键值,数组)
var changeFocus = function (nowFocus,keyValue,arr)  {
  var all = arr.length;
  if (keyValue === 37) {  // 按左
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyValue === 39) {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  index = nowFocus;
  arr[nowFocus].focus();
  moveUl(index,allLi)
};

window.onload = function () {
  // onload中  图片已加载完成
  // allLi[index].focus();
  //   var n = new Navigation();
  //   n.disableDefaultNavigation();
    a1.focus();
  // console.log('p1l100')

  window.document.onkeydown = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue)
    // changeFocus(index,keyValue,allLi)
// return true;

    if (keyValue === 13) {
      // nextPage(index)
    }
      if (keyValue === 8) {  // 按返回
          // nextPage(Rindex)
          window.location.back(-1);
      }
  }
};


// 移动菜单
function moveUl(i,arr) {
  if(i===arr.length-1) {
    UL.style.left = '-302px';
  }
  if(i===0) {
    UL.style.left = '0px';

  }
}

// 页面跳转
// function nextPage(index) {
//   window.location.href = '../L2/index.html?' + 'id=' + index;
// }