(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-fed38334'], { '3e99': function (t, e, a) { 'use strict'; var o = a('4845'), n = a.n(o); n.a }, '46ae': function (t, e, a) {}, 4845: function (t, e, a) {}, '5a4a': function (t, e, a) {}, '61c2': function (t, e, a) { 'use strict'; var o = a('5a4a'), n = a.n(o); n.a }, '79e5b': function (t, e, a) {}, a7bf: function (t, e, a) { 'use strict'; var o = a('79e5b'), n = a.n(o); n.a }, dd9d: function (t, e, a) { 'use strict'; var o = a('46ae'), n = a.n(o); n.a }, dffe: function (t, e, a) { 'use strict'; a.d(e, 'a', function () { return n }), a.d(e, 'd', function () { return l }), a.d(e, 'g', function () { return s }), a.d(e, 'e', function () { return i }), a.d(e, 'c', function () { return r }), a.d(e, 'b', function () { return c }), a.d(e, 'f', function () { return u }); var o = a('6b6c'), n = function (t) { return o['a'].request({ url: '/evaluate/batch.action', method: 'get', params: t }) }, l = function (t) { return o['a'].request({ url: '/evaluate/v1.action', method: 'get', params: { projectBid: t } }) }, s = function (t) { return o['a'].request({ url: '/evaluate/'.concat(t.recordId, '.action'), method: 'post', data: t }) }, i = function (t) { return o['a'].request({ url: '/evaluate/'.concat(t.lowEvaluateRecordCode, '.action'), method: 'put', data: t }) }, r = function (t) { return o['a'].request({ url: '/lowEvaluate/batch.action', method: 'get', params: t }) }, c = function (t) { return o['a'].request({ url: '/lowEvaluate/'.concat(t.lowEvaluateBid, '.action'), method: 'get', params: t }) }, u = function (t) { return o['a'].request({ url: '/lowEvaluate/'.concat(t.lowEvaluateBid, '.action'), method: 'put', data: t }) } }, e596: function (t, e, a) { 'use strict'; a.r(e); var o = function () { var t = this, e = t.$createElement, a = t._self._c || e; return a('div', { staticClass: 'full-top' }, [t.loading ? a('Spin', { staticClass: 'full-spin', attrs: { size: 'large', fix: '' } }) : t._e(), a('Divider', { attrs: { orientation: 'left' } }, [t._v('评价信息')]), a('div', { staticStyle: { margin: '0 200px' } }, [Object.keys(t.evaluate).length ? a('info-card', { attrs: { evaluate: t.evaluate } }) : t._e()], 1), a('Divider', { attrs: { orientation: 'left' } }, [t._v('跟进记录')]), t.haveData ? a('div', { staticStyle: { margin: '0 200px' } }, [a('follow-timeline', { attrs: { records: t.followRecords, followUpStatus: t.evaluate.followUpStatus } })], 1) : a('div', { staticStyle: { height: '100px', 'text-align': 'center', 'padding-top': '40px' } }, [a('span', [t._v('暂无跟进记录')])]), t.evaluate.followUpStatus < 3 ? [a('Divider', { attrs: { orientation: 'left' } }, [t._v('跟进反馈')]), a('follow-up', { ref: 'followUpForm', staticStyle: { margin: '0 200px' }, attrs: { lowEvaluateBid: t.evaluate.bid }, on: { submit: t.followUp, finish: t.confirmFinish } })] : t._e()], 2) }, n = [], l = function () { var t = this, e = t.$createElement, a = t._self._c || e; return a('div', [a('Row', [a('span', [a('Icon', { attrs: { type: 'ios-list-box-outline' } }), t._v('\n      ' + t._s(t.evaluate.businessCode) + '\n    ')], 1), a('span', { staticStyle: { 'margin-left': '30px' } }, [a('Icon', { attrs: { type: 'ios-phone-portrait' } }), t._v('\n      ' + t._s(t.evaluate.evaluatePersonPhone) + '\n    ')], 1), t.evaluate.followUpStatus === 1 ? a('Tag', { staticStyle: { 'margin-left': '30px' }, attrs: { color: 'volcano' } }, [t._v('低评已提醒')]) : t.evaluate.followUpStatus === 2 ? a('Tag', { staticStyle: { 'margin-left': '30px' }, attrs: { color: 'blue' } }, [t._v('低评跟进中')]) : a('Tag', { staticStyle: { 'margin-left': '30px' }, attrs: { color: 'green' } }, [t._v('低评已完结')])], 1), a('Row', { staticClass: 'evaluate-list' }, [a('Col', { attrs: { span: 3 } }, [a('span', [t._v('总体评星')]), a('span', { staticClass: 'my-score' }, [t._v(t._s(t.evaluate.customerAvgStarLevel))])]), t._l(t.evaluate.starList, function (e, o) { return a('Col', { key: o, attrs: { span: 3 } }, [a('span', [t._v(t._s(e.questionContent))]), a('span', { staticClass: 'my-score' }, [t._v(t._s(e.answerScore))])]) })], 2), a('Row', { staticClass: 'evaluate-list my-content' }, [t._v('\n    ' + t._s(t.evaluate.customerSuggestion ? t.evaluate.customerSuggestion : '用户没有给出评价文字') + '\n  ')]), t.evaluate.labelList.length ? a('Row', { staticClass: 'evaluate-list' }, t._l(t.evaluate.labelList, function (e, o) { return a('Tag', { key: o, staticStyle: { 'margin-right': '10px' }, attrs: { color: 'blue' } }, [t._v('\n      ' + t._s(e.answerContent) + '\n    ')]) })) : t._e(), a('Row', { staticClass: 'evaluate-list' }, [a('span', { staticStyle: { color: '#909399' } }, [t._v('发表于  ' + t._s(t._f('dateFilter')(t.evaluate.evaluateTime)))])])], 1) }, s = [], i = { name: 'infoCard', props: { evaluate: Object }, filters: { statusFilter: function (t) { return t === 1 ? '低评已提醒' : t === 2 ? '低评跟进中' : '低评已完结' } } }, r = i, c = (a('3e99'), a('2877')), u = Object(c['a'])(r, l, s, !1, null, '138fa03e', null); u.options.__file = 'infoCard.vue'; var f = u.exports, v = function () { var t = this, e = t.$createElement, a = t._self._c || e; return a('Timeline', t._l(t.records, function (e, o) { return o !== t.records.length - 1 || t.followUpStatus !== 3 ? a('TimelineItem', { key: o }, [a('p', { staticClass: 'content' }, [t._v(t._s(e.content))]), a('p', { staticClass: 'time' }, [t._v(t._s(e.createUserName) + '    ' + t._s(e.createTime))])]) : a('TimelineItem', { attrs: { color: 'green' } }, [a('Icon', { attrs: { slot: 'dot', type: 'ios-checkmark-circle' }, slot: 'dot' }), a('p', { staticClass: 'content' }, [t._v(t._s(e.content))]), a('p', { staticClass: 'time' }, [t._v(t._s(e.createUserName) + '    ' + t._s(e.createTime))])], 1) })) }, p = [], d = (a('c5f6'), { name: 'followTimeline', props: { records: { type: Array, default: function () { return [] } }, followUpStatus: Number } }), m = d, w = (a('a7bf'), Object(c['a'])(m, v, p, !1, null, '6416ccf8', null)); w.options.__file = 'followTimeline.vue'; var h = w.exports, _ = function () { var t = this, e = t.$createElement, a = t._self._c || e; return a('Form', { ref: 'evalFollowUpForm', attrs: { model: t.paramDto, rules: t.rules, 'label-width': 0 } }, [a('FormItem', { attrs: { prop: 'content' } }, [a('Input', { attrs: { type: 'textarea', rows: 6, maxlength: 200, placeholder: '此处最多输入200个字符' }, model: { value: t.paramDto.content, callback: function (e) { t.$set(t.paramDto, 'content', e) }, expression: 'paramDto.content' } })], 1), a('FormItem', [a('Button', { staticClass: 'my-btn', attrs: { type: 'primary' }, on: { click: t.valid } }, [t._v('提 交')]), a('Button', { directives: [{ name: 'action', rawName: 'v-action', value: t.btnAccess, expression: 'btnAccess' }], attrs: { type: 'success' }, on: { click: t.finish } }, [t._v('完 结')])], 1)], 1) }, g = [], b = { name: 'followUp', props: { lowEvaluateBid: String }, data: function () { return { paramDto: { lowEvaluateBid: this.lowEvaluateBid, content: '', followUpStatus: null }, rules: { content: [{ required: !0, message: '请输入跟进描述', trigger: 'blur' }] }, btnAccess: '/evaluate/confirmFinish.action' } }, methods: { valid: function () { var t = this; this.$refs.evalFollowUpForm.validate(function (e) { e && t.$emit('submit', t.paramDto) }) }, reset: function () { this.$refs.evalFollowUpForm.resetFields() }, finish: function () { this.$emit('finish', this.paramDto) } }, watch: { lowEvaluateBid: function (t) { this.paramDto.lowEvaluateBid = t } } }, U = b, y = (a('61c2'), Object(c['a'])(U, _, g, !1, null, '3f957c16', null)); y.options.__file = 'followUp.vue'; var F = y.exports, S = a('dffe'), E = { name: 'followUpLowEvaluate', components: { infoCard: f, followTimeline: h, followUp: F }, data: function () { return { evalParamDto: { orderNumber: '', pageFlag: !1 }, evaluate: {}, haveData: !0, followRecords: [], evalFollowUpDto: { followUpStatus: '', content: '' } } }, methods: { selectLowEvaluate: function () { var t = this; this.loading = !0, this.evalParamDto.orderNumber = this.$route.query.orderNumber, Object(S['c'])(this.evalParamDto).then(function (e) { t.evaluate = e.body.rows[0], t.listLowEvalFollowUp(), t.loading = !1 }).catch(function () { t.loading = !1 }) }, listLowEvalFollowUp: function () { var t = this; this.evalFollowUpDto.lowEvaluateBid = this.evaluate.bid, this.evalFollowUpDto.content = '', Object(S['b'])(this.evalFollowUpDto).then(function (e) { t.followRecords = e.body, t.haveData = t.followRecords.length > 0 }).catch(function () { t.haveData = !1 }) }, followUp: function (t) { t.followUpStatus = 2, this.insertLowEvalFollowUp(t) }, confirmFinish: function (t) { var e = this; this.$Modal.confirm({ title: '通知', content: '<p>确认完结后，将无法再修改，继续吗？</p>', onOk: function () { e.finish(t) }, onCancel: function () {} }) }, finish: function (t) { t.content || (t.content = '完结'), t.followUpStatus = 3, this.insertLowEvalFollowUp(t) }, insertLowEvalFollowUp: function (t) { var e = this; Object(S['f'])(t).then(function (a) { e.$Message.success('操作成功'), e.listLowEvalFollowUp(), e.evaluate.followUpStatus = t.followUpStatus, e.$refs.followUpForm.reset() }) } }, watch: { $route: function (t, e) { this.selectLowEvaluate() } }, created: function () { this.selectLowEvaluate() } }, C = E, D = (a('dd9d'), Object(c['a'])(C, o, n, !1, null, '4f606a05', null)); D.options.__file = 'lowEvaluateFollowUp.vue'; e['default'] = D.exports } }])
