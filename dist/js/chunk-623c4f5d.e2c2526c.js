(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-623c4f5d"],{"12a6":function(t,e,a){"use strict";var r=a("2ce4"),o=a.n(r);o.a},2934:function(t,e,a){"use strict";a.d(e,"b",function(){return o}),a.d(e,"a",function(){return n}),a.d(e,"d",function(){return i}),a.d(e,"c",function(){return s});var r=a("6b6c"),o=function(){return r["a"].request({url:"/project/getCity.action",method:"get"})},n=function(t){return r["a"].request({url:"/project/getAreaByCity.action",method:"get",params:{cityCode:t}})},i=function(t){return r["a"].request({url:"/system/requestExportFile.action",method:"post",data:t})},s=function(t){return r["a"].request({url:"/system/getExportProcess",method:"get",params:{key:t}})}},"2ce4":function(t,e,a){},3228:function(t,e,a){},"555d":function(t,e,a){"use strict";var r=a("3228"),o=a.n(r);o.a},acc0:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("order-form",{on:{search:t.listOrder,exportList:t.exportFile}}),a("Table",{staticClass:"my-table",attrs:{stripe:"",columns:t.columns,data:t.orderList,loading:t.loading},scopedSlots:t._u([{key:"orderNumber",fn:function(e){var r=e.row;return[a("a",{on:{click:function(e){t.toOrderDetail(r)}}},[t._v(t._s(r.orderNumber))])]}},{key:"orderStatus",fn:function(e){var r=e.row;return[a("span",[t._v(t._s(t._f("orderStatusFilter")(r.orderStatus)))])]}},{key:"projectName",fn:function(e){var r=e.row;return[a("span",[t._v(t._s(t.getProjectName(r.projectBid)))])]}},{key:"startDate",fn:function(e){var r=e.row;return[a("span",[t._v(t._s(t._f("dateFilter")(r.startDate)))])]}},{key:"endDate",fn:function(e){var r=e.row;return[a("span",[t._v(t._s(t._f("dateFilter")(r.endDate)))])]}},{key:"createTime",fn:function(e){var r=e.row;return[a("span",[t._v(t._s(t._f("dateTimeFilter")(r.createTime)))])]}}])}),a("Page",{staticClass:"my-page",attrs:{total:t.total,"show-total":"",current:t.paramDto.pageIndex,"page-size":t.paramDto.pageSize},on:{"update:current":function(e){t.$set(t.paramDto,"pageIndex",e)},"on-change":t.handlePageChange}}),a("export-file",{ref:"exportFile"})],1)},o=[],n=(a("7514"),a("f751"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Form",{attrs:{model:t.paramDto,"label-width":70},nativeOn:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null}}},[a("Row",{attrs:{gutter:20}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"订单号"}},[a("Input",{attrs:{placeholder:"自如/OTA",clearable:""},model:{value:t.paramDto.orderNumber,callback:function(e){t.$set(t.paramDto,"orderNumber","string"===typeof e?e.trim():e)},expression:"paramDto.orderNumber"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"订单状态"}},[a("Select",{attrs:{placeholder:"请选择",clearable:""},model:{value:t.paramDto.orderStatus,callback:function(e){t.$set(t.paramDto,"orderStatus",e)},expression:"paramDto.orderStatus"}},[t._l(t.orderStatusOptions,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),a("Option",{attrs:{value:12}},[t._v("NoShow")])],2)],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"入住日期"}},[a("DatePicker",{staticClass:"my-date-picker",attrs:{type:"daterange","split-panels":"",placeholder:""},model:{value:t.paramDto.checkInTime,callback:function(e){t.$set(t.paramDto,"checkInTime",e)},expression:"paramDto.checkInTime"}})],1)],1)],1),a("Row",{attrs:{gutter:20}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"预订人"}},[a("Input",{attrs:{placeholder:"姓名/手机号",clearable:""},model:{value:t.paramDto.customer,callback:function(e){t.$set(t.paramDto,"customer","string"===typeof e?e.trim():e)},expression:"paramDto.customer"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"入住人"}},[a("Input",{attrs:{placeholder:"姓名/证件号",clearable:""},model:{value:t.paramDto.stayPerson,callback:function(e){t.$set(t.paramDto,"stayPerson","string"===typeof e?e.trim():e)},expression:"paramDto.stayPerson"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"退房日期"}},[a("DatePicker",{staticClass:"my-date-picker",attrs:{type:"daterange","split-panels":"",placeholder:""},model:{value:t.paramDto.checkOutTime,callback:function(e){t.$set(t.paramDto,"checkOutTime",e)},expression:"paramDto.checkOutTime"}})],1)],1)],1),a("Row",{attrs:{gutter:20}},[a("Col",{attrs:{span:"12"}},[a("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:t.submit}},[t._v(" 查 询")])],1),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[a("Button",{directives:[{name:"action",rawName:"v-action",value:t.btnAccess,expression:"btnAccess"}],attrs:{type:"warning",icon:"ios-cloud-download-outline"},on:{click:t.exportList}},[t._v(" 导 出")])],1)],1)],1)}),i=[],s=(a("ac6a"),a("456d"),a("90de")),c={name:"orderForm",data:function(){return{paramDto:{orderNumber:"",orderStatus:"",checkInTime:[],checkInStartTime:"",checkInEndTime:"",customer:"",stayPerson:"",checkOutTime:[],checkOutStartTime:"",checkOutEndTime:""},orderStatusOptions:[{label:"已支付",value:1},{label:"已入住",value:2},{label:"退款申请中",value:3},{label:"已退款",value:4},{label:"待支付",value:5},{label:"已退房",value:6},{label:"已取消",value:7},{label:"已支付取消",value:8},{label:"未入住取消",value:9},{label:"未入住退房",value:10},{label:"已退订",value:11}],btnAccess:"/listOrder/orderExportExcel.action"}},methods:{submit:function(){this.$emit("search",this.paramDto)},exportList:function(){this.$emit("exportList",this.paramDto)}},watch:{"paramDto.checkInTime":function(t){this.paramDto.checkInStartTime=t[0]?Object(s["f"])(t[0],"date"):"",this.paramDto.checkInEndTime=t[1]?Object(s["f"])(t[1],"date"):""},"paramDto.checkOutTime":function(t){this.paramDto.checkOutStartTime=t[0]?Object(s["f"])(t[0],"date"):"",this.paramDto.checkOutEndTime=t[1]?Object(s["f"])(t[1],"date"):""},"$store.state.user.currentProject":function(t){Object.keys(t).length&&this.submit()}},created:function(){this.submit()}},l=c,u=(a("555d"),a("2877")),d=Object(u["a"])(l,n,i,!1,null,"456fab12",null);d.options.__file="orderForm.vue";var m=d.exports,p=a("f8b7"),f=a("ef05"),h={name:"orderList",components:{orderForm:m,ExportFile:f["a"]},data:function(){return{loading:!1,paramDto:{pageIndex:1,pageSize:10},columns:[{title:"订单号",slot:"orderNumber",minWidth:50},{title:"OTA单号",key:"otaOrderNumber",minWidth:50},{title:"状态",slot:"orderStatus"},{title:"项目",slot:"projectName",tooltip:!0},{title:"预订人",key:"name"},{title:"预订手机号",key:"phone",minWidth:40},{title:"入住人数",key:"bedCount"},{title:"间夜数",key:"bedNights"},{title:"入住时间",slot:"startDate"},{title:"退房时间",slot:"endDate"},{title:"创建时间",slot:"createTime"},{title:"金额/元",key:"amountNoCoupon",width:90}],orderList:[],total:30}},methods:{listOrder:function(t){Object.assign(this.paramDto,t),this.paramDto.pageIndex=1,this.handlePageChange()},handlePageChange:function(){var t=this;this.loading=!0,this.$delete(this.paramDto,"checkInTime"),this.$delete(this.paramDto,"checkOutTime"),Object(p["m"])(this.paramDto).then(function(e){t.orderList=e.body.rows,t.total=e.body.total,t.loading=!1}).catch(function(){t.loading=!1})},toOrderDetail:function(t){var e=t.orderNumber,a={name:"orderDetail",query:{orderNumber:e}};this.$router.push(a)},getProjectName:function(t){return this.$store.state.user.projectList.find(function(e){return e.bid===t}).projectName},exportFile:function(t){var e={type:1004,jsonParam:JSON.stringify(t)};this.$refs.exportFile.requestExportFile(e)}}},b=h,v=(a("ad52"),Object(u["a"])(b,r,o,!1,null,"7715aafc",null));v.options.__file="orderList.vue";e["default"]=v.exports},ad40:function(t,e,a){},ad52:function(t,e,a){"use strict";var r=a("ad40"),o=a.n(r);o.a},ef05:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Modal",{attrs:{title:t.title,closable:!1,"mask-closable":!1},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("Progress",{attrs:{percent:t.percent}}),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"text"},on:{click:t.cancelExport}},[t._v("取消")])],1)],1)},o=[],n=a("2934"),i={name:"ExportFile",props:{},data:function(){return{title:"",visible:!1,percent:0,interval:""}},methods:{requestExportFile:function(t){var e=this;this.title="导出文件准备中...",this.percent=0,this.visible=!0,Object(n["d"])(t).then(function(t){e.title="正在导出文件...",e.interval=setInterval(function(){return e.getExportProcess(t.body)},300)}).catch(function(){e.visible=!1})},getExportProcess:function(t){var e=this;Object(n["c"])(t).then(function(t){t.body.finish?(e.percent=100,setTimeout(function(){e.visible=!1},800),e.$Message.success("文件已生成，开始下载"),clearInterval(e.interval),e.download(t.body.fileUrl)):e.percent=t.body.percent}).catch(function(){e.visible=!1,clearInterval(e.interval)})},download:function(t){var e=document.createElement("a");e.href=t,e.style="visibility: hidden",e.download="".concat(Date.now(),".xls"),document.body.appendChild(e),e.click(),this.$forceUpdate(),setTimeout(function(){document.body.removeChild(e)},1e3)},cancelExport:function(){this.$Message.info("文件导出已取消"),this.visible=!1,clearInterval(this.interval)}}},s=i,c=(a("12a6"),a("2877")),l=Object(c["a"])(s,r,o,!1,null,"b2d706fc",null);l.options.__file="ExportFile.vue";e["a"]=l.exports}}]);