<template>
  <!--  订单详情简单版 只供查看 没操作 -->
  <div>
    <Header :headName="headName" :isBack="false"></Header>

    <section class="food_list">
      <a href="javascript:void(0)" class="food_list_header">
        <div class="shop_name">
          <span>订单信息:</span>
        </div>
      </a>
      <p class="data-head">
        <span>订单编号: {{resData.OrderNo}}</span>
      </p>
      <p class="data-head">
        <span>订单日期: {{resData.OrderDate}}</span>
      </p>

      <ul class="food_list_ul">
        <li v-for="(item,index) in resData.Items" :key="item.OrderDate" class="food_list_ul_li">
          <div class="li-div">
            <div class="img-box" @click="toScreen(item.PDtlId)">
              <img :src="item.Img" alt="商品图">
            </div>
            <div class="font-box">
              <div class="food_name" @click="toScreen(item.PDtlId)">
                <p class="food_name_span">{{item.PsName}}</p>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div class="quantity_price">
                <div>
                  <span>播放日期: {{item.PlayTime}}</span>
                </div>
                <div>
                  <span>合计</span>
                  <span>¥{{item.Amount}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="up-box">
            <!--&lt;!&ndash;上传功能 :http-request="uploadReq" 开始&ndash;&gt;-->
            <!--&lt;!&ndash;data是要发送的数据&ndash;&gt;-->
            <!--<el-upload-->
              <!--ref="upload2"-->
              <!--class="upload-demo"-->
              <!--:show-file-list="false"-->
              <!--:action="upUrl"-->
              <!--:data="IDData"-->
              <!--:before-upload="beforeUpload"-->
              <!--:before-remove="handleRemove"-->
              <!--:auto-upload="true"-->
              <!--:on-error="handleError"-->
              <!--:on-success="handleSuccess">-->
              <!--<el-button slot="trigger" size="small" type="primary" @click.native="upload(index)"-->
                         <!--:loading="item.isLoading">-->
                <!--上传广告素材-->
                <!--<i class="el-icon-upload el-icon&#45;&#45;right"></i>-->
              <!--</el-button>-->

              <!--&lt;!&ndash;<el-button style="margin-left: 10px;" size="small" type="success" @click.native="submitUpload">上传到服务器</el-button>&ndash;&gt;-->
              <!--&lt;!&ndash;<div slot="tip" class="el-upload__tip">上传图片(jpg/png)文件不超过2M,视频(mp4)文件不超过10M</div>&ndash;&gt;-->

            <!--</el-upload>-->
            <!--&lt;!&ndash;上传功能  结束&ndash;&gt;-->
            <el-button type="primary" size="small" @click="showFile($event,index)" :data-DtlId="item.DtlId"
                       :loading="item.isLoading2">
              <label v-show="item.showFiles">隐藏已上传素材</label>
              <label v-show="!item.showFiles">查看已上传素材</label>
            </el-button>
          </div>
          <!--已上传文件列表 开始-->
          <section class="file-list">
            <ul>
              <li tabindex="0" v-if="item.showFiles" v-for="(i,index2) in item.Medias" :key="i.MediaId"
                  class="el-upload-list__item is-success" style="text-align: left;">
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"></i>{{i.MediaName}}
                </a>
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-circle-check"></i>
                </label>
                <!--<i class="el-icon-close" @click="handleRemove2($event,index,index2)" :data-Mid="i.MediaId"></i>-->
                <!--<i class="el-icon-close-tip">按 delete 键可删除</i>-->
              </li>
            </ul>
            <div slot="tip" class="el-upload__tip">图片(jpg/png)文件不超过10M,视频(mp4/mov)文件不超过50M</div>
          </section>
          <!--已上传文件列表 结束-->
        </li>

      </ul>

      <div class="pay_ment">{{resData.OrderStatus}}</div>

    </section>

  </div>
  <!-- 结束 -->
</template>

<script>
  import Header from '@/components/header/header.vue'
  import {getUrlParms, IOSConfig} from '@/config/utils'
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
        upUrl: '', // 上传url
        fileList: [],  // 已上传文件列表
        file: null,  // 文件对象
        curItem: null, // 当前选中的对象

      }
    },

    components: {
      Header
    },

    computed: {},

    methods: {
      toScreen(psid) {
        GoToPage("screen", "screen.html", {'pid': psid});
      },
      /**
       * @method 显示出已上传文件
       * @param {Object} e 事件对象
       * @param {Number} i 下标
       */
      showFile(e, i) {
        if (i === undefined) { // 如果不传下标,就是统一上传
          this.resData.showFiles = !this.resData.showFiles;
          if (this.resData.showFiles) {
            this.curItem = this.resData;
            this.curItem.isLoading2 = true;
            const url = '/GetFiles';
            const data = {
              'OrderId': this.resData.OrderId,
              'DetailId': '',
            };
            postData(url, data).then((res) => {
              console.log(res);
              this.resData.Medias = res.Data;
              this.curItem.isLoading2 = false;
            })
              .catch((error) => {
                console.log(error);
                this.curItem.isLoading2 = false;
                //              reject(error);
              })
          }
          return
        }
        const dtlId = e.currentTarget.getAttribute('data-DtlId');
        this.resData.Items[i].showFiles = !this.resData.Items[i].showFiles;
        if (this.resData.Items[i].showFiles) {
          this.curItem = this.resData.Items[i];
          this.curItem.isLoading2 = true;
          const url = '/GetFiles';
          const data = {
            DetailId: dtlId
          };
          postData(url, data).then((res) => {
            console.log(res);
            this.resData.Items[i].Medias = res.Data;
            this.curItem.isLoading2 = false;
          })
        }
      }
    },
    created() {
      const args = getUrlParms();
      this.OrderId = args.orderid || args.billid;

      const url = '/GetOrderDetail';
      const data = {
        OrderId: this.OrderId
      };

      postData(url, data).then((res) => {
        console.log(res);
        this.resData = res.Data;
        ['showFiles', 'isLoading', 'isLoading2', 'Medias'].map((key) => {
          let theValue = key === 'Medias' ? [] : false;
          this.$set(this.resData, key, theValue);
        });
        for (let item of this.resData.Items) {
          this.$set(item, 'showFiles', false);// 显示已上传文件列表的开关
          this.$set(item, 'isLoading', false);// 上传广告素材按钮的loading状态
          this.$set(item, 'isLoading2', false);// 查看素材按钮的loading状态
        }
      });
    },

    mounted() {
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
    .up-box {
      display: flex;
      justify-content: flex-end;
      padding: .3rem;
    }
    .data-head {
      @include fj;
      @include sc(.75rem, black);
      padding: .5rem;
    }
    .action-all {
      border-bottom: 5px solid #f5f5f5;

    }
    .up-box-all {
      display: flex;
      justify-content: flex-end;
      /*justify-content: space-between;*/
      /*padding: .3rem;*/
      padding: 16px;
    }
    .data-head:nth-child(3) {
      /*border-bottom: 5px solid #f5f5f5;*/
    }
    .food_list_ul {

      .food_list_ul_li {
        @include fj;
        flex-direction: column;
        padding: 0.5rem 0.5rem;
        /*line-height: 2rem;*/
        border-bottom: 5px solid #f5f5f5;
        .food_name {
          @include sc(.8rem, #000);
          display: flex;
          align-items: center;
          width: 100%;
          /*align-items: flex-start;*/
        }
        .food_name_span {
          /*display: inline-block;*/
          word-wrap: normal;
          /*max-width: 95%;*/
          /*flex: 1;*/
        }
        .quantity_price {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          span {
            @include sc(.6rem, #666);

          }

        }
        .li-div {
          display: flex;

        }

        .img-box {
          @include wh(4rem, 4rem);
          min-width: 4rem;
          margin-right: .5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .font-box {
          flex: 1;
          /*width: 13.5rem;*/
        }
        /*.up-box {*/
          /*display: flex;*/
          /*justify-content: space-between;*/
          /*padding: .3rem;*/
        /*}*/
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
    margin-right: .5rem;
    /*padding: .5rem;*/
    /*text-align: right;*/
    /*span {*/
    /*color: #ffffff;*/
    /*}*/

    .up-icon {
      color: $mainColor;
      font-size: .75rem;
    }
  }

  .file-list {
    background-color: #fff;
    padding: .5rem;
    text-align: right;

    .el-upload-list__item {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
    }

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

