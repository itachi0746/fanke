// var rightContent = document.getElementById('right-content');
var leftMenu = document.getElementById('left-ul');
var rightMenu = document.getElementById('right-ul');

var leftLi = leftMenu.getElementsByTagName('li');
var rightLi = rightMenu.getElementsByTagName('li');


var Rindex = 0;  // 右菜单下标
var Lindex = 0;  // 左菜单下标
var onR = true;  // 焦点是否在右菜单


// 焦点切换(当前有焦点的元素的下标,键值,数组)
var changeFocus = function (nowFocus,keyValue,arr)  {
  var all = arr.length;
  if (keyValue === 38) {  // 按上
    nowFocus <= 0 ? nowFocus = all - 1 : nowFocus--;
  }
  if (keyValue === 40) {  // 按下
    nowFocus >= all - 1 ? nowFocus = 0 : nowFocus++;
  }

  if(onR) {
    Rindex = nowFocus;
    arr[nowFocus].focus();
    moveUl()
  } else {
    // $(leftLi[Lindex]).find('.is-active').removeClass('show');
    leftLi[0].css('backgroundImage','');
    Lindex = nowFocus;
    arr[nowFocus].focus();
  }

};

window.onload = function () {
  // onload中  图片已加载完成
  rightLi[Rindex].focus();
  // $(leftLi[Lindex]).find('.is-active').toggleClass('show');
  // rightLi[rightLi.length - 1].style.marginBottom = 0 + 'px';
  // console.log(rightLi)

  window.document.onkeydown = function (keyEvent) {
    keyEvent = keyEvent ? keyEvent : window.event;
    var keyValue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
    console.log(keyValue);
// return true;

    if (keyValue === 37) {  // 按左
      if(Rindex===0||Rindex===3) {
        onR = false;
        changeFocus(Lindex,keyValue,leftLi);
      } else {
        changeFocus(Rindex,keyValue,rightLi);
      }

    }
    if (keyValue === 39) {  // 按右
      onR = true;
      changeFocus(Rindex,keyValue,rightLi);
    }
    if (keyValue === 38) {  // 按上
      // onR?changeFocus(Rindex,keyValue,rightLi):changeFocus(Lindex,keyValue,leftLi)
      if(onR) {
        Rindex>=3?Rindex-=3:Rindex;

      } else {
        changeFocus(Lindex,keyValue,leftLi)
      }
    }
    if (keyValue === 40) {  // 按下
      onR?changeFocus(Rindex,keyValue,rightLi):changeFocus(Lindex,keyValue,leftLi)

    }

    if (keyValue === 13) {
      nextPage(Rindex)
    }
  }


};



var t = 0;  // ul的top
// var h = rightLi[0].clientHeight;  // 每个li的高度

// 原比例
var scale1 = rightContent.clientHeight / rightMenu.clientHeight;
// 自定义缩小比列
var scale2 = myScroll.clientHeight / rightContent.clientHeight;
var h1 = myScroll.clientHeight * scale1;
//  滚动条的高度
myScrollBar.style.height = h1 + 'px';

// 移动菜单
function moveUl() {

  var st = rightContent.scrollTop;
  rightContent.scrollTop = '0px';  // scrollTop跟top同时用会使位置错误, 先把scrollTop归0, 再使用top移动元素
  rightMenu.style.top = -st + 'px';
  console.log(st);
  console.log(rightMenu.style.top);
  myScrollBar.style.top = st * scale1 * scale2 + 'px';  // 缩小后的
  // myScrollBar.style.top = st * scale1 + 'px';  // 缩小前的
  console.log('myScrollBar',myScrollBar.style.top);

}

// 页面跳转
function nextPage(index) {
  window.location.href = '../L3/index.html?' + 'id=' + index;
}



