<template>
    <div style="font-size: 12px;color: #666;font-family: '微软雅黑'">
        <div class="city">
          <div class="city-wrapper city-wrapper-hook">
            <div class="scroller-hook">
              <div class="cities cities-hook" v-if="value">
                <div v-for="(i) in value">
                    <div class="title">{{i.name}}</div>
                    <ul>
                        <!--<li v-for="item in i[children]" class="item city-click" :data-name="item[label]" :data-id="item[relkey]" @touchend="touchUp(item)"  @touchstart="chooseCity()"><span class="border-1px name">{{item[label]}}</span>-->
                        <!--</li>-->
                      <li v-for="(city) in i.cities" class="item city-click" :data-name="city.tags" @click="handleClick" :data-id="city.cityid">
                        <span class="border-1px name" >{{city.name}}</span>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
            <div class="shortcut shortcut-hook" style="right: 50px;top:100px !important;" @touchstart="touchIndex">
                <ul style="width: 100px;text-align: left;padding: 20px 0">
                    <li v-for="i in value" :data-anchor="i.name" class="item">{{i.name.substr(0, 1)}}</li>
                  <!--<li class="item">a</li>-->
                </ul>
            </div>
          </div>
        </div>
    </div>
</template>
<!-- <script src="../assets/js/getping.js"></script> -->

<script>
  import listData from '../../plugins/city.js'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        value:listData,
        cityWrapper: document.querySelector('.city-wrapper-hook'),
        cityScroller: document.querySelector('.scroller-hook'),
        cities: document.querySelector('.cities-hook'),
        shortcut: document.querySelector('.shortcut-hook'),
        shortcutList: [],
        scroll: null,
        anchorMap: {},
        touch: {},
      }
    },

    components: {},

    computed: {},

    methods: {
      initCities: function () {
        let v = this
        let y = 0;
        var titleHeight = 28
        var itemHeight = 44
        v.value.forEach(function(e){
          let label = e.name.substr(0, 1)
          let len = e.cities.length
//          console.log('1',label,len)
          v.anchorMap[label] = y
          y -= titleHeight + len * itemHeight
        })
        v.shortcut = document.querySelector('.shortcut-hook')
        v.cityWrapper = document.querySelector('.city-wrapper-hook')
        v.shortcut.style.top = (v.cityWrapper.clientHeight - v.shortcut.clientHeight) / 2 + 'px';
        v.scroll = new BScroll(v.cityWrapper, {
          probeType: 3,
          click: true //better-scroll，默认它会阻止touch事件。所以在配置中需要加上click: true
        })
        v.scroll.scrollTo(0, 0);
      },
      scrollTo: function (anchor) {
        let v = this
        v.cityScroller = document.querySelector('.scroller-hook')
        var maxScrollY = v.cityWrapper.clientHeight - v.cityScroller.clientHeight
        var y = Math.min(0, Math.max(maxScrollY, v.anchorMap[anchor]))
        if (typeof y !== 'undefined') {
          v.scroll.scrollTo(0, y);
        }
      },
      touchIndex: function (e) {
        console.log(e, 'e')
        let v = this
        let anchor = e.target.getAttribute('data-anchor')
        console.log(anchor ,'anchor')
        let firstTouch = e.touches[0]
        console.log(firstTouch, 'firstTouch')
        console.log(v.touch, 'v.touch')
        v.touch.y1 = firstTouch.pageY
        v.touch.anchor = anchor
        v.scrollTo(anchor.substr(0,1))
      },
      /**
      * @method 点击城市
      */
      handleClick: function (e) {
//        console.log(1313)
        const targetName = e.currentTarget.getAttribute('data-name').split(',')[1];
        console.log(targetName)
        this.$emit('choose-city',targetName)
      }
    },

    created() {},

    mounted() {
      console.log('v:',this.value)
      this.initCities()

    },

    beforeDestroy() {}
  }
