webpackJsonp([15],{QFCW:function(t,e){},RlDE:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("XJyL"),o={data:function(){return{orderStatus:0,orderDetail:{}}},mounted:function(){var t=this,e=this.$route.query,r=e.id,o=e.type;if(!r)return!1;Object(a.G)().then(function(e){if(e&&e.length>0)for(var a=null,s=0;s<e.length;s++)e[s].autoid==r&&e[s].type==o&&(a=e[s],t.orderDetail=a)})},computed:{btnText:function(){return 0==this.orderDetail.type&&0==this.orderDetail.state?"我已付款":1==this.orderDetail.type&&0==this.orderDetail.state?"待对方打款":0==this.orderDetail.type&&1==this.orderDetail.state?"待对方收款":1==this.orderDetail.type&&1==this.orderDetail.state?"确认收款":"已完成"}},methods:{handleOrder:function(){var t=this;0==this.orderDetail.type&&0==this.orderDetail.state?Object(a.o)(this.orderDetail.autoid).then(function(e){e&&(t.orderDetail.state=1)}):1==this.orderDetail.type&&1==this.orderDetail.state&&Object(a.p)(this.orderDetail.autoid).then(function(e){e&&t.navigateTo("/trade/c2c_trade")})}}},s={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-main wh-full"},[r("my-header"),t._v(" "),r("div",{staticClass:"app-body h-full"},[r("dl",{staticClass:"confirm-payment content"},[r("dt",[r("span",{domProps:{textContent:t._s(0==t.orderDetail.type?"卖方":"买方")}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("真实姓名")]),t._v(" "),r("span",{domProps:{textContent:t._s(0==t.orderDetail.type?t.orderDetail.sellname:t.orderDetail.buyname)}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("银行卡号")]),t._v(" "),r("span",{domProps:{textContent:t._s(0==t.orderDetail.type?t.orderDetail.sellbannkcard:t.orderDetail.buybannkcard)}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("开户银行")]),t._v(" "),r("span",{domProps:{textContent:t._s(0==t.orderDetail.type?t.orderDetail.sellkhyh:t.orderDetail.buykhyh)}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("开户支行")]),t._v(" "),r("span",{domProps:{textContent:t._s(0==t.orderDetail.type?t.orderDetail.sellkhzh:t.orderDetail.buykhzh)}})])]),t._v(" "),r("dl",{staticClass:"confirm-payment content"},[r("dd",[r("span",{staticClass:"color-999"},[t._v("单号")]),t._v(" "),r("span",{domProps:{textContent:t._s(t.orderDetail.autoid)}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("价格")]),t._v(" "),r("span",{domProps:{textContent:t._s(1*t.orderDetail.price)}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("数量")]),t._v(" "),r("span",{domProps:{textContent:t._s(1*t.orderDetail.number)}})]),t._v(" "),r("dd",[r("span",{staticClass:"color-999"},[t._v("金额")]),t._v(" "),r("span",{domProps:{textContent:t._s(1*t.orderDetail.zj)}})])])]),t._v(" "),r("button",{staticClass:"confirm-btn btn-block riple btn-large btn-primary",attrs:{disabled:t.orderDetail.type!=t.orderDetail.state},domProps:{textContent:t._s(t.btnText)},on:{click:t.handleOrder}})],1)},staticRenderFns:[]};var n=r("C7Lr")(o,s,!1,function(t){r("QFCW")},"data-v-bc0bf912",null);e.default=n.exports}});
//# sourceMappingURL=15.ed19e5e18ed282107b53.js.map