var tabBoxes = $('.tab-box');
// console.log(tabBoxes);
var newarr = [];
var newarr2 = [];

var placeArr = placeData.split(';');
for (var k = 0; k < placeArr.length; k++) {
  var pl = placeArr[k];
  var tr = pl.trim();
  // console.log(tr);
  newarr.push(tr);
  // newarr = tr.split(',')
}
//
for (var m = 0; m < newarr.length; m++) {
  var obj = newarr[m];
  var tempArr = obj.split(',');
  var temp = tempArr[2]+','+tempArr[3];
  temp = temp.split(':')[1];
  newarr2.push({
    '类型':tempArr[0],
    '名称':tempArr[1],
    '坐标':temp
  })

}

console.log(newarr2);

$(function () {
  for (var i = 0; i < tabBoxes.length; i++) {
    var box = tabBoxes[i];

    $(box).on('click',clickTab)
  }
});

// tab点击事件
function clickTab() {
  for (var j = 0; j < tabBoxes.length; j++) {
    var obj = tabBoxes[j];
    $(obj).removeClass('tab-box-active');
    $(obj).addClass('tab-box-noactive');
  }
  $(this).removeClass('tab-box-noactive');
  $(this).addClass('tab-box-active');
}


function showTgt() {

}