</script>
<!--<script>-->
    <!--import BScroll from 'better-scroll'-->
    <!--export default {-->
        <!--props: {-->
            <!--value: {-->
                <!--type: Array, // 数据源-->
                <!--default: []-->
            <!--},-->
            <!--label: {-->
                <!--type: String,-->
                <!--default: 'name'-->
            <!--},-->
            <!--children: {-->
                <!--type: String,-->
                <!--default: 'children'-->
            <!--},-->
            <!--relkey: {-->
                <!--type: String,-->
                <!--default: 'id'-->
            <!--}-->
        <!--},-->
        <!--data () {-->
            <!--return {-->
                <!--cityWrapper: document.querySelector('.city-wrapper-hook'),-->
                <!--cityScroller: document.querySelector('.scroller-hook'),-->
                <!--cities: document.querySelector('.cities-hook'),-->
                <!--shortcut: document.querySelector('.shortcut-hook'),-->
                <!--shortcutList: [],-->
                <!--scroll: null,-->
                <!--anchorMap: {},-->
                <!--touch: {},-->
            <!--}-->
        <!--},-->
        <!--mounted () {-->
            <!--this.initCities()-->
        <!--},-->
        <!--methods: {-->
            <!--chooseCity (city) {-->
                <!--let v = this-->
                <!--v.countTime = 0-->
                <!--v.countTimer = setInterval(function(e){v.countTime ++},1)-->
            <!--},-->
            <!--touchUp (item) {-->
                <!--let v = this-->
                <!--clearInterval(v.countTimer)-->
                <!--this.$emit('click', item)-->
                <!--// if (v.countTime < 30) {-->
                <!--//     this.isShowCitys = false-->
                <!--//     // this.location = item[v.label]-->
                <!--//     // this.submit.area_code = item[v.relkey]-->
                <!--// }-->
            <!--},-->

            <!--initCities: function () {-->
                <!--let v = this-->
                <!--let y = 0;-->
                  <!--var titleHeight = 28-->
                  <!--var itemHeight = 44-->
                  <!--v.value.forEach(function(e){-->
                        <!--let label = e[v.label].substr(0, 1)-->
                        <!--let len = e[v.children].length-->
                        <!--v.anchorMap[label] = y-->
                        <!--y -= titleHeight + len * itemHeight-->
                  <!--})-->
                  <!--v.shortcut = document.querySelector('.shortcut-hook')-->
                  <!--v.cityWrapper = document.querySelector('.city-wrapper-hook')-->
                  <!--v.shortcut.style.top = (v.cityWrapper.clientHeight - v.shortcut.clientHeight) / 2 + 'px';-->
                  <!--v.scroll = new BScroll(v.cityWrapper, {-->
                    <!--probeType: 3-->
                  <!--})-->
                  <!--v.scroll.scrollTo(0, 0);-->
            <!--},-->
            <!--touchIndex: function (e) {-->
                <!--console.log(e, 'e')-->
                <!--let v = this-->
                <!--let anchor = e.target.getAttribute('data-anchor')-->
                <!--console.log(anchor ,'anchor')-->
                <!--let firstTouch = e.touches[0]-->
                <!--console.log(firstTouch, 'firstTouch')-->
                <!--console.log(v.touch, 'v.touch')-->
                <!--v.touch.y1 = firstTouch.pageY-->
                <!--v.touch.anchor = anchor-->
                <!--v.scrollTo(anchor.substr(0,1))-->
            <!--},-->
            <!--scrollTo: function (anchor) {-->
                <!--let v = this-->
                <!--v.cityScroller = document.querySelector('.scroller-hook')-->
                <!--var maxScrollY = v.cityWrapper.clientHeight - v.cityScroller.clientHeight-->
                <!--var y = Math.min(0, Math.max(maxScrollY, v.anchorMap[anchor]))-->
                <!--if (typeof y !== 'undefined') {-->
                    <!--v.scroll.scrollTo(0, y);-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
<style scoped>
    .mycity {
        text-align: center;
        font-size: 12px;
        margin: 20px 0;
    }
    .list-box {
        padding: 0 43px;
    }
    .list-item {
        height: 43px;
        line-height: 42px;
        border-bottom: 1px solid #ECECEC;
        text-align: center;
    }
    .item {
        list-style: none !important;
    }
    .list-item input {
        border:none;
        text-align: center;
        outline: none;
    }
    .small-icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
    .city {
        display: block;
    }
    .city .city-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 100;
        background-color: #FFF
    }
    .city .city-wrapper .cities .title {
        height: 28px;
        padding-left: 16px;
        line-height: 28px;
        background-color: #f5f5f5;
        font-family: Helvetica;
        font-size: 16px;
        color: #878787;
    }
    .city .city-wrapper .cities .item {
        height: 44px;
        padding: 0 16px;
        line-height: 44px;
        font-size: 14px;
        color: #333
    }
    .city .city-wrapper .cities .item .name {
        display: block;
        position: relative;
    }
    .city .city-wrapper .cities .item .name:before,
    .city .city-wrapper .cities .item .name:after {
        display: block;
        position: absolute;
        border-top: 1px solid #e5e5e5;
        left: 0;
        width: 100%;
        content: ' ';
    }
    .city .city-wrapper .cities .item .name:before {
        display: none;
        top: 0;
    }
    .city .city-wrapper .cities .item .name:after {
        display: block;
        bottom: 0;
    }
    .city .city-wrapper .cities .item:active {
        background-color: #f0f0f0;
    }
    .city .city-wrapper .cities .item:last-child .name:after {
        display: none;
    }
    .city .city-wrapper .shortcut {
        position: absolute;
        z-index: 30;
        width: 40px;
        right: 0;
        font-family: Helvetica;
    }
    .city .city-wrapper .shortcut .item {
        height: 12px;
        padding-top: 6px;
        padding-left: 24px;
        text-align: center;
        font-size: 14px;
        color: #fa8919;
    }
    @media only screen and (max-height: 600px) {
        .city .city-wrapper .shortcut .item {
            padding-top: 3px;
        }
    }
    .cities .cities-hook> div {
        width: 70%;
    }
</style>
