webpackJsonp([22],{Ife0:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("mvHQ");var a=i("MWE1").a.newsList,n={data:function(){return{articleDetail:null}},mounted:function(){var t=this,e=this.$route.params.id;a?a.map(function(i){i.id==e&&(t.articleDetail=i)}):(this.getDetail(e),this.addReadNum(e))},methods:{getDetail:function(t){var e=this;this.request(this.api.notice,{id:t}).then(function(t){if(t&&"0"!=t.code)return e.getDataFaild(t.msg);t.data&&t.data.result&&(e.articleDetail=t.data.result[0])})},addReadNum:function(t){var e=this;this.request(this.api.addreadnum,{id:t}).then(function(t){if(t&&"0"!=t.code)return e.getDataFaild(t.msg)})}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.articleDetail?i("div",{staticClass:"content wh-full"},[i("div",{staticClass:"title",domProps:{textContent:t._s(t.articleDetail.title)}}),t._v(" "),i("div",{staticClass:"info"},[i("span",{domProps:{textContent:t._s(t.articleDetail.writedate)}}),t._v(" "),t.articleDetail.num?i("span",[t._v(t._s(t.$t("view")||"阅读")+"："+t._s(t.articleDetail.num))]):t._e()]),t._v(" "),i("div",{staticClass:"break-line"}),t._v(" "),i("div",{staticClass:"article-content",domProps:{innerHTML:t._s(t.articleDetail.con)}})]):t._e()},staticRenderFns:[]};var r=i("VU/8")(n,s,!1,function(t){i("iH1J")},"data-v-b11dc478",null);e.default=r.exports},iH1J:function(t,e){}});