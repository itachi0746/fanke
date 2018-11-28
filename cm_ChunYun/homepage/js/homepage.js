var tabBoxes = $('.tab-box');
// console.log(tabBoxes);

var pointControl = new PlacePointView(theMap);


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

  var t = $(this).data('name');
  // debugger
  pointControl.showPoints(t);
}


function showTgt() {

}