<template>
  <div>
    <Header :headName="headName"></Header>
    <div class="line1">
      <div class="line-header">退款金额</div>
      <div class="line1-2">￥{{thePrice}}</div>
    </div>
    <div class="line4" v-if="true">
      <div class="line-header">
        退款进度
      </div>
      <div class="line1-2">
        {{theState}}
      </div>
    </div>
    <div class="line3">
      <!--<el-button type="info" @click="clickSubmit">提交申请</el-button>-->
      <el-button type="info" @click="clickBack">返回到订单</el-button>
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
        headName: '退款详情',
        isLoading: false,
        thePrice: '',
        theState: '',
        orderId: ''
      }
    },

    components: {
      Header, Loading
    },

    computed: {},

    methods: {

      clickBack() {
        GoToPage('order','order.html',{})
      }
    },

    created() {
      let params = getUrlParms();
      this.orderId = params.orderid;
      const data = {
        'orderId': this.orderId
      };
      postData('/GetOrderRebund',data).then((res)=> {
        console.log(res);
        this.theState = res.Data.StatusText;
        this.thePrice = res.Data.Price;
      })
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


</style>
