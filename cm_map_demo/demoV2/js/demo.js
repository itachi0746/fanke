var gaosu = document.getElementById("gaosu");
var tielu = document.getElementById("tielu");
var left1 = document.getElementById("left1");
var left2 = document.getElementById("left2");
var right1 = document.getElementById("right1");
var right2 = document.getElementById("right2");
var down1 = document.getElementById("down1");
var down2 = document.getElementById("down2");

var lIcon1 = document.getElementById("l-icon1");
var lIcon2 = document.getElementById("l-icon2");
var rIcon1 = document.getElementById("r-icon1");
var rIcon2 = document.getElementById("r-icon2");

var input = document.getElementById('input');

$(document).keydown(function(event) {

  // input.focus();
  if (event.keyCode == 37) {
    // alert("37");
    clickGaosu();
    mySwiper2.slidePrev();
    mySwiper3.slidePrev();
    SwitchView('高速');
  }
  if (event.keyCode == 39) {
    // alert("37");
    clickTielu();
    mySwiper2.slideNext();
    mySwiper3.slideNext();
    SwitchView('铁路');
  }
});

gaosu.onclick = function() {
  clickGaosu()
  // mySwiper1.slidePrev();
  mySwiper2.slidePrev();
  mySwiper3.slidePrev();
};
tielu.onclick = function() {
  clickTielu()
  // mySwiper1.slidePrev();
  mySwiper2.slideNext();
  mySwiper3.slideNext();
};



function clickGaosu() {
  // left2.style.display = "none";
  // left1.style.display = "block";
  // right2.style.display = "none";
  // right1.style.display = "block";
  down2.style.display = "none";
  down1.style.display = "block";

  lIcon2.style.display = "none";
  lIcon1.style.display = "block";
  rIcon2.style.display = "none";
  rIcon1.style.display = "block";
}
function clickTielu() {
  // left1.style.display = "none";
  // left2.style.display = "block";
  // right1.style.display = "none";
  // right2.style.display = "block";
  down1.style.display = "none";
  down2.style.display = "block";

  lIcon1.style.display = "none";
  lIcon2.style.display = "block";
  rIcon1.style.display = "none";
  rIcon2.style.display = "block";
}

var mySwiper1 = new Swiper("#swiper-container1", {
  loop: true, // 循环模式选项
  autoplay: true, //可选选项，自动滑动
  delay: 1000 //1秒切换一次
  // effect : 'fade',
});
var mySwiper2 = new Swiper("#swiper-container2", {

});
var mySwiper3 = new Swiper("#swiper-container3", {

});
