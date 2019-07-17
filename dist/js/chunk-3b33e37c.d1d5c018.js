(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-3b33e37c'], { '4edf': function (t, e, i) {}, 6105: function (t, e, i) {}, '8baa': function (t, e, i) { 'use strict'; var a = i('6105'), c = i.n(a); c.a }, ca41: function (t, e, i) { 'use strict'; i.d(e, 'b', function () { return c }), i.d(e, 'a', function () { return n }), i.d(e, 'c', function () { return r }), i.d(e, 'd', function () { return s }); var a = i('6b6c'), c = function (t) { return a['a'].request({ url: '/activity/listActivity.action', method: 'post', data: t }) }, n = function (t) { return a['a'].request({ url: '/activity/getActivityDetail.action', method: 'get', params: { activityBid: t } }) }, r = function (t) { return a['a'].request({ url: '/activity/saveActivity.action', method: 'post', data: t }) }, s = function (t, e) { return a['a'].request({ url: '/activity/updateActivity.action', method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, params: { activityBid: t, activityStatus: e } }) } }, d148: function (t, e, i) { 'use strict'; var a = i('4edf'), c = i.n(a); c.a }, e2d3: function (t, e, i) { 'use strict'; i.r(e); var a = function () { var t = this, e = t.$createElement, i = t._self._c || e; return i('Row', { staticClass: 'full-top' }, [t.loading ? i('Spin', { staticClass: 'full-spin', attrs: { size: 'large', fix: '' } }) : t._e(), i('Col', { attrs: { span: 20 } }, [i('Form', { attrs: { model: t.activity, 'label-width': 100 } }, [i('Row', { attrs: { gutter: 20 } }, [i('Col', { attrs: { span: 12 } }, [i('FormItem', { attrs: { label: '优惠活动编号：' } }, [i('span', [t._v(t._s(t.activity.activityNumber))])])], 1), i('Col', { attrs: { span: 12 } }, [i('FormItem', { attrs: { label: '优惠活动名称：' } }, [i('span', [t._v(t._s(t.activity.activityName))])])], 1)], 1), i('Row', { attrs: { gutter: 20 } }, [i('Col', { attrs: { span: 12 } }, [i('FormItem', { attrs: { label: '活动时间：' } }, [i('span', [t._v(t._s(t.activity.activityStartDateStr))]), t._v('\n            至\n            '), i('span', [t._v(t._s(t.activity.activityEndDateStr))])])], 1), i('Col', { attrs: { span: 12 } }, [i('FormItem', { attrs: { label: '活动内容：', prop: 'activityContent' } }, [i('span', [t._v(t._s(t.activity.activityContent))])])], 1)], 1), i('FormItem', { attrs: { label: '使用条件：' } }, [i('span', [t._v(t._s(t._f('conditionFilter')(t.activity)))])]), i('FormItem', { attrs: { label: '优惠券：' } }, [i('Table', { attrs: { stripe: '', columns: t.columns, data: t.activity.tickBatchDto, size: 'small' }, scopedSlots: t._u([{ key: 'action', fn: function (e) { var a = e.row; return [a.createTicketTime ? i('a', { on: { click: function (e) { t.showTicketDetail(a) } } }, [t._v('详情')]) : i('a', { staticStyle: { color: '#ed4014' }, on: { click: function (e) { t.removeTicket(a) } } }, [t._v('移除')])] } }]) }), t.activity.tickBatchDto ? i('a', { on: { click: function (e) { t.visible = !0 } } }, [t._v('追加优惠券')]) : t._e()], 1), t.ticket.length ? i('FormItem', [i('Button', { attrs: { type: 'primary' }, on: { click: t.saveTicket } }, [t._v('保存优惠券')])], 1) : t._e()], 1)], 1), i('Modal', { attrs: { title: '追加优惠券', loading: t.modalLoading }, on: { 'on-ok': t.addTicket }, model: { value: t.visible, callback: function (e) { t.visible = e }, expression: 'visible' } }, [t.visible ? i('ticket-form', { ref: 'ticketForm', attrs: { 'batch-number': t.activity.tickBatchDto.length + 1 }, on: { push: t.handlePush } }) : t._e()], 1)], 1) }, c = [], n = (i('7514'), i('fa62')), r = i('ca41'), s = { name: 'activityDetail', components: { ticketForm: n['a'] }, data: function () { return { loading: !1, activityBid: '', activity: {}, columns: [{ title: '批次号', key: 'batchNumber' }, { title: '添加人', key: 'createTicketUser' }, { title: '添加时间', key: 'createTicketTime' }, { title: '数量', key: 'countTicket' }, { title: '金额 / 元', key: 'amount' }, { title: '操作', slot: 'action', width: 60 }], visible: !1, modalLoading: !0, datePickerOptions: { disabledDate: function (t) { return t && t.valueOf() < Date.now() - 864e5 } }, ticket: [] } }, methods: { getActivityDetail: function () { var t = this; this.loading = !0, this.activityBid = this.$route.query.activityBid, Object(r['a'])(this.activityBid).then(function (e) { t.activity = e.body, t.loading = !1 }).catch(function () { t.loading = !1 }) }, addTicket: function () { var t = this; this.$refs.ticketForm.validForm(), setTimeout(function () { t.modalLoading = !1, t.$nextTick(function () { t.modalLoading = !0 }) }, 500) }, showTicketDetail: function (t) { var e = t.batchNumber, i = this.activity.activityNumber, a = { name: 'couponList', query: { batchNumber: e, activityNumber: i } }; this.$router.push(a) }, handlePush: function (t) { this.ticket.push(t), this.activity.tickBatchDto.push({ amount: t.amount, batchNumber: t.batchNumber, countTicket: t.quantity, createTicketTime: '', createTicketUser: this.$store.state.user.username }), this.visible = !1 }, removeTicket: function (t) { this.ticket.splice(this.ticket.indexOf(this.ticket.find(function (e) { return e.batchNumber === t.batchNumber })), 1), this.activity.tickBatchDto.splice(this.activity.tickBatchDto.indexOf(this.activity.tickBatchDto.find(function (e) { return e.batchNumber === t.batchNumber })), 1) }, saveTicket: function () { var t = this, e = { activityBid: this.activity.activityBid, activityNumber: this.activity.activityNumber, ticketInfo: this.ticket }; Object(r['c'])(e).then(function (e) { t.$Message.success('保存成功'), t.getActivityDetail() }) } }, watch: { $route: function (t, e) { this.getActivityDetail() } }, created: function () { this.getActivityDetail() }, filters: { conditionFilter: function (t) { var e = t.limitMoney, i = t.activityCondition, a = ''; return e && (a = a + '消费满 ' + e + ' 元可用'), i && (a = a + '、' + i), a } } }, o = s, l = (i('d148'), i('2877')), u = Object(l['a'])(o, a, c, !1, null, '02ddb06a', null); u.options.__file = 'activityDetail.vue'; e['default'] = u.exports }, fa62: function (t, e, i) { 'use strict'; var a = function () { var t = this, e = t.$createElement, i = t._self._c || e; return i('Form', { ref: 'ticketForm', attrs: { model: t.ticketDto, rules: t.ticketRules, 'label-width': 80 } }, [i('FormItem', { attrs: { label: '批次编号', prop: 'batchNumber' } }, [i('Input', { staticClass: 'my-cls', attrs: { placeholder: '', clearable: '', disabled: '' }, model: { value: t.ticketDto.batchNumber, callback: function (e) { t.$set(t.ticketDto, 'batchNumber', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.batchNumber' } })], 1), i('FormItem', { attrs: { label: '生成数量', prop: 'quantity' } }, [i('Input', { staticClass: 'my-cls', attrs: { placeholder: '', clearable: '' }, model: { value: t.ticketDto.quantity, callback: function (e) { t.$set(t.ticketDto, 'quantity', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.quantity' } })], 1), i('FormItem', { attrs: { label: '金额', prop: 'amount' } }, [i('Input', { staticClass: 'my-cls', attrs: { placeholder: '', clearable: '' }, model: { value: t.ticketDto.amount, callback: function (e) { t.$set(t.ticketDto, 'amount', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.amount' } })], 1), i('FormItem', { attrs: { label: '有效期', required: '' } }, [i('FormItem', { attrs: { prop: 'dateRange', 'label-width': 0, rules: t.dateRangeRules } }, [i('Radio', { model: { value: t.dateRange, callback: function (e) { t.dateRange = e }, expression: 'dateRange' } }), i('DatePicker', { staticClass: 'my-date-range', attrs: { type: 'daterange', 'split-panels': '', placeholder: '', editable: !1, disabled: !t.dateRange, options: t.datePickerOptions }, model: { value: t.ticketDto.dateRange, callback: function (e) { t.$set(t.ticketDto, 'dateRange', e) }, expression: 'ticketDto.dateRange' } })], 1), i('FormItem', { staticClass: 'my-bottom', attrs: { prop: 'limitDate', 'label-width': 0, rules: t.limitDateRules } }, [i('Radio', { model: { value: t.day, callback: function (e) { t.day = e }, expression: 'day' } }), t._v('\n      绑定至账户的\n      '), i('Input', { staticClass: 'my-day', attrs: { placeholder: '', disabled: !t.day, clearable: '' }, model: { value: t.ticketDto.limitDate, callback: function (e) { t.$set(t.ticketDto, 'limitDate', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.limitDate' } }), t._v('\n      天内\n    ')], 1)], 1)], 1) }, c = [], n = (i('ac6a'), i('c5f6'), i('90de')), r = { name: 'ticketForm', props: { batchNumber: Number }, data: function () { return { ticketDto: { batchNumber: '0' + this.batchNumber, quantity: '', amount: '', dateRange: [], startDate: '', endDate: '', limitDate: '', createTime: '' }, day: !1, dateRange: !0, ticketRules: { quantity: [{ required: !0, message: '请输入生成数量', trigger: 'blur' }, { pattern: /^(?!00)(?:[0-9]{1,4}|10000)$/, message: '请输入 0～10000 的整数', trigger: 'blur' }], amount: [{ required: !0, message: '请输入金额', trigger: 'blur' }, { pattern: /^(?!00)(?:[0-9]{1,4}|10000)$/, message: '请输入 0～10000 的整数', trigger: 'blur' }] }, datePickerOptions: { disabledDate: function (t) { return t && t.valueOf() < Date.now() - 864e5 } } } }, methods: { validForm: function () { var t = this; this.$refs['ticketForm'].validate(function (e) { e && t.$emit('push', t.ticketDto) }) }, resetFormItem: function (t) { this.$refs['ticketForm'].fields.forEach(function (e) { e.prop === t && e.resetField() }) } }, watch: { day: function (t) { this.dateRange = !t, this.resetFormItem('limitDate'), this.resetFormItem('dateRange') }, dateRange: function (t) { this.day = !t, this.resetFormItem('dateRange'), this.resetFormItem('limitDate') }, 'ticketDto.dateRange': function (t) { this.ticketDto.startDate = t[0] ? Object(n['f'])(t[0], 'date') : '', this.ticketDto.endDate = t[1] ? Object(n['f'])(t[1], 'date') : '' } }, computed: { dateRangeRules: function () { return this.dateRange ? [{ required: !0, type: 'array', fields: { 0: { type: 'date', required: !0, message: '请选择优惠券有效期' }, 1: { type: 'date', required: !0, message: '请选择优惠券有效期' } }, trigger: 'change' }] : [] }, limitDateRules: function () { return this.day ? [{ required: !0, message: '请输入优惠券有效期', trigger: 'blur' }, { pattern: /^([1][8][0]|[1][0-7][0-9]|[1-9][0-9]|[0-9]|[0])$/, message: '请输入 0～180 的整数', trigger: 'blur' }] : [] } } }, s = r, o = (i('8baa'), i('2877')), l = Object(o['a'])(s, a, c, !1, null, '7477b839', null); l.options.__file = 'ticketForm.vue'; e['a'] = l.exports } }])
