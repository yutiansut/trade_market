webpackJsonp([1],{"/L99":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("KH7x"),o=n.n(a),s=n("lC5x"),r=n.n(s),i=n("J0Oq"),c=n.n(i),l=n("rVsN"),u=n.n(l),d=n("NLrs"),v=n("QPSP"),f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"coin-slide h-full overflow-y"},[n("van-tabs",{attrs:{color:"#b72026","line-width":"30"},on:{click:t.onClick},model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},t._l(t.Store.state.mainCoin,function(t,e){return n("van-tab",{key:e,attrs:{title:t.coinid}})}),1),t._v(" "),n("div",{staticClass:"coin-list"},t._l(t.Store.state.tradeCoin,function(e,a){return n("div",{key:a,on:{click:function(n){n.stopPropagation(),t.onRowClick(e)}}},[n("van-row",{staticClass:"h-50 flex flex-v-center"},[n("van-col",{staticClass:"font-14 font-bold",attrs:{span:"8"},domProps:{textContent:t._s(e.coinid)}}),t._v(" "),n("van-col",{staticClass:"font-14",class:e.rise>0?"color-danger":"color-success",attrs:{span:"8"},domProps:{textContent:t._s(1*e.number)}}),t._v(" "),n("van-col",{staticClass:"font-14 txt-rt",class:e.rise>0?"color-danger":"color-success",attrs:{span:"8"},domProps:{textContent:t._s(1*e.rise+"%")}})],1)],1)}),0)],1)},staticRenderFns:[]};var p=n("C7Lr")({name:"trade-aside",data:function(){return{tabActive:0}},methods:{onRowClick:function(t){this.$emit("onRowClick",t)},onClick:function(t,e){this.$emit("onTabClick",e)}}},f,!1,function(t){n("ZbvV")},"data-v-eb63fa08",null).exports,b=n("i7Lb"),m=n("qM28"),_=n("XJyL"),h=null,C=!0,x=null;window.onbeforeunload=function(){h&&h.close()};var y={components:{appHeader:d.a,slidePop:v.a,tradeAside:p},mixins:[b.a,b.b],data:function(){return{type:0,number:"",price:"",balance:0,available:0,numLevel:0,fastInputNum:[{label:"25%",val:.25},{label:"50%",val:.5},{label:"75%",val:.75},{label:"100%",val:1}],tabActive:0,currentEntrust:[],entrustRecord:[],coinInfo:{},SellOrder:[],BuyOrder:[],init:!1}},mounted:function(){var t=this,e=this.$route.query,n=e.maincoinid,a=e.tradecoinid;n&&a?this.getCoinData().then(function(e){return t.getTradeCoin(n,a)}).then(function(){t.loadData(n,a),t.liveUpdate()}):this.getCoinData().then(function(e){try{return t.getTradeCoin(e[0].coinid)}catch(t){console.log(t)}}).then(function(){t.loadData(t.Store.state.maincoinid,t.Store.state.tradecoinid),t.liveUpdate()}),this.init=!0},destroyed:function(){x&&clearInterval(x)},computed:{total:function(){return""+(this.number*this.price).toFixed(2)},coins:function(){if(this.Store.state.tradecoinid&&this.Store.state.maincoinid)return this.Store.state.tradecoinid+"/"+this.Store.state.maincoinid},availableLabel:function(){return 1==this.type?"可兑换："+(1*this.available||0)+"&nbsp;"+(this.Store.state.tradecoinid||""):"可用："+(1*this.balance||0)+"&nbsp;"+(this.Store.state.maincoinid||"")},buyListTotal:function(){var t=0;return this.BuyOrder.map(function(e){t+=e.price*e.number}),t},sellListTotal:function(){var t=0;return this.SellOrder.map(function(e){t+=e.price*e.number}),t}},methods:{validate:function(){return 0!=this.total&&!isNaN(this.total)||(this.$toast({message:"价格或者数量不合法"}),!1)},cancelOrder:function(t){var e=this,n=t.id;t.price,t.number;n&&Object(_.n)(n).then(function(n){Object(_.q)(e.Store.state.maincoinid,e.Store.state.tradecoinid).then(function(t){e.currentEntrust=t}),0==t.type?e.balance=1*e.balance+Math.round(t.price*t.number):e.available=1*e.available+t.number,e.liveUpdate()})},loadData:function(t,e){var n=this;Object(_.q)(t,e).then(function(t){t&&(n.currentEntrust=t)}),Object(_.s)(t,e).then(function(t){t&&(n.entrustRecord=t)}),Object(_.y)(t,e).then(function(t){n.coinInfo=t}),Object(_.O)(t,e).then(function(t){try{n.SellOrder=Object(m.c)(t,"price","number")}catch(t){console.log(t)}}),Object(_.w)(t,e).then(function(t){try{n.BuyOrder=Object(m.c)(t,"price","number")}catch(t){console.log(t)}}),u.a.all([this.getAvailable(t),this.getAvailable(e)]).then(function(t){try{n.available=t[1].usable,n.balance=t[0].usable}catch(t){console.log(t)}})},liveUpdate:function(){var t=this.Store.state,e=t.maincoinid,n=t.tradecoinid;"WebSocket"in window?this.updateDataBySocket(e,n):this.updateDataByAjax(e,n)},updateDataByAjax:function(t,e){var n=this;try{x&&clearInterval(x),x=setInterval(function(){C&&(C=!1,Object(_.O)(t,e).then(function(t){n.sellOrder=Object(m.c)(t,"price","number")}),Object(_.w)(t,e).then(function(t){n.buyOrder=Object(m.c)(t,"price","number")}),Object(_.y)(t,e).then(function(t){n.coinInfo=t,C=!0}))},3e3)}catch(t){console.log(t)}},updateDataBySocket:function(t,e){var n=this,a=(this.storage.get("token")||Object(m.b)(32))+"/"+t+"_"+e;if(h)try{return void h.send(t+"_"+e)}catch(t){console.log(t)}try{(h=new WebSocket(this.api.socketUrl+a)).onopen=function(){console.log("socket 已经连接，可以发送数据"),h.send(t+"_"+e)},h.onmessage=function(t){var e=JSON.parse(t.data);n.BuyOrder=Object(m.c)(e.buy,"price","number"),n.SellOrder=Object(m.c)(e.sell,"price","number")},h.onerror=function(a){console.log("socket 链接错误"),h=null,x&&clearInterval(n.timer),n.updateDataByAjax(t,e)},h.onclose=function(){console.log("socket 连接关闭")}}catch(t){console.log(t)}},OrderClick:function(t){this.number=1*t.number,this.price=1*t.price},resetForm:function(){this.number="",this.price=""},toggleType:function(t){this.type=t},onTabClick:function(t){t&&this.getTradeCoin(t)},onRowClick:function(t){var e=t.maincoinid,n=t.coinid;this.Store.commit("updateMainCoinid",e),this.Store.commit("updateTradeCoinid",n),this.showPop=!1},forBuy:function(){var t=this;return c()(r.a.mark(function e(){var n,a,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.validate()){e.next=11;break}return n=t.Store.state,a=n.maincoinid,o=n.tradecoinid,e.next=4,Object(_._7)(t.api.forbuy,{prise:t.price,number:t.number,maincoin:a,tradcoin:o});case 4:if(!e.sent){e.next=10;break}return e.next=8,Object(_.q)(a,o);case 8:t.currentEntrust=e.sent,t.balance=1*t.balance-t.total;case 10:h&&h.send(a+"_"+o);case 11:case"end":return e.stop()}},e,t)}))()},forSell:function(){var t=this;return c()(r.a.mark(function e(){var n,a,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.validate()){e.next=11;break}return n=t.Store.state,a=n.maincoinid,o=n.tradecoinid,e.next=4,Object(_._7)(t.api.forsell,{prise:t.price,number:t.number,maincoin:a,tradcoin:o});case 4:if(!e.sent){e.next=10;break}return t.available=t.available-t.number,e.next=9,Object(_.q)(a,o);case 9:t.currentEntrust=e.sent;case 10:h&&h.send(a+"_"+o);case 11:case"end":return e.stop()}},e,t)}))()},getNum:function(t){this.numLevel=t,this.number=Math.round(this.number*t)}},watch:{coins:function(t){if(!this.init){var e=t.split("/"),n=o()(e,2),a=n[0],s=n[1];this.loadData(s,a)}this.init=!1}}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wh-full overflow-y app-body"},[n("slide-pop",{attrs:{showPop:t.showPop},on:{onClose:t.slideClose}},[n("trade-aside",{attrs:{slot:"content"},on:{onTabClick:function(e){return e.target!==e.currentTarget?null:t.onTabClick(e)},onRowClick:function(e){return e.target!==e.currentTarget?null:t.onRowClick(e)}},slot:"content"})],1),t._v(" "),n("app-header",{attrs:{iconLeft:t.assetConfig.imgs.nav_transaction_menu},on:{onHeadClick:t.slideShow}},[n("div",{staticClass:"coin font-16 abs-vh-center",attrs:{slot:"title"},domProps:{textContent:t._s(t.coins)},slot:"title"})]),t._v(" "),n("div",{staticClass:"trade-panel flex flex-between"},[n("div",{staticClass:"form-box p-rel"},[n("div",{staticClass:"btn-box flex flex-between h-35"},[n("div",{staticClass:"font-14 font-bold",class:0==t.type&&"active-0",on:{click:function(e){t.toggleType(0)}}},[t._v("买入"+t._s(t.Store.state.tradecoinid))]),t._v(" "),n("div",{staticClass:"font-14 font-bold",class:1==t.type&&"active-1",on:{click:function(e){t.toggleType(1)}}},[t._v("卖出"+t._s(t.Store.state.tradecoinid))])]),t._v(" "),n("p",{staticClass:"price-label color-999"},[t._v("限价")]),t._v(" "),n("form",{on:{submit:function(t){t.preventDefault()}}},[n("div",{staticClass:"from-group flex flex-between flex-v-center font-14 h-45"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.price,expression:"price",modifiers:{number:!0}}],attrs:{type:"text",placeholder:"价格"},domProps:{value:t.price},on:{input:function(e){e.target.composing||(t.price=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),t._v(" "),n("span",{staticClass:"label",domProps:{textContent:t._s(t.Store.state.maincoinid)}})]),t._v(" "),n("div",{staticClass:"from-group flex flex-between flex-v-center font-14 h-45"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.number,expression:"number",modifiers:{number:!0}}],attrs:{type:"text",placeholder:"数量"},domProps:{value:t.number},on:{input:function(e){e.target.composing||(t.number=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),t._v(" "),n("span",{staticClass:"label",domProps:{textContent:t._s(t.Store.state.tradecoinid)}})]),t._v(" "),n("div",{staticClass:"available font-13 color-danger",domProps:{innerHTML:t._s(t.availableLabel)}}),t._v(" "),n("van-row",{staticClass:"fast-input h-30",attrs:{gutter:"6"}},t._l(t.fastInputNum,function(e,a){return n("van-col",{key:a,attrs:{span:"6"}},[n("div",{class:t.numLevel==e.val&&"active",domProps:{textContent:t._s(e.label)},on:{click:function(n){t.getNum(e.val)}}})])}),1),t._v(" "),n("div",{staticClass:"total font-16 font-bold color-666"},[t._v("\n          交易额：\n          "),n("span",{staticClass:"color-danger",domProps:{textContent:t._s(t.total)}})]),t._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:0==t.type,expression:"type==0"}],staticClass:"btn-large btn-block riple btn-danger",on:{click:t.forBuy}},[t._v("买入")]),t._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:1==t.type,expression:"type==1"}],staticClass:"btn-large btn-block riple btn-success",on:{click:t.forSell}},[t._v("卖出")])],1)]),t._v(" "),n("div",{staticClass:"trade-trend"},[n("div",{staticClass:"table"},[n("van-row",{staticClass:"thead h-35 color-666"},[n("van-col",{staticClass:"font-13",attrs:{span:"12"}},[t._v("价格")]),t._v(" "),n("van-col",{staticClass:"txt-rt font-13",attrs:{span:"12"}},[t._v("数量")])],1),t._v(" "),n("div",{staticClass:"tbody"},t._l(t.SellOrder,function(e,a){return n("div",{key:a,on:{click:function(n){t.OrderClick(e)}}},[n("van-row",{staticClass:"h-25 riple p-rel"},[n("div",{staticClass:"progress p-abs",style:{width:e.total/t.sellListTotal*100+"%"}}),t._v(" "),n("van-col",{staticClass:"font-13 color-success",attrs:{span:"12"}},[t._v(t._s(1*e.price))]),t._v(" "),n("van-col",{staticClass:"txt-rt font-13",attrs:{span:"12"}},[t._v(t._s(1*e.number))])],1)],1)}),0),t._v(" "),n("div",{staticClass:"rise txt-center font-14 h-25",class:t.coinInfo.prise>0?"color-danger":"color-success"},[t._v("最新价 "+t._s(t.coinInfo.prise?1*t.coinInfo.prise:0))]),t._v(" "),n("div",{staticClass:"tbody"},t._l(t.BuyOrder,function(e,a){return n("div",{key:a,on:{click:function(n){t.OrderClick(e)}}},[n("van-row",{staticClass:"h-25 riple p-rel"},[n("div",{staticClass:"progress p-abs",style:{width:e.total/t.buyListTotal*100+"%"}}),t._v(" "),n("van-col",{staticClass:"font-13 color-success",attrs:{span:"12"}},[t._v(t._s(1*e.price))]),t._v(" "),n("van-col",{staticClass:"txt-rt font-13",attrs:{span:"12"}},[t._v(t._s(1*e.number))])],1)],1)}),0)],1)])]),t._v(" "),n("div",{staticClass:"trade-record"},[n("van-tabs",{attrs:{color:"#fe0042","line-width":"30",sticky:""},model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},[n("van-tab",{attrs:{title:"当前委托"}},[t.Store.state.isLogin?n("div",{staticClass:"record-table"},[t.currentEntrust.length>0?[n("van-row",{staticClass:"thead color-666 flex flex-v-center h-45"},[n("van-col",{attrs:{span:"6 font-14"}},[t._v("市场")]),t._v(" "),n("van-col",{attrs:{span:"7 font-14"}},[t._v("价格")]),t._v(" "),n("van-col",{attrs:{span:"7 font-14"}},[t._v("成交量/数量")]),t._v(" "),n("van-col",{attrs:{span:"4 font-14 txt-rt"}},[t._v("操作")])],1),t._v(" "),t.currentEntrust.length>0?n("div",{staticClass:"tbody"},t._l(t.currentEntrust,function(e){return n("van-row",{key:e.autoid,staticClass:"flex flex-v-center"},[n("van-col",{attrs:{span:"6 font-14"}},[n("div",{staticClass:"font-14 font-bold",domProps:{textContent:t._s(e.tradcoin)}}),t._v(" "),n("small",{staticClass:"color-999",domProps:{textContent:t._s(e.writedate)}})]),t._v(" "),n("van-col",{attrs:{span:"7 font-14 color-success"}},[n("div",{staticClass:"font-14 font-bold",domProps:{textContent:t._s(1*e.price)}}),t._v(" "),n("small",{domProps:{textContent:t._s(0==e.type?"买入":"卖出")}})]),t._v(" "),n("van-col",{attrs:{span:"7 font-14"}},[n("div",{staticClass:"font-14 font-bold",domProps:{textContent:t._s(1*e.dealnumber)}}),t._v(" "),n("small",{staticClass:"color-999",domProps:{textContent:t._s(1*e.number)}})]),t._v(" "),n("van-col",{attrs:{span:"4 font-14 txt-rt"}},[n("button",{staticClass:"btn-mini btn-success riple",on:{click:function(n){t.cancelOrder(e)}}},[t._v("撤单")])])],1)}),1):t._e()]:[n("no-record")]],2):t._e()]),t._v(" "),n("van-tab",{attrs:{title:"历史委托"}},[t.Store.state.isLogin?n("div",{staticClass:"record-table"},[t.entrustRecord.length>0?[n("van-row",{staticClass:"thead color-666 flex flex-v-center h-45"},[n("van-col",{attrs:{span:"9 font-14"}},[t._v("市场")]),t._v(" "),n("van-col",{attrs:{span:"8 font-14"}},[t._v("价格")]),t._v(" "),n("van-col",{attrs:{span:"7 font-14 txt-rt"}},[t._v("成交量/数量")])],1),t._v(" "),n("div",{staticClass:"tbody"},t._l(t.entrustRecord,function(e){return n("van-row",{key:e.autoid,staticClass:"flex flex-v-center"},[n("van-col",{attrs:{span:"9 font-14"}},[n("div",{staticClass:"font-14 font-bold",domProps:{textContent:t._s(e.tradcoin)}}),t._v(" "),n("small",{staticClass:"color-999",domProps:{textContent:t._s(e.writedate)}})]),t._v(" "),n("van-col",{attrs:{span:"8 font-14 color-success"}},[n("div",{staticClass:"font-14 font-bold",domProps:{textContent:t._s(1*e.price)}}),t._v(" "),n("small",{domProps:{textContent:t._s(0==e.type?"买入":"卖出")}})]),t._v(" "),n("van-col",{attrs:{span:"7 font-14 txt-rt"}},[n("div",{staticClass:"font-14 font-bold",domProps:{textContent:t._s(1*e.dealnumber)}}),t._v(" "),n("small",{staticClass:"color-999",domProps:{textContent:t._s(1*e.number)}})])],1)}),1)]:[n("no-record")]],2):t._e()])],1),t._v(" "),t.Store.state.isLogin?t._e():n("div",{staticClass:"h-45 unlogin font-16 txt-center"},[t._v("请先 "),n("router-link",{staticClass:"color-info",attrs:{to:"/userentry/login"}},[t._v("登录")])],1)],1)],1)},staticRenderFns:[]};var w=n("C7Lr")(y,g,!1,function(t){n("6DwL")},"data-v-4f8900c8",null);e.default=w.exports},"6DwL":function(t,e){},"7qlM":function(t,e,n){var a=n("yIaE"),o=n("b/cX");t.exports=n("Hx55").getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return a(e.call(t))}},HzJ8:function(t,e,n){t.exports={default:n("llxl"),__esModule:!0}},KH7x:function(t,e,n){"use strict";e.__esModule=!0;var a=s(n("MGgt")),o=s(n("HzJ8"));function s(t){return t&&t.__esModule?t:{default:t}}e.default=function(){return function(t,e){if(Array.isArray(t))return t;if((0,a.default)(Object(t)))return function(t,e){var n=[],a=!0,s=!1,r=void 0;try{for(var i,c=(0,o.default)(t);!(a=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);a=!0);}catch(t){s=!0,r=t}finally{try{!a&&c.return&&c.return()}finally{if(s)throw r}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},MGgt:function(t,e,n){t.exports={default:n("XXd/"),__esModule:!0}},Uj6H:function(t,e,n){var a=n("RRoV"),o=n("tfud")("iterator"),s=n("NYgh");t.exports=n("Hx55").isIterable=function(t){var e=Object(t);return void 0!==e[o]||"@@iterator"in e||s.hasOwnProperty(a(e))}},"XXd/":function(t,e,n){n("IeGf"),n("wVgL"),t.exports=n("Uj6H")},ZbvV:function(t,e){},llxl:function(t,e,n){n("IeGf"),n("wVgL"),t.exports=n("7qlM")}});
//# sourceMappingURL=1.d9e185ced1920a301edb.js.map