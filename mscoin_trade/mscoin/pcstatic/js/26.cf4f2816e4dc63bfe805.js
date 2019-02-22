webpackJsonp([26],{"+JLJ":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("//Fk"),a=e.n(n),o=(e("mvHQ"),e("RwLX")),i={data:function(){return{showDialog:!1,currencyList:[],coinInfo:"",buyForm:{number:"",total:""},sellForm:{number:"",total:""},showLoading:!1,canTrade:!1,bindState:null,myOrderList:[],allOrderList:[],bankInfo:"",orderStatus:0,myBalance:0,noteStr:""}},computed:{buyingLabel:function(){return(this.$t("buy")||"买入")+"&nbsp;"+(this.coinInfo.coinid||"")},sellingLabel:function(){return(this.$t("sell")||"卖出")+"&nbsp;"+(this.coinInfo.coinid||"")},buyState:function(){return""+(this.$t("buy")||"买入")},minNum:function(){return(this.$t("minNum")||"最少")+" "+1*this.coinInfo.minnum},sellState:function(){return""+(this.$t("sell")||"卖出")},buyTotal:function(){return this.buyForm.number*this.coinInfo.buycny},sellTotal:function(){return this.sellForm.number*this.coinInfo.sellcny}},mounted:function(){var t=this;this.showLoading=!0,this.getOtcCoin().then(function(s){s&&t.getAvailable(s)}),this.getOtcOrder(),this.getState(),this.getotcbank()},methods:{checkTradePassword:function(){var t=this;return!!this.storage.get("tradePasswordChecked")||(this.$prompt("请输入交易密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"交易密码不能为空"}).then(function(s){var e=s.value;Object(o.a)(e).then(function(s){0!=s.code?(t.storage.set("tradePasswordChecked",!1),t.errMsg("交易密码不正确")):(t.storage.set("tradePasswordChecked",!0),t.successMsg(s.msg))})}).catch(function(){}),!1)},getNote:function(){for(var t="",s=0;s<6;s++)t+=this.Util.randomNum(0,9);this.noteStr=t},getAvailable:function(t){var s=this;this.request(this.api.getdaynumber,{coin:t}).then(function(t){"0"==t.code&&t.data.list&&t.data.list.length>0&&(s.myBalance=1*t.data.list[0].usable)})},getotcbank:function(){var t=this;this.request(this.api.getotcbank).then(function(s){"0"==s.code?t.bankInfo=s.data.list[0]||"":t.errMsg(s.msg||"操作失败")})},getOtcCoin:function(){var t=this;return this.request(this.api.getotccoin).then(function(s){if("0"==s.code&&s.data&&s.data.list&&s.data.list[0])return t.currencyList=s.data.list,t.coinInfo=s.data.list[0],a.a.resolve(t.coinInfo.coinid)})},getOtcOrder:function(){var t=this;this.request(this.api.getotcorder).then(function(s){if(t.showLoading=!1,"0"==s.code&&s.data&&s.data.list&&s.data.list[0]){var e=s.data.list.slice(0);t.allOrderList=e,t.myOrderList=t.getMyOrderlist(e,t.coinInfo.coinid||e[0].coinid)}})},getMyOrderlist:function(t,s){var e=[];if(t&&"array"==this.Util.dataType(t))return t.map(function(t){t.coinid==s&&e.push(t)}),e},getState:function(){var t=this;this.request(this.api.saftyState).then(function(s){"0"==s.code&&(t.bindState=s.data.list[0],t.canTrade=t.canTradeCheck(t.bindState))})},onListClick:function(t){this.coinInfo=t,this.myOrderList=this.getMyOrderlist(this.allOrderList,t.coinid),this.getAvailable(t.coinid),this.buyForm={number:"",total:""},this.sellForm={number:"",total:""}},canTradeCheck:function(t){return t.tradstate>0&&t.bankstate>0&&t.idcardstate>0&&t.googlestate>0},beforeTrade:function(){return this.userModel.isLogin?!!this.checkTradePassword():(this.errMsg("label120"),!1)},showOrderDetail:function(t){0==t.type&&(this.orderStatus=t.state,this.showDialog=!0,this.bankInfo.amount=t.zj,this.getNote())},handleConfirm:function(t,s){var e=this;return!!Object(o.a)()&&this.request(t,{coin:s.coin,id:this.bankInfo.autoid,bz:this.noteStr,number:s.number,jz:s.total,showLoading:!0}).then(function(t){return"0"==t.code?(e.successMsg(t.msg),e.getOtcOrder(),a.a.resolve(t)):(e.errMsg(t.msg),a.a.reject(t))})},sellHandle:function(){var t=this;return!!this.beforeTrade()&&(isNaN(this.sellForm.number)||this.sellForm.number<1*this.coinInfo.minnum?(this.errMsg("label122"),!1):void this.handleConfirm(this.api.otcsell,{coin:this.coinInfo.coinid,number:this.sellForm.number,total:this.sellTotal}).then(function(s){t.bankInfo.amount=t.sellTotal,t.myBalance=t.myBalance-t.sellForm.number}).catch(function(t){}))},buyHandle:function(){var t=this;return this.getNote(),!!this.beforeTrade()&&(isNaN(this.buyForm.number)||this.buyForm.number<1*this.coinInfo.minnum?(this.errMsg("label122"),!1):void this.handleConfirm(this.api.otcbuy,{coin:this.coinInfo.coinid,number:this.buyForm.number,total:this.buyTotal}).then(function(s){"0"==s.code&&(t.showDialog=!0,t.bankInfo.amount=t.buyTotal)}).catch(function(t){}))},dialogClose:function(){this.showDialog=!1}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"main wh-full"},[e("my-header",{staticClass:"header-main"},[e("login-bar")],1),t._v(" "),e("el-container",[e("el-aside",{attrs:{width:"400px"}},[e("c2c-aside-comp",{attrs:{myData:t.currencyList},on:{onListClick:t.onListClick}})],1),t._v(" "),e("el-main",[e("div",{staticClass:"panel-container p-rel flex flex-between"},[e("div",{staticClass:"form-wrap"},[e("div",{staticClass:"font-18 font-bit-bold",domProps:{innerHTML:t._s(t.buyingLabel)}}),t._v(" "),e("div",{staticClass:"break-line"}),t._v(" "),e("div",{staticClass:"account flex flex-between"},[e("span",{staticClass:"balance"},[t._v(t._s(t.$t("avilable")||"可用")+" "+t._s(t.myBalance)+" "+t._s(t.coinInfo.coinid||""))]),t._v(" "),e("router-link",{attrs:{to:"./property"},domProps:{textContent:t._s(t.$t("recharge")||"充值")}})],1),t._v(" "),e("div",{staticClass:"input-group"},[e("label",{domProps:{textContent:t._s(t.$t("buyingValiation")||"买入估价")}}),t._v(" "),e("el-input",{attrs:{disabled:"",value:t.coinInfo.buycny}},[e("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),e("div",{staticClass:"input-group"},[e("label",{domProps:{textContent:t._s(t.$t("buyVol")||"买入量")}}),t._v(" "),e("el-input",{attrs:{placeholder:t.minNum},model:{value:t.buyForm.number,callback:function(s){t.$set(t.buyForm,"number",s)},expression:"buyForm.number"}},[e("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.coinInfo.coinid||"")},slot:"suffix"})])],1),t._v(" "),e("div",{staticClass:"input-group"},[e("label",{domProps:{textContent:t._s(t.$t("money")||"金额")}}),t._v(" "),e("el-input",{attrs:{disabled:""},model:{value:t.buyTotal,callback:function(s){t.buyTotal=s},expression:"buyTotal"}},[e("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),e("button",{staticClass:"btn-block btn-large btn-danger btn-active",domProps:{innerHTML:t._s(t.buyingLabel)},on:{click:t.buyHandle}})]),t._v(" "),e("div",{staticClass:"vertical-line p-abs abs-h-center"}),t._v(" "),e("div",{staticClass:"form-wrap"},[e("div",{staticClass:"font-18 font-bit-bold",domProps:{innerHTML:t._s(t.sellingLabel)}}),t._v(" "),e("div",{staticClass:"break-line"}),t._v(" "),e("div",{staticClass:"account flex flex-between"},[e("span",{staticClass:"balance"},[t._v(t._s(t.$t("avilable")||"可用")+" "+t._s(t.myBalance)+" "+t._s(t.coinInfo.coinid||""))]),t._v(" "),e("router-link",{attrs:{to:"./property"},domProps:{textContent:t._s(t.$t("recharge")||"充值")}})],1),t._v(" "),e("div",{staticClass:"input-group"},[e("label",{domProps:{textContent:t._s(t.$t("sellingValiation")||"卖出估价")}}),t._v(" "),e("el-input",{attrs:{disabled:"",value:t.coinInfo.sellcny}},[e("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),e("div",{staticClass:"input-group"},[e("label",{domProps:{textContent:t._s(t.$t("sellVol")||"卖出量")}}),t._v(" "),e("el-input",{attrs:{placeholder:t.minNum},model:{value:t.sellForm.number,callback:function(s){t.$set(t.sellForm,"number",s)},expression:"sellForm.number"}},[e("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.coinInfo.coinid||"")},slot:"suffix"})])],1),t._v(" "),e("div",{staticClass:"input-group"},[e("label",{domProps:{textContent:t._s(t.$t("money")||"金额")}}),t._v(" "),e("el-input",{attrs:{disabled:""},model:{value:t.sellTotal,callback:function(s){t.sellTotal=s},expression:"sellTotal"}},[e("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),e("button",{staticClass:"btn-block btn-large btn-success btn-active",domProps:{innerHTML:t._s(t.sellingLabel)},on:{click:t.sellHandle}})])]),t._v(" "),e("div",{staticClass:"warning-box"},[e("h3",{domProps:{textContent:t._s(t.$t("transferNote")||"转让须知")}}),t._v(" "),e("span",{staticClass:"color-666"},[t._v("1、转让后获得相应的CNY。 2、转让获得的CNY可以提现至您指定的账户内，最低提现金额为100。 3、转让是直接扣除您在本平台的相应代币的数量。 4、本平台仅提供收购各类币种，转让后无法取消操作。")])]),t._v(" "),e("div",{staticClass:"panel-container"},[e("div",{staticClass:"panel-header flex flex-between flex-v-center"},[e("span",{staticClass:"font-bit-bold font-18",domProps:{textContent:t._s(t.$t("myOrder")||"我的订单")}})]),t._v(" "),e("div",{staticClass:"break-line"}),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.showLoading,expression:"showLoading"}],attrs:{"max-height":"350",data:t.myOrderList}},[e("el-table-column",{attrs:{prop:"wdate",label:t.$t("time")||"时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"coinid",label:t.$t("currencyType")||"币种"}}),t._v(" "),e("el-table-column",{attrs:{label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(s){return e("span",{class:"0"==s.row.type?"color-danger":"color-success",domProps:{textContent:t._s("0"==s.row.type?t.$t("buy"):t.$t("sell"))}})}}])}),t._v(" "),e("el-table-column",{attrs:{label:t.$t("amount")||"数量"},scopedSlots:t._u([{key:"default",fn:function(s){return[t._v("\n              "+t._s(1*s.row.number)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:(t.$t("unitPrice")||"单价")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(s){return[t._v("\n              "+t._s(1*s.row.price)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:(t.$t("totalPrice")||"总价")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(s){return[t._v("\n              "+t._s(1*s.row.zj)+"\n            ")]}}])}),t._v(" "),e("el-table-column",{attrs:{width:"100",label:t.$t("status")||"状态"},scopedSlots:t._u([{key:"default",fn:function(s){return[0==s.row.type&&0==s.row.state?e("span",{staticClass:"color-danger",domProps:{textContent:t._s(t.$t("label128"))},on:{click:function(e){t.showOrderDetail(s.row)}}}):1==s.row.type&&0==s.row.state?e("span",{staticClass:"color-danger",domProps:{textContent:t._s(t.$t("label180"))},on:{click:function(e){t.showOrderDetail(s.row)}}}):e("span",{staticClass:"color-success",domProps:{textContent:t._s(t.$t("completed"))},on:{click:function(e){t.showOrderDetail(s.row)}}})]}}])})],1)],1)])],1),t._v(" "),e("dialog-box",{attrs:{width:"25%",dialogTitle:t.$t("orderDetail"),showDialog:t.showDialog},on:{onDialogClose:t.dialogClose}},[e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.orderStatus,expression:"orderStatus==0"}],staticClass:"row"},[e("div",{staticClass:"column color-danger txt-center flex flex-between",domProps:{textContent:t._s(t.$t("label134"))}})]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("owner"))}}),t._v(" "),e("span",{staticClass:"span-rt",domProps:{textContent:t._s(t.bankInfo.hz)}})])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("bankCardNo"))}}),t._v(" "),e("span",{staticClass:"span-rt",domProps:{textContent:t._s(t.bankInfo.bankcard)}},[t._v("jogjgioejao")])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("depositBank"))}}),t._v(" "),e("span",{staticClass:"span-rt",domProps:{textContent:t._s(t.bankInfo.khyh)}})])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("bankBranch"))}}),t._v(" "),e("span",{staticClass:"span-rt",domProps:{textContent:t._s(t.bankInfo.khzh)}})])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("transferAmount"))}}),t._v(" "),e("span",{staticClass:"span-rt font-bold color-danger",domProps:{textContent:t._s("￥"+1*t.bankInfo.amount)}})])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("status"))}}),t._v(" "),e("span",{staticClass:"span-rt",class:"0"==t.orderStatus?"color-danger":"color-success",domProps:{textContent:t._s("0"==t.orderStatus?t.$t("label128"):t.$t("completed"))}})])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"column flex flex-between"},[e("span",{staticClass:"span-lf",domProps:{textContent:t._s(t.$t("note"))}}),t._v(" "),e("span",{staticClass:"span-rt",domProps:{textContent:t._s(t.noteStr)}})])])]),t._v(" "),e("my-footer")],1)},staticRenderFns:[]};var r=e("VU/8")(i,l,!1,function(t){e("dCFB")},"data-v-687cd3b6",null);s.default=r.exports},dCFB:function(t,s){}});