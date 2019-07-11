(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-60ca5560'], { '25e3': function (t, a, e) { 'use strict'; var i = e('e127'), n = e.n(i); n.a }, '507d': function (t, a, e) {}, '7a68': function (t, a, e) { 'use strict'; e.r(a); var i = function () { var t = this, a = t.$createElement, e = t._self._c || a; return e('div', [e('activity-form', { on: { search: t.listActivity, create: t.createActivity } }), e('Table', { staticClass: 'my-table', attrs: { stripe: '', columns: t.columns, data: t.activityList, loading: t.loading }, scopedSlots: t._u([{ key: 'activityNumber', fn: function (a) { var i = a.row; return [e('a', { on: { click: function (a) { t.toActivityDetail(i) } } }, [t._v(t._s(i.activityNumber))])] } }, { key: 'status', fn: function (a) { var i = a.row; return [e('Tag', { attrs: { color: t.statusColor(i.status) } }, [t._v(t._s(t._f('statusFilter')(i.status)))])] } }, { key: 'action', fn: function (a) { var i = a.row; return [i.status === 0 ? e('div', [e('a', { staticClass: 'my-btn', on: { click: function (a) { t.confirmUpdateActivity(i.activityBid, 1) } } }, [t._v('开启')]), e('a', { on: { click: function (a) { t.confirmUpdateActivity(i.activityBid, 2) } } }, [t._v('关闭')])]) : i.status === 1 ? e('div', [e('a', { on: { click: function (a) { t.confirmUpdateActivity(i.activityBid, 2) } } }, [t._v('关闭')])]) : e('div', [t._v('-')])] } }]) }), e('Page', { staticClass: 'my-page', attrs: { total: t.total, 'show-total': '', current: t.paramDto.pageIndex, 'page-size': t.paramDto.pageSize }, on: { 'update:current': function (a) { t.$set(t.paramDto, 'pageIndex', a) }, 'on-change': t.handlePageChange } })], 1) }, n = [], r = (e('7f7f'), e('f751'), function () { var t = this, a = t.$createElement, e = t._self._c || a; return e('Form', { attrs: { model: t.paramDto, 'label-width': 100 } }, [e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: '8' } }, [e('FormItem', { attrs: { label: '优惠活动编号' } }, [e('Input', { attrs: { placeholder: '', clearable: '' }, model: { value: t.paramDto.activityNumber, callback: function (a) { t.$set(t.paramDto, 'activityNumber', typeof a === 'string' ? a.trim() : a) }, expression: 'paramDto.activityNumber' } })], 1)], 1), e('Col', { attrs: { span: '8' } }, [e('FormItem', { attrs: { label: '优惠活动名称' } }, [e('Input', { attrs: { placeholder: '', clearable: '' }, model: { value: t.paramDto.activityName, callback: function (a) { t.$set(t.paramDto, 'activityName', typeof a === 'string' ? a.trim() : a) }, expression: 'paramDto.activityName' } })], 1)], 1), e('Col', { attrs: { span: '8' } }, [e('FormItem', { attrs: { label: '优惠券号' } }, [e('Input', { attrs: { placeholder: '', clearable: '' }, model: { value: t.paramDto.ticketNumber, callback: function (a) { t.$set(t.paramDto, 'ticketNumber', typeof a === 'string' ? a.trim() : a) }, expression: 'paramDto.ticketNumber' } })], 1)], 1)], 1), e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: '8' } }, [e('FormItem', { attrs: { label: '项目' } }, [e('Select', { attrs: { placeholder: '', clearable: '' }, model: { value: t.paramDto.projectBid, callback: function (a) { t.$set(t.paramDto, 'projectBid', a) }, expression: 'paramDto.projectBid' } }, t._l(t.$store.state.user.projectList, function (t) { return e('Option', { key: t.bid, attrs: { label: t.projectName, value: t.bid } }) }))], 1)], 1), e('Col', { attrs: { span: '8' } }, [e('FormItem', { attrs: { label: '活动时间' } }, [e('DatePicker', { staticClass: 'my-date-picker', attrs: { type: 'daterange', 'split-panels': '', placeholder: '', clearable: '' }, model: { value: t.paramDto.dateRange, callback: function (a) { t.$set(t.paramDto, 'dateRange', a) }, expression: 'paramDto.dateRange' } })], 1)], 1), e('Col', { attrs: { span: '8' } }, [e('FormItem', { attrs: { label: '活动状态' } }, [e('CheckboxGroup', { model: { value: t.paramDto.activityStatus, callback: function (a) { t.$set(t.paramDto, 'activityStatus', a) }, expression: 'paramDto.activityStatus' } }, t._l(t.activityStatusOptions, function (a, i) { return e('Checkbox', { key: i, attrs: { label: a.value } }, [t._v('\n            ' + t._s(a.label) + '\n          ')]) }))], 1)], 1)], 1), e('Row', { attrs: { gutter: 20 } }, [e('Col', { attrs: { span: '12' } }, [e('Button', { attrs: { type: 'primary', icon: 'ios-search' }, on: { click: t.submit } }, [t._v(' 查 询')])], 1), e('Col', { staticStyle: { 'text-align': 'right' }, attrs: { span: '12' } }, [e('Button', { attrs: { type: 'primary' }, on: { click: t.addActivity } }, [t._v('新增优惠活动')])], 1)], 1)], 1) }), c = [], o = e('90de'), s = { name: 'activityForm', data: function () { return { paramDto: { activityNumber: '', activityName: '', ticketNumber: '', projectBid: '', dateRange: [], startDate: '', endDate: '', activityStatus: [] }, activityStatusOptions: [{ label: '未开启', value: 0 }, { label: '进行中', value: 1 }, { label: '已关闭', value: 2 }, { label: '已结束', value: 3 }] } }, methods: { submit: function () { this.$emit('search', this.paramDto) }, addActivity: function () { this.$emit('create') } }, watch: { 'paramDto.dateRange': function (t) { this.paramDto.startDate = t[0] ? Object(o['d'])(t[0], 'date') : '', this.paramDto.endDate = t[1] ? Object(o['d'])(t[1], 'date') : '' } }, created: function () { this.submit() } }, l = s, u = (e('25e3'), e('2877')), p = Object(u['a'])(l, r, c, !1, null, '13856b22', null); p.options.__file = 'activityForm.vue'; var m = p.exports, d = e('ca41'), v = { name: 'activityList', components: { activityForm: m }, data: function () { return { paramDto: { pageIndex: 1, pageSize: 10 }, loading: !1, activityList: [], total: 0, columns: [{ title: '优惠活动编号', slot: 'activityNumber', width: 130 }, { title: '活动名称', key: 'activityName' }, { title: '活动状态', slot: 'status' }, { title: '活动时间', key: 'showDate' }, { title: '活动范围', key: 'activityCondition', tooltip: !0, render: function (t, a) { return t('div', a.row.activityCondition ? a.row.activityCondition : '全部项目') } }, { title: '活动内容', key: 'activityContent', tooltip: !0 }, { title: '操作', slot: 'action', width: 100 }] } }, methods: { listActivity: function (t) { Object.assign(this.paramDto, t), this.$delete(this.paramDto, 'dateRange'), this.paramDto.activityStatus = this.paramDto.activityStatus.join(','), this.paramDto.pageIndex = 1, this.handlePageChange() }, handlePageChange: function () { var t = this; this.loading = !0, Object(d['b'])(this.paramDto).then(function (a) { t.activityList = a.body.rows, t.total = a.body.total, t.loading = !1 }).catch(function () { t.loading = !1 }) }, createActivity: function () { var t = { name: 'createActivity' }; this.$router.push(t) }, toActivityDetail: function (t) { var a = t.activityBid, e = { name: 'activityDetail', query: { activityBid: a } }; this.$router.push(e) }, statusColor: function (t) { switch (t) { case 0:return 'default'; case 1:return 'green'; case 2:return 'blue'; case 3:return 'orange' } }, confirmUpdateActivity: function (t, a) { var e = this; this.$Modal.confirm({ title: '通知', content: '<p>确定要'.concat(a === 1 ? '开启' : '关闭', '该优惠活动吗？</p>'), onOk: function () { e.updateActivity(t, a) }, onCancel: function () {} }) }, updateActivity: function (t, a) { var e = this; Object(d['d'])(t, a).then(function (t) { e.$Message.success(''.concat(a === 1 ? '开启' : '关闭', '成功')), e.handlePageChange() }) } }, watch: { $route: function (t, a) { a.name === 'createActivity' && this.handlePageChange() } }, filters: { statusFilter: function (t) { switch (t) { case 0:return '未开启'; case 1:return '进行中'; case 2:return '已关闭'; case 3:return '已结束' } } } }, y = v, f = (e('eb1f'), Object(u['a'])(y, i, n, !1, null, '9cb2c516', null)); f.options.__file = 'activityList.vue'; a['default'] = f.exports }, ca41: function (t, a, e) { 'use strict'; e.d(a, 'b', function () { return n }), e.d(a, 'a', function () { return r }), e.d(a, 'c', function () { return c }), e.d(a, 'd', function () { return o }); e('cadf'), e('551c'), e('097d'); var i = e('6b6c'), n = function (t) { return i['a'].request({ url: '/activity/listActivity.action', method: 'post', data: t }) }, r = function (t) { return i['a'].request({ url: '/activity/getActivityDetail.action', method: 'get', params: { activityBid: t } }) }, c = function (t) { return i['a'].request({ url: '/activity/saveActivity.action', method: 'post', data: t }) }, o = function (t, a) { return i['a'].request({ url: '/activity/updateActivity.action', method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: { activityBid: t, activityStatus: a } }) } }, e127: function (t, a, e) {}, eb1f: function (t, a, e) { 'use strict'; var i = e('507d'), n = e.n(i); n.a } }])
