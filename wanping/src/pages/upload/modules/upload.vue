<template>
  <!--  开始-->
  <div>
    <Header :headName="headName"></Header>
    <el-upload
      class="upload-demo"
      action="/Fileupdate/AddFile"
      accept=".jpg,.png,.mp4"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError(err)"
      :file-list="fileList3">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
  <!--  结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'
  //  action="https://jsonplaceholder.typicode.com/posts/"
  export default {
    data() {
      return {
        headName: '上传素材',
        fileList3: []
      }
    },

    components: {
      Header
    },

    computed: {},

    methods: {
      handleChange(file, fileList) {
//      this.fileList3 = fileList.slice(-3);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleSuccess() {
        console.log('上传成功')
      },
      handleError(err) {
        console.log(err)
      }

    },

    created() {
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

</style>
