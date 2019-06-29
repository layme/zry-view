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
    component: () => import('@/view/discard/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/discard/single-page/home')
      }
    ]
  },
  {
    path: '/trading',
    name: 'trading',
    meta: {
      icon: 'ios-book',
      title: '交易'
    },
    component: Main,
    children: [
      {
        path: 'order',
        name: 'orderList',
        meta: {
          icon: '_qq',
          title: '订单列表',
          access: ['/order/toListOrder.action']
        },
        component: () => import('@/view/trading/order-list/orderList.vue')
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        meta: {
          icon: '_qq',
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
          icon: '_qq',
          title: '退款列表',
          access: ['/refund/toNewListRefund.action']
        },
        component: () => import('@/view/trading/refund-list/refundList.vue')
      },
      {
        path: 'refundDetail',
        name: 'refundDetail',
        meta: {
          icon: '_qq',
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
      icon: 'ios-book',
      title: '房源'
    },
    component: Main,
    children: [
      {
        path: 'project',
        name: 'projectList',
        meta: {
          icon: '_qq',
          title: '项目',
          access: ['/project/toListProject.action']
        },
        component: () => import('@/view/resource/project-list/projectList.vue')
      },
      {
        path: 'addProject',
        name: 'addProject',
        meta: {
          icon: '_qq',
          title: '新增项目',
          hideInMenu: true
        },
        component: () => import('@/view/resource/project-action/project.vue')
      },
      {
        path: 'updateProject',
        name: 'updateProject',
        meta: {
          icon: '_qq',
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
          icon: '_qq',
          title: '业主',
          access: ['/owner/toOwnerList.action']
        },
        component: () => import('@/view/resource/owner-list/ownerList.vue')
      }
    ]
  },
  {
    path: '/smartLock',
    name: 'lock',
    meta: {
      icon: 'ios-book',
      title: '智能锁'
    },
    component: Main,
    children: [
      {
        path: 'temporaryPassword',
        name: 'temporaryPassword',
        meta: {
          icon: '_qq',
          title: '临时密码'
        },
        component: () => import('@/view/smart-lock/temporary-password/temporaryPassword.vue')
      },
      {
        path: 'passwordRemake',
        name: 'passwordRemake',
        meta: {
          icon: '_qq',
          title: '密码重制'
        },
        component: () => import('@/view/smart-lock/password-remake/passwordRemake.vue')
      },
      {
        path: 'workPassword',
        name: 'workPassword',
        meta: {
          icon: '_qq',
          title: '内务密码'
        },
        component: () => import('@/view/smart-lock/work-password/workPassword.vue')
      },
      {
        path: 'batteryMonitor',
        name: 'batteryMonitor',
        meta: {
          icon: '_qq',
          title: '电量查询'
        },
        component: () => import('@/view/smart-lock/battery-monitor/batteryMonitor.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      icon: 'ios-book',
      title: '报表'
    },
    component: Main,
    children: [
      {
        path: 'operationIndex',
        name: 'operationIndex',
        meta: {
          icon: '_qq',
          title: '运营指标'
        },
        component: () => import('@/view/report/operation-index/operationIndex.vue')
      },
      {
        path: 'dailyIndex',
        name: 'dailyIndex',
        meta: {
          icon: '_qq',
          title: '单日运营指标'
        },
        component: () => import('@/view/report/daily-index/dailyIndex.vue')
      },
      {
        path: 'guestData',
        name: 'guestData',
        meta: {
          icon: '_qq',
          title: '客群数据'
        },
        component: () => import('@/view/report/guest-data/guestData.vue')
      },
      {
        path: 'guestAnalysis',
        name: 'guestAnalysis',
        meta: {
          icon: '_qq',
          title: '客群分析'
        },
        component: () => import('@/view/report/guest-analysis/guestAnalysis.vue')
      }
    ]
  },
  {
    path: '/preferential',
    name: 'preferential',
    meta: {
      icon: 'ios-book',
      title: '优惠'
    },
    component: Main,
    children: [
      {
        path: 'activity',
        name: 'activityList',
        meta: {
          icon: '_qq',
          title: '优惠活动'
        },
        component: () => import('@/view/preferential/activity-list/activityList.vue')
      },
      {
        path: 'createActivity',
        name: 'createActivity',
        meta: {
          icon: '_qq',
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
          icon: '_qq',
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
          icon: '_qq',
          title: '优惠券'
        },
        component: () => import('@/view/preferential/coupon-list/couponList.vue')
      }
    ]
  },
  {
    path: '/config',
    name: 'config',
    meta: {
      icon: 'ios-book',
      title: '配置'
    },
    component: Main,
    children: [
      {
        path: 'channel',
        name: 'channel',
        meta: {
          icon: '_qq',
          title: '渠道'
        },
        component: () => import('@/view/config/channel/channel.vue')
      }
    ]
  },
  {
    path: '/marketing',
    name: 'marketing',
    meta: {
      icon: 'ios-book',
      title: '营销'
    },
    component: Main,
    children: [
      {
        path: 'marketingConfig',
        name: 'projectConfigIndex',
        meta: {
          icon: '_qq',
          title: '营销配置'
        },
        component: () => import('@/view/marketing/marketing-config/projectConfigIndex.vue')
      },
      {
        path: 'marketingActivity',
        name: 'marketingActivityList',
        meta: {
          icon: '_qq',
          title: '营销活动'
        },
        component: () => import('@/view/marketing/marketing-activity/marketingActivityList.vue')
      },
      {
        path: 'projectSort',
        name: 'projectSort',
        meta: {
          icon: '_qq',
          title: '项目排序'
        },
        component: () => import('@/view/marketing/project-sort/projectSort.vue')
      }
    ]
  },
  {
    path: '/socialContact',
    name: 'socialContact',
    meta: {
      icon: 'ios-book',
      title: '社交'
    },
    component: Main,
    children: [
      {
        path: 'group',
        name: 'groupList',
        meta: {
          icon: '_qq',
          title: '群聊'
        },
        component: () => import('@/view/social-contact/group-list/groupList.vue')
      },
      {
        path: 'chat',
        name: 'chatMemberList',
        meta: {
          icon: '_qq',
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
      icon: 'ios-book',
      title: '维修'
    },
    component: Main,
    children: [
      {
        path: 'repairList',
        name: 'repairList',
        meta: {
          icon: '_qq',
          title: '在线报修'
        },
        component: () => import('@/view/repair/repair-list/repairList.vue')
      },
      {
        path: 'repairDetail',
        name: 'repairDetail',
        meta: {
          icon: '_qq',
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
      icon: 'ios-book',
      title: '权限'
    },
    component: Main,
    children: [
      {
        path: 'projectPermission',
        name: 'projectPermission',
        meta: {
          icon: '_qq',
          title: '项目权限'
        },
        component: () => import('@/view/permission/project/projectPermission.vue')
      }
    ]
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    meta: {
      icon: 'ios-book',
      title: '用户评价'
    },
    component: Main,
    children: [
      {
        path: 'evaluateList',
        name: 'evaluateList',
        meta: {
          icon: '_qq',
          title: '全部评价',
          access: ['/evaluate/toListEvaluate.action']
        },
        component: () => import('@/view/evaluate/evaluate-list/evaluateList.vue')
      },
      {
        path: 'lowEvaluateList',
        name: 'lowEvaluateList',
        meta: {
          icon: '_qq',
          title: '低分评价',
          access: ['/lowEvaluate/toListLowEvaluate.action']
        },
        component: () => import('@/view/evaluate/low-evaluate/lowEvaluateList.vue')
      },
      {
        path: 'lowEvaluateFollowUp',
        name: 'lowEvaluateFollowUp',
        meta: {
          icon: '_qq',
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
      icon: 'ios-book',
      title: '客史'
    },
    component: Main,
    children: [
      {
        path: 'guestList',
        name: 'guestList',
        meta: {
          icon: '_qq',
          title: '客史'
        },
        component: () => import('@/view/guest/guest-list/guestList.vue')
      }
    ]
  },
  /*
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/view/discard/join-page.vue')
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
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/discard/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/discard/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/discard/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/discard/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/discard/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/discard/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/discard/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/discard/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/discard/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/discard/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/discard/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/discard/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/discard/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/discard/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/discard/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/discard/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/discard/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/discard/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - 多语言'
        },
        component: () => import('@/view/discard/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/discard/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/discard/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/discard/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/discard/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/discard/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/discard/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/discard/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/discard/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/discard/argu-page/query.vue')
      }
    ]
  },
  */
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
