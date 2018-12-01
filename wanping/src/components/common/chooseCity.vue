<template>
  <!--  开始-->
  <div>
    <w-sortlist v-model="listData" @click="" @click2="select" children="cities" relkey="core" label="name"></w-sortlist>

  </div>
  <!--  结束-->
</template>

<script>
  import listData from '../../plugins/city.js'
  import wSortlist from 'wenlist'

  export default {
    name: 'wSortListDemoVue',
    components: {
      wSortlist
    },
    data() {
      return {
        listData: listData
      }
    },
    methods: {
      select(data) {
        console.log(data, 'data')
//        this.$emit('hide-city')
      },
      handleClick() {
        console.log('fu:',event)
        console.log(123141)
      }
    },

    computed: {},

    created() {},

    mounted() {},

    beforeDestroy() {}
  }
</script>

<style lang='scss' scoped>

</style>
