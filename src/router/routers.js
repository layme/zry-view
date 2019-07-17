import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * name: 要和组件中的name一一对应，这个是为了满足keep alive的include，keep alive根据组件name缓存组件
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_workbench',
    redirect: '/workbench',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        meta: {
          hideInMenu: true,
          title: '工作台',
          notCache: true,
          icon: 'md-speedometer'
        },
        component: () => import('@/view/workbench/workbench')
      }
    ]
  },
  {
    path: '/trading',
    name: 'trading',
    meta: {
      icon: 'ios-cube',
      title: '交易'
    },
    component: Main,
    children: [
      {
        path: 'order',
        name: 'orderList',
        meta: {
          title: '订单列表',
          access: ['/order/toListOrder.action']
        },
        component: () => import('@/view/trading/order-list/orderList.vue')
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        meta: {
          title: '订单详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/trading/order-detail/orderDetail.vue')
      },
      {
        path: 'refund',
        name: 'refundList',
        meta: {
          title: '退款列表',
          access: ['/refund/toNewListRefund.action']
        },
        component: () => import('@/view/trading/refund-list/refundList.vue')
      },
      {
        path: 'refundDetail',
        name: 'refundDetail',
        meta: {
          title: '退款详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/trading/refund-detail/refundDetail.vue')
      }
    ]
  },
  {
    path: '/resource',
    name: 'resource',
    meta: {
      icon: 'ios-home',
      title: '房源'
    },
    component: Main,
    children: [
      {
        path: 'project',
        name: 'projectList',
        meta: {
          title: '项目',
          access: ['/project/toListProject.action']
        },
        component: () => import('@/view/resource/project-list/projectList.vue')
      },
      {
        path: 'addProject',
        name: 'addProject',
        meta: {
          title: '新增项目',
          hideInMenu: true
        },
        component: () => import('@/view/resource/project-action/project.vue')
      },
      {
        path: 'updateProject',
        name: 'updateProject',
        meta: {
          title: '修改项目',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/resource/project-action/project.vue')
      },
      {
        path: 'owner',
        name: 'ownerList',
        meta: {
          title: '业主',
          access: ['/owner/toOwnerList.action']
        },
        component: () => import('@/view/resource/owner-list/ownerList.vue')
      }
    ]
  },
  {
    path: '/price',
    name: 'price',
    meta: {
      icon: 'ios-pricetags',
      title: '价格体系'
    },
    component: Main,
    children: [
      {
        path: 'priceList',
        name: 'priceList',
        meta: {
          title: '价格列表',
          access: ['/price/toListPrice.action']
        },
        component: () => import('@/view/price-system/price-edit/priceList.vue')
      },
      {
        path: 'partTimePrice',
        name: 'partTimePrice',
        meta: {
          title: '分时促销管理',
          access: ['/timePrice/toTimePrice.action']
        },
        component: () => import('@/view/price-system/part-time-price/index.vue')
      },
      {
        path: 'priceTypeList',
        name: 'priceTypeList',
        meta: {
          title: '价格类型',
          access: ['/priceType/tolistPriceType.action']
        },
        component: () => import('@/view/price-system/price-type/priceTypeList.vue')
      },
      {
        path: 'priceAdjustLog',
        name: 'priceAdjustLog',
        meta: {
          title: '价格调整记录',
          access: ['/priceChange/tolistPriceChange.action']
        },
        component: () => import('@/view/price-system/price-adjust-log/index.vue')
      }
    ]
  },
  {
    path: '/smartLock',
    name: 'lock',
    meta: {
      icon: 'ios-lock',
      title: '智能锁'
    },
    component: Main,
    children: [
      {
        path: 'temporaryPassword',
        name: 'temporaryPassword',
        meta: {
          title: '临时密码',
          access: ['/smartLock/toApplyTempLockPasswd.action']
        },
        component: () => import('@/view/smart-lock/temporary-password/temporaryPassword.vue')
      },
      {
        path: 'passwordRemake',
        name: 'passwordRemake',
        meta: {
          title: '密码重制',
          access: ['/smartLock/toOrderPswLockList.action']
        },
        component: () => import('@/view/smart-lock/password-remake/passwordRemake.vue')
      },
      {
        path: 'workPassword',
        name: 'workPassword',
        meta: {
          title: '内务密码',
          access: ['/smartLock/lockPswOutSource.action']
        },
        component: () => import('@/view/smart-lock/work-password/workPassword.vue')
      },
      {
        path: 'batteryMonitor',
        name: 'batteryMonitor',
        meta: {
          title: '电量查询',
          access: ['/smartLock/toListPower.action']
        },
        component: () => import('@/view/smart-lock/battery-monitor/batteryMonitor.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      icon: 'ios-stats',
      title: '报表'
    },
    component: Main,
    children: [
      {
        path: 'operationIndex',
        name: 'operationIndex',
        meta: {
          title: '运营指标',
          access: ['/reportOperation/toOperationManage.action']
        },
        component: () => import('@/view/report/operation-index/operationIndex.vue')
      },
      {
        path: 'dailyIndex',
        name: 'dailyIndex',
        meta: {
          title: '单日运营指标',
          access: ['/reportDaily/toReportDailyIndex.action']
        },
        component: () => import('@/view/report/daily-index/dailyIndex.vue')
      },
      {
        path: 'guestData',
        name: 'guestData',
        meta: {
          title: '客群数据',
          access: ['/reportGuest/toGuestInfo.action']
        },
        component: () => import('@/view/report/guest-data/guestData.vue')
      },
      {
        path: 'guestAnalysis',
        name: 'guestAnalysis',
        meta: {
          title: '客群分析',
          access: ['/reportGuest/toReportGuestInfo.action']
        },
        component: () => import('@/view/report/guest-analysis/guestAnalysis.vue')
      }
    ]
  },
  {
    path: '/preferential',
    name: 'preferential',
    meta: {
      icon: 'logo-yen',
      title: '优惠'
    },
    component: Main,
    children: [
      {
        path: 'activity',
        name: 'activityList',
        meta: {
          title: '优惠活动',
          access: ['/activity/toListActivity.action']
        },
        component: () => import('@/view/preferential/activity-list/activityList.vue')
      },
      {
        path: 'createActivity',
        name: 'createActivity',
        meta: {
          title: '新增优惠活动',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/preferential/activity-create/activityCreate.vue')
      },
      {
        path: 'activityDetail',
        name: 'activityDetail',
        meta: {
          title: '优惠活动详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/preferential/activity-detail/activityDetail.vue')
      },
      {
        path: 'coupon',
        name: 'couponList',
        meta: {
          title: '优惠券',
          access: ['/coupon/toCouponList.action']
        },
        component: () => import('@/view/preferential/coupon-list/couponList.vue')
      }
    ]
  },
  {
    path: '/marketing',
    name: 'marketing',
    meta: {
      icon: 'ios-megaphone',
      title: '营销'
    },
    component: Main,
    children: [
      {
        path: 'marketingConfig',
        name: 'projectConfigIndex',
        meta: {
          title: '营销配置',
          access: ['/marketing/config']
        },
        component: () => import('@/view/marketing/marketing-config/projectConfigIndex.vue')
      },
      {
        path: 'marketingActivity',
        name: 'marketingActivityList',
        meta: {
          title: '营销活动',
          access: ['/marketingActivity/toMarketingActivityList.action']
        },
        component: () => import('@/view/marketing/marketing-activity/marketingActivityList.vue')
      },
      {
        path: 'projectSort',
        name: 'projectSort',
        meta: {
          title: '项目排序',
          access: ['/project/toListSortProject.action']
        },
        component: () => import('@/view/marketing/project-sort/projectSort.vue')
      }
    ]
  },
  {
    path: '/socialContact',
    name: 'socialContact',
    meta: {
      icon: 'md-aperture',
      title: '社交'
    },
    component: Main,
    children: [
      {
        path: 'group',
        name: 'groupList',
        meta: {
          icon: 'md-aperture',
          title: '群聊',
          access: ['/socialContact/list.action']
        },
        component: () => import('@/view/social-contact/group-list/groupList.vue')
      },
      {
        path: 'chat',
        name: 'chatMemberList',
        meta: {
          title: '群聊成员',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/social-contact/group-list/chatMemberList.vue')
      }
    ]
  },
  {
    path: '/repair',
    name: 'repair',
    meta: {
      icon: 'md-construct',
      title: '维修'
    },
    component: Main,
    children: [
      {
        path: 'repairList',
        name: 'repairList',
        meta: {
          icon: 'md-construct',
          title: '在线报修',
          access: ['/repair/toListRepair.action']
        },
        component: () => import('@/view/repair/repair-list/repairList.vue')
      },
      {
        path: 'repairDetail',
        name: 'repairDetail',
        meta: {
          title: '维修单详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/repair/repair-detail/repairDetail.vue')
      }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    meta: {
      icon: 'ios-finger-print',
      title: '权限'
    },
    component: Main,
    children: [
      {
        path: 'projectPermission',
        name: 'projectPermission',
        meta: {
          icon: 'ios-finger-print',
          title: '项目权限',
          access: ['/projectZO/toListProjectZo.action']
        },
        component: () => import('@/view/permission/project/projectPermission.vue')
      }
    ]
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    meta: {
      icon: 'ios-star',
      title: '用户评价'
    },
    component: Main,
    children: [
      {
        path: 'evaluateList',
        name: 'evaluateList',
        meta: {
          title: '全部评价',
          access: ['/evaluate/toListEvaluate.action']
        },
        component: () => import('@/view/evaluate/evaluate-list/evaluateList.vue')
      },
      {
        path: 'lowEvaluateList',
        name: 'lowEvaluateList',
        meta: {
          title: '低分评价',
          access: ['/lowEvaluate/toListLowEvaluate.action']
        },
        component: () => import('@/view/evaluate/low-evaluate/lowEvaluateList.vue')
      },
      {
        path: 'lowEvaluateFollowUp',
        name: 'lowEvaluateFollowUp',
        meta: {
          title: '低评处理',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/evaluate/low-evaluate-follow-up/lowEvaluateFollowUp.vue')
      }
    ]
  },
  {
    path: '/guest',
    name: 'guest',
    meta: {
      icon: 'ios-people',
      title: '客史'
    },
    component: Main,
    children: [
      {
        path: 'guestList',
        name: 'guestList',
        meta: {
          icon: 'ios-people',
          title: '客史',
          access: ['/guest/toListGuest.action']
        },
        component: () => import('@/view/guest/guest-list/guestList.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'messageList',
        name: 'messageList',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/message/index.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
