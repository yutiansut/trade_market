webpackJsonp([24],{"/LfV":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("mvHQ");var n={data:function(){return{currentIndex:0,latestRecord:null,myRecord:null,showLoading:!1}},mounted:function(){this.routeModel.assetsRoutes={i18nKey:"financialRecord",title:this.$route.meta.title||"",path:this.$route.path},this.getRecord(this.api.getmyrecharge)},beforeRouteLeave:function(t,e,a){this.routeModel.assetsRoutes=null,a()},methods:{changeStyle:function(t){if(5==t.columnIndex)return"text-align:right;"},onTabClick:function(t,e){this.currentIndex=t,this.getRecord(this.api[e])},getRecord:function(t,e){var a=this;this.showLoading=!0,this.request(t,e||{}).then(function(t){if(a.showLoading=!1,t&&"0"!=t.code)return a.getDataFaild(t.msg),!1;t.data&&t.data.list&&(a.myRecord=t.data.list)})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"table-panel"},[a("div",{staticClass:"panel-head font-16",domProps:{textContent:t._s(t.$t("latest")||"最新")}}),t._v(" "),a("el-table",{attrs:{data:t.latestRecord,"header-cell-style":t.changeStyle,fit:!0}},[a("el-table-column",{attrs:{label:t.$t("time")||"时间"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("currencyType")||"币种"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("type")||"类型"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("amount")||"数量"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("status")||"状态"}}),t._v(" "),a("el-table-column",{attrs:{width:"120",label:t.$t("operation")||"操作"},scopedSlots:t._u([{key:"default",fn:function(t){return a("span",{})}}])})],1)],1),t._v(" "),a("div",{staticClass:"table-panel"},[a("div",{staticClass:"panel-head font-16"},[a("a",{class:0==t.currentIndex?"active":"",attrs:{href:"javascript:"},domProps:{textContent:t._s(t.$t("rechargeRecord")||"充币记录")},on:{click:function(e){t.onTabClick(0,"getmyrecharge")}}}),t._v(" "),a("a",{class:1==t.currentIndex?"active":"",attrs:{href:"javascript:"},domProps:{textContent:t._s(t.$t("withdrawRecord")||"提币记录")},on:{click:function(e){t.onTabClick(1,"getmyput")}}})]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.showLoading,expression:"showLoading"}],attrs:{data:t.myRecord,"header-cell-style":t.changeStyle,fit:!0}},[a("el-table-column",{attrs:{prop:"wdate",label:t.$t("time")||"时间"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"coin",label:t.$t("currencyType")||"币种"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"number",label:t.$t("amount")||"数量"}}),t._v(" "),a("el-table-column",{attrs:{align:"right",label:t.$t("status")||"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return a("span",{domProps:{textContent:t._s(t.$t("completed"))}})}}])})],1)],1)])},staticRenderFns:[]};var o=a("VU/8")(n,l,!1,function(t){a("fBmB")},"data-v-96a64e58",null);e.default=o.exports},fBmB:function(t,e){}});