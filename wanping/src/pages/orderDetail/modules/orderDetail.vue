<template>
  <!--  开始-->
  <div>
    <Header :headName="headName"></Header>

    <section class="food_list">
      <a href="#" class="food_list_header">
        <div class="shop_name">
          <span>订单信息</span>
        </div>
      </a>
      <p class="data-head">
        <span>订单编号: {{resData.OrderNo}}</span>
      </p>
      <p class="data-head">
        <span>日期: {{resData.OrderDate}}</span>
      </p>

      <ul class="food_list_ul">
        <li v-for="(item,index) in resData.Items" :key="item.PsId" class="food_list_ul_li">
          <div class="li-div">
            <p class="food_name ellipsis">{{item.PsName}}</p>
            <div class="quantity_price">
              <span>X{{item.Total}}</span>
              <span>¥{{item.Amount}}</span>
            </div>
          </div>

          <!--已上传文件列表 开始-->
          <section class="file-list">
            <el-button type="primary" size="small" @click="showFile($event,index)" :data-DtlId="item.DtlId">
              <label v-show="item.showFiles">隐藏已上传素材</label>
              <label v-show="!item.showFiles">查看已上传素材</label>
            </el-button>
            <ul>
              <li tabindex="0" v-show="item.showFiles" v-for="(i,index2) in fileList" :key="i.MediaId"
                  class="el-upload-list__item is-success" style="text-align: left;">
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"></i>{{i.MediaName}}
                </a>
                <label class="el-upload-list__item-status-label"><i
                  class="el-icon-upload-success el-icon-circle-check"></i></label>
                <i class="el-icon-close" @click="handleRemove2($event,index2)" :data-Mid="i.MediaId"></i>
                <i class="el-icon-close-tip">按 delete 键可删除</i>
              </li>
            </ul>
          </section>
          <!--已上传文件列表 结束-->

          <!--上传功能 :http-request="uploadReq" 开始-->
          <!--data是要发送的数据-->
          <el-upload
            ref="upload2"
            class="upload-demo"
            :action="upUrl"
            :data="IDData"
            :before-upload="beforeUpload"
            :before-remove="handleRemove"
            :auto-upload="true"
            :on-error="handleError"
            :on-success="handleSuccess">
            <el-button slot="trigger" size="small" type="primary" @click.native="upload(index)">上传素材</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click.native="submitUpload">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip">上传图片(jpg/png)文件不超过2M,视频(mp4)文件不超过10M</div>
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
  import {Message, MessageBox} from 'element-ui'

  export default {
    data() {
      return {
        headName: '订单详情',
        resData: {},
        IDData: {},  // 上传文件时要传的data
        OrderId: '',
        DtlId: '',
        fid: '',
        upUrl: '', // 上传url
        fileList: []  // 已上传文件列表
      }
    },

    components: {
      Header
    },

    computed: {},

    methods: {
      uploadReq(req) {
        console.log(req);
        let formData = new FormData();
        formData.append('file', req.file);
        formData.append('OrderId', this.OrderId);
        formData.append('DtlId', this.OrderId);

        postData('/AddFile', formData).then((res) => {
          console.log(res)
          if (res.Success) {
            this.fid = res.Data;
            console.log(111122);
            Message({
              showClose: true,
              message: '上传成功!',
              type: "success"
            });
          }
        })
      },
      /**
       * @method 删除已上传文件
       * @param {Object} e 事件对象
       * @param {String} index 下标
       */
      handleRemove2(e, index) {
        const mid = e.currentTarget.getAttribute('data-Mid');
        const url = '/DeleteFile';
        const data = {
          FileId: mid
        };
        postData(url, data).then((res) => {
          console.log(res);

          if (res.Success) {
            this.fileList.splice(index, 1);

            Message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      },
      /**
       * @method 获取明细id
       * @param {String} i index
       */
      upload(i) {
        this.DtlId = this.resData.Items[i].DtlId;
        this.IDData = {
          'OrderId': this.resData.OrderId,
          'DetailId': this.DtlId
        };
      },
      /**
       * @method 删除前的操作
       */
//      beforeRemove(file) {
////        debugger
//        MessageBox.confirm(`确定移除 ${ file.name }？`, '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning',
//          center: true
//        }).then(() => {
//          this.handleRemove();  // todo 传参
//          return true
//        }).catch(() => {
//          Message({
//            type: 'info',
//            message: '已取消删除'
//          });
//          return false
//        });
//        return false  // 阻止删除
//
//      },

      /**
       * @method 删除文件
       * @param {String} file 文件对象
       */
      async handleRemove(file,fileList) {
//        debugger
        let a = null;
        if (file.status === 'success') {  // 状态为success表示这是已经上传成功的文件,因为上传格式错误的文件也会自动调用这个方法
//          const url = '/DeleteFile';
//          const data = {
//            FileId: this.fid
//          };
//
//          postData(url, data).then((res) => {
//            console.log(res);
//            if(res.Success) {
//              Message({
//                type: 'success',
//                message: '删除成功!'
//              });
//            } else {
//              Message({
//                type: 'error',
//                message: '删除失败!'
//              });
//              return Promise.reject('test');
//            }
//          });

          await MessageBox.confirm(`确定移除 ${ file.name }？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const url = '/DeleteFile';
            const data = {
              FileId: this.fid
            };
            postData(url, data).then((res) => {
              console.log(res);
              Message({
                type: 'success',
                message: '删除成功!'
              });
              a = true
//              return true
            });
          }).catch((e) => {
            console.log(e)
            Message({
              type: 'info',
              message: '已取消删除'
            });
            a = false
//            return false
          });
        }
      },

      /**
       * @method 显示出已上传文件
       * @param {Object} e 事件对象
       * @param {Number} i 下标
       */
      showFile(e, i) {
        const dtlId = e.currentTarget.getAttribute('data-DtlId');
//        console.log(dtlId);
        this.resData.Items[i].showFiles = !this.resData.Items[i].showFiles;
//        this.showFiles = !this.showFiles;
        this.btnTips = this.resData.Items[i].showFiles ? '隐藏已上传素材' : '查看已上传素材';
        if (this.resData.Items[i].showFiles) {
          const url = '/GetFiles';
          const data = {
            DetailId: dtlId
          };
          postData(url, data).then((res) => {
            console.log(res)
            this.fileList = res.Data
          })
        }

      },
      handleChange(file, fileList) {
//      this.fileList3 = fileList.slice(-3);
      },
      beforeUpload(file) {
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isMP4 = file.type === 'video/mp4';
        const fileSize = file.size / 1024 / 1024;  // w文件的大小 M
        console.log(fileSize)

        const isLt2M = fileSize < 2;
        const isLt10M = fileSize < 10;

        if (!isJPG && !isMP4 && !isPNG) {
          Message({
            showClose: true,
            message: '视频或图片的格式错误',
            type: "error"
          });
          return false
        }
        if ((isJPG || isPNG) && !isLt2M) {
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
      handleSuccess(res, file, fileList) {
//        console.log(res, file, fileList)
        if (res.Success) {
          console.log('上传成功');
          this.fid = res.Data;
          Message({
            showClose: true,
            message: '上传成功!',
            type: "success"
          });
        } else {
          fileList.splice(0, 1);
          console.log('上传失败');
          Message({
            showClose: true,
            message: '上传失败,请重试',
            type: "error"
          });
        }

      },
      // 上传错误
      handleError(response, file, fileList) {
        console.log('上传失败，请重试！');
        Message({
          showClose: true,
          message: '上传失败,请重试',
          type: "error"
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
        console.log(res);
        this.resData = res.Data;
        this.resData.Items.forEach((item) => {
          this.$set(item, 'showFiles', false);
        })
      });
    },

    mounted() {
      // 环境的切换
//      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'development') {
        this.upUrl = "/api/AddFile"
      } else {
        //生产环境下的地址
        this.upUrl = "/MallService/AddFile";
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
    .data-head {
      @include fj;
      @include sc(.75rem, black);
      padding: .5rem;
    }
    .data-head:nth-child(3) {
      border-bottom: 5px solid #f5f5f5;
    }
    .food_list_ul {

      .food_list_ul_li {
        @include fj;
        flex-direction: column;
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
    text-align: right;
    span {
      color: #ffffff;
    }
  }

  .file-list {
    background-color: #fff;
    padding: .5rem;
    text-align: right;

    .file-item {
      text-align: left;
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

  .el-upload__tip {
    text-align: right;
  }


</style>
<style>
  .el-message-box {
    width: 90%;
  }

  .el-upload-list__item {
    text-align: left;
  }

  .el-icon-close-tip {
    display: none !important;
  }
</style>
