(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2029ca3c"],{"36b1":function(e,t,r){},4674:function(e,t,r){"use strict";var n=r("db31"),a=r.n(n);a.a},"52bb":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"con"},[e.loading?r("Spin",{staticClass:"full-spin",attrs:{size:"large",fix:""}}):e._e(),Object.keys(e.orderInfo).length?r("div",{staticClass:"subscript",style:{backgroundColor:e.refundStatusBC}},[e._v("\n    "+e._s(e._f("refundStatusFilter")(e.orderInfo.refundStatus))+"\n  ")]):e._e(),r("Row",[r("strong",{staticClass:"order order-number"},[e._v("订单号："+e._s(e.orderInfo.orderNumber))])]),Object.keys(e.orderInfo).length&&"n"===e.$route.query.flag?r("cancel-reason-card",{staticClass:"card-cls",attrs:{"order-info":e.orderInfo}}):e._e(),e._l(e.orderInfo.refundDetailVos,function(t,n){return Object.keys(e.orderInfo).length?r("refund-card",{key:n,staticClass:"card-cls",attrs:{index:n+1,"refund-status":e.orderInfo.refundStatus,refund:t,"check-out-data":e.checkOutData},on:{refresh:e.getCheckOutData,refreshFee:e.getAllFeeAmount}}):e._e()}),Object.keys(e.orderInfo).length?r("refund-verify-card",{staticClass:"card-cls",attrs:{"order-info":e.orderInfo,"refund-fee-detail-info":e.refundFeeDetailInfo},on:{refresh:e.getCheckOutData,refreshFee:e.getAllFeeAmount}}):e._e()],2)},a=[],s=(r("7514"),r("ac6a"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[e._v("\n    取消原因\n  ")]),r("Form",{attrs:{model:e.paramDto,"label-width":70}},[r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"取消原因"}},[r("Select",{attrs:{placeholder:"请选择",disabled:0!==e.orderInfo.refundStatus},model:{value:e.paramDto.refundReason,callback:function(t){e.$set(e.paramDto,"refundReason",t)},expression:"paramDto.refundReason"}},e._l(e.cancelOptions,function(t){return r("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1)],1)],1),r("Row",[r("Col",{attrs:{span:12}},[r("FormItem",{attrs:{label:"备注"}},[r("Input",{attrs:{type:"textarea",placeholder:"",row:2,maxlength:200},model:{value:e.paramDto.refundRemark,callback:function(t){e.$set(e.paramDto,"refundRemark","string"===typeof t?t.trim():t)},expression:"paramDto.refundRemark"}})],1)],1)],1),0===e.orderInfo.refundStatus?r("Button",{attrs:{type:"primary"},on:{click:e.confirmUpdate}},[e._v(" 修 改")]):e._e()],1)],1)}),o=[],u=r("42ce"),i={name:"cancelReasonCard",props:{orderInfo:Object},data:function(){return{paramDto:{orderBid:"",sourceType:1,bid:"",orderNumber:"",orderStatus:"",refundReason:"",refundRemark:""},cancelOptions:[{label:"改变行程",value:1},{label:"填错信息、选错床位了",value:2},{label:"到店没房了",value:3},{label:"其他",value:4}]}},methods:{init:function(){this.paramDto.orderBid=this.orderInfo.orderBid,this.paramDto.bid=this.orderInfo.refundBid,this.paramDto.orderNumber=this.orderInfo.orderNumber,this.paramDto.orderStatus=this.orderInfo.orderStatus,this.paramDto.refundReason=this.orderInfo.refundReason,this.paramDto.refundRemark=this.orderInfo.refundRemark},confirmUpdate:function(){var e=this;this.$Modal.confirm({title:"通知",content:"<p>确定修改取消原因吗？</p>",onOk:function(){e.updateCancel()},onCancel:function(){}})},updateCancel:function(){var e=this;Object(u["j"])(this.paramDto).then(function(){e.$Message.success("修改成功")})}},watch:{orderInfo:{handler:function(){this.init()},deep:!0}},created:function(){this.init()}},f=i,d=(r("4674"),r("2877")),l=Object(d["a"])(f,s,o,!1,null,"6bfb29fe",null);l.options.__file="cancelReasonCard.vue";var c=l.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[e._v("\n    退款金额操作 - NO."+e._s(e.index)+"\n  ")]),r("div",{attrs:{slot:"extra"},slot:"extra"},[r("span",[e._v("编辑退款：\n      "),r("i-switch",{attrs:{size:"large","true-value":1,"false-value":0,disabled:0!==e.refundStatus},on:{"on-change":e.handleSwitchChange},model:{value:e.refundData.cancelExitWay,callback:function(t){e.$set(e.refundData,"cancelExitWay",t)},expression:"refundData.cancelExitWay"}},[r("span",{attrs:{slot:"open"},slot:"open"},[e._v("开启")]),r("span",{attrs:{slot:"close"},slot:"close"},[e._v("关闭")])])],1),r("span",{style:{marginLeft:"20px"}},[e._v("申请时间："+e._s(e._f("dateTimeFilter")(e.refundData.createTime)))])]),r("Row",{attrs:{gutter:20}},[r("Col",{attrs:{span:12}},[r("Table",{attrs:{size:"small",columns:e.personColumns,data:e.refundData.personVoList},scopedSlots:e._u([{key:"status",fn:function(t){var n=t.row;return[r("div",[e._v(e._s(e._f("bedStatusFilter")(n.status)))])]}}])})],1),r("Col",{attrs:{span:12}},[r("Table",{attrs:{size:"small",columns:e.detailColumns,data:e.refundData.detailOperationVos},scopedSlots:e._u([{key:"feeType",fn:function(t){var r=t.row;return[e._v("\n          "+e._s(e._f("feeTypeFilter")(r.feeType))+"\n        ")]}},{key:"isTaken",fn:function(t){var n=t.row;return[r("i-switch",{attrs:{size:"large","true-value":0,"false-value":1,disabled:1!==e.refundData.cancelExitWay||0!==e.refundStatus},on:{"on-change":function(t){e.handleTaken(t,n)}},model:{value:n.isTaken,callback:function(t){e.$set(n,"isTaken",t)},expression:"row.isTaken"}},[r("span",{attrs:{slot:"open"},slot:"open"},[e._v("是")]),r("span",{attrs:{slot:"close"},slot:"close"},[e._v("否")])])]}},{key:"feeAmount",fn:function(t){var n=t.row;return[1===e.refundData.cancelExitWay&&0===n.isTaken&&2===n.feeType?r("div",[r("Input",{staticClass:"my-input",attrs:{placeholder:"",clearable:""},model:{value:n.feeAmount,callback:function(t){e.$set(n,"feeAmount","string"===typeof t?t.trim():t)},expression:"row.feeAmount"}}),r("Button",{staticClass:"my-btn",attrs:{type:"primary",shape:"circle",icon:"md-checkmark",size:"small"},on:{click:function(t){e.validFeeAmount(n)}}})],1):r("div",[e._v(e._s(n.feeAmount))])]}}])})],1)],1)],1)},p=[],m=(r("c5f6"),{name:"refundCard",props:{index:Number,refundStatus:Number,refund:Object,checkOutData:Array},data:function(){return{refundData:this.refund,personColumns:[{title:"姓名",key:"name"},{title:"房型",key:"houseTypeShowName"},{title:"床位号",key:"bedCode"},{title:"床位状态",slot:"status"}],detailColumns:[{title:"日期",key:"takenDate"},{title:"费用项",slot:"feeType"},{title:"是否收取",slot:"isTaken"},{title:"金额/元",slot:"feeAmount"}],upRefundDto:{orderBid:"",refundDetailList:[]}}},methods:{handleSwitchChange:function(e){var t=this;if(0===e){this.upRefundDto.orderBid=this.$route.query.orderBid;var r={bid:this.refundData.bid,refundBid:this.refundData.refundBid,cancelExitWay:e};this.upRefundDto.refundDetailList.push(r),Object(u["k"])(this.upRefundDto).then(function(){t.$Message.success("操作成功，数据已保存"),t.$emit("refresh")})}},handleTaken:function(e,t){var r=this;Object(u["a"])(t).then(function(e){r.$Message.success("编辑成功"),r.$emit("refreshFee")}).catch(function(){t.isTaken=1===e?0:1})},validFeeAmount:function(e){var t=this;e.feeAmount?e.feeAmount>this.refundData.detailOperationVos.find(function(e){return 2===e.feeType}).oldFeeAmount?this.$Message.error("不能大于原来的金额"):Object(u["a"])(e).then(function(){t.$Message.success("编辑成功"),t.$emit("refreshFee")}):this.$Message.error("请输入违约金收取金额")}},filters:{feeTypeFilter:function(e){return 1===e?"房租":2===e?"违约金":void 0},bedStatusFilter:function(e){switch(e){case 1:return"未入住";case 2:return"已入住";case 3:return"已续租";case 4:return"已退租";case 5:return"已保存床位";case 6:return"已保存入住人信息";case 8:return"已支付取消";case 9:return"未入住取消";case 10:return"未入住退房"}}}}),v=m,b=(r("b7bd"),Object(d["a"])(v,h,p,!1,null,"96cd47de",null));b.options.__file="refundCard.vue";var _=b.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[2===e.orderInfo.refundStatus?[e._v("退款明细")]:[e._v("退款审核")]],2),r("div",[r("Row",[r("Col",{attrs:{span:6}},[r("span",{staticClass:"refund"},[2===e.orderInfo.refundStatus?[e._v("已退款:")]:[e._v("预计退款:")],r("span",{staticClass:"refund refund-amount"},[e._v(" "+e._s(e._f("amountFilter")(e.predict.refundAmount))+" ")]),e._v("\n          元\n        ")],2)]),r("Col",{staticClass:"my-col",attrs:{span:6}},[r("span",{staticClass:"my-span"},[e._v("退款方式:\n          "),1===e.orderInfo.availableRefundWay?[1===e.orderInfo.refundWay?[r("Tag",{attrs:{color:"blue"}},[e._v("原路退回")])]:2===e.orderInfo.refundWay?[r("Tag",{attrs:{color:"blue"}},[e._v("退至银行卡")])]:e._e()]:2===e.orderInfo.availableRefundWay?[2===e.orderInfo.refundWay?[r("Tag",{attrs:{color:"blue"}},[e._v("退至银行卡")])]:e._e()]:[r("Tag",{attrs:{color:"blue"}},[e._v("OTA退款")])]],2)]),3===e.orderInfo.refundStatus?r("Col",{staticClass:"my-col",attrs:{span:6}},[r("span",{staticClass:"my-span"},[e._v("失败原因:\n          "),r("Tag",{attrs:{color:"error"}},[e._v(e._s(e.orderInfo.refundFailReason))])],1)]):e._e(),4===e.orderInfo.refundStatus?r("Col",{staticClass:"my-col",attrs:{span:6}},[r("span",{staticClass:"my-span"},[e._v("拒绝原因:\n          "),r("Tag",{attrs:{color:"warning"}},[e._v(e._s(e._f("refuseReasonFilter")(e.orderInfo.refuseReason)))])],1)]):e._e(),4===e.orderInfo.refundStatus?r("Col",{staticClass:"my-col",attrs:{span:6}},[r("span",{staticClass:"my-span"},[e._v("备注:\n          "+e._s(e._f("nullFilter")(e.orderInfo.refuseRemark))+"\n        ")])]):e._e()],1),r("Row",{staticClass:"my-row"},[r("Col",{attrs:{span:6}},[r("span",[e._v("订单总额:\n          "),r("Tag",{attrs:{color:"blue"}},[e._v(e._s(e._f("amountFilter")(e.predict.payAmount)))]),e._v("\n          元")],1)]),r("Col",{attrs:{span:6}},[r("span",[e._v("优惠券折扣:\n          "),r("Tag",{attrs:{color:"blue"}},[e._v(e._s(e._f("amountFilter")(e.predict.favourAmount)))]),e._v("\n          元")],1)]),r("Col",{attrs:{span:6}},[r("span",[e._v("房租消费:\n          "),r("Tag",{attrs:{color:"blue"}},[e._v(e._s(e._f("amountFilter")(e.predict.rentedAmount)))]),e._v("\n          元")],1)]),r("Col",{attrs:{span:6}},[r("span",[e._v("违约金消费:\n          "),r("Tag",{attrs:{color:"blue"}},[e._v(e._s(e._f("amountFilter")(e.predict.penaltyAmount)))]),e._v("\n          元")],1)])],1),0===e.orderInfo.refundStatus||3===e.orderInfo.refundStatus?r("Row",{staticClass:"my-row"},[r("Button",{staticClass:"my-btn",on:{click:e.refreshPredict}},[e._v("估算退款")]),r("Button",{staticClass:"my-btn",attrs:{type:"primary",loading:e.loading},on:{click:e.saveOrderRefundInfo}},[e._v("提交审核")]),e.validRefuseBtn?r("Button",{staticClass:"my-btn",attrs:{type:"primary"},on:{click:e.openRefuse}},[e._v("拒绝退款")]):e._e()],1):e._e()],1),r("Modal",{attrs:{loading:e.refuseLoading,title:"拒绝退款",width:"500"},on:{"on-ok":e.validateForm},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("Form",{ref:"refuseForm",attrs:{model:e.refuseDto,rules:e.rules,"label-width":80}},[r("FormItem",{attrs:{label:"拒绝原因",prop:"refuseReason"}},[r("Select",{staticClass:"my-select",attrs:{placeholder:""},model:{value:e.refuseDto.refuseReason,callback:function(t){e.$set(e.refuseDto,"refuseReason",t)},expression:"refuseDto.refuseReason"}},e._l(e.refuseOptions,function(t){return r("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1),3===e.refuseDto.refuseReason?r("div",[r("FormItem",{attrs:{label:"备注",prop:"refuseRemark",rules:[{required:!0,message:"请输入备注信息",trigger:"blur"}]}},[r("Input",{attrs:{type:"textarea",placeholder:"",row:2,maxlength:200},model:{value:e.refuseDto.refuseRemark,callback:function(t){e.$set(e.refuseDto,"refuseRemark","string"===typeof t?t.trim():t)},expression:"refuseDto.refuseRemark"}})],1)],1):r("FormItem",{attrs:{label:"备注",prop:"refuseRemark"}},[r("Input",{attrs:{type:"textarea",placeholder:"",row:2,maxlength:200},model:{value:e.refuseDto.refuseRemark,callback:function(t){e.$set(e.refuseDto,"refuseRemark","string"===typeof t?t.trim():t)},expression:"refuseDto.refuseRemark"}})],1)],1)],1)],1)},D=[],k={name:"amountPredictCard",props:{orderInfo:Object,refundFeeDetailInfo:Array},data:function(){return{predict:{refundAmount:"",payAmount:"",favourAmount:"",rentedAmount:"",penaltyAmount:""},loading:!1,saveRefundDto:{bid:"",status:"",refundReason:"",refundAmount:"",refundWay:"",orderBid:""},visible:!1,refuseLoading:!0,refuseDto:{orderBid:"",refundWay:"",refuseReason:1,refuseRemark:""},refuseOptions:[{label:"不符合退款规则，已超出退款时限",value:1},{label:"用户取消退款",value:2},{label:"其他",value:3}],rules:{}}},computed:{validRefuseBtn:function(){return"n"===this.$route.query.flag&&!(0===this.orderInfo.isRelease&&0===this.orderInfo.refundStatus&&(8===this.orderInfo.orderStatus||9===this.orderInfo.orderStatus||10===this.orderInfo.orderStatus))}},methods:{init:function(){this.predict.payAmount=this.refundFeeDetailInfo.find(function(e){return 1===e.feeType}).feeAmount,this.predict.favourAmount=this.refundFeeDetailInfo.find(function(e){return 2===e.feeType}).feeAmount,this.predict.rentedAmount=this.refundFeeDetailInfo.find(function(e){return 3===e.feeType}).feeAmount,this.predict.penaltyAmount=this.refundFeeDetailInfo.find(function(e){return 4===e.feeType}).feeAmount,this.predict.refundAmount=this.refundFeeDetailInfo.find(function(e){return 5===e.feeType}).feeAmount},refreshPredict:function(){this.$emit("refreshFee")},saveOrderRefundInfo:function(){var e=this;this.loading=!0,this.saveRefundDto.bid=this.orderInfo.refundBid,this.saveRefundDto.status=this.orderInfo.refundStatus,this.saveRefundDto.refundReason=this.orderInfo.refundReason,this.saveRefundDto.refundAmount=this.orderInfo.refundAmount,this.saveRefundDto.refundWay=this.orderInfo.refundWay,this.saveRefundDto.orderBid=this.orderInfo.orderBid,Object(u["g"])(this.saveRefundDto).then(function(){e.$Message.success("退款信息保存成功"),e.refundConfirm(),e.loading=!1}).catch(function(){e.loading=!1})},refundConfirm:function(){var e=this;this.$Modal.confirm({title:"通知",content:'<p>预计退款 <span style="color: #ed4014; font-size: 22px">'+this.predict.refundAmount+"</span> 元</p><p>此操作无法回滚，确定提交吗？</p>",onOk:function(){e.submitRefund()},onCancel:function(){}})},submitRefund:function(){var e=this;Object(u["i"])(this.orderInfo.orderBid,this.orderInfo.orderStatus).then(function(){e.$Message.success("退款审核提交成功"),e.$emit("refresh")})},openRefuse:function(){this.visible=!0,this.refuseDto.orderBid=this.orderInfo.orderBid,this.refuseDto.refundWay=this.orderInfo.refundWay,this.refuseDto.refuseRemark=this.orderInfo.refuseRemark},validateForm:function(){var e=this;this.$refs.refuseForm.validate(function(t){t?e.refuseRefund():e.handleError()})},refuseRefund:function(){var e=this;Object(u["h"])(this.refuseDto).then(function(){e.$Message.success("拒绝成功"),e.visible=!1}).catch(function(){e.handleError()})},handleError:function(){var e=this;setTimeout(function(){e.refuseLoading=!1,e.$nextTick(function(){e.refuseLoading=!0})},500)}},watch:{refundFeeDetailInfo:{handler:function(){this.init()},deep:!0}},created:function(){this.init()},filters:{amountFilter:function(e){return e||(0===e?e:"-")},refuseReasonFilter:function(e){switch(e){case 1:return"不符合退款规则，已超出退款时限";case 2:return"用户取消退款";case 3:return"其他"}}}},I=k,g=(r("9f88"),Object(d["a"])(I,y,D,!1,null,"cf1dfd34",null));g.options.__file="refundVerifyCard.vue";var R=g.exports,C={name:"refundDetail",components:{cancelReasonCard:c,refundCard:_,refundVerifyCard:R},data:function(){return{orderInfo:{},refundFeeDetailInfo:[],accountBank:[],paramDto:{orderBid:"",pageSource:""},checkOutData:[],loading:!1}},computed:{refundStatusBC:function(){switch(this.orderInfo.refundStatus){case 1:return"#5cadff";case 2:return"#19be6b";case 3:return"#ff9900";case 4:return"#515a6e";default:return"#2d8cf0"}}},methods:{getOrderRefund:function(){var e=this;this.loading=!0,this.orderInfo={},this.refundFeeDetailInfo=[],this.accountBank=[],Object(u["d"])(this.$route.query.orderBid).then(function(t){e.flushData(t.body.orderInfo),e.orderInfo=t.body.orderInfo,e.refundFeeDetailInfo=t.body.refundFeeDetailInfo,e.accountBank=t.body.accountBank,e.loading=!1}).catch(function(){e.loading=!1})},getCheckOutData:function(){var e=this;this.loading=!0,this.checkOutData=[],this.paramDto.orderBid=this.$route.query.orderBid,"y"===this.$route.query.flag?this.paramDto.pageSource=2:this.paramDto.pageSource=1,Object(u["c"])(this.paramDto).then(function(t){e.checkOutData=t.body,e.loading=!1,e.getOrderRefund()}).catch(function(){e.loading=!1})},flushData:function(e){var t=this;e.refundDetailVos.forEach(function(r){r.personVoList=t.findPersonVoList(r.bid),r.detailOperationVos.forEach(function(t){t.oldValue=t.feeAmount,t.refundBid=e.refundBid,t.orderBid=e.orderBid})})},findPersonVoList:function(e){var t=this.checkOutData.find(function(t){return t.bid===e}).personVoList;return t||[]},getAllFeeAmount:function(){var e=this;Object(u["b"])(this.orderInfo.orderBid).then(function(t){e.refundFeeDetailInfo=t.body})}},filters:{refundStatusFilter:function(e){switch(e){case 0:return"待核实";case 1:return"待打款";case 2:return"打款成功";case 3:return"打款异常";case 4:return"拒绝退款"}}},watch:{$route:function(e,t){this.getCheckOutData()}},created:function(){this.getCheckOutData()}},F=C,O=(r("9e55"),Object(d["a"])(F,n,a,!1,null,"38da959d",null));O.options.__file="refundDetail.vue";t["default"]=O.exports},"9e55":function(e,t,r){"use strict";var n=r("b728"),a=r.n(n);a.a},"9f88":function(e,t,r){"use strict";var n=r("ded8"),a=r.n(n);a.a},b728:function(e,t,r){},b7bd:function(e,t,r){"use strict";var n=r("36b1"),a=r.n(n);a.a},db31:function(e,t,r){},ded8:function(e,t,r){}}]);