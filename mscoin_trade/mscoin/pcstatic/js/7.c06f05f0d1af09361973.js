webpackJsonp([7],{"2ILR":function(t,e){},KIzq:function(t,e){},Op1E:function(t,e){},P4Zr:function(t,e){},VMCl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("mvHQ");var s=a("//Fk"),n=a.n(s),o={props:{show:{type:Boolean,default:!1},title:String,numLabel:String,amountLabel:String,valuationLabel:String,tradeModeLabel:String,number:String,coin:String,price:String},data:function(){return{tradeMode:"银行卡",showModal:this.show,options:[{value:"银行卡",label:"银行卡"}]}},computed:{total:function(){return 1*this.price*this.number*1}},watch:{show:function(){this.showModal=this.show}},methods:{formSubmit:function(){this.$emit("onSubmit")},closeModal:function(){this.showModal=!1,this.$emit("closeModal")}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dialog-box",{attrs:{showDialog:t.showModal,dialogTitle:t.title},on:{onDialogClose:t.closeModal}},[a("div",{staticClass:"content"},[a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.numLabel)}}),t._v(" "),a("el-input",{attrs:{name:"num",value:t.number}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.valuationLabel)}}),t._v(" "),a("el-input",{attrs:{name:"valuation",value:t.price}},[a("span",{staticClass:"slot-text font-16 color-666",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.coin)},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.amountLabel)}}),t._v(" "),a("el-input",{attrs:{name:"amount",value:t.total}},[a("span",{staticClass:"slot-text font-16 color-666",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.tradeModeLabel||"交易方式")}}),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.tradeMode,callback:function(e){t.tradeMode=e},expression:"tradeMode"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("div",{staticClass:"btn-group"},[a("button",{staticClass:"btn-block btn-large btn-danger btn-active",domProps:{textContent:t._s(t.$t("submit")||"提交")},on:{click:t.formSubmit}})])])])},staticRenderFns:[]};var i=a("VU/8")(o,l,!1,function(t){a("KIzq")},"data-v-d6ff2426",null).exports,r={props:{show:{type:Boolean,default:!1},myData:{type:Array,default:null},operateLable:String},data:function(){return{showModal:this.show,dataList:this.myData,textColor:"danger"}},mounted:function(){switch(this.operateLable){case"买入":this.textColor="danger";break;case"卖出":this.textColor="success"}},watch:{show:function(){this.showModal=this.show}},methods:{handleFunc:function(t,e){},closeModal:function(){this.showModal=!1,this.$emit("closeModal")}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dialog-box",{attrs:{showDialog:t.showModal,dialogTitle:t.$t("bestMatched")||"最佳匹配订单"}},[a("div",{staticClass:"table-content"},[a("div",{staticClass:"table-head flex flex-between"},[a("span",{staticClass:"cell",domProps:{textContent:t._s(t.$t("username")||"用户名")}}),t._v(" "),a("span",{staticClass:"cell",domProps:{textContent:t._s(t.$t("price")||"价格")}}),t._v(" "),a("span",{staticClass:"cell",domProps:{textContent:t._s(t.$t("amount")||"数量")}}),t._v(" "),a("span",{staticClass:"cell",domProps:{textContent:t._s(t.$t("operation")||"操作")}})]),t._v(" "),a("div",{staticClass:"table-body"},t._l(t.dataList,function(e,s){return a("div",{key:e.id,staticClass:"table-row flex flex-between"},[a("span",{staticClass:"cell",domProps:{textContent:t._s(e.name)}}),t._v(" "),a("span",{staticClass:"cell",domProps:{textContent:t._s(e.price)}}),t._v(" "),a("span",{staticClass:"cell",domProps:{textContent:t._s(e.amount)}}),t._v(" "),a("span",{staticClass:"cell operate",class:t.textColor,domProps:{textContent:t._s(t.operateLable)},on:{click:function(a){t.handleFunc(e.id,s)}}})])}))]),t._v(" "),a("div",{staticClass:"btn-group"},[a("button",{staticClass:"btn-block btn-large btn-danger",domProps:{textContent:t._s(t.$t("submit")||"提交")}}),t._v(" "),a("button",{staticClass:"btn-block btn-large btn-bordered",domProps:{textContent:t._s(t.$t("cancel")||"取消")}})])])},staticRenderFns:[]};var u=a("VU/8")(r,c,!1,function(t){a("keiJ")},"data-v-4071ff60",null).exports,d={props:{show:{type:Boolean,default:!1},title:{type:String,default:"订单详情"},priceLabel:{type:String,default:"价格"},numLabel:{type:String,default:"数量"},amountLabel:{type:String,default:"金额"},stateLabel:{type:String,default:"状态"}},data:function(){return{price:"0",amount:"0",num:"0",state:"待确认",showModal:this.show}},methods:{closeModal:function(){this.showModal=this.show,this.$emit("closeModal")}},watch:{show:function(){this.showModal=this.show}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dialog-box",{attrs:{showDialog:t.showModal,dialogTitle:t.$t("orderDetail")||t.title},on:{onDialogClose:t.closeModal}},[a("div",{staticClass:"content"},[a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.$t("price")||t.priceLabel)}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"price",value:t.price}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.$t("amount")||t.numLabel)}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"num",value:t.num}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.$t("money")||t.amountLabel)}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"amount",value:t.amount}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.$t("status")||t.stateLabel)}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"stateLabel",value:t.state}})],1)])])},staticRenderFns:[]};var p=a("VU/8")(d,m,!1,function(t){a("2ILR")},"data-v-2f7bc188",null).exports,b={props:{title:String,show:{type:Boolean,default:!1},sellerLabel:String,priceLabel:String,volumnLabel:String,amountLabel:String,limitLabel:String,seller:String,price:null,volumn:null,amount:null,limitAmount:null,coin:null},data:function(){return{showModal:this.show}},watch:{show:function(){this.showModal=this.show}},methods:{formSubmit:function(){this.$emit("onSubmit")},closeModal:function(){this.showModal=this.show,this.$emit("closeModal")}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dialog-box",{attrs:{showDialog:t.showModal,dialogTitle:t.title},on:{onDialogClose:t.closeModal}},[a("div",{staticClass:"content"},[a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.priceLabel||t.$t("price"))}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"price",value:t.price}},[a("span",{staticClass:"slot-text font-16 color-666",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.volumnLabel||t.$t("buyVol"))}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"volumn",value:t.volumn}},[a("span",{staticClass:"slot-text font-16 color-666",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.coin)},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.amountLabel||t.$t("money"))}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"amount",value:t.amount}},[a("span",{staticClass:"slot-text font-16 color-666",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("div",{staticClass:"btn-group"},[a("button",{staticClass:"btn-block btn-large btn-danger btn-active",domProps:{textContent:t._s(t.$t("submit")||"提交")},on:{click:t.formSubmit}})])])])},staticRenderFns:[]};var h=a("VU/8")(b,f,!1,function(t){a("mHgt")},"data-v-35456667",null).exports,v={props:{title:String,show:{type:Boolean,default:!1},ownerLabel:String,bankCardNoLabel:String,depositBankLabel:String,branchesLabel:String,transAmountLabel:String,noteLabel:String,formData:{type:Object}},data:function(){return{showModal:this.show,myData:{}}},watch:{show:function(){this.showModal=this.show},formData:function(){this.myData=this.formData}},methods:{formSubmit:function(){this.$emit("onSubmit")},closeModal:function(){this.showModal=this.show,this.$emit("closeModal")},onChange:function(t){}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dialog-box",{attrs:{showDialog:t.showModal,dialogTitle:t.title},on:{onDialogClose:t.closeModal}},[a("div",{staticClass:"content"},[a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.ownerLabel||t.$t("owner")||"户主")}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"owner",value:t.myData.owner}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.bankCardNoLabel||t.$t("bankCardNo")||"银行卡号")}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"bankCardNo",value:t.myData.bankCardNo}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.depositBankLabel||t.$t("depositBank")||"开户银行")}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"depositBank",value:t.myData.depositBank}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.branchesLabel||t.$t("bankBranch")||"开户支行")}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"bankBranches",value:t.myData.bankBranches}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("span",{staticClass:"label",domProps:{textContent:t._s(t.transAmountLabel||t.$t("transferAmount")||"转账金额")}}),t._v(" "),a("el-input",{attrs:{disabled:"",name:"transferAmount",value:t.myData.transferAmount}})],1),t._v(" "),t._t("uploadfile"),t._v(" "),a("div",{staticClass:"btn-group"},[a("button",{staticClass:"btn-block btn-large btn-danger btn-active",domProps:{textContent:t._s(t.$t("submit")||"提交")},on:{click:t.formSubmit}})])],2)])},staticRenderFns:[]};var C=a("VU/8")(v,_,!1,function(t){a("P4Zr")},"data-v-3ed64010",null).exports,g=a("mtWM"),y=a.n(g),w=a("RwLX"),k={components:{TradeConfirm:i,orderMatch:u,orderConfirm:p,marketOrder:h,orderPaid:C},data:function(){return{dialogId:null,bindState:null,canTrade:!1,userData:this.userModel,operateLable:"卖出",operateLabeli18n:"sell",coinid:"",coinInfo:"",myAvailable:0,accountInfo:null,buyFormData:{price:"",number:"",total:""},imgUrl:"",sellFormData:{price:"",number:"",total:""},confirmData:{},marketOrderCfg:{titlei18nkey:"",volumnLabeli18nkey:"",title:"市挂单买入",volumnLabel:"买入量"},marketList:null,myOrderList:null,myC2COrderList:[],currencyList:[],orderMatchList:"",orderDetail:{},marketOrderDetail:{},orderId:"",C2CRecord:[]}},mounted:function(){var t=this;this.getc2corder(),this.getState(),this.getC2CRecord(),this.getC2Ccoin().then(function(e){if(e)return t.currencyList=e,t.coinInfo=e[0],n.a.resolve(e[0].coinid)}).then(function(e){return t.gettradorder(e),t.getMyAccount(e).then(function(e){e&&(t.myAvailable=e.usable)}),t.getc2callorder(e).then(function(e){t.marketList=e})}).then(function(e){e&&(t.Util.sumCalc(e,"price","number"),t.marketList=e)})},computed:{buyingLabel:function(){return(this.$t("buy")||"买入")+"&nbsp;"+(this.coinInfo.coinid||"")},sellingLabel:function(){return(this.$t("sell")||"买入")+"&nbsp;"+(this.coinInfo.coinid||"")},numberLabel:function(){return(this.$t("amount")||"数量")+"("+(this.coinInfo.coinid||"")+")"},amountLabel:function(){return(this.$t("money")||"金额")+"(CNY)"},myAvailableLabel:function(){return(this.$t("avilable")||"可用")+"&nbsp;"+1*this.myAvailable+"&nbsp;"+this.coinInfo.coinid},advisalPrice:function(){return(this.$t("avisalPrice")||"指导价")+"&nbsp;￥"+this.coinInfo.cny},buyTotal:function(){return this.buyFormData.price*this.buyFormData.number},sellTotal:function(){return this.sellFormData.price*this.sellFormData.number},minNum:function(){return(this.$t("minNum")||"最少")+" "+1*this.coinInfo.minnum}},methods:{checkTradePassword:function(){var t=this;return!!this.storage.get("tradePasswordChecked")||(this.$prompt("请输入交易密码","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"交易密码不能为空"}).then(function(e){var a=e.value;Object(w.a)(a).then(function(e){0!=e.code?(t.storage.set("tradePasswordChecked",!1),t.errMsg("交易密码不正确")):(t.storage.set("tradePasswordChecked",!0),t.successMsg(e.msg))})}).catch(function(){}),!1)},publicOrder:function(t,e){var a=this;this.request(t,{coin:this.coinInfo.coinid,price:e.price||"",number:e.number||"",showLoading:!0}).then(function(t){"0"==t.code?(a.onModelClose(),a.successMsg(t.msg),a.getc2callorder(a.coinInfo.coinid).then(function(t){a.marketList=t}),a.getc2corder()):a.errMsg(t.msg||"操作失败")})},onChange:function(t){var e=this;t.preventDefault();var a=t.target.files[0],s=a.name,n=a.size,o=(a.type,new FormData),l={headers:{"Content-Type":"MultipartFile/form-data"},method:"post"};/\.(jpg|png)$/.test(s)?n>4*Math.pow(1024)?this.$message.error("图片大小不可超过4M,当前图片大小"+n/Math.pow(1024,2)+"M"):(o.append("imgurl",a),l.url=this.api.baseURL+"/"+this.api.img.url,l.data=o,y()(l).then(function(t){"0"==t.data.code&&(e.successMsg(t.msg||"上传成功"),e.imgUrl=t.data.data.isFlag)})):this.$message.error("图片格式需为jpg或者png")},checkPhoto:function(t){t&&window.open(t)},cancelRequest:function(t){var e=this;t&&this.request(this.api.appeal,{id:t}).then(function(t){"0"==t.data.code&&e.successMsg(t.msg||"上传成功")})},onFileChange:function(t){},cancelMyc2cOrder:function(t){var e=this;if(!this.checkTradePassword())return!1;this.request(this.api.clearc2c,{autoid:t,showLoading:!0}).then(function(a){"0"==a.code?(e.successMsg(a.msg||"操作成功"),e.delItemFromList(t,e.myOrderList),e.delItemFromList(t,e.marketList)):e.errMsg(a.msg||"操作失败")})},delItemFromList:function(t,e){e.map(function(a,s){if(a.autoid==t)return e.splice(s,1),e})},buyHandle:function(){this.validation()&&(!isNaN(this.buyTotal)&&this.buyTotal>0?(this.confirmData={number:this.buyFormData.number,price:this.buyFormData.price},this.dialogId=0):this.errMsg("label121"))},sellHandle:function(){this.validation()&&(!isNaN(this.sellTotal)&&this.sellTotal>0?(this.confirmData={number:this.sellFormData.number,price:this.sellFormData.price},this.dialogId=1):this.errMsg("label121"))},tradeConfirmHandle:function(t){if(!this.userData.isLogin)return this.errMsg("label120"),!1;if(!this.checkTradePassword())return!1;this.dialogId=4;var e=t.type;this.marketOrderDetail={type:t.type,autoid:t.autoid,coinid:t.coinid,number:t.number,price:t.price,total:t.total,limitAmount:0},this.marketOrderCfg={titlei18nkey:0==e?"sellPendingOrder":"buyPendingOrder",volumnLabeli18nkey:0==e?"sellVol":"buyVol"}},tradeFromMarket:function(t,e){var a=this;return!!this.checkTradePassword()&&(!(!t||!e)&&void this.request(0==t?this.api.c2cselltrad:this.api.c2cbuytrad,{autoid:e,showLoading:!0}).then(function(t){"0"==t.code?(a.onModelClose(),a.successMsg(t.msg||"操作成功"),a.gettradorder(a.coinInfo.coinid),a.getc2callorder(a.coinInfo.coinid).then(function(t){a.marketList=t}),a.getc2corder()):a.errMsg(t.msg||"操作失败")}))},onListClick:function(t){var e=this;this.coinInfo=t,this.getc2corder(),this.getc2callorder(this.coinInfo.coinid).then(function(t){e.marketList=t}),this.gettradorder(t.coinid),this.getMyAccount(t.coinid).then(function(t){t&&(e.myAvailable=t.usable)})},getC2Ccoin:function(){return this.request(this.api.getc2ccoin,{showLoading:0}).then(function(t){if(t.data&&t.data.list&&t.data.list.length>0)return n.a.resolve(t.data.list)})},getc2callorder:function(t){var e=this;return this.request(this.api.getc2callorder,{coin:t}).then(function(t){if("0"==t.code){var a=e.Util.sumCalc(t.data.list,"price","number");return n.a.resolve(a)}return n.a.reject(t)})},getc2corder:function(){var t=this;return this.request(this.api.getc2corder).then(function(e){"0"==e.code&&(t.Util.sumCalc(e.data.list,"price","number"),t.myOrderList=e.data.list)})},gettradorder:function(t){var e=this;return this.request(this.api.getmyc2ctrad,{coin:t}).then(function(t){if(t.data&&t.data.list){e.Util.sumCalc(t.data.list,"price","number");for(var a=0;a<t.data.list.length;a++){var s=t.data.list[a];0==s.type&&0==s.state?(s.status=0,s.status_i18n="label128"):1==s.type&&0==s.state?(s.status=1,s.status_i18n="label129"):0==s.type&&1==s.state?(s.status=2,s.status_i18n="label130"):1==s.type&&1==s.state&&(s.status=3,s.status_i18n="label131")}e.myC2COrderList=t.data.list}})},getC2CRecord:function(){var t=this;this.request(this.api.getc2chistory).then(function(e){try{t.C2CRecord=e.data.list}catch(t){}})},getMyAccount:function(t){return this.request(this.api.getaccount,{search:t,showLoading:!0}).then(function(t){if("0"==t.code)return n.a.resolve(t.data.list[0])})},validation:function(){return this.userData.isLogin?!!this.checkTradePassword():(this.errMsg("label120"),!1)},canTradeCheck:function(t){return"object"!=!this.Util.dataType(t)&&(t.tradstate>0&&t.bankstate>0&&t.idcardstate>0&&t.googlestate>0)},getState:function(){var t=this;return this.request(this.api.saftyState).then(function(e){if(e&&"0"!=e.code)return t.getDataFaild(e.msg);e.data&&e.data.list&&(t.bindState=e.data.list[0])})},confirmHandle:function(t){this.dialogId="0"==t.type?5:6,this.orderId=t.autoid,this.orderDetail={type:t.type,owner:"0"==t.type?t.sellname:t.buyname,bankCardNo:"0"==t.type?t.sellbannkcard:t.buybannkcard,depositBank:"0"==t.type?t.sellkhyh:t.buykhyh,bankBranches:"0"==t.type?t.sellkhzh:t.buykhzh,transferAmount:1*t.zj}},onModelClose:function(){this.dialogId=null},dealOrder:function(t,e){var a=this,s="0"==t?this.api.setsendok:this.api.setrealyok;if(0==t&&""==this.imgUrl)return this.errMsg("请上传凭证"),!1;this.request(s,{autoid:e,photo:this.imgUrl,showLoading:!0}).then(function(t){"0"==t.code?(a.successMsg(t.msg),a.getc2corder(),a.getc2callorder(a.coinInfo.coinid).then(function(t){a.marketList=t}),a.gettradorder(a.coinInfo.coinid)):a.errMsg(t.msg),a.onModelClose()})}}},x={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("my-header",{staticClass:"header-main"},[a("login-bar")],1),t._v(" "),a("el-container",[a("el-aside",{attrs:{width:"400px"}},[a("c2c-aside-comp",{attrs:{myData:t.currencyList},on:{onListClick:t.onListClick}})],1),t._v(" "),a("el-main",[a("div",{staticClass:"panel-head flex flex-v-center"},[a("img",{staticClass:"thumb-30",attrs:{src:"",alt:""}}),t._v(" "),a("span",{staticClass:"font-bold font-20"},[t._v(t._s(t.coinInfo.coinid)+"/CNY")]),t._v(" "),a("div",{staticClass:"market-condition"},[a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("livePrice")||"实时价")}}),t._v(" "),a("i",{domProps:{textContent:t._s("￥"+t.coinInfo.cny)}})]),t._v(" "),a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("increase")||"涨幅")}}),t._v(" "),a("i",{staticClass:"color-danger"},[t._v("+3.68%")])]),t._v(" "),a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("high")||"高")}}),t._v(" "),a("i",[t._v("￥7.29")])]),t._v(" "),a("span",[a("em",{staticClass:"color-666",domProps:{textContent:t._s(t.$t("low")||"低")}}),t._v(" "),a("i",[t._v("￥6.70")])])])]),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("div",{staticClass:"panel-container p-rel flex flex-between"},[a("div",{staticClass:"form-wrap"},[a("div",{staticClass:"font-18 font-bit-bold",domProps:{innerHTML:t._s(t.buyingLabel)}}),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("div",{staticClass:"account flex flex-between"},[a("span",{staticClass:"balance",domProps:{innerHTML:t._s(t.advisalPrice)}}),t._v(" "),a("router-link",{attrs:{to:"./property"},domProps:{textContent:t._s(t.$t("recharge")||"充值")}})],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("buyingValiation")||"买入估价")}}),t._v(" "),a("el-input",{model:{value:t.buyFormData.price,callback:function(e){t.$set(t.buyFormData,"price",e)},expression:"buyFormData.price"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("buyVol")||"买入量")}}),t._v(" "),a("el-input",{attrs:{placeholder:t.minNum},model:{value:t.buyFormData.number,callback:function(e){t.$set(t.buyFormData,"number",e)},expression:"buyFormData.number"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.coinInfo.coinid||"")},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("money")||"金额")}}),t._v(" "),a("el-input",{attrs:{disabled:"disabled",value:t.buyTotal}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("button",{staticClass:"btn-block btn-large btn-danger btn-active",domProps:{innerHTML:t._s(t.buyingLabel)},on:{click:t.buyHandle}})]),t._v(" "),a("div",{staticClass:"vertical-line p-abs abs-h-center"}),t._v(" "),a("div",{staticClass:"form-wrap"},[a("div",{staticClass:"font-18 font-bit-bold",domProps:{innerHTML:t._s(t.sellingLabel)}}),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("div",{staticClass:"account flex flex-between"},[a("span",{staticClass:"balance",domProps:{innerHTML:t._s(t.myAvailableLabel)}}),t._v(" "),a("router-link",{attrs:{to:"./property"},domProps:{textContent:t._s(t.$t("recharge")||"充值")}})],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("sellingValiation")||"卖出估价")}}),t._v(" "),a("el-input",{model:{value:t.sellFormData.price,callback:function(e){t.$set(t.sellFormData,"price",e)},expression:"sellFormData.price"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("sellVol")||"卖出量")}}),t._v(" "),a("el-input",{attrs:{placeholder:t.minNum},model:{value:t.sellFormData.number,callback:function(e){t.$set(t.sellFormData,"number",e)},expression:"sellFormData.number"}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},domProps:{textContent:t._s(t.coinInfo.coinid||"")},slot:"suffix"})])],1),t._v(" "),a("div",{staticClass:"input-group"},[a("label",{domProps:{textContent:t._s(t.$t("money")||"金额")}}),t._v(" "),a("el-input",{attrs:{disabled:"disabled",value:t.sellTotal}},[a("span",{staticClass:"unit",attrs:{slot:"suffix"},slot:"suffix"},[t._v("CNY")])])],1),t._v(" "),a("button",{staticClass:"btn-block btn-large btn-success btn-active",domProps:{innerHTML:t._s(t.sellingLabel)},on:{click:t.sellHandle}})])]),t._v(" "),a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header font-18 font-bit-bold",domProps:{textContent:t._s(t.$t("inOrder")||"市场挂单")}}),t._v(" "),a("div",{staticClass:"break-line"}),t._v(" "),a("el-table",{attrs:{fit:!0,"max-height":428,data:t.marketList}},[a("el-table-column",{attrs:{width:"120",label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{class:"0"==e.row.type?"color-danger":"color-success",domProps:{textContent:t._s("0"==e.row.type?t.$t("buy")||"买入":t.$t("sell")||"卖出")}})}}])}),t._v(" "),a("el-table-column",{attrs:{label:(t.$t("price")||"价格")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(1*e.row.price)+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.numberLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(1*e.row.number)+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:(t.$t("total")||"总计")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{domProps:{textContent:t._s(1*e.row.total)}})}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"member",label:t.$t("label188")||"商家"}}),t._v(" "),a("el-table-column",{attrs:{prop:"wdate",label:t.$t("createdTime")||"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("button",{staticClass:"btn-inline btn-mini btn-radius",class:"1"==e.row.type?"btn-danger":"btn-success",domProps:{textContent:t._s("1"==e.row.type?t.$t("buy"):t.$t("sell"))},on:{click:function(a){t.tradeConfirmHandle(e.row)}}})]}}])})],1)],1),t._v(" "),a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header font-18 font-bit-bold",domProps:{textContent:t._s(t.$t("myOrder"))}}),t._v(" "),t.userData.isLogin?[a("div",{staticClass:"break-line"}),t._v(" "),a("el-table",{attrs:{fit:!0,data:t.myOrderList}},[a("el-table-column",{attrs:{width:"150",prop:"autoid",label:t.$t("orderId")||"单号"}}),t._v(" "),a("el-table-column",{attrs:{width:"120",label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{class:"0"==e.row.type?"color-danger":"color-success",domProps:{textContent:t._s("0"==e.row.type?t.$t("buy")||"买入":t.$t("sell")||"卖出")}})}}])}),t._v(" "),a("el-table-column",{attrs:{label:(t.$t("price")||"价格")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1*e.row.price)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.numberLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1*e.row.number)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.amountLabel},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{domProps:{textContent:t._s(1*e.row.total)}})}}])}),t._v(" "),a("el-table-column",{attrs:{width:"200",prop:"wdate",label:t.$t("createdTime")||"建立时间"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return a("a",{staticClass:"color-danger",domProps:{textContent:t._s("撤单")},on:{click:function(a){t.cancelMyc2cOrder(e.row.autoid)}}})}}])})],1)]:t._e(),t._v(" "),a("unlogin-tip")],2),t._v(" "),a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header font-18 font-bit-bold",domProps:{textContent:t._s(t.$t("myCtcOrder")||"我的CTC交易订单")}}),t._v(" "),t.userData.isLogin?[a("div",{staticClass:"break-line"}),t._v(" "),a("el-table",{attrs:{data:t.myC2COrderList}},[a("el-table-column",{attrs:{width:"150",prop:"autoid",label:t.$t("orderId")||"单号"}}),t._v(" "),a("el-table-column",{attrs:{width:"150",label:t.$t("theirName")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(0==e.row.type?e.row.sellmember:e.row.buymember)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"120",label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{class:"0"==e.row.type?"color-danger":"color-success",domProps:{textContent:t._s("0"==e.row.type?t.$t("buy")||"买入":t.$t("sell")||"卖出")}})}}])}),t._v(" "),a("el-table-column",{attrs:{label:(t.$t("price")||"价格")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1*e.row.price)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.numberLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1*e.row.number)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.amountLabel},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{domProps:{textContent:t._s(1*e.row.total)}})}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"wdate",label:t.$t("createdTime")||"建立时间"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"200",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?a("span",{staticClass:"color-danger",on:{click:function(a){t.confirmHandle(e.row)}}},[t._v(t._s(t.$t(e.row.status_i18n))+"\n                ")]):3==e.row.status?a("div",[a("span",{staticClass:"color-danger",on:{click:function(a){t.confirmHandle(e.row)}}},[t._v(t._s(t.$t(e.row.status_i18n)))]),t._v("  \n                  "),e.row.photo?a("em",{staticClass:"color-primary",domProps:{textContent:t._s(t.$t("label193"))},on:{click:function(a){t.checkPhoto(e.row.photo)}}}):a("em",{staticClass:"color-primary",on:{click:function(a){t.cancelRequest(e.row.autoid)}}},[t._v("申诉")])]):a("div",[a("span",{staticClass:"color-success"},[t._v("\n                    "+t._s(t.$t(e.row.status_i18n))+"\n                  ")]),t._v("  \n                  "),e.row.photo?a("em",{staticClass:"color-primary",domProps:{textContent:t._s(t.$t("label193"))}}):a("em",{staticClass:"color-primary",on:{click:function(a){t.cancelRequest(e.row.autoid)}}},[t._v("申诉")])])]}}])})],1)]:t._e(),t._v(" "),a("unlogin-tip")],2),t._v(" "),a("div",{staticClass:"panel-container"},[a("div",{staticClass:"panel-header font-18 font-bit-bold",domProps:{textContent:t._s("C2C"+t.$t("label189"))}}),t._v(" "),t.userData.isLogin?[a("div",{staticClass:"break-line"}),t._v(" "),a("el-table",{attrs:{"max-height":500,data:t.C2CRecord}},[a("el-table-column",{attrs:{width:"150",prop:"autoid",label:t.$t("orderId")||"单号"}}),t._v(" "),a("el-table-column",{attrs:{width:"120",label:t.$t("type")||"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{class:"0"==e.row.type?"color-danger":"color-success",domProps:{textContent:t._s("0"==e.row.type?t.$t("buy")||"买入":t.$t("sell")||"卖出")}})}}])}),t._v(" "),a("el-table-column",{attrs:{label:(t.$t("price")||"价格")+"(CNY)"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1*e.row.price)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.numberLabel},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(1*e.row.number)+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("label188")||"用户账号"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s((e.row.type,e.row.sellmember))+"\n              ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.amountLabel},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v(t._s(1*e.row.zj))])}}])}),t._v(" "),a("el-table-column",{attrs:{width:"200",prop:"wdate",label:t.$t("createdTime")||"建立时间"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",label:t.$t("status")||"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{},[t._v("已完成")])}}])})],1)]:t._e(),t._v(" "),a("unlogin-tip")],2)])],1),t._v(" "),a("my-footer"),t._v(" "),a("trade-confirm",{attrs:{show:1==t.dialogId,title:t.$t("sellingConfirm"),numLabel:t.$t("sellingNum"),amountLabel:t.$t("sellingAmount"),valuationLabel:t.$t("sellingValiation"),tradeModeLabel:t.$t("tradeMethods"),number:t.confirmData.number,price:t.confirmData.price},on:{onSubmit:function(e){t.publicOrder(t.api.addsellc2c,t.confirmData)},closeModel:t.onModelClose}}),t._v(" "),a("trade-confirm",{attrs:{show:0==t.dialogId,title:t.$t("buyingConfirm"),numLabel:t.$t("buyingNum"),amountLabel:t.$t("buyingAmount"),valuationLabel:t.$t("buyingValiation"),tradeModeLabel:t.$t("tradeMethods"),number:t.confirmData.number,price:t.confirmData.price},on:{onSubmit:function(e){t.publicOrder(t.api.addbuyc2c,t.confirmData)},closeModel:t.onModelClose}}),t._v(" "),a("order-confirm",{attrs:{show:3==t.dialogId}}),t._v(" "),a("market-order",{attrs:{show:4==t.dialogId,title:t.$t(t.marketOrderCfg.titlei18nkey),volumnLabel:t.$t(t.marketOrderCfg.volumnLabeli18nkey),volumn:1*t.marketOrderDetail.number,price:1*t.marketOrderDetail.price,amount:1*t.marketOrderDetail.total,coin:t.marketOrderDetail.coinid},on:{onSubmit:function(e){t.tradeFromMarket(t.marketOrderDetail.type,t.marketOrderDetail.autoid)},closeModal:t.onModelClose}}),t._v(" "),a("order-paid",{attrs:{show:5==t.dialogId,title:t.$t("orderDetail")||"订单详情",formData:t.orderDetail},on:{onSubmit:function(e){t.dealOrder(t.orderDetail.type,t.orderId)},closeModal:t.onModelClose}},[a("div",{staticClass:"upload-file",attrs:{slot:"uploadfile"},slot:"uploadfile"},[a("input",{attrs:{type:"file"},on:{change:t.onChange}}),t._v(" "),a("button",{staticClass:"btn-success btn-small"},[t._v("上传凭证")])])]),t._v(" "),a("order-paid",{attrs:{show:6==t.dialogId,title:t.$t("orderDetail")||"订单详情",formData:t.orderDetail},on:{onSubmit:function(e){t.dealOrder(t.orderDetail.type,t.orderId)},closeModal:t.onModelClose}})],1)},staticRenderFns:[]};var L=a("VU/8")(k,x,!1,function(t){a("Op1E")},"data-v-34c75e4a",null);e.default=L.exports},keiJ:function(t,e){},mHgt:function(t,e){}});