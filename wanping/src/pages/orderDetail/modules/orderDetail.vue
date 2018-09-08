<template>
  <!--  开始-->
  <div>
    <Header :headName="headName"></Header>

    <section class="food_list">
      <a href="#" class="food_list_header">
        <div class="shop_name">
          <!--<img src="../../../assets/lm.jpg">-->
          <span>订单信息</span>
        </div>
        <!--<i class="fa fa-angle-right arrow_right"></i>-->
      </a>
      <ul class="food_list_ul">
        <p class="data-head">
          <span>订单编号: {{resData.OrderNo}}</span>
        </p>
        <p class="data-head">
          <span>日期: {{resData.OrderDate}}</span>
        </p>

        <li v-for="(item,index) in resData.Items" :key="item.PsId">
          <div class="li-div">
            <p class="food_name ellipsis">{{item.PsName}}</p>
            <div class="quantity_price">
              <span>X{{item.Total}}</span>
              <span>¥{{item.Amount}}</span>
            </div>
          </div>

          <!--已上传文件列表 开始-->
          <section class="file-list">
            <el-button type="primary" size="small" @click="showFile" :loading="btnLoading" :id="item.DtlId">{{btnTips}}</el-button>
            <section v-if="showFiles">
              <p class="file-item">
                <i class="el-icon-document"></i>
                1241414235236
              </p>
            </section>
          </section>
          <!--已上传文件列表 结束-->

          <!--上传功能action="/Fileupdate/AddFile"  开始-->
          <el-upload
            class="upload-demo"
            action="/api/AddFile"
            accept=".jpg,.png,.mp4"
            :data="data"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :on-success="handleSuccess">
            <el-button size="small" type="primary">上传素材</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!--上传功能  结束-->

        </li>

      </ul>

      <div class="pay_ment">{{resData.OrderStatus}}</div>


    </section>


  </div>
  <!-- 结束 -->
</template>

<script>
  import Header from '@/components/header/header.vue'
  import getUrlParms from '@/config/utils'
  import {postData, link} from '@/server'
  import {Message} from 'element-ui'


  export default {
    data() {
      return {
        headName: '订单详情',
        fileList3: [],
        resData: {},
        data: {},  // 上传文件时要传的data
        OrderId: '',
        showFiles: false,
        btnTips: '查看已上传素材',
        btnLoading: false
      }
    },

    components: {
      Header
    },

    computed: {},

    methods: {
//      beforeRemove(file) {
//        console.log(this)
//        return this.$confirm(`确定移除 ${ file.name }？`);
//      },

      showFile() {
        this.showFiles = !this.showFiles;
        this.btnTips = this.showFiles?'隐藏已上传素材':'查看已上传素材';
        const url = '/GetFiles';
        postData(url)  // todo 要传detailId
      },
      handleChange(file, fileList) {
//      this.fileList3 = fileList.slice(-3);
      },
      beforeUpload(file) {
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg';
        const isMP4 = file.type === 'video/mp4';
        const fileSize = file.size / 1024 / 1024;  // w文件的大小 M
        console.log(fileSize)

        const isLt2M = fileSize < 2;
        const isLt10M = fileSize < 10;

        if (!isJPG && !isMP4) {
          Message({
            showClose: true,
            message: '视频或图片的格式错误',
            type: "error"
          });
          return false
        }
        if (isJPG && !isLt2M) {
          Message({
            showClose: true,
            message: '上传图片大小不能超过 2MB!',
            type: "error"
          });
          return false

        }
        if (isMP4 && !isLt10M) {
          Message({
            showClose: true,
            message: '上传视频大小不能超过 10MB!',
            type: "error"
          });
          return false

        }
        return true
      },
      handleSuccess() {
        Message({
          showClose: true,
          message: '上传成功!',
          type: "success"
        });

      },
    },
    created() {
      const args = getUrlParms();
      this.OrderId = args.OrderId;

      const url = '/OrderDetail';
      const data = {
        OrderId: this.OrderId
      };

      postData(url, data).then((res) => {
        console.log(res)
        this.resData = res.Data;
      });
    },

    mounted() {
//      console.log(link)
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
      .data-head {
        @include fj;
        @include sc(.75rem, black);
        padding: .5rem;
      }
      .data-head:nth-child(2) {
        border-bottom: 5px solid #f5f5f5;
      }
      li {
        @include fj;
        flex-direction: column;
        /*align-items: center;*/
        padding: 0 .5rem;
        line-height: 2rem;
        border-bottom: 5px solid #f5f5f5;
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
        .li-div {
          @include fj;
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

  .file-list {
    background-color: #fff;
    padding: .5rem;

    .file-item {
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
  }
</style>
