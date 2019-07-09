(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-7e55ed3e'], { '2f03': function (r, t, e) {}, a12f: function (r, t, e) { 'use strict'; e.r(t); var a = function () { var r = this, t = r.$createElement, e = r._self._c || t; return e('div', [e('Divider', { attrs: { orientation: 'left' } }, [r._v('基本信息')]), e('div', { staticStyle: { margin: '0 200px' } }, [e('Form', { attrs: { model: r.repair, 'label-width': 90 } }, [e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '维修单号：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.billNum))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '维修单状态：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.orderStateName))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '地址：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.address))])])], 1)], 1), e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '联系人：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.contactName))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '联系电话：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.contactPhone))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '上门时间：' } }, [e('span', [r._v(r._s(r._f('dateFilter')(r.repair.orderCommon.reserveDate)) + ' ' + r._s(r.repair.orderCommon.reservePeroid))])])], 1)], 1)], 1)], 1), e('Divider', { attrs: { orientation: 'left' } }, [r._v('维修内容')]), e('div', { staticStyle: { margin: '0 200px' } }, [e('Form', { attrs: { model: r.repair, 'label-width': 90 } }, [e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '大类：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.categoryFirstName))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '区域：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.spaceName))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '物品：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.serviceName))])])], 1)], 1), e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '故障描述：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.tagsName))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '备注：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.description))])])], 1)], 1)], 1)], 1), e('Divider', { attrs: { orientation: 'left' } }, [r._v('维修师傅信息')]), e('div', { staticStyle: { margin: '0 200px' } }, [e('Form', { attrs: { model: r.repair, 'label-width': 90 } }, [e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '师傅姓名：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.servicerName))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '师傅手机号：' } }, [e('span', [r._v(r._s(r.repair.orderCommon.servicerPhone))])])], 1), e('Col', { attrs: { span: 8 } }, [e('FormItem', { attrs: { label: '派单时间：' } }, [e('span', [r._v(r._s(r._f('dateFilter')(r.repair.orderCommon.assignOrderTime)))])])], 1)], 1)], 1)], 1)], 1) }, o = [], n = e('c3be'), s = { name: 'repairDetail', data: function () { return { loading: !1, repair: { orderCommon: { billNum: '', orderStateName: '', address: '', contactName: '', contactPhone: '', reserveDate: '', categoryFirstName: '', spaceName: '', serviceName: '', tagsName: '', description: '', servicerName: '', servicerPhone: '', assignOrderTime: '' } } } }, methods: { getDetail: function () { var r = this; Object(n['e'])(this.$route.query.orderSn).then(function (t) { r.repair = t.body }) } }, watch: { $route: function (r, t) { this.getDetail() } }, created: function () { this.getDetail() } }, i = s, m = (e('f00c'), e('2877')), l = Object(m['a'])(i, a, o, !1, null, '1e7b198a', null); l.options.__file = 'repairDetail.vue'; t['default'] = l.exports }, c3be: function (r, t, e) { 'use strict'; e.d(t, 'g', function () { return o }), e.d(t, 'i', function () { return n }), e.d(t, 'b', function () { return s }), e.d(t, 'f', function () { return i }), e.d(t, 'h', function () { return m }), e.d(t, 'd', function () { return l }), e.d(t, 'c', function () { return u }), e.d(t, 'a', function () { return p }), e.d(t, 'e', function () { return c }); var a = e('6b6c'), o = function (r) { return a['a'].request({ url: '/repair/getRepairOrderList.action', method: 'post', data: r }) }, n = function (r) { return a['a'].request({ url: '/repair/saveRepairOrder.action', method: 'post', data: r }) }, s = function () { return a['a'].request({ url: '/repair/getAreas', method: 'get' }) }, i = function () { return a['a'].request({ url: '/repair/getGoods', method: 'get' }) }, m = function (r) { return a['a'].request({ url: '/repair/getRoomListByProject.action', method: 'get', params: { projectId: r } }) }, l = function (r) { return a['a'].request({ url: '/repair/getMaintenanceVisualization.action', method: 'get', params: { goodsCode: r } }) }, u = function () { return a['a'].request({ url: '/repair/getCancelReason.action', method: 'get' }) }, p = function (r) { return a['a'].request({ url: '/repair/cancel.action', method: 'post', data: r }) }, c = function (r) { return a['a'].request({ url: '/repair/getRepairOrderDetail.action', method: 'get', params: { billNum: r } }) } }, f00c: function (r, t, e) { 'use strict'; var a = e('2f03'), o = e.n(a); o.a } }])
