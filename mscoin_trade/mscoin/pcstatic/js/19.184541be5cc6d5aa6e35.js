webpackJsonp([19],{kRrR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("//Fk"),n=a.n(s),o=a("Dd8w"),i=a.n(o),l=(a("mvHQ"),{data:function(){return{allCoin:"",formData:{coin:"",address:"",title:""},showLoading:!1,addrList:[]}},mounted:function(){this.routeModel.assetsRoutes={i18nKey:"addressAdmin",title:this.$route.meta.title||"",path:this.$route.path},this.getMyAddress(),this.getallcoin()},beforeRouteLeave:function(t,e,a){this.routeModel.assetsRoutes=null,a()},methods:{getallcoin:function(){var t=this;this.request(this.api.allcoin).then(function(e){if(e&&"0"!=e.code)return t.getDataFaild(e.msg),!1;e.data&&e.data.list&&(t.allCoin=e.data.list)})},changeStyle:function(t){if(3==t.columnIndex)return"text-align:right;"},getMyAddress:function(){var t=this;this.showLoading=!0,this.request(this.api.getoutaddress).then(function(e){if(t.showLoading=!1,e&&"0"!=e.code)return t.getDataFaild(e.msg),!1;e.data&&e.data.list&&(t.addrList=e.data.list)})},addMyAddress:function(t){var e=this;this.request(this.api.addoutaddress,i()({},t,{showLoading:!0})).then(function(t){return t&&"0"!=t.code?(e.getDataFaild(t.msg),!1):(e.successMsg(t.msg||"添加成功"),e.getMyAddress(),n.a.resolve())})},delLocalAddr:function(t){this.addrList.splice(t,1)},delAddr:function(t,e){var a=this;this.request(this.api.deloutaaddress,{autoid:t,showLoading:!0}).then(function(t){"0"==t.code&&(a.successMsg(t.msg||"删除成功"),a.delLocalAddr(e))})}}}),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"add-addr"},[a("el-form",{attrs:{inline:!0,"label-position":"top",model:t.formData},nativeOn:{submit:function(t){t.preventDefault()}}},[a("div",{staticClass:"flex flex-between"},[a("el-form-item",{attrs:{label:t.$t("currencyType")||"币种"}},[a("el-select",{attrs:{name:"currency"},model:{value:t.formData.coin,callback:function(e){t.$set(t.formData,"coin",e)},expression:"formData.coin"}},t._l(t.allCoin,function(t){return a("el-option",{key:t.value,attrs:{label:t.coin,value:t.coin}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("withdrawAddress")||"提币地址"}},[a("el-input",{attrs:{name:"address"},model:{value:t.formData.address,callback:function(e){t.$set(t.formData,"address",e)},expression:"formData.address"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("note")||"备注"}},[a("el-input",{attrs:{name:"note"},model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1)],1),t._v(" "),a("button",{staticClass:"btn btn-block btn-large btn-danger btn-active",domProps:{textContent:t._s(t.$t("add")||"添加")},on:{click:function(e){t.addMyAddress(t.formData)}}})])],1),t._v(" "),a("div",{staticClass:"table-panel"},[a("div",{staticClass:"panel-head",domProps:{textContent:t._s(t.$t("addressList")||"地址列表")}}),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.showLoading,expression:"showLoading"}],attrs:{data:t.addrList,"header-cell-style":t.changeStyle}},[a("el-table-column",{attrs:{label:t.$t("currencyType")||"币种"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.coin||e.row.coinid)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:t.$t("withdrawAddress")||"提币地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:t.$t("note")||"备注"}}),t._v(" "),a("el-table-column",{attrs:{width:"150",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"operation color-danger txt-rt",domProps:{textContent:t._s(t.$t("delete")||"删除")},on:{click:function(a){t.delAddr(e.row.autoid,e.$index)}}})}}])})],1)],1)])},staticRenderFns:[]};var r=a("VU/8")(l,d,!1,function(t){a("yNX7")},"data-v-e9872828",null);e.default=r.exports},yNX7:function(t,e){}});