webpackJsonp([38],{"Ezk+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("mvHQ");var s=a("Gu7T"),n=a.n(s),i=a("//Fk"),o=a.n(i),r=a("SPPm"),l=(a("l6IN"),a("2Uyi")),c=a("RwLX"),u=a("yPbj"),d=null,m=!0;window.onbeforeunload=function(){d.close()};var p={components:{CeAsideComp:u.a},data:function(){return{show:!1,showLoading:!1,userData:this.userModel,buyFormData:{price:0,orderVol:0},sellFormData:{price:0,orderVol:0},dataMaxLen:5,currentId:1,tableData:null,latestBuyData:[],latestSoldData:[],currentDeclareData:null,historicalDeclareData:null,historicalBuyData:null,maincoin:null,tradecoin:null,myBlance:0,myAvailable:"",currentCoinInfo:"",chargeAddress:"",qrCode:null,bindState:null,canTrade:!1,isGetSocketMsg:!1,iframUrl:"./static/kline.html?",timer:null,autoStart:!1,timerOut:null}},mounted:function(){var t=this;this.$bus.on("tradeCoinLoad",function(e){t.loadData(e)})},beforeRouteLeave:function(t,e,a){d&&(d.close(),d=null,clearInterval(this.timer),this.timer=null),a()},methods:{updateLastestData:function(t,e,a){var s=this;if("WebSocket"in window)this.updateListBySocket(t,e,a);else{var i={maincoin:e,tradcoin:a};this.getCurrentInfo(e,a);var r=this.request(this.api.buyorder,i),l=this.request(this.api.sellorder,i),c=this.request(this.api.gettoporder,i);o.a.all([r,l,c]).then(function(t){s.showLoading=!1,m=!0;var e=[].concat(n()(t)),a=e[0],i=e[1],o=e[2];s.latestBuyData=s.Util.sumCalc(a.data.list,"price","number"),s.latestSoldData=s.Util.sumCalc(i.data.list,"price","number"),s.historicalBuyData=s.Util.sumCalc(o.data.list,"price","number")}).catch(function(t){}),this.updateListByAjax(e,a)}},updateListBySocket:function(t,e,a){var s=this;d&&d.close(),(d=new WebSocket(""+this.api.socketUrl+(t||Object(l.c)(32))+"/"+e+"_"+a)).onopen=function(){d.send(e+"_"+a)},d.onmessage=function(t){var e=JSON.parse(t.data);e.info[0]&&(s.currentCoinInfo=e.info[0]),s.latestBuyData=s.Util.sumCalc(e.buy,"price","number"),s.latestSoldData=s.Util.sumCalc(e.sell,"price","number"),s.historicalBuyData=s.Util.sumCalc(e.top,"price","number")},d.onerror=function(t){s.updateListByAjax(e,a)},d.onclose=function(){}},updateListByAjax:function(t,e){var a=this,s={maincoin:t,tradcoin:e};this.timer=setInterval(function(){if(m){var i=a.request(a.api.buyorder,s),r=a.request(a.api.sellorder,s),l=a.request(a.api.gettoporder,s);o.a.all([i,r,l]).then(function(t){a.showLoading=!1,m=!0;var e=[].concat(n()(t)),s=e[0],i=e[1],o=e[2];a.latestBuyData=a.Util.sumCalc(s.data.list,"price","number"),a.latestSoldData=a.Util.sumCalc(i.data.list,"price","number"),a.historicalBuyData=a.Util.sumCalc(o.data.list,"price","number")}).catch(function(t){}),a.getCurrentInfo(t,e)}m=!1},1e3)},myCellStyle:function(){return"padding:6px 0 !important;border:none"},onLatestClick:function(t){this.buyFormData.price=1*t.price,this.sellFormData.price=1*t.price},loadData:function(t){var e=this;this.showLoading=!0,this.maincoin=t.maincoinid,this.tradecoin=t.coinid,this.Util.setCookie("maincoinname",t.maincoinid),this.Util.setCookie("tradcoinname",t.coinid),this.iframUrl=this.iframUrl+"t="+(new Date).getTime(),this.getCurrentInfo(this.maincoin,this.tradecoin),o.a.all([this.getAvailabel(this.maincoin),this.getAvailabel(this.tradecoin)]).then(function(t){e.myBlance=t[0].usable,e.myAvailable=t[1].usable}).catch(function(t){e.errMsg(t)}),this.awaitResult(this.maincoin,this.tradecoin).then(function(t){var a=[].concat(n()(t)),s=a[0],i=a[1];s&&(e.currentDeclareData=e.Util.sumCalc(s.data.list,"price","number")),i&&(e.historicalDeclareData=i.data.list)}).catch(function(t){}),this.updateLastestData(this.storage.get("token"),this.maincoin,this.tradecoin)},awaitResult:function(t,e){var a={maincoin:t,tradcoin:e},s=this.request(this.api.getentrust,a).then(function(t){return"0"==t.code?o.a.resolve(t):o.a.reject(t.msg)}),n=this.request(this.api.gethistoryorder,a).then(function(t){return"0"==t.code?o.a.resolve(t):o.a.reject(t.msg)}),i=this.request(this.api.gettoporder,a).then(function(t){return"0"==t.code?o.a.resolve(t):o.a.reject(t.msg)});return o.a.all([s,n,i])},getCurrentInfo:function(t,e){var a=this;this.request(this.api.searchcoin,{maincoin:t,tradcoin:e}).then(function(t){a.currentCoinInfo=t.data.list[0]})},getState:function(){var t=this;return this.request(this.api.saftyState).then(function(e){if(e&&"0"!=e.code)return t.getDataFaild(e.msg),!1;e.data&&e.data.list&&(t.bindState=e.data.list[0],t.canTrade=t.canTradeCheck(t.bindState))})},getAvailabel:function(t){var e=this;return this.request(this.api.getdaynumber,{coin:t}).then(function(t){return e.showLoading=!1,"0"==t.code?o.a.resolve(t.data.list[0]):o.a.reject(t.msg)})},getchargeAddress:function(t){var e=this;this.request(this.api.getaddress,{coin:t}).then(function(t){if(t&&"0"!=t.code)return e.getDataFaild(t.msg);e.chargeAddress=t.data.address[0].address})},tradeHandle:function(t,e){var a=this;return this.request(t,{maincoin:e.maincoin||"",tradcoin:e.tradecoin||"",prise:e.price||"",number:e.number||"",showLoading:!0}).then(function(t){return"0"==t.code?(a.updateLastestData(a.storage.get("token"),a.maincoin,a.tradecoin),a.successMsg(t.msg||"操作成功"),a.myBlance-=a.buyTotal,a.myAvailable-=a.sellTotal):a.errMsg(t.msg),o.a.resolve(t)})},delItemFromList:function(t,e){e.map(function(a,s){if(a.id==t)return e.splice(s,1),e})},cancelOrder:function(t,e,a,s){var n=this;this.storage.get("tradePasswordChecked")||this.$prompt("请输入交易密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputType:"password",inputErrorMessage:"交易密码不能为空"}).then(function(t){var e=t.value;Object(c.a)(e).then(function(t){0!=t.code?(n.storage.set("tradePasswordChecked",!1),n.errMsg("交易密码不正确")):(n.storage.set("tradePasswordChecked",!0),n.successMsg(t.msg))})}).catch(function(){}),this.showLoading=!0,this.request(this.api.clearentrust,{id:t}).then(function(i){if(i&&"0"!=i.code)return n.getDataFaild(i.msg),!1;n.updateLastestData(n.storage.get("token"),n.maincoin,n.tradecoin),n.successMsg(i.msg),n.delItemFromList(t,n.currentDeclareData),0==e?n.myBlance+=n.Util.accMul(a,s):n.myAvailable+=n.Util.accMul(a,s),n.showLoading=!1})},valideForm:function(t,e){return isNaN(e)||!e?(this.errMsg("请输入有效价格"),!1):t?!!this.Util.isInt(t)||(this.errMsg("买入量/卖出量必须是整数"),!1):(this.errMsg("买入量/卖出量不能为空"),!1)},buyHandle:function(){var t=this,e=1*this.buyFormData.price,a=1*this.buyFormData.orderVol;this.userData.isLogin?this.storage.get("tradePasswordChecked")?this.valideForm(a,e)&&this.tradeHandle(this.api.forbuy,{maincoin:this.maincoin,tradecoin:this.tradecoin,number:this.buyFormData.orderVol,price:this.buyFormData.price}):this.$prompt("请输入交易密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputType:"password",inputErrorMessage:"交易密码不能为空"}).then(function(e){var a=e.value;Object(c.a)(a).then(function(e){0!=e.code?(t.storage.set("tradePasswordChecked",!1),t.errMsg("交易密码不正确")):(t.storage.set("tradePasswordChecked",!0),t.successMsg(e.msg))})}).catch(function(){}):this.errMsg("label120")},sellHandle:function(){var t=this,e=1*this.sellFormData.price,a=1*this.sellFormData.orderVol;this.userData.isLogin?this.storage.get("tradePasswordChecked")?this.valideForm(a,e)&&this.tradeHandle(this.api.forsell,{maincoin:this.maincoin,tradecoin:this.tradecoin,number:this.sellFormData.orderVol,price:this.sellFormData.price}):this.$prompt("请输入交易密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputType:"password",inputErrorMessage:"交易密码不能为空"}).then(function(e){var a=e.value;Object(c.a)(a).then(function(e){0!=e.code?(t.storage.set("tradePasswordChecked",!1),t.errMsg("交易密码不正确")):(t.storage.set("tradePasswordChecked",!0),t.successMsg(e.msg))})}).catch(function(){}):this.errMsg("label120")},getRowData:function(t){r.a.tradecoinid=t.coinid,r.a.coinid=t.maincoinid,this.loadData(t)},canTradeCheck:function(t){return"object"!=!this.Util.dataType(t)&&(t.tradstate>0&&t.bankstate>0&&t.idcardstate>0&&t.googlestate>0)},showChargeBox:function(){""!=this.chargeAddress&&r.a.tradecoinid==this.tradecoin||this.getchargeAddress(this.tradecoin),this.show=!0}},computed:{amountLabel:function(){return(this.$t("amount")||"数量")+"("+this.tradecoin+")"},buyingLabel:function(){return(this.$t("buy")||"买入")+"&nbsp;"+this.tradecoin},sellingLabel:function(){return(this.$t("sell")||"卖出")+"&nbsp;"+this.tradecoin},priceLabel:function(){return(this.$t("price")||"价格")+"("+this.maincoin+")"},totalLabel:function(){return(this.$t("total")||"累计")+"("+this.maincoin+")"},marketVolLabel:function(){return(this.$t("marketVol")||"挂单量")+"("+this.tradecoin+")"},availabelBalance:function(){var t=1*this.myBlance;return(this.$t("avilable")||"可用")+"&nbsp;"+(t||0)+"&nbsp;"+this.maincoin},availabelAmount:function(){return(this.$t("canExchange")||"可兑换")+"&nbsp;"+(1*this.myAvailable||0)+"&nbsp;"+this.tradecoin},latestPrice:function(){return(this.$t("latestPrice")||"最新价")+"&nbsp;"+1*this.currentCoinInfo.prise},buyTotal:function(){return this.Util.accMul(this.buyFormData.price,this.buyFormData.orderVol)},sellTotal:function(){return this.Util.accMul(this.sellFormData.price,this.sellFormData.orderVol)},buyListTotal:function(){var t=0;return this.latestBuyData.map(function(e){t+=1*e.total}),t},sellListTotal:function(){var t=0;return this.latestSoldData.map(function(e){t+=1*e.total}),t}},watch:{buyFormData:{handler:function(t,e){this.buyBtnDisabled=!1},deep:!0}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main wh-full"},[a("my-header",{staticClass:"header-main"},[a("login-bar")],1),t._v(" "),a("el-container",[a("el-aside",{attrs:{width:"24%"}},[a("ce-aside-comp",{on:{onRowClick:t.getRowData}})],1),t._v(" "),a("el-main",{directives:[{name:"loading",rawName:"v-loading",value:t.showLoading,expression:"showLoading"}]},[a("div",{staticClass:"panel-head flex flex-v-center"},[a("img",{staticClass:"currency-thumb thumb-30",attrs:{src:t.currentCoinInfo.logo,alt:""}}),t._v(" "),a("div",{staticClass:"heading"},[t._v(t._s(t.tradecoin)+"/"+t._s(t.maincoin))]),t._v(" "),a("div",{staticClass:"market-val flex flex-v-center"},[a("span",{staticClass:"font-16"},[t._v(t._s(1*t.currentCoinInfo.prise))])]),t._v(" "),a("div",{staticClass:"market-condition font-12"},[a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("increase")||"涨幅")}}),t._v(" "),a("i",{class:1*t.currentCoinInfo.rise>0?"color-danger":"color-success",domProps:{textContent:t._s(1*t.currentCoinInfo.rise+"%")}})]),t._v(" "),a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("high")||"高")}}),t._v(" "),a("i",[t._v(t._s(1*t.currentCoinInfo.height))])]),t._v(" "),a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("low")||"低")}}),t._v(" "),a("i",[t._v(t._s(1*t.currentCoinInfo.low))])]),t._v(" "),a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("dayVol")||"24H量")}}),t._v(" "),a("i",[t._v(t._s(1*t.currentCoinInfo.number)+" "+t._s(t.tradecoin))])])])]),t._v(" "),a("div",{staticClass:"k-map",attrs:{id:"kMap"}},[a("iframe",{attrs:{id:"iframe",src:t.iframUrl,width:"100%",height:"100%",frameborder:"0"}})]),t._v(" "),a("div",{staticClass:"panel-container flex flex-between"},[a("div",{staticClass:"content-lf flex flex-between"},[a("div",{staticClass:"form-wrap"},[a("div",{staticClass:"font-18 font-bit-bold",domProps:{innerHTML:t._s(t.buyingLabel)}}),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("div",{staticClass:"account flex flex-between"},[a("span",{staticClass:"balance",domProps:{innerHTML:t._s(t.availabelBalance)}}),t._v(" "),a("router-link",{attrs:{to:"./property"},domProps:{textContent:t._s(t.$t("recharge")||"充值")}})],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("buyingRate")||"买入价")}}),t._v(" "),a("el-input",{model:{value:t.buyFormData.price,callback:function(e){t.$set(t.buyFormData,"price",e)},expression:"buyFormData.price"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.maincoin)},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("buyVol")||"买入量")}}),t._v(" "),a("el-input",{model:{value:t.buyFormData.orderVol,callback:function(e){t.$set(t.buyFormData,"orderVol",e)},expression:"buyFormData.orderVol"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.tradecoin)},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"total flex flex-between"},[a("span",{domProps:{textContent:t._s(t.totalLabel)}}),t._v(" "),a("i",{domProps:{textContent:t._s(1*t.buyTotal)}})]),t._v(" "),a("button",{staticClass:"btn-block btn-large btn-danger btn-active",domProps:{innerHTML:t._s(t.buyingLabel)},on:{click:t.buyHandle}})]),t._v(" "),a("div",{staticClass:"form-wrap"},[a("div",{staticClass:"font-18 font-bit-bold",domProps:{innerHTML:t._s(t.sellingLabel)}}),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("div",{staticClass:"account flex flex-between"},[a("span",{staticClass:"balance",domProps:{innerHTML:t._s(t.availabelAmount)}}),t._v(" "),a("router-link",{attrs:{to:"./property"},domProps:{textContent:t._s(t.$t("recharge")||"充值")}})],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("sellingRate")||"卖出价")}}),t._v(" "),a("el-input",{model:{value:t.sellFormData.price,callback:function(e){t.$set(t.sellFormData,"price",e)},expression:"sellFormData.price"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.maincoin)},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("sellVol")||"卖出量")}}),t._v(" "),a("el-input",{model:{value:t.sellFormData.orderVol,callback:function(e){t.$set(t.sellFormData,"orderVol",e)},expression:"sellFormData.orderVol"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.tradecoin)},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"total flex flex-between"},[a("span",{domProps:{textContent:t._s(t.totalLabel)}}),t._v(" "),a("i",{domProps:{textContent:t._s(1*t.sellTotal)}})]),t._v(" "),a("button",{staticClass:"btn-block btn-large btn-success btn-active",domProps:{innerHTML:t._s(t.sellingLabel)},on:{click:t.sellHandle}})])]),t._v(" "),a("div",{staticClass:"trade-market"},[a("div",{staticClass:"flex flex-between flex-v-center"},[a("span",{staticClass:"font-18"},[a("i",{domProps:{innerHTML:t._s(t.latestPrice)}})])]),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("div",{staticClass:"table"},[a("div",{staticClass:"thead font-16"},[a("span",{domProps:{textContent:t._s(t.$t("stalls")||"档位")}}),t._v(" "),a("span",{domProps:{textContent:t._s(t.priceLabel)}}),t._v(" "),a("span",{domProps:{textContent:t._s(t.amountLabel)}}),t._v(" "),a("span",{staticClass:"txt-rt",domProps:{textContent:t._s(t.totalLabel)}})]),t._v(" "),t.latestSoldData&&t.latestSoldData[0]?a("div",{staticClass:"tbody"},[t._l(t.latestSoldData,function(e,s){return[a("div",{key:s,staticClass:"row flex p-rel",on:{click:function(a){t.onLatestClick(e)}}},[a("div",{staticClass:"progress p-abs",style:{width:e.total/t.sellListTotal*100+"%"}}),t._v(" "),a("span",{staticClass:"column color-success"},[t._v("\n                    "+t._s(t.$t("sell"))+" "+t._s(t.latestSoldData.length-s)+"\n                  ")]),t._v(" "),a("span",{staticClass:"column",staticStyle:{width:"25%"},domProps:{textContent:t._s(1*e.price)}}),t._v(" "),a("span",{staticClass:"column",domProps:{textContent:t._s(1*e.number)}}),t._v(" "),a("span",{staticClass:"column txt-rt",domProps:{textContent:t._s(1*e.total)}})])]})],2):a("div",{staticClass:"no-data",domProps:{textContent:t._s(t.$t("label108"))}})]),t._v(" "),a("div",{staticClass:"break-line m-top-10 m-bottom-10"}),t._v(" "),a("div",{staticClass:"table"},[t.latestBuyData&&t.latestBuyData[0]?a("div",{staticClass:"tbody"},[t._l(t.latestBuyData,function(e,s){return[a("div",{key:s,staticClass:"row flex flex-between p-rel",on:{click:function(a){t.onLatestClick(e)}}},[a("div",{staticClass:"progress p-abs",style:{width:e.total/t.sellListTotal*100+"%"}}),t._v(" "),a("span",{staticClass:"column color-danger",domProps:{innerHTML:t._s(t.$t("buy")+"&nbsp;"+(s+1))}}),t._v(" "),a("span",{staticClass:"column",domProps:{textContent:t._s(1*e.price)}}),t._v(" "),a("span",{staticClass:"column",domProps:{textContent:t._s(1*e.number)}}),t._v(" "),a("span",{staticClass:"column txt-rt",domProps:{textContent:t._s(1*e.total)}})])]})],2):a("div",{staticClass:"no-data",domProps:{textContent:t._s(t.$t("label108"))}})])])]),t._v(" "),a("div",{staticClass:"panel-container flex flex-between"},[a("div",{staticClass:"content-lf"},[a("div",{staticClass:"panel-title font-18 font-bit-bold",domProps:{textContent:t._s(t.$t("currEnstrument")||"当前委托")}}),t._v(" "),t.userData.isLogin?[a("el-table",{attrs:{stripe:"",data:t.currentDeclareData}},[a("el-table-column",{attrs:{width:"140",label:t.$t("date")||"日期",prop:"writedate"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{class:"0"==e.row.type?"color-danger":"color-success",domProps:{textContent:t._s("0"==e.row.type?t.$t("buy"):t.$t("sell"))}})}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.priceLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.price)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.marketVolLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.number)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("volumn")||"成交量"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.dealnumber)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"zh-CN"===t.$i18n.locale?"60":"120",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{staticClass:"handle color-danger",domProps:{textContent:t._s(t.$t("withdrawed"))},on:{click:function(a){t.cancelOrder(e.row.id,e.row.type,e.row.number,e.row.price)}}})}}])})],1)]:t._e(),t._v(" "),a("unlogin-tip"),t._v(" "),a("div",{staticClass:"panel-title font-18 font-bit-bold",domProps:{textContent:t._s(t.$t("oldEnstrument")||"历史委托")}}),t._v(" "),t.userData.isLogin?[a("el-table",{attrs:{stripe:"",data:t.historicalDeclareData,"max-height":"500"}},[a("el-table-column",{attrs:{width:"140",label:t.$t("date")||"日期",prop:"writedate"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{class:"0"==e.row.state?"color-danger":"color-success",domProps:{textContent:t._s("0"==e.row.state?t.$t("buy"):t.$t("sell"))}})}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.priceLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.price)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.marketVolLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.number)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("volumn")||"成交量"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.dealnumber)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"zh-CN"==t.$i18n.locale?"100":"120",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{staticClass:"handle color-danger",domProps:{textContent:t._s(t.$t("completed"))}})}}])})],1)]:t._e(),t._v(" "),a("unlogin-tip")],2),t._v(" "),a("div",{staticClass:"content-rt"},[a("div",{staticClass:"panel-title flex flex-between"},[a("span",{staticClass:"font-18 font-bit-bold",domProps:{textContent:t._s(t.$t("tradeRecord")||"成交历史")}})]),t._v(" "),t.userData.isLogin?[a("div",{staticClass:"break-line"}),t._v(" "),a("el-table",{staticStyle:{"font-weight":"normal"},attrs:{data:t.historicalBuyData,"cell-style":t.myCellStyle,"max-height":"700",stripe:""}},[a("el-table-column",{attrs:{width:"100",label:t.$t("time")||"时间"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{staticClass:"color-danger",domProps:{textContent:t._s(e.row.writedate)}})}}])}),t._v(" "),a("el-table-column",{attrs:{width:"150",label:t.priceLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.price)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"120",label:t.amountLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                  "+t._s(1*e.row.number)+"\n                ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.totalLabel},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{domProps:{textContent:t._s(e.row.total)}})}}])})],1)]:t._e(),t._v(" "),a("unlogin-tip")],2)])])],1),t._v(" "),a("my-footer")],1)},staticRenderFns:[]};var f=a("VU/8")(p,h,!1,function(t){a("yp6M")},"data-v-18095fd4",null);e.default=f.exports},yp6M:function(t,e){}});