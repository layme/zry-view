(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e92e772"],{"516d":function(t,e,a){"use strict";var o=a("ac11"),i=a.n(o);i.a},"61fe":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Form",{attrs:{model:t.paramDto,"label-width":60},nativeOn:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.listData(e):null}}},[a("Row",{attrs:{gutter:20}},[a("Col",{attrs:{span:8}},[a("FormItem",{attrs:{label:"项目"}},[a("Select",{attrs:{placeholder:""},model:{value:t.paramDto.projectBid,callback:function(e){t.$set(t.paramDto,"projectBid",e)},expression:"paramDto.projectBid"}},t._l(t.$store.state.user.projectList,function(t){return a("Option",{key:t.bid,attrs:{label:t.projectName,value:t.bid}})}))],1)],1),a("Col",{attrs:{span:8}},[a("FormItem",{attrs:{label:"用户"}},[a("Input",{attrs:{placeholder:"",maxlength:10,clearable:""},model:{value:t.paramDto.name,callback:function(e){t.$set(t.paramDto,"name","string"===typeof e?e.trim():e)},expression:"paramDto.name"}})],1)],1),a("Col",{attrs:{span:8}},[a("FormItem",{attrs:{label:"工号"}},[a("Input",{attrs:{placeholder:"",maxlength:8,clearable:""},model:{value:t.paramDto.userName,callback:function(e){t.$set(t.paramDto,"userName","string"===typeof e?e.trim():e)},expression:"paramDto.userName"}})],1)],1)],1),a("Row",{attrs:{gutter:20}},[a("Col",{attrs:{span:"12"}},[a("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:t.listData}},[t._v(" 查 询")])],1),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[a("Button",{attrs:{type:"primary"},on:{click:t.openModal}},[t._v("权限分配")])],1)],1)],1),a("Table",{staticClass:"my-table",attrs:{stripe:"",columns:t.columns,data:t.dataList,loading:t.loading}}),a("Page",{staticClass:"my-page",attrs:{total:t.total,"show-total":"",current:t.paramDto.page,"page-size":t.paramDto.limit},on:{"update:current":function(e){t.$set(t.paramDto,"page",e)},"on-change":t.handlePageChange}}),a("Modal",{attrs:{title:"权限分配",width:"500",loading:t.modalLoading},on:{"on-ok":t.validForm},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("Form",{ref:"permissionForm",attrs:{model:t.permissionDto,rules:t.permissionRules,"label-width":60}},[a("FormItem",{attrs:{label:"项目",prop:"projectBid"}},[a("Select",{attrs:{placeholder:""},model:{value:t.permissionDto.projectBid,callback:function(e){t.$set(t.permissionDto,"projectBid",e)},expression:"permissionDto.projectBid"}},t._l(t.allProjectOptions,function(t){return a("Option",{key:t.bid,attrs:{label:t.projectName,value:t.bid}})}))],1),a("FormItem",{attrs:{label:"工号",prop:"userName"}},[a("Input",{attrs:{placeholder:"",maxlength:8,clearable:""},on:{"on-blur":t.getUser,"on-clear":t.handleClear},model:{value:t.permissionDto.userName,callback:function(e){t.$set(t.permissionDto,"userName","string"===typeof e?e.trim():e)},expression:"permissionDto.userName"}})],1),a("FormItem",{attrs:{label:"姓名",prop:"name"}},[a("Input",{attrs:{placeholder:"",disabled:"",clearable:""},model:{value:t.permissionDto.name,callback:function(e){t.$set(t.permissionDto,"name","string"===typeof e?e.trim():e)},expression:"permissionDto.name"}})],1)],1)],1)],1)},i=[],n=(a("7f7f"),a("24d2")),r=a("c24f"),s={name:"projectPermission",data:function(){var t=this;return{paramDto:{projectBid:"",name:"",userName:"",page:1,limit:10},dataList:[],total:0,columns:[{title:"序号",type:"index",width:100},{title:"项目",key:"projectName"},{title:"工号",key:"username"},{title:"姓名",key:"name"},{title:"操作",width:100,render:function(e,a){return e("div",[e("a",{style:{color:"#ed4014"},on:{click:function(){t.confirmDelPermission(a.row)}}},"删除")])}}],loading:!1,visible:!1,modalLoading:!0,allProjectOptions:[],permissionDto:{projectBid:"",userName:"",name:""},permissionRules:{projectBid:[{required:!0,message:"请选择项目",trigger:"change"}],userName:[{required:!0,message:"请输入工号",trigger:"blur"}],name:[{required:!0,message:"请先输入工号",trigger:"change"}]}}},methods:{listData:function(){this.paramDto.page=1,this.handlePageChange()},handlePageChange:function(){var t=this;this.loading=!0,Object(r["c"])(this.paramDto).then(function(e){t.dataList=e.body.rows,t.total=e.body.total,t.loading=!1}).catch(function(){t.loading=!1})},getProjectListAll:function(){var t=this;Object(n["g"])().then(function(e){t.allProjectOptions=e.body})},openModal:function(){this.visible=!0,this.$refs["permissionForm"].resetFields()},getUser:function(){var t=this;this.permissionDto.userName&&Object(r["d"])(this.permissionDto.userName).then(function(e){t.permissionDto.name=e.body.name})},handleClear:function(){this.permissionDto.name=""},validForm:function(){var t=this;this.$refs["permissionForm"].validate(function(e){e?t.savePermission():t.handleError()})},handleError:function(){var t=this;setTimeout(function(){t.modalLoading=!1,t.$nextTick(function(){t.modalLoading=!0})},500)},savePermission:function(){var t=this;Object(r["h"])(this.permissionDto).then(function(e){t.$Message.success("项目权限分配成功"),t.visible=!1,t.listData()}).catch(function(){t.handleError()})},confirmDelPermission:function(t){var e=this;this.$Modal.confirm({title:"通知",content:"<p>确定要删除 ".concat(t.name," 对 ").concat(t.projectName," 的操作权限吗？</p>"),onOk:function(){e.delPermission(t)},onCancel:function(){}})},delPermission:function(t){var e=this;Object(r["b"])(t.id).then(function(t){e.$Message.success("删除成功"),e.listData()})}},created:function(){this.listData(),this.getProjectListAll()}},l=s,c=(a("516d"),a("2877")),m=Object(c["a"])(l,o,i,!1,null,"5b1d5a3d",null);m.options.__file="projectPermission.vue";e["default"]=m.exports},ac11:function(t,e,a){}}]);