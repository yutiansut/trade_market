webpackJsonp([22],{U0Wl:function(t,o){},gkMh:function(t,o,s){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=s("NLrs"),a=s("QPSP"),n=s("JRrC"),i=s("i7Lb"),l=s("XJyL"),r={components:{appHeader:e.a,slidePop:a.a,userAside:n.a},mixins:[i.a],data:function(){return{}},mounted:function(){Object(l.Z)()},computed:{totalAmount:function(){return this.Store.state.userInfo.amount||0}},methods:{showSlide:function(){this.showPop=!0},closeSlide:function(){this.showPop=!1}}},c={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"content app-body overflow-y h-full"},[s("slide-pop",{attrs:{showPop:t.showPop},on:{onClose:t.closeSlide}},[s("user-aside",{attrs:{slot:"content"},slot:"content"})],1),t._v(" "),s("app-header",{attrs:{iconLeft:t.assetConfig.imgs.user_head_portrait},on:{onHeadClick:t.showSlide}},[s("div",{staticClass:"header-title font-16 font-bold abs-vh-center",attrs:{slot:"title"},domProps:{textContent:t._s(t.Store.state.headerTitle)},slot:"title"}),t._v(" "),s("div",{staticClass:"font-14 riple hd-slot-right",attrs:{slot:"right"},on:{click:function(o){t.navigateTo("/property/record")}},slot:"right"},[t._v("记录")])]),t._v(" "),s("div",{staticClass:"account"},[s("div",{staticClass:"title font-16"},[t._v("我的账户")]),t._v(" "),s("div",{staticClass:"label font-14"},[t._v("总资产")]),t._v(" "),s("div",{staticClass:"account-balance font-20 font-bold"},[t._v("￥"+t._s(t.totalAmount)+" ")])]),t._v(" "),s("div",{staticClass:"account-list"},t._l(t.Store.state.myProperty,function(o,e){return s("div",{key:e,staticClass:"list-item van-hairline--bottom"},[s("router-link",{attrs:{to:"/property/property_detail/"+o.name}},[s("div",{staticClass:"item-title flex flex-v-center flex-between"},[s("div",{staticClass:"flex flex-v-center"},[s("img",{staticClass:"coin-logo thumb-30",attrs:{src:o.logo}}),t._v(" "),s("span",{staticClass:"font-18 font-bold",domProps:{textContent:t._s(o.name)}})]),t._v(" "),s("van-icon",{attrs:{name:"arrow"}})],1),t._v(" "),s("van-row",[s("van-col",{attrs:{span:"8"}},[s("div",[t._v("可用")]),t._v(" "),s("div",{domProps:{textContent:t._s(1*o.usable)}})]),t._v(" "),s("van-col",{attrs:{span:"8"}},[s("div",[t._v("锁定")]),t._v(" "),s("div",{domProps:{textContent:t._s(1*o.disable)}})]),t._v(" "),s("van-col",{attrs:{span:"8"}},[s("div",[t._v("折合（CNY）")]),t._v(" "),s("div",{domProps:{textContent:t._s(1*o.total)}})])],1)],1)],1)}),0)],1)},staticRenderFns:[]};var d=s("C7Lr")(r,c,!1,function(t){s("U0Wl")},"data-v-72a4cb35",null);o.default=d.exports}});
//# sourceMappingURL=22.1f22d851030e692f0ad7.js.map