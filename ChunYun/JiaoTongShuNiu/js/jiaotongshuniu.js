
// var pointControl = new PlacePointView(theMap);


$(function () {
// tab2点击事件
  function clickTab2() {
    for (var j = 0; j < tabBoxes.length; j++) {
      var obj = tabBoxes[j];
      $(obj).removeClass('active');
    }
    $(this).addClass('active');
  }
  var tabBoxes2 = $('.tab-box2 li');
  for (var i = 0; i < tabBoxes2.length; i++) {
    var box = tabBoxes2[i];
    $(box).on('click',clickTab2)
  }


  // pointControl.showPoints('客运站,铁路,机场,港口');

});




