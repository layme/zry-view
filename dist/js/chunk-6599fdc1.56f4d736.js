(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-6599fdc1'], { '1ade': function (t, e, i) {}, 6105: function (t, e, i) {}, 6359: function (t, e, i) { 'use strict'; i.r(e); var a = function () { var t = this, e = t.$createElement, i = t._self._c || e; return i('Row', { staticClass: 'full-top' }, [t.loading ? i('Spin', { staticClass: 'full-spin', attrs: { size: 'large', fix: '' } }) : t._e(), i('Col', { attrs: { span: 20 } }, [i('Form', { ref: 'activityForm', attrs: { model: t.activityDto, rules: t.activityRules, 'label-width': 100 } }, [i('Row', [i('Col', { attrs: { span: 12 } }, [i('FormItem', { attrs: { label: '优惠活动名称', prop: 'activityName' } }, [i('Input', { attrs: { placeholder: '', clearable: '' }, model: { value: t.activityDto.activityName, callback: function (e) { t.$set(t.activityDto, 'activityName', typeof e === 'string' ? e.trim() : e) }, expression: 'activityDto.activityName' } })], 1)], 1), i('Col', { attrs: { span: 12 } }, [i('FormItem', { attrs: { label: '活动时间', prop: 'dateRange' } }, [i('DatePicker', { staticClass: 'my-date-picker', attrs: { type: 'daterange', 'split-panels': '', placeholder: '', editable: !1, options: t.datePickerOptions }, model: { value: t.activityDto.dateRange, callback: function (e) { t.$set(t.activityDto, 'dateRange', e) }, expression: 'activityDto.dateRange' } })], 1)], 1)], 1), i('Row', [i('Col', { attrs: { span: 24 } }, [i('FormItem', { attrs: { label: '活动内容', prop: 'activityContent' } }, [i('Input', { attrs: { type: 'textarea', rows: 3, placeholder: '', clearable: '' }, model: { value: t.activityDto.activityContent, callback: function (e) { t.$set(t.activityDto, 'activityContent', typeof e === 'string' ? e.trim() : e) }, expression: 'activityDto.activityContent' } })], 1)], 1)], 1), i('Row', [i('Col', { attrs: { span: 24 } }, [i('FormItem', { attrs: { label: '使用条件', required: '' } }, [i('Row', { staticClass: 'my-row' }, [i('FormItem', { attrs: { prop: '', 'label-width': 0 } }, [i('Checkbox', { on: { 'on-change': t.handleIsLimitMoneyChange }, model: { value: t.isLimitMoney, callback: function (e) { t.isLimitMoney = e }, expression: 'isLimitMoney' } }), t._v('\n                满\n                '), i('Input', { staticClass: 'condition', attrs: { placeholder: '', clearable: '', disabled: !t.isLimitMoney }, model: { value: t.activityDto.limitMoney, callback: function (e) { t.$set(t.activityDto, 'limitMoney', typeof e === 'string' ? e.trim() : e) }, expression: 'activityDto.limitMoney' } }), t._v('\n                可用\n              ')], 1)], 1), t.isLimitProject ? t._l(t.activityDto.limitProjectInfo, function (e, a) { return i('Row', { key: a, staticClass: 'my-row', style: a > 0 ? { paddingLeft: '26px' } : '' }, [i('FormItem', { attrs: { prop: 'limitProjectInfo.' + a + '.projectBid', 'label-width': 0 } }, [a === 0 ? i('Checkbox', { on: { 'on-change': t.handleIsLimitProjectChange }, model: { value: t.isLimitProject, callback: function (e) { t.isLimitProject = e }, expression: 'isLimitProject' } }) : t._e(), t._v('\n                限\n                '), i('Select', { staticClass: 'my-select', attrs: { disabled: !t.isLimitProject, placeholder: '' }, on: { 'on-change': function (e) { t.handleProjectChange(a) } }, model: { value: e.projectBid, callback: function (i) { t.$set(e, 'projectBid', i) }, expression: 'item.projectBid' } }, t._l(t.$store.state.user.projectList, function (t) { return i('Option', { key: t.bid, attrs: { label: t.projectName, value: t.bid } }) })), i('Select', { staticClass: 'my-select', attrs: { disabled: !t.isLimitProject, placeholder: '' }, model: { value: e.houseTypeBid, callback: function (i) { t.$set(e, 'houseTypeBid', i) }, expression: 'item.houseTypeBid' } }, t._l(t.houseTypeBidGroup[a], function (t) { return i('Option', { key: t.bid, attrs: { label: t.houseTypeParentName + '·' + t.houseTypeName, value: t.bid } }) })), t._v('\n                可用\n                '), a === t.activityDto.limitProjectInfo.length - 1 && t.isLimitProject ? i('a', { staticClass: 'my-btn', on: { click: t.addLimitProject } }, [t._v('增加')]) : a < t.activityDto.limitProjectInfo.length - 1 && t.isLimitProject ? i('a', { staticClass: 'my-btn', on: { click: function (e) { t.removeLimitProject(a) } } }, [t._v('删除')]) : t._e()], 1)], 1) }) : i('Row', { staticClass: 'my-row' }, [i('FormItem', { attrs: { 'label-width': 0 } }, [i('Checkbox', { on: { 'on-change': t.handleIsLimitProjectChange }, model: { value: t.isLimitProject, callback: function (e) { t.isLimitProject = e }, expression: 'isLimitProject' } }), t._v('\n                限\n                '), i('Select', { staticClass: 'my-select', attrs: { disabled: !t.isLimitProject } }), i('Select', { staticClass: 'my-select', attrs: { disabled: !t.isLimitProject } }), t._v('\n                可用\n              ')], 1)], 1)], 2)], 1)], 1), i('Row', [i('FormItem', { attrs: { label: '优惠券' } }, [i('Table', { attrs: { stripe: '', columns: t.columns, data: t.activityDto.ticketInfo, size: 'small' }, scopedSlots: t._u([{ key: 'validity', fn: function (e) { var a = e.row; return [i('div', [t._v(t._s(a.limitDate ? '绑定后 ' + a.limitDate + ' 天内' : a.startDate + ' 至 ' + a.endDate))])] } }, { key: 'action', fn: function (e) { e.row; var a = e.index; return [i('a', { on: { click: function (e) { t.deleteTicket(a) } } }, [t._v('删除')])] } }]) }), t.activityDto.ticketInfo.length < 99 ? i('a', { on: { click: function (e) { t.visible = !0 } } }, [t._v('新增优惠券')]) : t._e()], 1)], 1), i('Row', [i('Col', { attrs: { span: '12' } }, [i('FormItem', [i('Button', { attrs: { type: 'primary' }, on: { click: t.validForm } }, [t._v(' 保 存')]), i('Button', { staticClass: 'my-btn', attrs: { type: 'default' }, on: { click: t.resetForm } }, [t._v(' 重 置')])], 1)], 1)], 1)], 1)], 1), i('Modal', { attrs: { title: '新增优惠券', modalLoading: t.modalLoading }, on: { 'on-ok': t.saveTicket }, model: { value: t.visible, callback: function (e) { t.visible = e }, expression: 'visible' } }, [t.visible ? i('ticket-form', { ref: 'ticketForm', attrs: { 'batch-number': t.activityDto.ticketInfo.length + 1 }, on: { push: t.handlePush } }) : t._e()], 1)], 1) }, o = [], n = i('be94'), s = i('fa62'), r = i('90de'), c = i('2f62'), l = i('ca41'), u = i('d43b'), d = { name: 'activityCreate', components: { ticketForm: s['a'] }, data: function () { return { activityDto: { activityName: '', dateRange: [], startDate: '', endDate: '', activityContent: '', limitMoney: '', limitProjectInfo: [], ticketInfo: [] }, houseTypeBidGroup: [], activityRules: { activityName: [{ required: !0, message: '请输入优惠活动名称', trigger: 'blur' }, { type: 'string', max: 50, message: '最多输入50字', trigger: 'blur' }], dateRange: [{ required: !0, type: 'array', fields: { 0: { type: 'date', required: !0, message: '请选择活动时间' }, 1: { type: 'date', required: !0, message: '请选择活动时间' } }, trigger: 'change' }], activityContent: [{ required: !0, message: '请输入活动内容', trigger: 'blur' }, { type: 'string', max: 200, message: '最多输入200字', trigger: 'blur' }] }, isLimitMoney: !1, isLimitProject: !1, columns: [{ title: '批次号', key: 'batchNumber' }, { title: '添加人', key: 'creator' }, { title: '添加时间', key: 'createTime' }, { title: '数量', key: 'quantity' }, { title: '金额 / 元', key: 'amount' }, { title: '有效期', slot: 'validity', width: 190 }, { title: '操作', slot: 'action', width: 60 }], loading: !1, visible: !1, modalLoading: !0, datePickerOptions: { disabledDate: function (t) { return t && t.valueOf() < Date.now() - 864e5 } } } }, methods: Object(n['a'])({}, Object(c['d'])(['closeTag']), { handleIsLimitMoneyChange: function (t) { t || (this.activityDto.limitMoney = '') }, handleIsLimitProjectChange: function (t) { t ? this.activityDto.limitProjectInfo = [{ projectBid: '', houseTypeBid: '' }] : this.activityDto.limitProjectInfo.length = 0 }, addLimitProject: function () { this.activityDto.limitProjectInfo.push({ projectBid: '', houseTypeBid: '' }), this.houseTypeBidGroup.push([]) }, removeLimitProject: function (t) { this.activityDto.limitProjectInfo.splice(t, 1), this.houseTypeBidGroup.splice(t, 1) }, handlePush: function (t) { this.$set(t, 'creator', this.$store.state.user.username), this.activityDto.ticketInfo.push(t), this.visible = !1 }, saveTicket: function () { var t = this; this.$refs.ticketForm.validForm(), setTimeout(function () { t.modalLoading = !1, t.$nextTick(function () { t.modalLoading = !0 }) }, 500) }, deleteTicket: function (t) { this.activityDto.ticketInfo.splice(t, 1) }, resetForm: function () { this.$refs['activityForm'].resetFields() }, validForm: function () { var t = this; this.$refs['activityForm'].validate(function (e) { e && t.saveActivity() }) }, saveActivity: function () { var t = this; this.loading = !0, this.activityDto.limitProjectInfo.length || (this.activityDto.limitProjectInfo = null), Object(l['c'])(this.activityDto).then(function (e) { t.$Message.success('保存成功，跳转回优惠活动列表'), t.closeTag({ name: 'createActivity' }), t.$router.push({ name: 'activityList' }), t.loading = !1 }).catch(function () { t.loading = !1 }) }, handleProjectChange: function (t) { var e = this; console.info('index ', t), Object(u['a'])(this.activityDto.limitProjectInfo[t].projectBid).then(function (i) { e.houseTypeBidGroup.splice(t, 1, i.body) }) } }), watch: { 'activityDto.dateRange': function (t) { this.activityDto.startDate = t[0] ? Object(r['d'])(t[0], 'dateNumber') : '', this.activityDto.endDate = t[1] ? Object(r['d'])(t[1], 'dateNumber') : '' } } }, m = d, p = (i('f328'), i('2877')), y = Object(p['a'])(m, a, o, !1, null, '5a59074c', null); y.options.__file = 'activityCreate.vue'; e['default'] = y.exports }, '8baa': function (t, e, i) { 'use strict'; var a = i('6105'), o = i.n(a); o.a }, ca41: function (t, e, i) { 'use strict'; i.d(e, 'b', function () { return n }), i.d(e, 'a', function () { return s }), i.d(e, 'c', function () { return r }), i.d(e, 'd', function () { return c }); var a = i('6b6c'), o = i('c276'), n = function (t) { return a['a'].request({ url: '/activity/listActivity.action', method: 'post', data: t }) }, s = function (t) { return a['a'].request({ url: '/activity/getActivityDetail.action', method: 'get', params: { activityBid: t } }) }, r = function (t) { return a['a'].request({ url: '/activity/saveActivity.action', method: 'post', data: t }) }, c = function (t, e) { return a['a'].request({ url: '/activity/updateActivity.action', method: 'post', headers: { Authorization: Object(o['k'])() || '', 'Content-Type': 'application/x-www-form-urlencoded' }, params: { activityBid: t, activityStatus: e } }) } }, f328: function (t, e, i) { 'use strict'; var a = i('1ade'), o = i.n(a); o.a }, fa62: function (t, e, i) { 'use strict'; var a = function () { var t = this, e = t.$createElement, i = t._self._c || e; return i('Form', { ref: 'ticketForm', attrs: { model: t.ticketDto, rules: t.ticketRules, 'label-width': 80 } }, [i('FormItem', { attrs: { label: '批次编号', prop: 'batchNumber' } }, [i('Input', { staticClass: 'my-cls', attrs: { placeholder: '', clearable: '', disabled: '' }, model: { value: t.ticketDto.batchNumber, callback: function (e) { t.$set(t.ticketDto, 'batchNumber', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.batchNumber' } })], 1), i('FormItem', { attrs: { label: '生成数量', prop: 'quantity' } }, [i('Input', { staticClass: 'my-cls', attrs: { placeholder: '', clearable: '' }, model: { value: t.ticketDto.quantity, callback: function (e) { t.$set(t.ticketDto, 'quantity', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.quantity' } })], 1), i('FormItem', { attrs: { label: '金额', prop: 'amount' } }, [i('Input', { staticClass: 'my-cls', attrs: { placeholder: '', clearable: '' }, model: { value: t.ticketDto.amount, callback: function (e) { t.$set(t.ticketDto, 'amount', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.amount' } })], 1), i('FormItem', { attrs: { label: '有效期', required: '' } }, [i('FormItem', { attrs: { prop: 'dateRange', 'label-width': 0, rules: t.dateRangeRules } }, [i('Radio', { model: { value: t.dateRange, callback: function (e) { t.dateRange = e }, expression: 'dateRange' } }), i('DatePicker', { staticClass: 'my-date-range', attrs: { type: 'daterange', 'split-panels': '', placeholder: '', editable: !1, disabled: !t.dateRange, options: t.datePickerOptions }, model: { value: t.ticketDto.dateRange, callback: function (e) { t.$set(t.ticketDto, 'dateRange', e) }, expression: 'ticketDto.dateRange' } })], 1), i('FormItem', { staticClass: 'my-bottom', attrs: { prop: 'limitDate', 'label-width': 0, rules: t.limitDateRules } }, [i('Radio', { model: { value: t.day, callback: function (e) { t.day = e }, expression: 'day' } }), t._v('\n      绑定至账户的\n      '), i('Input', { staticClass: 'my-day', attrs: { placeholder: '', disabled: !t.day, clearable: '' }, model: { value: t.ticketDto.limitDate, callback: function (e) { t.$set(t.ticketDto, 'limitDate', typeof e === 'string' ? e.trim() : e) }, expression: 'ticketDto.limitDate' } }), t._v('\n      天内\n    ')], 1)], 1)], 1) }, o = [], n = (i('ac6a'), i('c5f6'), i('90de')), s = { name: 'ticketForm', props: { batchNumber: Number }, data: function () { return { ticketDto: { batchNumber: '0' + this.batchNumber, quantity: '', amount: '', dateRange: [], startDate: '', endDate: '', limitDate: '', createTime: '' }, day: !1, dateRange: !0, ticketRules: { quantity: [{ required: !0, message: '请输入生成数量', trigger: 'blur' }, { pattern: /^(?!00)(?:[0-9]{1,4}|10000)$/, message: '请输入 0～10000 的整数', trigger: 'blur' }], amount: [{ required: !0, message: '请输入金额', trigger: 'blur' }, { pattern: /^(?!00)(?:[0-9]{1,4}|10000)$/, message: '请输入 0～10000 的整数', trigger: 'blur' }] }, datePickerOptions: { disabledDate: function (t) { return t && t.valueOf() < Date.now() - 864e5 } } } }, methods: { validForm: function () { var t = this; this.$refs['ticketForm'].validate(function (e) { e && t.$emit('push', t.ticketDto) }) }, resetFormItem: function (t) { this.$refs['ticketForm'].fields.forEach(function (e) { e.prop === t && e.resetField() }) } }, watch: { day: function (t) { this.dateRange = !t, this.resetFormItem('limitDate'), this.resetFormItem('dateRange') }, dateRange: function (t) { this.day = !t, this.resetFormItem('dateRange'), this.resetFormItem('limitDate') }, 'ticketDto.dateRange': function (t) { this.ticketDto.startDate = t[0] ? Object(n['d'])(t[0], 'date') : '', this.ticketDto.endDate = t[1] ? Object(n['d'])(t[1], 'date') : '' } }, computed: { dateRangeRules: function () { return this.dateRange ? [{ required: !0, type: 'array', fields: { 0: { type: 'date', required: !0, message: '请选择优惠券有效期' }, 1: { type: 'date', required: !0, message: '请选择优惠券有效期' } }, trigger: 'change' }] : [] }, limitDateRules: function () { return this.day ? [{ required: !0, message: '请输入优惠券有效期', trigger: 'blur' }, { pattern: /^([1][8][0]|[1][0-7][0-9]|[1-9][0-9]|[0-9]|[0])$/, message: '请输入 0～180 的整数', trigger: 'blur' }] : [] } } }, r = s, c = (i('8baa'), i('2877')), l = Object(c['a'])(r, a, o, !1, null, '7477b839', null); l.options.__file = 'ticketForm.vue'; e['a'] = l.exports } }])
