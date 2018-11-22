var gaosu = document.getElementById("gaosu");
var tielu = document.getElementById("tielu");
var left1 = document.getElementById("left1");
var left2 = document.getElementById("left2");
var right1 = document.getElementById("right1");
var right2 = document.getElementById("right2");
var down1 = document.getElementById("down1");
var down2 = document.getElementById("down2");

var lIcon1 = document.getElementById("l-icon");
var rIcon1 = document.getElementById("r-icon");

var input = document.getElementById('input');
var lImg = document.getElementById('l-img');
var lImgTop = 0;

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


// console.log(lIcon1);

function clickGaosu() {
console.log(lIcon1);

  down2.style.display = "none";
  down1.style.display = "block";

  // lIcon1.style.background = "../img/car.png";
  lIcon1.style.background = 'url("img/car.png")';

  // rIcon1.style.display = "block";
}
function clickTielu() {

  down1.style.display = "none";
  down2.style.display = "block";

  // lIcon1.style.background = "../img/train2.png";
  lIcon1.style.background = 'url("img/train2.png")';

  // rIcon1.style.display = "none";
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
var left_down_showicon = document.getElementById("left_down_showicon");
// setInterval(function() {

//   if(lImgTop>=-7830) {
//     lImgTop-=270;
//   } else {
//     lImgTop = 0;
//   }
//   // left_down_showicon.style.backgroundPositionX=0+"px";
//   // left_down_showicon.style.backgroundPositionY=lImgTop+"px";

//   lImg.style.top = lImgTop + 'px';
//   // debugger

// }, 70);