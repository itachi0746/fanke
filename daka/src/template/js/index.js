
onload = function () {
  var pBtn = document.getElementById('pBtn'),
    pBtn2 = document.getElementById('pBtn2'),
    vbox = document.getElementById('vbox'),
    abox = document.getElementById('abox'),
    audio = document.getElementById('audio');

  audio.onended = function () {
    // alert('end')
    pBtn2.classList.add('hide');
    pBtn.classList.remove('hide');

  }


  pBtn.onclick = function () {
    audio.play();
    pBtn2.classList.remove('hide');
    this.classList.add('hide');
  };

  pBtn2.onclick = function () {
    audio.pause();
    pBtn.classList.remove('hide');
    this.classList.add('hide');

  };

};


