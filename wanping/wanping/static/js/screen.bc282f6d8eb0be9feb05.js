webpackJsonp([5],{"+BTi":function(t,e){},"0wTq":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("GXEp"),a("+BTi");var s=a("mtrD"),n=a.n(s),i=a("7+uW"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=a("VU/8")({name:"App",components:{}},r,!1,function(t){a("3Hl2")},null,null).exports,c=(a("e0XP"),a("tvR6"),a("UAgs"),a("2cIp")),u=a("/ocq"),d=a("x4uC"),h=a("hxP8"),l=a("R2SV"),m={data:function(){return{headName:"屏幕详情",Id:"",markDate:[],timeStampStart:"0",timeStampOver:"0",oneDay:864e5,num:1,sumNum:0,UP:null,resData:{},days:[],curDayObj:null,selected:[],itemId:0}},components:{Calendar:d.a,Header:h.a},computed:{oneMonth:function(){return 29*this.oneDay},sumPrice:function(){var t=0;return this.selected.length&&this.selected.forEach(function(e){t+=e.sumPrice}),t},curMonth:function(){if(null!==this.curDayObj)return this.curDayObj.Date.split("-")[1]},curDay:function(){if(null!==this.curDayObj)return this.curDayObj.Date.split("-")[2]}},methods:{clickDay:function(t){console.log(t),this.num=1,this.findDay(t)},changeDate:function(t){console.log(t)},clickToday:function(t){console.log(t)},addNum:function(){null!==this.curDayObj&&(this.num<this.curDayObj.Remain?this.num++:this.num)},reduceNum:function(){this.num>1?this.num--:this.num},timest:function(){var t=Date.parse(new Date),e=(t-this.oneDay).toString(),a=(t+this.oneMonth).toString();return[e=e.substr(0,10),a=a.substr(0,10)]},findDay:function(t){var e=this;this.days.forEach(function(a,s){a.Date===t&&(e.curDayObj=a)})},addSelected:function(){var t=this.isRepeated(this.curDayObj.Date);if(this.sumNum=this.num,t)t.num+=this.sumNum,t.num=t.num>this.curDayObj.Remain?this.curDayObj.Remain:t.num,t.sumPrice=t.num*t.price;else{var e={id:this.itemId,day:this.curDayObj.Date,num:this.sumNum,price:this.UP,sumPrice:this.UP*this.sumNum};this.itemId++,this.selected.push(e)}},isRepeated:function(t){for(var e=null,a=0;a<this.selected.length;a++)if(this.selected[a].day===t){e=this.selected[a];break}return e},delSelected:function(t){for(var e=parseInt(t.target.id),a=0;a<this.selected.length;a++)if(this.selected[a].id===e){this.selected.splice(a,1);break}},buy:function(){var t={name:this.resData.Name,id:this.Id,sumPrice:this.sumPrice,items:this.selected};this.$router.push({name:"OrderConfirm",params:{data:t}})},addToBasket:function(){Object(c.b)("/AddToBasket",[{psid:1,date:"2018-08-17",count:2}]).then(function(t){console.log("AddToBasket",t)})}},created:function(){var t=this,e=Object(l.a)();this.Id=e.id;var a={id:this.Id};Object(c.b)("/Detail",a).then(function(e){console.log(e),t.resData=e.Data,t.days=e.Data.DayStates,t.UP=t.days[0].Price,t.curDayObj=t.days[0]})},mounted:function(){this.timeStampStart=this.timest()[0],this.timeStampOver=this.timest()[1],console.log("screen  mounted")},beforeDestroy:function(){}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"screen-detail"},[a("Header",{attrs:{headName:t.headName}}),t._v(" "),a("div",{staticClass:"screen-data"},[a("h5",[t._v(t._s(t.resData.Name))]),t._v(" "),a("p",{staticClass:"screen-desc"},[t._v(t._s(t.resData.Desc))])]),t._v(" "),a("div",{staticClass:"calendar"},[a("Calendar",{attrs:{agoDayHide:t.timeStampStart,markDate:t.markDate,futureDayHide:t.timeStampOver},on:{choseDay:t.clickDay,changeMonth:t.changeDate}})],1),t._v(" "),a("div",{staticClass:"data-container"},[t.curDayObj?a("div",{staticClass:"data-box"},[a("p",[a("i",{staticClass:"data-spot"}),t._v(" "),a("span",{staticClass:"data-tag-font"},[t._v(t._s(t.curMonth)+"月 "+t._s(t.curDay)+"日 :  ")])]),t._v(" "),a("p",[a("span",[t._v("剩余广告位: ")]),t._v(" "),a("span",{staticClass:"AD-num"},[t._v(t._s(t.curDayObj.Remain))]),t._v(" 个\n        "),a("span",{staticClass:"right"},[a("span",[t._v("单价: ")]),t._v("\n          ¥"),a("span",{staticClass:"UP-num"},[t._v(t._s(t.curDayObj.Price))])])])]):t._e(),t._v(" "),a("div",{staticClass:"data-box"},[t._m(0),t._v(" "),t.curDayObj?a("p",{staticClass:"number"},[a("button",{class:["button","decrease",{disabled:t.num<=1}],on:{click:t.reduceNum}},[t._v("-")]),t._v(" "),a("input",{attrs:{id:"number",type:"number",readonly:"readonly"},domProps:{value:t.num}}),t._v(" "),a("button",{class:["button","increase",{disabled:t.num>=t.curDayObj.Remain}],on:{click:t.addNum}},[t._v("+")]),t._v(" "),a("el-button",{staticClass:"right",attrs:{size:"small",type:"primary",disabled:0===t.curDayObj.Remain},on:{click:t.addSelected}},[t._v("\n          添加\n        ")])],1):t._e()]),t._v(" "),a("div",{staticClass:"data-box"},[t._m(1),t._v(" "),t.selected.length?a("section",t._l(t.selected,function(e,s){return a("p",{key:e.id},[a("span",[t._v(t._s(e.day))]),t._v("\n          广告位数量:\n          "),a("span",[t._v(t._s(e.num))]),t._v(" "),a("i",{staticClass:"el-icon-close right",attrs:{id:e.id},on:{click:function(e){t.delSelected(e)}}})])})):a("section",[a("p",[t._v("暂无")])])]),t._v(" "),a("div",{staticClass:"prize-box"},[a("section",[a("span",[t._v("应付: ")]),t._v(" "),a("span",[t._v(" ¥")]),t._v(" "),a("span",{staticClass:"sum-prize"},[t._v(t._s(t.sumPrice))])])])]),t._v(" "),a("div",{staticClass:"actionBar"},[a("ul",[a("li",{staticClass:"shop-car",on:{click:t.addToBasket}},[t._v("加入购物车")]),t._v(" "),a("li",{staticClass:"buy-btn",on:{click:t.buy}},[t._v("购买")])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("i",{staticClass:"data-spot"}),this._v(" "),e("span",{staticClass:"data-tag-font"},[this._v("选择想购买的广告位数量 :")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{},[e("i",{staticClass:"data-spot"}),this._v(" "),e("span",{staticClass:"data-tag-font"},[this._v("您已选择的广告位 :")])])}]};var v=a("VU/8")(m,f,!1,function(t){a("E/b+")},"data-v-2f8459b5",null).exports,_={data:function(){return{headName:"确认订单",orderData:[]}},components:{Header:h.a},computed:{},methods:{handleOrder:function(){var t={FromBasket:!1,items:this.handleItems()};Object(c.b)("/ConfirmOrder",t).then(function(t){console.log(t)})},handleItems:function(){var t=this,e=[];return this.orderData.items.forEach(function(a,s){var n={BasketDtlId:null,PsId:t.orderData.id,Count:a.num,Date:a.day+"",Amount:a.sumPrice,Price:a.price};e.push(n)}),e}},created:function(){this.orderData=this.$route.params.data,console.log("confirm created",this.orderData)},mounted:function(){console.log("confirm mountred")},beforeDestroy:function(){}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order"},[a("Header",{attrs:{headName:t.headName}}),t._v(" "),t.orderData?a("section",{staticClass:"order-data"},[a("header",[t._v("\n      订单信息\n    ")]),t._v(" "),a("p",{staticClass:"screenName"},[t._v(t._s(t.orderData.name))]),t._v(" "),t._l(t.orderData.items,function(e){return a("ul",{key:e.id},[a("li",{staticClass:"data-container"},[a("p",{staticClass:"product-name ellipsis"},[t._v(t._s(e.day))])]),t._v(" "),a("li",{staticClass:"data-container"},[a("span",[t._v("单价")]),t._v(" "),a("span",[t._v("¥ "+t._s(e.price))])]),t._v(" "),a("li",{staticClass:"data-container"},[a("span",[t._v("数量")]),t._v(" "),a("span",[t._v("× "+t._s(e.num))])])])}),t._v(" "),a("section",{staticClass:"total-price"},[a("span",[t._v("订单总价")]),t._v(" "),a("span",[t._v("待支付 ¥"+t._s(t.orderData.sumPrice))])])],2):t._e(),t._v(" "),a("section",{staticClass:"confrim-order"},[a("p",[t._v("待支付 ¥"+t._s(t.orderData.sumPrice))]),t._v(" "),a("p",{on:{click:t.handleOrder}},[t._v("确认下单")])])],1)},staticRenderFns:[]};var y=a("VU/8")(_,p,!1,function(t){a("oapl")},"data-v-78ca3ce8",null).exports;i.default.use(u.a);var D=new u.a({routes:[{path:"/",redirect:"/Screen"},{path:"/Screen",component:v},{path:"/OrderConfirm",name:"OrderConfirm",component:y}]});i.default.config.productionTip=!1,i.default.use(c.a),i.default.use(n.a),new i.default({el:"#app",router:D,components:{App:o},template:"<App/>"})},"1kbS":function(t,e){},"2cIp":function(t,e,a){"use strict";e.b=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new n.a(function(a,s){l.post(t,e).then(function(t){a(t.data)}).catch(function(t){console.log("请求出错"),s(t)})})};var s=a("//Fk"),n=a.n(s),i=a("cwe7"),r=(a.n(i),a("+BTi")),o=(a.n(r),a("2X9z")),c=a.n(o),u=a("mtWM"),d=a.n(u),h=void 0;h="/MallService";var l=d.a.create({baseURL:h,timeout:1e4});l.interceptors.request.use(function(t){return t},function(t){return c()({showClose:!0,message:t.data,type:"error"}),n.a.reject(t)}),l.interceptors.response.use(function(t){return t.Data&&!t.Success?(c()({showClose:!0,message:"请求失败",type:"error"}),n.a.reject(t.ErrMsg)):t},function(t){return c()({showClose:!0,message:"出错啦",type:"error"}),n.a.reject(t)}),e.a={install:function(t,e){Object.defineProperty(t.prototype,"$http",{value:l})}}},"3Hl2":function(t,e){},"3XWV":function(t,e,a){"use strict";var s=a("BO1k"),n=a.n(s),i=a("d7EF"),r=a.n(i),o=a("L+XO"),c={props:{markDate:{type:Array,default:function(){return[]}},markDateMore:{type:Array,default:function(){return[]}},sundayStart:{type:Boolean,default:function(){return!1}},agoDayHide:{type:String,default:"0"},futureDayHide:{type:String,default:"2554387200"}},data:function(){return{textTop:["一","二","三","四","五","六","日"],myDate:[],list:[],historyChose:[],dateTop:"",AdData:[],_agoDayHide:"",_futureDayHide:""}},created:function(){this.intStart(),this.myDate=new Date},methods:{intStart:function(){this.sundayStart?this.textTop=["日","一","二","三","四","五","六"]:this.textTop=["一","二","三","四","五","六","日"],o.a.sundayStart=this.sundayStart},setClass:function(t){var e={};return e[t.markClassName]=t.markClassName,e},clickDay:function(t,e){"nowMonth"!==t.otherMonth||t.dayHide||this.getList(this.myDate,t.date),"nowMonth"!==t.otherMonth&&("preMonth"===t.otherMonth?this.PreMonth(t.date):this.NextMonth(t.date))},ChoseMonth:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t=o.a.dateFormat(t),this.myDate=new Date(t),this.$emit("changeMonth",o.a.dateFormat(this.myDate)),e?this.getList(this.myDate,t,e):this.getList(this.myDate)},PreMonth:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t=o.a.dateFormat(t),this.myDate=o.a.getOtherMonth(this.myDate,"preMonth"),this.$emit("changeMonth",o.a.dateFormat(this.myDate)),e?this.getList(this.myDate,t,e):this.getList(this.myDate)},NextMonth:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t=o.a.dateFormat(t),this.myDate=o.a.getOtherMonth(this.myDate,"nextMonth"),this.$emit("changeMonth",o.a.dateFormat(this.myDate)),e?this.getList(this.myDate,t,e):this.getList(this.myDate)},forMatArgs:function(){var t=this.markDate,e=this.markDateMore;return[t=t.map(function(t){return o.a.dateFormat(t)}),e=e.map(function(t){return t.date=o.a.dateFormat(t.date),t})]},getList:function(t,e){!(arguments.length>2&&void 0!==arguments[2])||arguments[2];var a=this.forMatArgs(),s=r()(a,2),i=s[0],c=s[1];this.dateTop=t.getFullYear()+"年"+(t.getMonth()+1)+"月";for(var u=o.a.getMonthList(this.myDate),d=0;d<u.length;d++){var h="",l=u[d];l.chooseDay=!1;var m=l.date,f=new Date(m).getTime()/1e3,v=!0,_=!1,p=void 0;try{for(var y,D=n()(c);!(v=(y=D.next()).done);v=!0){var g=y.value;console.log("c",g),g.date===m&&(h=g.className||"")}}catch(t){_=!0,p=t}finally{try{!v&&D.return&&D.return()}finally{if(_)throw p}}l.markClassName=h,l.isMark=i.indexOf(m)>-1,l.dayHide=f<this._agoDayHide||f>this._futureDayHide,l.isToday&&this.$emit("isToday",m);var C=!l.dayHide&&"nowMonth"===l.otherMonth;e&&e===m&&C?(this.$emit("choseDay",m),this.historyChose.push(m),l.chooseDay=!0):this.historyChose[this.historyChose.length-1]===m&&!e&&C&&(l.chooseDay=!0)}this.list=u}},mounted:function(){this.getList(this.myDate)},watch:{markDate:function(t,e){this.getList(this.myDate)},markDateMore:function(t,e){this.getList(this.myDate)},agoDayHide:function(t,e){this._agoDayHide=this.agoDayHide,this._agoDayHide=parseInt(t),this.getList(this.myDate)},futureDayHide:function(t,e){this._futureDayHide=this.futureDayHide,this._futureDayHide=parseInt(t),this.getList(this.myDate)},sundayStart:function(t,e){this.intStart(),this.getList(this.myDate)}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"wh_container"},[a("div",{staticClass:"wh_content_all"},[a("div",{staticClass:"wh_top_changge"},[a("li",{on:{click:function(e){t.PreMonth(t.myDate,!1)}}},[a("div",{staticClass:"wh_jiantou1"})]),t._v(" "),a("li",{staticClass:"wh_content_li"},[t._v(t._s(t.dateTop))]),t._v(" "),a("li",{on:{click:function(e){t.NextMonth(t.myDate,!1)}}},[a("div",{staticClass:"wh_jiantou2"})])]),t._v(" "),a("div",{staticClass:"wh_content"},t._l(t.textTop,function(e){return a("div",{staticClass:"wh_content_item"},[a("div",{staticClass:"wh_top_tag"},[t._v("\n          "+t._s(e)+"\n        ")])])})),t._v(" "),a("div",{staticClass:"wh_content"},t._l(t.list,function(e,s){return a("div",{key:s,staticClass:"wh_content_item",attrs:{_id:s}},[a("div",{staticClass:"wh_item_date",class:[{wh_isMark:e.isMark},{wh_other_dayhide:"nowMonth"!==e.otherMonth},{wh_want_dayhide:e.dayHide},{wh_isToday:e.isToday},{wh_chose_day:e.chooseDay},t.setClass(e)],on:{click:function(a){t.clickDay(e,s)}}},[t._v("\n            "+t._s(e.id)+"\n          ")])])}))])])},staticRenderFns:[]};var d=a("VU/8")(c,u,!1,function(t){a("Ldil")},null,null);e.a=d.exports},"E/b+":function(t,e){},GXEp:function(t,e){},Ldil:function(t,e){},R2SV:function(t,e,a){"use strict";e.a=function(){for(var t={},e=location.search.substring(1).split("&"),a=0;a<e.length;a++){var s=e[a].indexOf("=");if(-1!==s){var n=e[a].substring(0,s),i=e[a].substring(s+1);t[n]=decodeURIComponent(i)}}return t}},UAgs:function(t,e){var a,s,n,i,r;a=document,s=window,n=a.documentElement,i="orientationchange"in window?"orientationchange":"resize",r=function(){var t=n.clientWidth;t&&(n.style.fontSize=t/750*40+"px")},a.addEventListener&&(s.addEventListener(i,r,!1),a.addEventListener("DOMContentLoaded",r,!1))},cwe7:function(t,e){},e0XP:function(t,e){},hxP8:function(t,e,a){"use strict";var s={props:{headName:String},data:function(){return{title:this.headName}},components:{},computed:{},methods:{goBack:function(){window.history.go(-1)}},mounted:function(){},beforeDestroy:function(){}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("section",{staticClass:"head"},[e("header",[e("div",{staticClass:"back",on:{click:this.goBack}},[e("i",{staticClass:"fa fa-angle-left left"})]),this._v(" "),e("div",{staticClass:"head-font"},[e("span",[this._v(this._s(this.title))])])])])])},staticRenderFns:[]};var i=a("VU/8")(s,n,!1,function(t){a("1kbS")},"data-v-77bb81d0",null);e.a=i.exports},oapl:function(t,e){},tvR6:function(t,e){}},["0wTq"]);