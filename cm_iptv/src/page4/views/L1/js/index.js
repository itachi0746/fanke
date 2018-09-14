var btmUl = document.getElementById('btm-ul');
var btn = document.getElementById('btn');
var allLi = btmUl.getElementsByTagName('li');
// console.log(allLi);


var index = 0;  // 标记当前焦点元素
var onB = true;  // 焦点在下

// 焦点切换(当前有焦点的元素的下标,键值,数组)
var changeFocusB = function (nowFocus,kt,arr)  {
  var all = arr.length;
  if (kt === 'LEFT') {  // 按左
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (kt === 'RIGHT') {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  if (kt === 'UP') {  // 按上
    initDom(arr);
    btn.classList.add('active');
    onB = false;
    return
  }
  index = nowFocus;
  // arr[nowFocus].focus();
  activeDom(index,allLi);
  moveUl(index,allLi)
};

var changeFocusT = function (kt) {
  if (kt === 'DOWN') {  // 按下
    btn.classList.remove('active');
    allLi[index].classList.add('active');
    onB = true;
  }
};

window.onload = function () {

  // onload中  图片已加载完成
  document.onirkeypress = keyEvent;
  document.onkeypress = keyEvent;

};
function keyEvent(event) {
  event = event ? event : window.event;
  var keyType = getKeyBoardType(event.keyCode);
  console.log(keyType);
  onB?changeFocusB(index,keyType,allLi):changeFocusT(keyType);
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