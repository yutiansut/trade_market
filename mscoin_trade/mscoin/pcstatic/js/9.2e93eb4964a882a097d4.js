webpackJsonp([9],{AsyL:function(t,i){},JEHA:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("yPbj"),a=(e("Gj2q"),{components:{CeAsideComp:n.a},methods:{getRowData:function(t){this.navigateTo("/currency_trade",{maincoinid:t.maincoinid,coinid:t.coinid})}}}),o={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"main wh-full"},[i("my-header",{staticClass:"header-main"},[i("login-bar")],1),this._v(" "),i("el-container",[i("el-aside",{attrs:{width:"24%"}},[i("ce-aside-comp",{on:{onRowClick:this.getRowData}})],1),this._v(" "),i("el-main",[i("router-view")],1)],1),this._v(" "),i("my-footer")],1)},staticRenderFns:[]};var s=e("VU/8")(a,o,!1,function(t){e("AsyL")},"data-v-6c0248dc",null);i.default=s.exports},wYp3:function(t,i){},yPbj:function(t,i,e){"use strict";e("mvHQ");var n=e("SPPm"),a=e("2Uyi"),o={name:"ce-aside-comp",data:function(){return{mainCoinModel:n.a,currentId:0,tableData:null,showLoading:!0}},mounted:function(){var t=this;if(n.a.coinid)return this.$route.query.maincoinid&&(n.a.coinid=this.$route.query.maincoinid),this.getTradCoin(n.a.coinid),void(this.currentId=n.a.coinid);this.$bus.on("mainCoinLoad",function(i){t.currentId=i,t.getTradCoin(i)})},destroyed:function(){this.$bus.off("tradeCoinLoad")},methods:{onTabChange:function(){if("opt"==this.currentId){var t=this.storage.get("customList");if(this.tableData=(t&&t.length)>0?t:[],!t[0])return!1;this.passCoinInfo(t)}else this.getTradCoin(this.currentId)},passCoinInfo:function(t,i,e){if(!t)return!1;var n=t[0];i&&e&&t.map(function(t){t.maincoinid&&t.coinid&&t.maincoinid==i&&t.coinid==e&&(n=t)}),this.$bus.emit("tradeCoinLoad",n)},addMylist:function(t,i){var e=t;this.$set(this.tableData,i,e),e.isMyLike=!e.isMyLike,e.isMyLike?Object(a.a)(e):"opt"==this.currentId?this.tableData=Object(a.d)(e):Object(a.d)(e)},getTradCoin:function(t){var i=this;this.showLoading=!0,this.request(this.api.getTradCoin,{maincoin:t}).then(function(e){if(i.showLoading=!1,e&&"0"!=e.code)return i.getDataFaild(e.msg),!1;n.a.coinid=t,e.data&&e.data.list&&(i.tableData=Object(a.b)(e.data.list),e.data.list[0]&&i.passCoinInfo(e.data.list,i.$route.query.maincoinid,i.$route.query.coinid))})},onTableRowClick:function(t){this.$emit("onRowClick",t)}}},s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"side"},[e("div",{staticClass:"tab-wrap p-rel"},[e("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.onTabChange},model:{value:t.currentId,callback:function(i){t.currentId=i},expression:"currentId"}},[t._l(t.mainCoinModel.maincoin,function(i,n){return e("el-tab-pane",{key:n,attrs:{label:i.coinid+" "+t.$t("trade"),name:i.coinid}})}),t._v(" "),e("el-tab-pane",{directives:[{name:"show",rawName:"v-show",value:t.mainCoinModel.maincoin,expression:"mainCoinModel.maincoin"}],attrs:{label:t.$t("optMarket"),name:"opt"}})],2)],1),t._v(" "),e("el-input",{attrs:{"suffix-icon":"el-icon-search"}}),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.showLoading,expression:"showLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:t.tableData,stripe:""},on:{"row-click":t.onTableRowClick}},[e("el-table-column",{attrs:{label:t.$t("coin")||"币种",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticClass:"operate"},[i.row.icon||i.row.logo?e("img",{staticClass:"thumb-20 m-right-10",attrs:{src:i.row.icon||i.row.logo,alt:""}}):t._e(),t._v(" "),e("span",[t._v(t._s(i.row.coinid))])])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:t.$t("latestPrice")||"最新价"},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v("\n          "+t._s(1*i.row.prise)+"\n        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:t.$t("increase")||"涨幅"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("span",{class:1*i.row.rise>0?"color-danger":"color-success",domProps:{textContent:t._s(1*i.row.rise+"%")}})]}}])}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:t.$t("optional")||"自选"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{staticClass:"operate flex flex-h-center",on:{click:function(e){e.stopPropagation(),t.addMylist(i.row,i.$index)}}},[e("i",{staticClass:"font-18 flex-center",class:i.row.isMyLike?"el-icon-star-on":"el-icon-star-off"})])]}}])})],1)],1)},staticRenderFns:[]};var r=e("VU/8")(o,s,!1,function(t){e("wYp3")},"data-v-59de7f9e",null);i.a=r.exports}});