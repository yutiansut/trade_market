webpackJsonp([14],{Uq4N:function(t,s){},pXsP:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("XJyL"),o={data:function(){return{account:"",password:""}},mounted:function(){},computed:{disabled:function(){return!this.account||!this.password}},methods:{validate:function(){return this.Util.isUserName(this.account)?!!this.Util.isPassword(this.password)||(this.$toast({message:"密码必须为6-12位字符",position:"bottom"}),!1):(this.$toast({message:"用户名必须由6-12位字母及数字组成",position:"bottom"}),!1)},onSubmit:function(){var t=this;this.validate()&&Object(e.m)(this.account,this.password).then(function(s){t.Store.dispatch("updateCheckLoginState",s),t.navigateTo("/userentry/check_login",{account:t.account})})},onTabChange:function(){}}},n={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"login user-entry"},[a("div",{staticClass:"page-head font-bold"},[a("img",{staticClass:"login-logo",attrs:{src:t.assetConfig.imgs.logo_1,alt:""}})]),t._v(" "),a("p",{staticClass:"label font-14 color-999"},[t._v("欢迎登录MSCOIN")]),t._v(" "),a("form",{staticClass:"form",on:{submit:function(s){return s.preventDefault(),t.onSubmit(s)}}},[a("van-field",{attrs:{autocomplete:"off",placeholder:"请输入用户名"},model:{value:t.account,callback:function(s){t.account=s},expression:"account"}}),t._v(" "),a("van-field",{attrs:{autocomplete:"off",type:"password",placeholder:"请输入密码"},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),t._v(" "),a("button",{staticClass:"btn-block btn-primary btn-large btn-default riple",attrs:{disabled:t.disabled}},[t._v("登录")]),t._v(" "),a("p",{staticClass:"login-links color-999 font-14 flex flex-between"},[a("router-link",{attrs:{to:"/userentry/resetpassword"}},[t._v("忘记密码")]),t._v(" "),a("span",[t._v("还没有账号？\n        "),a("router-link",{staticClass:"color-primary",attrs:{to:"/userentry/register"}},[t._v("注册")])],1)],1)],1)])},staticRenderFns:[]};var i=a("C7Lr")(o,n,!1,function(t){a("Uq4N")},"data-v-d82f669a",null);s.default=i.exports}});
//# sourceMappingURL=14.446e18d5075421a92a1b.js.map