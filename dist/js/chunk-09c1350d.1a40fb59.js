(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09c1350d"],{"32d2":function(e,t,r){},"52e4":function(e,t,r){"use strict";var o=r("78a6"),n=r.n(o);n.a},7417:function(e,t,r){"use strict";var o=r("32d2"),n=r.n(o);n.a},"78a6":function(e,t,r){},"93df":function(e,t,r){},bb53:function(e,t,r){"use strict";r.d(t,"b",function(){return n}),r.d(t,"a",function(){return a}),r.d(t,"d",function(){return s}),r.d(t,"e",function(){return l}),r.d(t,"c",function(){return i});var o=r("6b6c"),n=function(e){return o["a"].request({url:"/owner/ownerPageList.action",method:"post",data:e})},a=function(){return o["a"].request({url:"/owner/ownerList",method:"get"})},s=function(e){return o["a"].request({url:"/owner/saveOwner.action",method:"post",data:e})},l=function(e){return o["a"].request({url:"/owner/updateOwner.action",method:"post",data:e})},i=function(e){return o["a"].request({url:"/owner/updateOwner.action",method:"post",data:e})}},beb5:function(e,t,r){"use strict";var o=r("93df"),n=r.n(o);n.a},c871:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Form",{attrs:{model:e.paramDto,"label-width":60},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.listOwner(t):null}}},[r("Row",{attrs:{gutter:20}},[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主名称"}},[r("Input",{attrs:{placeholder:"业主名称",maxlength:50,clearable:""},model:{value:e.paramDto.ownerName,callback:function(t){e.$set(e.paramDto,"ownerName","string"===typeof t?t.trim():t)},expression:"paramDto.ownerName"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:12}},[r("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:e.listOwner}},[e._v(" 查 询")])],1),r("Col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[r("Button",{attrs:{type:"primary"},on:{click:e.addOwner}},[e._v("新增业主")])],1)],1)],1),r("Table",{staticClass:"my-table",attrs:{stripe:"",columns:e.columns,data:e.ownerList,loading:e.loading},scopedSlots:e._u([{key:"orderNumber",fn:function(t){var o=t.row;return[r("a",{on:{click:function(t){e.toOrderDetail(o)}}},[e._v(e._s(o.orderNumber))])]}}])}),r("Page",{staticClass:"my-page",attrs:{total:e.total,"show-total":"",current:e.paramDto.page,"page-size":e.paramDto.limit},on:{"update:current":function(t){e.$set(e.paramDto,"page",t)},"on-change":e.handlePageChange}}),r("Modal",{attrs:{title:e.title,loading:e.actionLoading,width:"1200"},on:{"on-ok":e.validOwner},model:{value:e.actionVisible,callback:function(t){e.actionVisible=t},expression:"actionVisible"}},[e.actionVisible?r("owner-form",{ref:"ownerForm",attrs:{owner:e.ownerVo},on:{success:e.handleSuccess,error:e.handleError}}):e._e()],1),r("Modal",{attrs:{title:"业主详情",width:"1200","footer-hide":""},model:{value:e.detailVisible,callback:function(t){e.detailVisible=t},expression:"detailVisible"}},[e.detailVisible?r("owner-detail",{attrs:{owner:e.ownerVo}}):e._e()],1)],1)},n=[],a=r("bb53"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Form",{ref:"ownerForm",attrs:{model:e.ownerDto,rules:e.ownerRules,"label-width":110}},[r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主类型",prop:"ownerType"}},[r("Select",{attrs:{placeholder:"请选择"},model:{value:e.ownerDto.ownerType,callback:function(t){e.$set(e.ownerDto,"ownerType",t)},expression:"ownerDto.ownerType"}},e._l(e.ownerTypeOptions,function(e){return r("Option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主名称",prop:"ownerName"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerName,callback:function(t){e.$set(e.ownerDto,"ownerName","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerName"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"经办人",prop:"ownerOperatorName"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerOperatorName,callback:function(t){e.$set(e.ownerDto,"ownerOperatorName","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerOperatorName"}})],1)],1)],1),1===e.ownerDto.ownerType?r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"法定代表人",prop:"ownerLegalRepresent"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerLegalRepresent,callback:function(t){e.$set(e.ownerDto,"ownerLegalRepresent","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerLegalRepresent"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"组织机构代码",prop:"ownerBusinessCode"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerBusinessCode,callback:function(t){e.$set(e.ownerDto,"ownerBusinessCode","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerBusinessCode"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"法人身份证号",prop:"ownerOperatorIdcard"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerOperatorIdcard,callback:function(t){e.$set(e.ownerDto,"ownerOperatorIdcard","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerOperatorIdcard"}})],1)],1)],1):r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"产权人",prop:"ownerLegalRepresent"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerLegalRepresent,callback:function(t){e.$set(e.ownerDto,"ownerLegalRepresent","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerLegalRepresent"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主身份证号",prop:"ownerBusinessCode"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerBusinessCode,callback:function(t){e.$set(e.ownerDto,"ownerBusinessCode","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerBusinessCode"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"产权人身份证号",prop:"ownerOperatorIdcard"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerOperatorIdcard,callback:function(t){e.$set(e.ownerDto,"ownerOperatorIdcard","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerOperatorIdcard"}})],1)],1)],1),r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主联系人",prop:"ownerUser"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerUser,callback:function(t){e.$set(e.ownerDto,"ownerUser","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerUser"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主联系电话",prop:"ownerPhone"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerPhone,callback:function(t){e.$set(e.ownerDto,"ownerPhone","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerPhone"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"开户银行",prop:"ownerBankName"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerBankName,callback:function(t){e.$set(e.ownerDto,"ownerBankName","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerBankName"}})],1)],1)],1),r("Row",[1===e.ownerDto.ownerType?r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"组织机构代码附件"}},[r("Upload",{ref:"orgUpload",attrs:{multiple:"",accept:"application/pdf,image/*",headers:{Authorization:e.$store.state.user.token},action:e.uploadFileUrl,"default-file-list":e.defaultOrgList,"on-success":e.handleOrgSuccess,"on-preview":e.previewFile,"on-error":e.handleError}},[r("a",[e._v("点击上传")])])],1)],1):e._e(),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"产权证附件"}},[r("Upload",{ref:"proUpload",attrs:{multiple:"",accept:"application/pdf,image/*",headers:{Authorization:e.$store.state.user.token},action:e.uploadFileUrl,"default-file-list":e.defaultProList,"on-success":e.handleProSuccess,"on-preview":e.previewFile,"on-error":e.handleError}},[r("a",[e._v("点击上传")])])],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"其他附件"}},[r("Upload",{ref:"otherUpload",attrs:{multiple:"",accept:"application/pdf,image/*",headers:{Authorization:e.$store.state.user.token},"default-file-list":e.defaultOtherList,action:e.uploadFileUrl,"on-success":e.handleOtherSuccess,"on-preview":e.previewFile,"on-error":e.handleError}},[r("a",[e._v("点击上传")])])],1)],1)],1),r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"财务联系人",prop:"financeUser"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.financeUser,callback:function(t){e.$set(e.ownerDto,"financeUser","string"===typeof t?t.trim():t)},expression:"ownerDto.financeUser"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"财务联系电话",prop:"financePhone"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.financePhone,callback:function(t){e.$set(e.ownerDto,"financePhone","string"===typeof t?t.trim():t)},expression:"ownerDto.financePhone"}})],1)],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"银行账号",prop:"ownerBankCard"}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:e.ownerDto.ownerBankCard,callback:function(t){e.$set(e.ownerDto,"ownerBankCard","string"===typeof t?t.trim():t)},expression:"ownerDto.ownerBankCard"}})],1)],1)],1),e._l(e.ownerDto.contractList,function(t,o){return r("Row",{key:o},[r("Col",{attrs:{span:16}},[r("FormItem",{attrs:{label:"合同号"+(o+1),prop:"contractList."+o+".ownerContractNo",rules:[{max:20,message:"不能超过20个字符",trigger:"blur"}]}},[r("Input",{attrs:{type:"text",placeholder:"",clearable:""},model:{value:t.ownerContractNo,callback:function(r){e.$set(t,"ownerContractNo","string"===typeof r?r.trim():r)},expression:"item.ownerContractNo"}})],1)],1),r("Col",{attrs:{span:4}},[r("Button",{staticClass:"del-btn",attrs:{type:"text"},on:{click:function(t){e.deleteContractNo(o)}}},[e._v("删除")])],1)],1)}),r("Row",[r("Col",{attrs:{span:5}},[r("FormItem",[r("a",{attrs:{type:"text"},on:{click:e.addContractNo}},[e._v("+ 添加合同号")])])],1)],1),r("Row",[r("Col",{attrs:{span:24}},[r("FormItem",{attrs:{label:"备注",prop:"remark"}},[r("Input",{attrs:{type:"textarea",placeholder:"",clearable:""},model:{value:e.ownerDto.remark,callback:function(t){e.$set(e.ownerDto,"remark","string"===typeof t?t.trim():t)},expression:"ownerDto.remark"}})],1)],1)],1)],2)},l=[],i=(r("456d"),r("7f7f"),r("ac6a"),{name:"ownerForm",props:{owner:Object},data:function(){return{uploadFileUrl:this.$store.state.app.baseUrl+"/system/upLoadFile.action",ownerDto:{bid:"",ownerType:1,ownerName:"",ownerOperatorName:"",ownerLegalRepresent:"",ownerBusinessCode:"",ownerOperatorIdcard:"",ownerUser:"",ownerPhone:"",ownerBankName:"",financeUser:"",financePhone:"",ownerBankCard:"",contractList:[{ownerContractNo:""}],remark:"",organizationCodeAtt:[],titleDeedAtt:[],elseAtt:[]},defaultOrgList:[],defaultProList:[],defaultOtherList:[],ownerRules:{ownerType:[{required:!0,type:"number",message:"请选择业主类型",trigger:"change"}],ownerName:[{required:!0,message:"请输入业主名称",trigger:"blur"},{max:200,message:"不能超过200个字符",trigger:"blur"}],ownerOperatorName:[{max:10,message:"不能超过10个字符",trigger:"blur"}],ownerLegalRepresent:[{max:10,message:"不能超过10个字符",trigger:"blur"}],ownerBusinessCode:[{max:100,message:"不能超过100个字符",trigger:"blur"}],ownerOperatorIdcard:[{max:50,message:"不能超过50个字符",trigger:"blur"}],ownerUser:[{max:10,message:"不能超过10个字符",trigger:"blur"}],ownerPhone:[{max:20,message:"不能超过20个字符",trigger:"blur"}],ownerBankName:[{max:100,message:"不能超过100个字符",trigger:"blur"}],financeUser:[{max:10,message:"不能超过10个字符",trigger:"blur"}],financePhone:[{max:20,message:"不能超过20个字符",trigger:"blur"}],ownerBankCard:[{max:40,message:"不能超过40个字符",trigger:"blur"}],remark:[{max:200,message:"不能超过200个字符",trigger:"blur"}]},ownerTypeOptions:[{label:"企业",value:1},{label:"个人",value:2}]}},methods:{validateForm:function(){var e=this;this.$refs.ownerForm.validate(function(t){t?(e.buildAtt(),e.$emit("success",e.ownerDto)):e.$emit("error")})},buildAtt:function(){this.ownerDto.organizationCodeAtt=[],this.ownerDto.titleDeedAtt=[],this.ownerDto.elseAtt=[],this.syncFile(this.ownerDto.organizationCodeAtt,this.$refs.orgUpload.fileList),this.syncFile(this.ownerDto.titleDeedAtt,this.$refs.proUpload.fileList),this.syncFile(this.ownerDto.elseAtt,this.$refs.otherUpload.fileList)},syncFile:function(e,t){t&&t.forEach(function(t){t.response?e.push(t.response.body):e.push({attachmentImgUrl:t.url,attachmentName:t.name})})},addContractNo:function(){this.ownerDto.contractList.push({ownerContractNo:""})},deleteContractNo:function(e){this.ownerDto.contractList.splice(e,1)},handleOrgSuccess:function(e,t,r){if(200!==e.code){this.$Message.error(e.message);var o=this.$refs.orgUpload.fileList;this.$refs.orgUpload.fileList.splice(o.indexOf(t),1)}},handleProSuccess:function(e,t,r){if(200!==e.code){this.$Message.error(e.message);var o=this.$refs.proUpload.fileList;this.$refs.proUpload.fileList.splice(o.indexOf(t),1)}},handleOtherSuccess:function(e,t,r){if(200!==e.code){this.$Message.error(e.message);var o=this.$refs.otherUpload.fileList;this.$refs.otherUpload.fileList.splice(o.indexOf(t),1)}},handleError:function(e,t,r){this.$Message.error("文件上传失败"),console.info(e)},previewFile:function(e){var t=e.url?e.url:e.response.body.attachmentImgUrl;window.open(t,"_blank")}},created:function(){var e=this;Object.keys(this.owner).length&&(this.ownerDto.bid=this.owner.bid,this.ownerDto.ownerType=this.owner.ownerType,this.ownerDto.ownerName=this.owner.ownerName,this.ownerDto.ownerOperatorName=this.owner.ownerOperatorName,this.ownerDto.ownerLegalRepresent=this.owner.ownerLegalRepresent,this.ownerDto.ownerBusinessCode=this.owner.ownerBusinessCode,this.ownerDto.ownerOperatorIdcard=this.owner.ownerOperatorIdcard,this.ownerDto.ownerUser=this.owner.ownerUser,this.ownerDto.ownerPhone=this.owner.ownerPhone,this.ownerDto.ownerBankName=this.owner.ownerBankName,this.ownerDto.financeUser=this.owner.financeUser,this.ownerDto.financePhone=this.owner.financePhone,this.ownerDto.ownerBankCard=this.owner.ownerBankCard,this.owner.contractList.forEach(function(t){e.ownerDto.contractList.push({ownerContractNo:t.ownerContractNo})}),this.ownerDto.remark=this.owner.remark,this.owner.organizationCodeAtt&&this.owner.organizationCodeAtt.forEach(function(t){e.defaultOrgList.push({url:t.attachmentImgUrl,name:t.attachmentName})}),this.owner.titleDeedAtt&&this.owner.titleDeedAtt.forEach(function(t){e.defaultProList.push({url:t.attachmentImgUrl,name:t.attachmentName})}),this.owner.elseAtt&&this.owner.elseAtt.forEach(function(t){e.defaultOtherList.push({url:t.attachmentImgUrl,name:t.attachmentName})}))}}),c=i,w=(r("52e4"),r("2877")),p=Object(w["a"])(c,s,l,!1,null,"69db66fc",null);p.options.__file="ownerForm.vue";var u=p.exports,d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Form",{attrs:{model:e.owner,"label-width":120}},[r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主类型："}},[r("span",[e._v(e._s(e._f("ownerTypeFilter")(e.owner.ownerType)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主名称："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerName)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"经办人："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerOperatorName)))])])],1)],1),1===e.owner.ownerType?r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"法定代表人："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerLegalRepresent)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"组织机构代码："}},[e.owner.ownerBusinessCode?r("a",{on:{click:function(t){e.previewInfo("组织机构代码",e.owner.ownerBusinessCode)}}},[e._v("查看")]):r("span",[e._v("-")])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"法人身份证号："}},[e.owner.ownerOperatorIdcard?r("a",{on:{click:function(t){e.previewInfo("法人身份证号",e.owner.ownerOperatorIdcard)}}},[e._v("查看")]):r("span",[e._v("-")])])],1)],1):r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"产权人："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerLegalRepresent)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主身份证号："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerBusinessCode)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"产权人身份证号："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerOperatorIdcard)))])])],1)],1),r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主联系人："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerUser)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"业主联系电话："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerPhone)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"开户银行："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerBankName)))])])],1)],1),r("Row",[1===e.owner.ownerType?r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"组织机构代码附件："}},e._l(e.owner.organizationCodeAtt,function(t,o){return r("div",{key:o},[r("a",{on:{click:function(r){e.previewFile(t.attachmentImgUrl)}}},[e._v("\n            "+e._s(t.attachmentName)+"\n          ")])])}))],1):e._e(),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"产权证附件："}},e._l(e.owner.titleDeedAtt,function(t,o){return r("div",{key:o},[r("a",{on:{click:function(r){e.previewFile(t.attachmentImgUrl)}}},[e._v("\n            "+e._s(t.attachmentName)+"\n          ")])])}))],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"其他附件："}},e._l(e.owner.elseAtt,function(t,o){return r("div",{key:o},[r("a",{on:{click:function(r){e.previewFile(t.attachmentImgUrl)}}},[e._v("\n            "+e._s(t.attachmentName)+"\n          ")])])}))],1)],1),r("Row",[r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"财务联系人："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.financeUser)))])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"财务联系电话："}},[e.owner.financePhone?r("a",{on:{click:function(t){e.previewInfo("财务联系电话",e.owner.financePhone)}}},[e._v("查看")]):r("span",[e._v("-")])])],1),r("Col",{attrs:{span:8}},[r("FormItem",{attrs:{label:"银行账号："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.ownerBankCard)))])])],1)],1),e._l(e.owner.contractList,function(t,o){return r("Row",{key:o},[r("Col",{attrs:{span:16}},[r("FormItem",{attrs:{label:"合同号"+(o+1)+"："}},[r("span",[e._v(e._s(t.ownerContractNo))])])],1)],1)}),r("Row",[r("Col",{attrs:{span:24}},[r("FormItem",{attrs:{label:"备注："}},[r("span",[e._v(e._s(e._f("nullFilter")(e.owner.remark)))])])],1)],1)],2)},m=[],f={name:"ownerDetail",props:{owner:Object},data:function(){return{}},methods:{previewInfo:function(e,t){this.$Modal.info({title:e,content:t})},previewFile:function(e){window.open(e,"_blank")}},filters:{ownerTypeFilter:function(e){switch(e){case 1:return"企业";case 2:return"个人"}}}},h=f,b=(r("7417"),Object(w["a"])(h,d,m,!1,null,"5d7d0bbd",null));b.options.__file="ownerDetail.vue";var g=b.exports,v={name:"ownerList",components:{ownerForm:u,ownerDetail:g},data:function(){var e=this;return{paramDto:{ownerName:"",page:1,limit:10},loading:!1,total:0,ownerList:[],columns:[{title:"序号",type:"index",width:80},{title:"合同号",key:"contractList",render:function(e,t){return e("div",t.row.contractList.length>0?t.row.contractList[0].ownerContractNo:"-")}},{title:"业主名称",key:"ownerName"},{title:"组织机构代码证/身份证",key:"status",render:function(t,r){return t("div",[t("a",{on:{click:function(){e.openDetailDialog(r.row)}}},"查看")])}},{title:"法人/产权人",key:"ownerLegalRepresent"},{title:"开户银行",key:"ownerBankName"},{title:"银行账号",key:"status",render:function(t,r){return t("div",[t("a",{on:{click:function(){e.openDetailDialog(r.row)}}},"查看")])}},{title:"财务联系人",key:"financeUser"},{title:"联系电话",key:"status",render:function(t,r){return t("div",[t("a",{on:{click:function(){e.openDetailDialog(r.row)}}},"查看")])}},{title:"经办人",key:"ownerOperatorName"},{title:"操作",key:"action",width:110,render:function(t,r){return t("div",[t("a",{style:{marginRight:"10px"},on:{click:function(){e.editOwner(r.row)}}},"修改"),t("a",{style:{color:"#ed4014"},on:{click:function(){e.deleteOwnerConfirm(r.row)}}},"删除")])}}],actionVisible:!1,actionLoading:!0,title:"",ownerVo:{},detailVisible:!1}},methods:{listOwner:function(){this.paramDto.page=1,this.handlePageChange()},handlePageChange:function(){var e=this;Object(a["b"])(this.paramDto).then(function(t){e.ownerList=t.body.rows,e.total=t.body.total})},addOwner:function(){this.title="新增业主",this.actionVisible=!0},validOwner:function(){this.$refs.ownerForm.validateForm()},handleSuccess:function(e){e.bid?this.updateOwner(e):this.saveOwner(e)},handleError:function(){var e=this;setTimeout(function(){e.actionLoading=!1,e.$nextTick(function(){e.actionLoading=!0})},500)},saveOwner:function(e){var t=this;Object(a["d"])(e).then(function(){t.$Message.success("保存成功"),t.actionVisible=!1,t.listOwner()}).catch(function(){t.handleError()})},editOwner:function(e){this.title="编辑业主",this.ownerVo=e,this.actionVisible=!0},updateOwner:function(e){var t=this;Object(a["e"])(e).then(function(){t.$Message.success("保存成功"),t.actionVisible=!1,t.listOwner()}).catch(function(){t.handleError()})},deleteOwnerConfirm:function(e){var t=this;this.$Modal.confirm({title:"通知",content:"<p>确定删除该业主吗？</p>",onOk:function(){t.deleteOwner(e)},onCancel:function(){}})},deleteOwner:function(e){var t=this;Object(a["c"])({bid:e.bid,isDel:1}).then(function(){t.$Message.success("删除成功"),t.listOwner()})},openDetailDialog:function(e){this.ownerVo=e,this.detailVisible=!0}},created:function(){this.listOwner()}},D=v,C=(r("beb5"),Object(w["a"])(D,o,n,!1,null,"1513b7bc",null));C.options.__file="ownerList.vue";t["default"]=C.exports}}]);