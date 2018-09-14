
var leftMenu = document.getElementById('left-ul');
var rightMenu = document.getElementById('right-ul');

var leftLi = leftMenu.getElementsByTagName('li');
var rightLi = rightMenu.getElementsByTagName('li');


var Rindex = 0;  // 右菜单下标
var Lindex = 0;  // 左菜单下标
var onR = false;  // 焦点是否在右菜单


// 焦点切换(当前有焦点的元素的下标,键值,数组)  38 40 37 39
var changeFocusL = function (nowFocus, keyType, arr) {
  var all = arr.length;

  if (keyType === 'RIGHT') {  // 按右
    Lindex = nowFocus;
    // rightLi[Rindex].focus();
    rightLi[Rindex].classList.add('active');
    onR = true;
    return
  }

  if (keyType === 'UP') {  // 按上
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyType === 'DOWN') {  // 按下
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  Lindex = nowFocus;
  activeDom(Lindex,leftLi)
  // arr[nowFocus].focus();

};

var changeFocusR = function (nowFocus, keyValue, arr) {
  var all = arr.length;

  if (keyValue === 'RIGHT') {  // 按右
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }
  if (keyValue === 'LEFT') {  // 按左
    if (nowFocus === 0 || nowFocus === 3) {
      onR = false;
      initDom(arr);
      leftLi[Lindex].classList.add('active');

      return
    } else {
      nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
    }
  }

  if (keyValue === 'UP') {  // 按上
    nowFocus >= 3 ? nowFocus -= 3 : nowFocus;
  }
  if (keyValue === 'DOWN') {  // 按下
    nowFocus < 3 ? nowFocus += 3 : nowFocus;
  }
  Rindex = nowFocus;
  activeDom(Rindex,rightLi)
  // moveUl(nowFocus,rightMenu)
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
// 页面跳转
// function nextPage(index) {
//   window.location.href = '../L3/index.html?' + 'id=' + index;
// }



