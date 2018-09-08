let a = new Vue(
  {
    el: '#up',
    data() {
      return {
        hasVideo: false,
        Vsrc: '',
        showpBtn: false
      };
    },
    methods: {
      preview() {
        this.hasVideo = !this.hasVideo;
        this.$refs.video.pause();
      },
      handleSuccess() {
        this.showpBtn = true;
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      },
      handleRemove(file, fileList) {
        this.showpBtn = false;

        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeUpload(file) {
        // console.log(file.type);
        const reg = /image/gi;  // 匹配image/*
        const reg2 = /video\/(mov|mp4)/gi;  // 匹配video/mov 或者 video/mp4
        const isImage = reg.test(file.type);
        const isMP4 = reg2.test(file.type);
        const fileSize = file.size / 1024 / 1024;  // 文件的大小 M
        console.log('文件大小是:'+fileSize+'M','类型是:'+file.type);

        const isLt2M = fileSize < 2;
        const isLt10M = fileSize < 10;

        if (!isImage && !isMP4) {
          this.$message({
            showClose: true,
            message: '视频或图片的格式错误',
            type: "error"
          });
          return false
        }
        if (isImage && !isLt2M) {
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 2MB!',
            type: "error"
          });
          return false

        }
        if (isMP4 && !isLt10M) {
          this.$message({
            showClose: true,
            message: '上传视频大小不能超过 10MB!',
            type: "error"
          });
          return false

        }
        return true
      },

      // beforeRemove(file, fileList) {
      //   console.log(this)
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // }
    }
  }
);

console.log(a)