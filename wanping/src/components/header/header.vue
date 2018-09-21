<template>
  <!--通用头部1  开始-->
  <div>
    <section class="head">
      <header>
        <div class="back" @click="goBack">
          <!--<i class="fa fa-angle-left left"></i>-->
          <i class="icon iconfont icon-zuojiantou"></i>
        </div>
        <div class="head-font">
          <span>{{ title }}</span>
        </div>
        <div class="edit">
          <div v-if="this.headName==='购物车'" @click="handleEdit">
            <span v-show="!this.isEdit">编辑</span>
            <span v-show="this.isEdit">完成</span>
          </div>
        </div>

      </header>
    </section>
  </div>
  <!--通用头部1  结束-->
</template>

<script>

  export default {
    props: {
      headName: String,
      editState: Boolean
    },
    data() {
      return {
        title: this.headName,
        isEdit: this.editState
      }
    },
    watch: {
      editState() {
        this.isEdit = this.editState
      }
    },

    components: {},

    computed: {},

    methods: {
      goBack() {
        window.history.go(-1)
      },
      handleEdit() {
        this.isEdit = !this.isEdit;
        this.$emit('onEdit')
      }
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang='scss' scoped>
  @import "src/style/mixin";

  .head {
    width: 100%;

    header {
      width: 100%;
      padding: .3rem .5rem;
      border-bottom: 0.05rem solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $blue;

      .back {
        overflow: hidden;
        flex: 1;
      }
      .head-font {
        flex: 3;
        color: #fff;
        text-align: center;

        span {
          font-weight: bold;
          color: #fff;
        }
      }
      .edit {
        flex: 1;
        font-size: .7rem;
        text-align: right;
        span {
          color: #666666;
        }
      }
    }

    i {
      font-size: 1rem;
      color: #fff;
    }
  }
</style>
