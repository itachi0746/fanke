
// var pointControl = new PlacePointView(theMap);


$(function () {
// tab点击事件
  function clickTab() {
    for (var j = 0; j < tabBoxes.length; j++) {
      var obj = tabBoxes[j];
      $(obj).removeClass('active');
    }
    $(this).addClass('active');

    // var t = $(this).data('name');

    // pointControl.ReturnDefualt();

    // pointControl.showPoints(t);

  }

  var tabBoxes = $('.tab-box2 li');
  // console.log(tabBoxes)

  for (var i = 0; i < tabBoxes.length; i++) {
    var box = tabBoxes[i];

    $(box).on('click',clickTab)
  }


  // pointControl.showPoints('客运站,铁路,机场,港口');

});




