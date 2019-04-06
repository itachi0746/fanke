<template>
  <div>
    <Header :headName="headName"></Header>
    <div class="line1">
      <!--<div class="line-header">退款金额</div>-->
      <!--<div class="line1-2">￥{{thePrice}}</div>-->
    </div>
    <div class="line2">
      <div class="line-header">
        退款说明
      </div>
      <div>
        <textarea v-model="theReasonText" :readonly="isReadOnly" name="退款说明" id="tuikuanshoming" cols="" rows="" placeholder="请填写退款说明"></textarea>
      </div>
    </div>
    <div class="line3">
      <el-button type="info" @click="clickSubmit">提交申请</el-button>
      <el-button type="info" @click="clickBack">返回到订单</el-button>
    </div>
    <div class="line4" v-if="false">
      <div class="line-header">
        退款进度
      </div>
      <div class="line1-2">
        {{theState}}
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '@/components/header/header.vue'
  import Loading from '../../../components/common/loading.vue'
  import {postData} from '../../../server'
  import {getUrlParms, IOSConfig} from '@/config/utils'
  import {Button,MessageBox,Message} from 'element-ui';

  export default {
    data() {
      return {
        headName: '退款',
        isLoading: false,
        textarea: '',
        thePrice: '',
        isReadOnly: false,
        theState: '审核中',
        orderId: '',// 订单id
        theReasonText: ''
      }
    },

    components: {
      Header, Loading
    },

    computed: {},

    methods: {
      clickSubmit() {
//        debugger
//        this.$router.push({name: 'state', params: {} })
        MessageBox.confirm('确定申请退款吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const data = {
            'OrderId': this.orderId,
            'reason': this.theReasonText
          };
          postData('/ApplyRebund',data).then((res)=> {
            console.log(res);
//            debugger
//            MessageBox.alert('已提交退款申请,即将返回到订单', '提示', {
//              confirmButtonText: '确定',
//              callback: () => {
//                GoToPage('order','order.html',{})
//              }
//            })
            Message({
              type: 'info',
              message: '已提交退款申请'
            });
            setTimeout(() => {
              GoToPage('order','order.html',{})
            },2000)
          });
//          debugger
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      clickBack() {
        GoToPage('order','order.html',{})
      }
    },

    created() {
      const params = getUrlParms();
      this.orderId = params.orderid;
//      this.thePrice = params.price;
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  .line-header {
    color: #444444;
    font-size: .95rem;
    padding: .5rem .5rem;
  }

  .line1-2 {
    color: #ffbb00;
    font-size: .9rem;
    padding: .5rem .5rem;
    background-color: #fff;

  }

  .line2 {
    textarea {
      width: 100%;
      height: 5rem;
      padding: .5rem;
      font-size: .8rem;
      color: #444444;

    }
  }

  .line3 {
    width: 100%;
    padding: .5rem;
    margin-top: .5rem;

    button {
      width: 100%;
      margin-top: .5rem;
      margin-left: 0;
    }

    .el-button {
      padding: .6rem 1rem;
      font-size: .75rem;
    }
  }
  .el-message-box__btns button:nth-child(2) {
    margin-left: 40px;
  }

</style>
