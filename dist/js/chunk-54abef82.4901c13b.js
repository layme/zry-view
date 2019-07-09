(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-54abef82'], { '058f': function (t, e, n) { 'use strict'; var a = n('411e'), s = n.n(a); s.a }, 2041: function (t, e, n) { 'use strict'; var a = n('cdb4'), s = n.n(a); s.a }, '3f7d': function (t, e, n) {}, '411e': function (t, e, n) {}, 4373: function (t, e, n) { 'use strict'; var a = n('6c8f'), s = n.n(a); s.a }, 6942: function (t, e, n) { 'use strict'; var a = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('Tabs', { attrs: { type: 'card' }, model: { value: t.activeName, callback: function (e) { t.activeName = e }, expression: 'activeName' } }, [n('TabPane', { attrs: { label: '基本信息', name: 'info' } }, [n('guest-info', { attrs: { 'guest-fid': t.guestFid } })], 1), n('TabPane', { attrs: { label: '入住记录', name: 'record' } }, [n('check-in-record', { attrs: { 'guest-fid': t.guestFid }, on: { close: t.handleClose } })], 1), n('TabPane', { attrs: { label: '客人喜好', name: 'tag' } }, [n('guest-tag', { attrs: { 'guest-fid': t.guestFid } })], 1), n('TabPane', { attrs: { label: '事件记录', name: 'event' } }, [n('guest-event', { attrs: { 'guest-fid': t.guestFid } })], 1)], 1) }, s = [], o = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('div', [n('Form', { attrs: { model: t.guestInfo, 'label-width': 120 } }, [n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '性 别：' } }, [n('span', [t._v(t._s(t._f('genderFilter')(t.guestInfo.gender)))])])], 1), n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '累计入住：' } }, [n('span', [t._v(t._s(t.guestInfo.checkInTimes + ' 次'))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '籍 贯：' } }, [n('span', [t._v(t._s(t.guestInfo.birthplace))])])], 1), n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '最近入住项目：' } }, [n('span', [t._v(t._s(t.guestInfo.lastProjectName ? t.guestInfo.lastProjectName : '自如民宿'))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '出生日期：' } }, [n('span', [t._v(t._s(t.guestInfo.birth))])])], 1), n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '最近入住时间：' } }, [n('span', [t._v(t._s(t._f('dateFilter')(t.guestInfo.lastCheckIn)))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '证件类型：' } }, [n('span', [t._v(t._s(t._f('idTypeFilter')(t.guestInfo.idType)))])])], 1), n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '手机号码：' } }, [n('span', [t._v(t._s(t.guestInfo.mobile))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '证件号码：' } }, [n('span', [t._v(t._s(t.guestInfo.idNumber))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '12' } }, [n('FormItem', { attrs: { label: '证件地址：' } }, [n('span', [t._v(t._s(t.guestInfo.idAddress))])])], 1)], 1)], 1), n('Button', { staticClass: 'special-btn', attrs: { type: 'warning' }, on: { click: t.confirmBlack } }, [t._v(t._s(t._f('isBlackBtnFilter')(t.guestInfo.isBlack)))])], 1) }, i = [], r = n('8b2d'), u = { name: 'guestInfo', props: { guestFid: String }, data: function () { return { guestDto: { fid: this.guestFid, pageIndex: 1, pageSize: 1 }, guestInfo: {}, guestBlackDto: { guestFid: '', currentStatus: 0 } } }, methods: { getGuestInfo: function () { var t = this; Object(r['e'])(this.guestDto).then(function (e) { t.guestInfo = e.body.rows[0] }), this.guestInfo = {} }, confirmBlack: function () { var t = this, e = this.guestInfo.isBlack === 1 ? '转为正常用户' : '转为特殊用户'; this.$Modal.confirm({ title: '通知', content: '<p>该用户将被'.concat(e, '，继续？</p>'), onOk: function () { t.addORemoveBlack() }, onCancel: function () {} }) }, addORemoveBlack: function () { var t = this; this.guestBlackDto.guestFid = this.guestInfo.fid, this.guestBlackDto.currentStatus = this.guestInfo.isBlack, Object(r['a'])(this.guestBlackDto).then(function (e) { t.guestInfo.isBlack = e.body, t.$Message.success('操作成功') }) } }, created: function () { this.getGuestInfo() }, filters: { genderFilter: function (t) { return t === 2 ? '男' : t === 1 ? '女' : '未知' }, isBlackBtnFilter: function (t) { return t === 1 ? '转为正常用户' : '转为特殊用户' } } }, l = u, c = (n('4373'), n('2877')), d = Object(c['a'])(l, o, i, !1, null, '23827ec1', null); d.options.__file = 'guestInfo.vue'; var g = d.exports, v = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('div', [n('Table', { attrs: { columns: t.columns, data: t.recordList, size: 'small', loading: t.loading }, scopedSlots: t._u([{ key: 'orderNumber', fn: function (e) { var a = e.row; return [n('a', { on: { click: function (e) { t.toOrderDetail(a) } } }, [t._v(t._s(a.orderNumber))])] } }, { key: 'checkInDate', fn: function (e) { var a = e.row; return [n('div', [t._v(t._s(t._f('dateTimeFilter')(a.checkInDate)))])] } }, { key: 'checkOutDate', fn: function (e) { var a = e.row; return [n('div', [t._v(t._s(t._f('dateTimeFilter')(a.checkInDate)))])] } }]) }), n('Page', { staticClass: 'my-page', attrs: { total: t.total, 'show-total': '', current: t.paramDto.page, 'page-size': t.paramDto.limit }, on: { 'update:current': function (e) { t.$set(t.paramDto, 'page', e) }, 'on-change': t.handlePageChange } })], 1) }, p = [], f = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('Form', { attrs: { model: t.row, 'label-width': 120 } }, [n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '入住项目：' } }, [n('span', [t._v(t._s(t.row.projectName))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '入住房型：' } }, [n('span', [t._v(t._s(t.row.houseName))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '订单号：' } }, [n('span', [t._v(t._s(t.row.orderNumber))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '入住房间：' } }, [n('span', [t._v(t._s(t.row.room))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '入住床位：' } }, [n('span', [t._v(t._s(t.row.bed))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '入住时间：' } }, [n('span', [t._v(t._s(t._f('dateFilter')(t.row.checkInDate)))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '退房时间：' } }, [n('span', [t._v(t._s(t._f('dateFilter')(t.row.checkOutDate)))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '预定时间：' } }, [n('span', [t._v(t._s(t._f('dateFilter')(t.row.bookDate)))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '出行目的：' } }, [n('span', [t._v(t._s(t.row.purpose))])])], 1)], 1), n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '获知渠道：' } }, [n('span', [t._v(t._s(t.row.channel))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '印象深刻：' } }, [n('span', [t._v(t._s(t.row.impress))])])], 1), n('Col', { attrs: { span: '8' } }, [n('FormItem', { attrs: { label: '意见建议：' } }, [n('span', [t._v(t._s(t.row.suggestion))])])], 1)], 1)], 1) }, h = [], m = { name: 'checkInRecordExpand', props: { row: Object } }, b = m, _ = (n('2041'), Object(c['a'])(b, f, h, !1, null, 'e0161fb2', null)); _.options.__file = 'checkInRecordExpand.vue'; var y = _.exports, C = { name: 'checkInRecord', props: { guestFid: String }, data: function () { return { paramDto: { guestFid: this.guestFid, pageIndex: 1, pageSize: 10 }, recordList: [], total: 0, columns: [{ type: 'expand', width: 50, render: function (t, e) { return t(y, { props: { row: e.row } }) } }, { title: '入住项目', key: 'projectName' }, { title: '入住房型', key: 'houseName' }, { title: '订单号', slot: 'orderNumber' }, { title: '入住时间', slot: 'checkInDate', width: 150 }, { title: '退房时间', slot: 'checkOutDate', width: 150 }], loading: !1 } }, methods: { toOrderDetail: function (t) { var e = t.orderNumber, n = { name: 'orderDetail', path: 'orderDetail', query: { orderNumber: e } }; this.$router.push(n), this.$emit('close') }, getRecordList: function () { this.paramDto.pageIndex = 1, this.handlePageChange() }, handlePageChange: function () { var t = this; this.loading = !0, Object(r['i'])(this.paramDto).then(function (e) { t.recordList = e.body.rows, t.total = e.body.total, t.loading = !1 }).catch(function () { t.loading = !1 }) } }, created: function () { this.getRecordList() } }, I = C, F = (n('a234'), Object(c['a'])(I, v, p, !1, null, '6f0ed3e9', null)); F.options.__file = 'checkInRecord.vue'; var D = F.exports, k = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('div', { staticClass: 'top-div' }, [n('Row', [t._l(t.guestHobbyDto.hobbyTags, function (e, a) { return n('Tag', { key: a, staticClass: 'my-tag', attrs: { closable: '', type: 'dot', color: 'primary', 'disable-transitions': !0 }, on: { 'on-close': function (e) { t.handleClose(a) } } }, [t._v('\n      ' + t._s(e) + '\n    ')]) }), t.inputVisible ? n('Input', { ref: 'saveTagInput', staticClass: 'my-tag input-new-tag', attrs: { maxlength: 15 }, on: { 'on-blur': t.handleInputConfirm }, nativeOn: { keyup: function (e) { return 'button' in e || !t._k(e.keyCode, 'enter', 13, e.key, 'Enter') ? t.handleInputConfirm(e) : null } }, model: { value: t.inputValue, callback: function (e) { t.inputValue = typeof e === 'string' ? e.trim() : e }, expression: 'inputValue' } }) : t.guestHobbyDto.hobbyTags && t.guestHobbyDto.hobbyTags.length < 30 ? n('Button', { staticClass: 'my-tag', attrs: { icon: 'ios-add' }, on: { click: t.showInput } }, [t._v(' 新增\n    ')]) : t._e()], 2), n('Row', { staticClass: 'special-row' }, [t.isChange ? n('Button', { attrs: { type: 'primary' }, on: { click: t.saveTags } }, [t._v(' 保 存')]) : t._e()], 1)], 1) }, w = [], T = { name: 'guestTag', props: { guestFid: String }, data: function () { return { guestHobbyDto: { guestFid: this.guestFid, hobbyTags: [] }, inputVisible: !1, inputValue: '', isChange: !1 } }, methods: { listHobby: function () { var t = this; Object(r['h'])(this.guestFid).then(function (e) { t.guestHobbyDto.hobbyTags = e.body }) }, handleClose: function (t) { this.guestHobbyDto.hobbyTags.splice(t, 1), this.isChange = !0 }, showInput: function () { this.inputVisible = !0, this.$nextTick(function () { this.$refs.saveTagInput.$refs.input.focus() }) }, handleInputConfirm: function () { var t = this.inputValue; if (t) { if (this.guestHobbyDto.hobbyTags.indexOf(t) !== -1) return this.$Message.warning('标签不能重复'), void this.$refs.saveTagInput.focus(); this.guestHobbyDto.hobbyTags.push(t), this.isChange = !0 } this.inputVisible = !1, this.inputValue = '' }, saveTags: function () { var t = this; Object(r['k'])(this.guestHobbyDto).then(function (e) { t.$Message.success('保存成功'), t.listHobby(), t.isChange = !1 }) } }, created: function () { this.listHobby() } }, x = T, O = (n('058f'), Object(c['a'])(x, k, w, !1, null, '079bda0e', null)); O.options.__file = 'guestHobbyTag.vue'; var $ = O.exports, R = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('div', { staticClass: 'top-div' }, [n('div', { staticClass: 'add-div' }, [n('Button', { attrs: { type: 'primary', icon: 'ios-add-circle-outline' }, on: { click: t.addEvent } }, [t._v(' 添加事件\n    ')])], 1), n('div', { staticClass: 'list-div' }, [t.eventList.length ? n('div', t._l(t.eventList, function (e, a) { return n('guest-event-card', { key: a, staticClass: 'card-cls', attrs: { index: a, event: e }, on: { update: t.handleUpdate, remove: t.handleRemove } }) })) : n('div', { staticClass: 'no-data' }, [n('span', [t._v('暂无数据')])])]), n('Page', { staticClass: 'my-page', attrs: { total: t.total, 'show-total': '', current: t.paramDto.pageIndex, 'page-size': t.paramDto.pageSize }, on: { 'update:current': function (e) { t.$set(t.paramDto, 'pageIndex', e) }, 'on-change': t.handlePageChange } }), n('Modal', { attrs: { title: t.title, loading: t.loading }, on: { 'on-ok': t.validForm }, model: { value: t.visible, callback: function (e) { t.visible = e }, expression: 'visible' } }, [t.visible ? n('Form', { ref: 'eventForm', attrs: { model: t.eventDto, rules: t.eventRules, 'label-width': 60 } }, [n('FormItem', { attrs: { label: '类型', prop: 'eventType' } }, [n('Select', { staticClass: 'my-form', attrs: { placeholder: '' }, model: { value: t.eventDto.eventType, callback: function (e) { t.$set(t.eventDto, 'eventType', e) }, expression: 'eventDto.eventType' } }, t._l(t.eventTypeOptions, function (t) { return n('Option', { key: t.value, attrs: { label: t.label, value: t.value } }) }))], 1), n('FormItem', { attrs: { label: '时间', prop: 'eventDate' } }, [n('DatePicker', { staticClass: 'my-form', attrs: { type: 'datetime', placeholder: '选择日期时间', options: t.dateOptions }, model: { value: t.eventDto.eventDate, callback: function (e) { t.$set(t.eventDto, 'eventDate', e) }, expression: 'eventDto.eventDate' } })], 1), n('FormItem', { attrs: { label: '内容', prop: 'eventContent' } }, [n('Input', { attrs: { rows: 4, type: 'textarea', maxlength: 200, placeholder: '此处最多输入200个字符' }, model: { value: t.eventDto.eventContent, callback: function (e) { t.$set(t.eventDto, 'eventContent', typeof e === 'string' ? e.trim() : e) }, expression: 'eventDto.eventContent' } })], 1)], 1) : t._e()], 1)], 1) }, B = [], j = function () { var t = this, e = t.$createElement, n = t._self._c || e; return n('div', [n('Card', { attrs: { 'dis-hover': '' } }, [n('Row', { attrs: { gutter: 20 } }, [n('Col', { attrs: { span: 14 } }, [t.event.eventType === 1 ? n('Tag', { staticClass: 'my-tag', attrs: { color: 'success' } }, [t._v('好评')]) : n('Tag', { staticClass: 'my-tag', attrs: { color: 'warning' } }, [t._v('投诉')]), t._v('\n        ' + t._s(t._f('dateTimeFilter')(t.event.eventDate)) + '\n      ')], 1), n('Col', { staticStyle: { 'text-align': 'right' }, attrs: { span: 10 } }, [n('Button', { staticClass: 'my-btn', attrs: { size: 'small', type: 'primary', icon: 'ios-create-outline', shape: 'circle' }, on: { click: t.update } }), n('Button', { attrs: { size: 'small', type: 'error', icon: 'ios-trash-outline', shape: 'circle' }, on: { click: t.remove } })], 1)], 1), n('Row', [n('Col', { staticClass: 'content', attrs: { span: 18 } }, [t._v('\n      ' + t._s(t.event.eventContent) + '\n      ')])], 1), n('div', { staticClass: 'scene-row' }, [t._v('\n      ' + t._s(t.event.sceneName) + '\n    ')])], 1)], 1) }, E = [], N = (n('c5f6'), { name: 'guestEventCard', props: { event: Object, index: Number }, data: function () { return {} }, methods: { update: function () { this.$emit('update', this.index) }, remove: function () { this.$emit('remove', this.index) } }, created: function () {} }), P = N, q = (n('baed'), Object(c['a'])(P, j, E, !1, null, '4e928e36', null)); q.options.__file = 'guestEventCard.vue'; var L = q.exports, S = { name: 'guestEvent', props: { guestFid: String }, components: { guestEventCard: L }, data: function () { return { paramDto: { guestFid: this.guestFid, pageIndex: 1, pageSize: 3 }, eventList: [], total: 0, visible: !1, loading: !0, title: '', eventDto: {}, eventRules: { eventType: [{ required: !0, type: 'number', message: '请选择类型', trigger: 'change' }], eventDate: [{ required: !0, type: 'date', message: '请选择时间', trigger: 'change' }], eventContent: [{ required: !0, message: '请输入内容', trigger: 'blur' }, { max: 200, message: '长度在200个字符以内', trigger: 'blur' }] }, eventTypeOptions: [{ label: '好评', value: 1 }, { label: '投诉', value: 2 }], dateOptions: { shortcuts: [{ text: '此刻', value: function () { return new Date() } }] } } }, methods: { handlePageChange: function () { var t = this; Object(r['f'])(this.paramDto).then(function (e) { t.eventList = e.body.rows, t.total = e.body.total }) }, addEvent: function () { this.title = '添加事件', this.visible = !0, this.eventDto = { projectBid: this.$store.state.user.currentProject.bid, guestFid: this.guestFid, eventFid: '', eventContent: '', eventType: 1, eventDate: '' } }, validForm: function () { var t = this; this.$refs['eventForm'].validate(function (e) { e ? t.save() : setTimeout(function () { t.loading = !1, t.$nextTick(function () { t.loading = !0 }) }, 500) }) }, save: function () { var t = this; Object(r['b'])(this.eventDto).then(function (e) { t.$Message.success('保存成功'), t.visible = !1, t.handlePageChange() }).catch(function () { setTimeout(function () { t.loading = !1, t.$nextTick(function () { t.loading = !0 }) }, 500) }) }, handleUpdate: function (t) { this.title = '修改事件', this.visible = !0, this.eventDto.guestFid = this.eventList[t].fid, this.eventDto.projectBid = this.eventList[t].projectBid, this.eventDto.eventFid = this.eventList[t].eventFid, this.eventDto.eventContent = this.eventList[t].eventContent, this.eventDto.eventType = this.eventList[t].eventType, this.eventDto.eventDate = new Date(this.eventList[t].eventDate) }, handleRemove: function (t) { var e = this; this.$Modal.confirm({ title: '通知', content: '<p>确定删除该事件吗？</p>', onOk: function () { e.removeEvent(t) }, onCancel: function () {} }) }, removeEvent: function () { var t = this; Object(r['d'])({ guestFid: this.guestFid }).then(function (e) { t.$Message.success('删除成功'), t.handlePageChange() }) } }, created: function () { this.handlePageChange() }, filters: { genderFilter: function (t) { return t === 2 ? '男' : t === 1 ? '女' : '未知' } } }, H = S, V = (n('a7a1'), Object(c['a'])(H, R, B, !1, null, '62d69767', null)); V.options.__file = 'guestEvent.vue'; var z = V.exports, M = { name: 'guestTabs', props: { guestFid: String, active: String }, components: { guestInfo: g, checkInRecord: D, guestTag: $, guestEvent: z }, data: function () { return { activeName: this.active ? this.active : 'info' } }, methods: { handleClose: function () { this.$emit('close') } } }, G = M, U = (n('e53d'), Object(c['a'])(G, a, s, !1, null, '588cf0eb', null)); U.options.__file = 'guestTabs.vue'; e['a'] = U.exports }, '6c8f': function (t, e, n) {}, '8b2d': function (t, e, n) { 'use strict'; n.d(e, 'e', function () { return s }), n.d(e, 'a', function () { return o }), n.d(e, 'i', function () { return i }), n.d(e, 'h', function () { return r }), n.d(e, 'k', function () { return u }), n.d(e, 'f', function () { return l }), n.d(e, 'b', function () { return c }), n.d(e, 'd', function () { return d }), n.d(e, 'c', function () { return g }), n.d(e, 'g', function () { return v }), n.d(e, 'j', function () { return p }); var a = n('6b6c'), s = function (t) { return a['a'].request({ url: '/guest/listGuest.action', method: 'post', data: t }) }, o = function (t) { return a['a'].request({ url: '/guest/addORemoveBlack.action', method: 'post', data: t }) }, i = function (t) { return a['a'].request({ url: '/guest/listRecord.action', method: 'get', params: t }) }, r = function (t) { return a['a'].request({ url: '/guest/listHobby.action', method: 'get', params: { guestFid: t } }) }, u = function (t) { return a['a'].request({ url: '/guest/saveTags.action', method: 'post', data: t }) }, l = function (t) { return a['a'].request({ url: '/guest/listEvent.action', method: 'get', params: t }) }, c = function (t) { return a['a'].request({ url: '/guest/addOrUpdateEvent.action', method: 'post', data: t }) }, d = function (t) { return a['a'].request({ url: '/guest/deleteEvent.action', method: 'post', data: t }) }, g = function (t) { return a['a'].request({ url: '/guest/collectGuestInfo.action', method: 'get', params: { orderBid: t } }) }, v = function (t) { return a['a'].request({ url: '/guest/listGuestInfo.action', method: 'get', params: { orderBid: t } }) }, p = function (t) { return a['a'].request({ url: '/guest/saveGuestInfo.action', method: 'post', data: t }) } }, a234: function (t, e, n) { 'use strict'; var a = n('be0e'), s = n.n(a); s.a }, a7a1: function (t, e, n) { 'use strict'; var a = n('3f7d'), s = n.n(a); s.a }, baed: function (t, e, n) { 'use strict'; var a = n('f603'), s = n.n(a); s.a }, be0e: function (t, e, n) {}, cdb4: function (t, e, n) {}, e36d: function (t, e, n) {}, e53d: function (t, e, n) { 'use strict'; var a = n('e36d'), s = n.n(a); s.a }, f603: function (t, e, n) {} }])
