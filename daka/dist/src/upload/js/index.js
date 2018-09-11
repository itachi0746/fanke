'use strict';

var a = new Vue({
  el: '#up',
  data: function data() {
    return {
      hasVideo: false,
      Vsrc: '',
      showpBtn: false,
      // isVideo: false
      progressVisible: false,
      progress: 0,
      uploading: false,
      timer: null
    };
  },

  methods: {
    preview: function preview() {
      this.hasVideo = !this.hasVideo;
      this.$refs.video.pause();
    },

    // handleSuccess() {
    //
    //   // this.showpBtn = this.isVideo;  // 如果是视频,展示预览btn
    //   this.$message({
    //     message: '上传成功',
    //     type: 'success'
    //   });
    // },
    // handleRemove(file, fileList) {
    //   this.showpBtn = false;
    //
    //   console.log(file, fileList);
    // },
    // // handlePreview(file) {
    // //   console.log(file);
    // // },
    // beforeUpload(file) {
    //   // console.log(file.type);
    //   const reg = /image/gi;  // 匹配image/*
    //   const reg2 = /video\/(mov|mp4)/gi;  // 匹配video/mov 或者 video/mp4
    //   const isImage = reg.test(file.type);
    //   const isMP4 = reg2.test(file.type);
    //   // this.isVideo = isMP4;
    //   const fileSize = file.size / 1024 / 1024;  // 文件的大小 M
    //   console.log('文件大小是:' + fileSize + 'M', '类型是:' + file.type);
    //
    //   const isLt2M = fileSize < 2;
    //   const isLt10M = fileSize < 10;
    //
    //   if (!isImage && !isMP4) {
    //     this.$message({
    //       showClose: true,
    //       message: '视频或图片的格式错误',
    //       type: "error"
    //     });
    //     return false
    //   }
    //   if (isImage && !isLt2M) {
    //     this.$message({
    //       showClose: true,
    //       message: '上传图片大小不能超过 2MB!',
    //       type: "error"
    //     });
    //     return false
    //
    //   }
    //   if (isMP4 && !isLt10M) {
    //     this.$message({
    //       showClose: true,
    //       message: '上传视频大小不能超过 10MB!',
    //       type: "error"
    //     });
    //     return false
    //
    //   }
    //   return true
    // },


    uploadFile: function uploadFile() {
      var _this = this;

      if (!this.uploading) {
        this.value = 0;
        this.progressVisible = true;
        this.uploading = true;
        this.timer = setInterval(function () {
          return _this.progress++;
        }, 10);
      }
    }
  },
  watch: {
    progress: function progress(val) {
      if (val >= 100) {
        this.uploading = false;
        this.progressVisible = false;
        setTimeout(function () {
          return Toast({ message: '上传成功', position: 'bottom', duration: 1000 });
        }, 200);
        clearTimeout(this.timer);
      }
    }
  }
});

// console.log(a)
//# sourceMappingURL=index.js.map