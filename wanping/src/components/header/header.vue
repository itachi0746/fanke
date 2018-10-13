<template>
  <!--通用头部1  开始-->
  <div>
    <section class="head" ref="head" id="head">
      <header>
        <div class="back" @click="goBack">
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
      editState: Boolean,
      a: Boolean
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
      },
      a() {
        if(this.a) {
          this.$emit('headerHeight',this.$refs.head.offsetHeight)
        }
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
//      let a = document.getElementById('head');
//
//      this.$nextTick(() => {
//        console.log(this.$refs.head.offsetHeight,a.offsetHeight);
//
//      })
//      this.$emit('headerHeight',this.$refs.head.offsetHeight)
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
