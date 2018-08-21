<template>
  <!--  开始-->
  <div>
    <Header :headName="headName"></Header>

    <section class="food_list">
      <a href="#" class="food_list_header">
        <div class="shop_name">
          <img src="../../../assets/lm.jpg">
          <span>订单信息</span>
        </div>
        <i class="fa fa-angle-right arrow_right"></i>
      </a>
      <ul class="food_list_ul">
        <li>
          <p class="food_name ellipsis">广告信息</p>
          <div class="quantity_price">
            <span>X1</span>
            <span>¥20</span>
          </div>
        </li>
      </ul>

      <div class="pay_ment">实付9725.00 </div>
        <!--上传功能  开始-->
        <el-upload
          class="upload-demo"
          action="/Fileupdate/AddFile"
          accept=".jpg,.png"
          :data="data"
          :on-change="handleChange"
          :on-success="handleSuccess">
          <el-button size="small" type="primary">上传图片素材</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!--上传功能  结束-->

    </section>
  </div>
  <!--  结束-->
</template>

<script>
  import Header from '@/components/header/header.vue'

  export default {
    data() {
      return {
        headName: '订单详情',
        fileList3: [],
        data: {}
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
      }
    },

    mounted() {
      this.data = {
        OrderId: '1',
        DetailId: '1'
      }
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .food_list {
    background-color: #fff;
    margin-bottom: .5rem;
    .food_list_header {
      @include fj;
      align-items: center;
      padding: .2rem .5rem;
      border-bottom: 1px solid #f5f5f5;
      .shop_name {
        img {
          @include wh(1.2rem, 1.2rem);
          vertical-align: middle;
          margin-right: .2rem;
        }
        span {
          @include sc(.75rem, #333);
          font-weight: bold;
        }
      }
      svg {
        @include wh(.6rem, .6rem);
        fill: #666;
      }
    }
    .food_list_ul {
      li {
        @include fj;
        align-items: center;
        padding: 0 .5rem;
        line-height: 2rem;
        .food_name {
          @include sc(.6rem, #666);
          flex: 4;
        }
        .quantity_price {
          flex: 1;
          @include fj;
          align-items: center;
          span:nth-of-type(1) {
            @include sc(.6rem, #ccc);
          }
          span:nth-of-type(2) {
            @include sc(.6rem, #666);
          }
        }
      }
    }
    .deliver_fee {
      @include fj;
      align-items: center;
      padding: 0 .5rem;
      line-height: 2rem;
      border-top: 1px solid #f5f5f5;
      span {
        @include sc(.6rem, #666);
      }
    }
    .pay_ment {
      @include sc(.6rem, #fb6b23);
      border-top: 1px solid #f5f5f5;
      font-weight: bold;
      line-height: 2rem;
      text-align: right;
      padding-right: .5rem;
    }
  }
  .upload-demo {
    padding: .5rem;
    /*text-align: right;*/
    span {
      color: #ffffff;
    }
  }
</style>
