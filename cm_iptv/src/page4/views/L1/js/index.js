var btmUl = document.getElementById('btm-ul');
var btn = document.getElementById('btn');
var allLi = btmUl.getElementsByTagName('li');
// console.log(allLi);


var index = 0;  // 标记当前焦点元素
var onB = true;

// 焦点切换(当前有焦点的元素的下标,键值,数组)
var changeFocusB = function (nowFocus,keyValue,arr)  {
  var all = arr.length;
  if (keyValue === 37) {  // 按左
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyValue === 39) {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  if (keyValue === 38) {  // 按上
    btn.focus();
    onB = false;
    return
  }
  index = nowFocus;
  arr[nowFocus].focus();
  moveUl(index,allLi)
};

var changeFocusT = function (keyValue) {
  if (keyValue === 40) {  // 按下
    allLi[index].focus();
    onB = true;
  }

};


window.onload = function () {
  // onload中  图片已加载完成
  allLi[index].focus();

  window.document.onkeydown = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue)
    onB?changeFocusB(index,keyValue,allLi):changeFocusT(keyValue);

    if (keyValue === 13) {  // 按ok
      // nextPage(index)
    }
  }
};


// 移动菜单
function moveUl(i,arr) {
  if(i===arr.length-1) {
    btmUl.style.left = '-295px';
  }
  if(i===0) {
    btmUl.style.left = '0px';

  }
}

// 页面跳转
function nextPage(index) {
  window.location.href = '../L2/index.html?' + 'id=' + index;
}