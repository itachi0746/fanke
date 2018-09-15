var btn = $('.UpBtn'),
  video = $('#video'),
  Vbox = $('#Vbox'),
  preBtn = $('#preBtn');
  JF = document.getElementById('j-file');

var src = '',
// var sourceDom = $('<source src="' + src + '">');
sourceDom = null;


Vbox.on('click',function () {  
  Vbox.toggleClass('hide');
});

video.on('click',function (event) {  
  event.stopPropagation();
});

preBtn.on('click',function () {  
  Vbox.toggleClass('hide');
});


// 按钮点击变色
btn.on('touchstart', function() {
  $(this).css('background', '#27628e');
});
btn.on('touchend', function() {
  $(this).css('background', '#26a2ff');
  JF.click();
});

var upload1 = new mbUploadify({
  file: JF,
  /*ajax 上传地址*/
  url: '/api/MallService/AddFile',
  type: 'video',
  //上传最多个数
  maximum: 1,
  //文件大小 5M
  size: 1024 * 1024 * 10,
  //错误提示信息!
  message: {
    type: '类型不对!',
    size: '文件太大了~',
    maximum: '上传文件数量太多!',
    same: '不能上传相同的文件!',
    other: '其它网络错误!'
  },
  load: function(e) {
    console.log('laoding', e);
    // document.getElementById('preview1').innerHTML += '<img src="' + e.target.result + '">';
  },
  /*上传失败*/
  error: function(file, msg) {
    // document.getElementById('msg1').innerHTML = msg;
    //信息框
    layer.open({
      content: msg,
      btn: '我知道了',
      time: 3
    });
    console.log(file, msg);
    console.log('上传失败');
  },
  /*ajax上传成功*/
  uploadSuccess: function(res) {
    console.log('上传成功');
    console.log(res);
    console.log(JF.files[0]);

    src = res;  // 文件地址
    sourceDom = $('<source src="' + src + '">');
    video.append(sourceDom);
    // Vbox.toggleClass('hide');
    preBtn.removeClass('hide');
    //信息框
    layer.open({
      content: '上传成功!',
      btn: '我知道了',
      time: 3
    });
  },
  //上传中止

  abort: function() {},
  //上传开始
  loadstart: function() {},
  //上传进度
  progress: function(file) {
    console.log('pro',file.target)
    // var percent = Math.round(e.loaded * 100 / e.total);
    // console.log(percent)
  },
  //上传完成，不管成功失败
  loadend: function() {},
  //ajax上传失败
  uploadFailed: function() {},
  //ajax上传完成
  uploadComplete: function() {}
});

