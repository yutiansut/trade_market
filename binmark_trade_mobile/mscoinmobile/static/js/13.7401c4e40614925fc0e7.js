webpackJsonp([13],{"4YfN":function(t,e,s){"use strict";e.__esModule=!0;var o,a=s("aA9S"),i=(o=a)&&o.__esModule?o:{default:o};e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o])}return t}},YsEV:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("4YfN"),a=s.n(o),i=s("XJyL"),n={mixins:[s("i7Lb").d],data:function(){return{type:0,account:"",password:"",repassword:""}},computed:{disabled:function(){return!(this.account&&this.password&&this.repassword&&this.code)}},methods:{validate:function(){return this.Util.isPassword(this.password)?this.password!=this.repassword?(this.$toast({message:"两次输入密码不匹配",position:"bottom"}),!1):!(!this.Util.isPhone(this.account)&&!this.Util.isEmail(this.account))||(this.$toast({message:"邮箱或者手机号格式不正确",position:"bottom"}),!1):(this.$toast({message:"密码必须为6-12为字母开头字符",position:"bottom"}),!1)},sendCode:function(){var t=this;this.Util.isPhone(this.account)||this.Util.isEmail(this.account)?(this.timeCountDown(),Object(i._6)(this.account,0==this.type?2:3).then(function(e){e&&t.$toast({message:e.msg,position:"bottom"})})):this.$toast({message:"邮箱或者手机号格式不正确",position:"bottom"})},onSubmit:function(){var t=this;this.validate()&&Object(i._3)(a()({},this.$data)).then(function(e){t.$toast({message:e.msg,position:"bottom"}),t.navigateTo("/userentry/login")})},onTypeChange:function(){this.type=0==this.type?1:0}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"resetpassword"},[s("div",{staticClass:"page-head font-26"},[t._v("重置密码")]),t._v(" "),s("form",{staticClass:"reset-form",on:{submit:function(t){t.preventDefault()}}},[s("van-field",{attrs:{type:"password",autocomplete:"off",placeholder:"请输入新密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("van-field",{attrs:{type:"password",autocomplete:"off",placeholder:"请再次输入密码"},model:{value:t.repassword,callback:function(e){t.repassword=e},expression:"repassword"}}),t._v(" "),s("van-field",{attrs:{autocomplete:"off",placeholder:0==t.type?"请输入手机号":"请输入邮箱"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}},[s("van-button",{staticClass:"p-rel",attrs:{slot:"button",size:"small"},on:{click:t.onTypeChange},slot:"button"},[s("img",{staticClass:"fl p-abs abs-v-center icon-arrow",attrs:{src:t.assetConfig.imgs.arrow_exchange}}),t._v(" "),s("span",{staticClass:"color-primary font-12",domProps:{textContent:t._s(0==t.type?"邮箱验证":"手机验证")}})])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.type,expression:"type==0"}],staticClass:"input-wrap flex flex-between font-14"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{autocomplete:"off",type:"text",placeholder:"手机验证码"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),s("span",{staticClass:"color-primary ",on:{click:t.sendCode}},[t._v(t._s(t.codeText))])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.type,expression:"type==1"}],staticClass:"input-wrap flex flex-between font-14"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{autocomplete:"off",type:"text",placeholder:"邮箱验证码"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),s("span",{staticClass:"color-primary ",on:{click:t.sendCode}},[t._v(t._s(t.codeText))])]),t._v(" "),s("div",{staticClass:"van-hairline--bottom"}),t._v(" "),s("button",{staticClass:"btn-submit btn-block btn-primary btn-large btn-default riple",attrs:{disabled:t.disabled},on:{click:t.onSubmit}},[t._v("重置")])],1)])},staticRenderFns:[]};var c=s("C7Lr")(n,r,!1,function(t){s("hTgy")},"data-v-6e6b1ba4",null);e.default=c.exports},hTgy:function(t,e){}});
//# sourceMappingURL=13.7401c4e40614925fc0e7.js.map