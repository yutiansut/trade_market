import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Main',
    component: r => require(['@/view/Main'], r),
    meta: { auth: false, title: "首页" }
  },
  {
    path: '/user',
    name: 'user',
    component: r => require(['@/view/user/User'], r),
    redirect: "/user/login",
    children: [
      {
        path: '/user/login',
        name: 'Login',
        component: r => require(['@/view/user/Login'], r),
        meta: { auth: false, title: "用户登录" }
      },
      {
        path: '/user/register',
        name: 'register',
        component: r => require(['@/view/user/Register'], r),
        meta: { auth: false, title: "用户注册" }
      },
      {
        path: '/user/resetpwd',
        name: 'resetpwd',
        component: r => require(['@/view/user/resetPassword'], r),
        meta: { auth: false, title: "重置密码" }
      }
    ]
  },
  {
    path: '/property',
    component: r => require(['@/view/property/Main'], r),
    redirect: 'Property',
    children: [
      {
        path: '/',
        name: 'Property',
        component: r => require(['@/view/property/Property'], r),
        meta: { auth: true, title: "我的资产" }
      },
      {
        path: '/property/address_admin',
        name: 'addressAdmin',
        component: r => require(['@/view/property/addressAdmin'], r),
        meta: { auth: true, title: "添加地址" }
      },
      {
        path: '/property/property_record',
        name: 'propertyRecord',
        component: r => require(['@/view/property/propertyRecord'], r),
        meta: { auth: true, title: "财务记录" }
      }
    ]
  },
  {
    path: '/account',
    component: r => require(['@/view/account/Main'], r),
    redirect: '/account/security',
    children: [
      {
        path: '/account/security',
        name: 'Security',
        component: r => require(['@/view/account/Security'], r),
        meta: { auth: true, title: "账户安全" }
      },
      {
        path: '/account/identify',
        name: 'Identify',
        component: r => require(['@/view/account/Identify'], r),
        meta: { auth: true, title: "身份认证" }
      }, {
        path: "/account/work_order",
        name: "workOrder",
        component: r => require(['@/view/account/workOrder'], r),
        meta: { auth: true, title: "提交工单" }
      }
    ]
  },
  {
    path: '/my',
    redirect: '/my/order_detail',
    component: r => require(['@/view/my/Main'], r),
    children: [
      {
        path: '/my/order_detail',
        name: 'orderDetail',
        component: r => require(['@/view/my/orderDetail'], r),
        meta: { auth: true, title: "订单详情" }
      },
      {
        path: '/my/entrustment',
        name: 'Entrustment',
        component: r => require(['@/view/my/Entrustment'], r),
        meta: { auth: true, title: "我的委托" }
      },
      {
        path: '/my/deal_history',
        name: 'dealHistory',
        component: r => require(['@/view/my/dealHistory'], r),
        meta: { auth: true, title: "交易历史" }
      },
      {
        path: '/my/otc_history',
        name: 'otcHistory',
        component: r => require(['@/view/my/otcHistory'], r),
        meta: { auth: true, title: "OTC记录" }
      },
      {
        path: '/my/c2c_history',
        name: 'c2cHistory',
        component: r => require(['@/view/my/c2cHistory'], r),
        meta: { auth: true, title: "CTC记录" }
      }
    ]
  },
  {
    path: '/currency_trade',
    name: 'currencyTrade',
    component: r => require(['@/view/currencyTrade'], r),
    meta: { auth: false, title: "币币交易" }
  },
  {
    path: '/c2c_trade',
    name: 'c2cTrade',
    component: r => require(['@/view/C2CTrade'], r),
    meta: { auth: false, title: "C2C交易" }
  },
  {
    path: '/otc_trade',
    name: 'otcTrade',
    component: r => require(['@/view/OTCTrade'], r),
    meta: { auth: false, title: "OTC交易" }
  },
  {
    path: '/notice',
    component: r => require(['@/view/notices/Notice'], r),
    children: [
      {
        path: '/',
        name: 'noticeList',
        component: r => require(['@/view/notices/noticeList'], r),
        meta: { auth: false, title: "系统公告" },
      },
      {
        path: '/notice/detail/:id',
        name: 'detail',
        component: r => require(['@/view/notices/noticeDetail'], r),
        meta: { auth: false, title: "系统公告详情" }
      }
    ]
  },
  {
    path: '/application',
    name: 'application',
    component: r => require(['@/view/Application'], r),
    meta: { auth: false, title: "上币申请" }
  },
  {
    path: '/help_center',
    component: r => require(['@/view/helpCenter/helpCenter'], r),
    redirect: '/help_center/fee',
    children: [
      {
        path: '/help_center/fee',
        name: 'fee',
        component: r => require(['@/view/helpCenter/Fee'], r),
        meta: { title: "帮助中心-费用说明" }
      },
      {
        path: '/help_center/currency_intro',
        name: 'currencyIntro',
        component: r => require(['@/view/helpCenter/currencyIntro'], r),
        meta: { title: "帮助中心-币种介绍" }
      },
      {
        path: '/help_center/faq',
        name: 'FAQ',
        component: r => require(['@/view/helpCenter/Faq'], r),
        meta: { title: "帮助中心-问题中心" }
      },
      {
        path: '/help_center/faq_detail',
        name: 'faqDetail',
        component: r => require(['@/view/helpCenter/faqDetail'], r),
        meta: { title: "帮助中心-问题中心" }
      }
    ]
  },
  {
    path: "/kline_trade",
    name: "klineTrade",
    component: r => require(['@/view/klineTrade'], r),
    meta: { auth: false, title: 'K线交易' }
  }
]
export default new Router({ routes });
