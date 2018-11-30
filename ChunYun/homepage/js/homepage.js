
$(function () {
  var tabBoxes = $('.tab-box');
  var pointControl = new PlacePointView(theMap);
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
    if(t=='高速路网'){  // 显示高速路网图层
      window.location.href = '/ChunYun/gslw/index.html';
      return
    }
    pointControl.ReturnDefualt();
    pointControl.showPoints(t);
  }

  // tab2点击事件
  function clickTab2() {
    for (var j = 0; j < tabBoxes.length; j++) {
      var obj = tabBoxes[j];
      $(obj).removeClass('active');
    }
    $(this).addClass('active');
  }

  for (var i = 0; i < tabBoxes.length; i++) {
    var box = tabBoxes[i];

    $(box).on('click',clickTab)
  }
  var tabBoxes2 = $('.tab-box2 li');
  for (var j = 0; j < tabBoxes2.length; j++) {
    var box2 = tabBoxes2[j];
    $(box2).on('click',clickTab2)
  }
  pointControl.showPoints('客运站,铁路,机场,港口');

});




