webpackJsonp([38],{KQqa:function(t,a){},bAXb:function(t,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=o("XJyL"),e={data:function(){return{bindstate:{},bankcard:"12345678987654321",bank1:"12313",bank2:"46546",googlecode:"",password:""}},computed:{disabled:function(){return!(this.bank1&&this.bank2&&this.googlecode&&this.bankcard&&this.password)}},mounted:function(){var t=this;Object(s.X)().then(function(a){t.bindstate=a})},methods:{valide:function(){return!!this.Util.isBankNo(this.bankcard)||(this.$toast({message:"银行卡格式不正确"}),!1)},onSubmit:function(){var t=this;this.valide()&&Object(s.i)({bankcard:this.bankcard,bank1:this.bank1,bank2:this.bank2,googlecode:this.googlecode,password:this.password}).then(function(a){a&&t.navigateTo("/account")})}}},n={render:function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"container h-full van-hairline--top"},[o("div",{staticClass:"form overflow-y"},[o("div",{staticClass:"form-group"},[o("div",{staticClass:"label color-666 font-14"},[t._v("户主")]),t._v(" "),o("div",{staticClass:"form-input font-15 van-hairline--bottom"},[o("span",{staticClass:"font-bold color-666",domProps:{textContent:t._s(t.bindstate.username)}})])]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"label color-666 font-14"},[t._v("卡号")]),t._v(" "),o("div",{staticClass:"form-input font-15 van-hairline--bottom"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.bankcard,expression:"bankcard"}],staticClass:"h-35",attrs:{autocomplete:"off",placeholder:"请输入卡号"},domProps:{value:t.bankcard},on:{input:function(a){a.target.composing||(t.bankcard=a.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"label color-666 font-14"},[t._v("开户银行")]),t._v(" "),o("div",{staticClass:"form-input font-15 van-hairline--bottom"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.bank1,expression:"bank1"}],staticClass:"h-35",attrs:{autocomplete:"off",placeholder:"请输入开户银行"},domProps:{value:t.bank1},on:{input:function(a){a.target.composing||(t.bank1=a.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"label color-666 font-14"},[t._v("开户支行")]),t._v(" "),o("div",{staticClass:"form-input font-15 van-hairline--bottom"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.bank2,expression:"bank2"}],staticClass:"h-35",attrs:{autocomplete:"off",placeholder:"请输入开户支行"},domProps:{value:t.bank2},on:{input:function(a){a.target.composing||(t.bank2=a.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"label color-666 font-14"},[t._v("谷歌验证码")]),t._v(" "),o("div",{staticClass:"form-input font-15 van-hairline--bottom"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.googlecode,expression:"googlecode"}],staticClass:"h-35",attrs:{autocomplete:"off",placeholder:"请输入谷歌验证码"},domProps:{value:t.googlecode},on:{input:function(a){a.target.composing||(t.googlecode=a.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"label color-666 font-14"},[t._v("交易密码")]),t._v(" "),o("div",{staticClass:"form-input font-15 van-hairline--bottom"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"h-35",attrs:{autocomplete:"off",type:"password",placeholder:"请输入交易密码"},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value)}}})])])]),t._v(" "),o("div",{staticClass:"btn-group"},[o("button",{staticClass:"btn-large btn-block riple btn-primary",attrs:{disabled:t.disabled},on:{click:t.onSubmit}},[t._v("确定")])])])},staticRenderFns:[]};var i=o("C7Lr")(e,n,!1,function(t){o("KQqa")},"data-v-10d3916a",null);a.default=i.exports}});
//# sourceMappingURL=38.461cf6b4b23ddb818a98.js.map