webpackJsonp([20],{cRgD:function(t,e){},lLYC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={data:function(){return{showLoading:!1,commissionList:[]}},mounted:function(){var t=this;this.request(this.api.proceeds).then(function(e){t.showLoading=!1;try{t.commissionList=e.data.list}catch(t){}})},methods:{}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"title font-16 font-bold",domProps:{textContent:t._s(t.$t("label194"))}}),t._v(" "),a("div",{staticClass:"table-wrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.showLoading,expression:"showLoading"}],attrs:{"max-height":"500",data:t.commissionList}},[a("el-table-column",{attrs:{label:t.$t("currencyType"),prop:"wdate",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("currencyType"),prop:"coin",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",label:t.$t("amount")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(1*e.row.number))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("label195"),prop:"offer",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",label:t.$t("label197")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.relation+t.$t("label196")))]}}])})],1)],1)])},staticRenderFns:[]};var n=a("VU/8")(l,o,!1,function(t){a("cRgD")},"data-v-d08f57d4",null);e.default=n.exports}});