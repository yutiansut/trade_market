webpackJsonp([37],{a3vn:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("XJyL"),a={mounted:function(){Object(s.Q)()},methods:{logOut:function(){var t=this;Object(s.c)().then(function(e){t.storage.set("isLogin",!1),t.navigateTo("/userentry/login")})}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container h-full"},[n("div",{staticClass:"content van-hairline--top h-full"},[n("div",{staticClass:"flex flex-between flex-v-center"},[n("img",{staticClass:"thumb-40 thumb-round",attrs:{src:t.assetConfig.imgs.user_head_portrait}}),t._v(" "),n("span",{staticClass:"font-15",domProps:{textContent:t._s(t.Store.state.userInfo.tel||t.Store.state.userInfo.email)}})])]),t._v(" "),n("div",{staticClass:"btn-group"},[n("button",{staticClass:"btn-primary btn-large btn-block",on:{click:t.logOut}},[t._v("退出登录")])])])},staticRenderFns:[]};var o=n("C7Lr")(a,i,!1,function(t){n("jaFC")},"data-v-11f197d2",null);e.default=o.exports},jaFC:function(t,e){}});
//# sourceMappingURL=37.17530c7f7cc959d75e91.js.map