<template>
  <Form ref="ownerForm" :model="ownerDto" :rules="ownerRules" :label-width="110">
    <Row>
      <Col :span="8">
        <FormItem label="业主类型" prop="ownerType">
          <Select v-model="ownerDto.ownerType" placeholder="请选择">
            <Option v-for="item in ownerTypeOptions" :key="item.value" :label="item.label"
                    :value="item.value"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="业主名称" prop="ownerName">
          <Input type="text" v-model.trim="ownerDto.ownerName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="经办人" prop="ownerOperatorName">
          <Input type="text" v-model.trim="ownerDto.ownerOperatorName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-if="ownerDto.ownerType === 1">
      <Col :span="8">
        <FormItem label="法定代表人" prop="ownerLegalRepresent">
          <Input type="text" v-model.trim="ownerDto.ownerLegalRepresent" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="组织机构代码" prop="ownerBusinessCode">
          <Input type="text" v-model.trim="ownerDto.ownerBusinessCode" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="法人身份证号" prop="ownerOperatorIdcard">
          <Input type="text" v-model.trim="ownerDto.ownerOperatorIdcard" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-else>
      <Col :span="8">
        <FormItem label="产权人" prop="ownerLegalRepresent">
          <Input type="text" v-model.trim="ownerDto.ownerLegalRepresent" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="业主身份证号" prop="ownerBusinessCode">
          <Input type="text" v-model.trim="ownerDto.ownerBusinessCode" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="产权人身份证号" prop="ownerOperatorIdcard">
          <Input type="text" v-model.trim="ownerDto.ownerOperatorIdcard" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="业主联系人" prop="ownerUser">
          <Input type="text" v-model.trim="ownerDto.ownerUser" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="业主联系电话" prop="ownerPhone">
          <Input type="text" v-model.trim="ownerDto.ownerPhone" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="开户银行" prop="ownerBankName">
          <Input type="text" v-model.trim="ownerDto.ownerBankName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8" v-if="ownerDto.ownerType === 1">
        <FormItem label="组织机构代码附件">
          <Upload
            ref="orgUpload"
            multiple
            accept="application/pdf,image/*"
            :headers="{ 'Authorization': $store.state.user.token }"
            :action="uploadFileUrl"
            :default-file-list="defaultOrgList"
            :on-success="handleOrgSuccess"
            :on-preview="previewFile"
            :on-error="handleError">
            <a>点击上传</a>
          </Upload>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="产权证附件">
          <Upload
            ref="proUpload"
            multiple
            accept="application/pdf,image/*"
            :headers="{ 'Authorization': $store.state.user.token }"
            :action="uploadFileUrl"
            :default-file-list="defaultProList"
            :on-success="handleProSuccess"
            :on-preview="previewFile"
            :on-error="handleError">
            <a>点击上传</a>
          </Upload>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="其他附件">
          <Upload
            ref="otherUpload"
            multiple
            accept="application/pdf,image/*"
            :headers="{ 'Authorization': $store.state.user.token }"
            :default-file-list="defaultOtherList"
            :action="uploadFileUrl"
            :on-success="handleOtherSuccess"
            :on-preview="previewFile"
            :on-error="handleError">
            <a>点击上传</a>
          </Upload>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="财务联系人" prop="financeUser">
          <Input type="text" v-model.trim="ownerDto.financeUser" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="财务联系电话" prop="financePhone">
          <Input type="text" v-model.trim="ownerDto.financePhone" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="银行账号" prop="ownerBankCard">
          <Input type="text" v-model.trim="ownerDto.ownerBankCard" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-for="(item, i) in ownerDto.contractList" :key="i">
      <Col :span="16">
        <FormItem :label="'合同号' + (i + 1)"
                  :prop="'contractList.' + i + '.ownerContractNo'"
                  :rules="[{max: 20, message: '不能超过20个字符', trigger: 'blur'}]">
          <Input type="text" v-model.trim="item.ownerContractNo" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="4">
        <Button type="text" class="del-btn" @click="deleteContractNo(i)">删除</Button>
      </Col>
    </Row>
    <Row>
      <Col :span="5">
        <FormItem>
          <a type="text" @click="addContractNo">+ 添加合同号</a>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="24">
        <FormItem label="备注" prop="remark">
          <Input type="textarea" v-model.trim="ownerDto.remark" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'ownerForm',
  props: {
    owner: Object
  },
  data () {
    return {
      uploadFileUrl: this.$store.state.app.baseUrl + '/system/upLoadFile.action',
      ownerDto: {
        bid: '',
        ownerType: 1,
        ownerName: '',
        ownerOperatorName: '',
        ownerLegalRepresent: '',
        ownerBusinessCode: '',
        ownerOperatorIdcard: '',
        ownerUser: '',
        ownerPhone: '',
        ownerBankName: '',
        financeUser: '',
        financePhone: '',
        ownerBankCard: '',
        contractList: [{
          ownerContractNo: ''
        }],
        remark: '',
        organizationCodeAtt: [],
        titleDeedAtt: [],
        elseAtt: []
      },
      defaultOrgList: [],
      defaultProList: [],
      defaultOtherList: [],
      ownerRules: {
        ownerType: [{ required: true, type: 'number', message: '请选择业主类型', trigger: 'change' }],
        ownerName: [
          { required: true, message: '请输入业主名称', trigger: 'blur' },
          { max: 200, message: '不能超过200个字符', trigger: 'blur' }
        ],
        ownerOperatorName: [{ max: 10, message: '不能超过10个字符', trigger: 'blur' }],
        ownerLegalRepresent: [{ max: 10, message: '不能超过10个字符', trigger: 'blur' }],
        ownerBusinessCode: [{ max: 100, message: '不能超过100个字符', trigger: 'blur' }],
        ownerOperatorIdcard: [{ max: 50, message: '不能超过50个字符', trigger: 'blur' }],
        ownerUser: [{ max: 10, message: '不能超过10个字符', trigger: 'blur' }],
        ownerPhone: [{ max: 20, message: '不能超过20个字符', trigger: 'blur' }],
        ownerBankName: [{ max: 100, message: '不能超过100个字符', trigger: 'blur' }],
        financeUser: [{ max: 10, message: '不能超过10个字符', trigger: 'blur' }],
        financePhone: [{ max: 20, message: '不能超过20个字符', trigger: 'blur' }],
        ownerBankCard: [{ max: 40, message: '不能超过40个字符', trigger: 'blur' }],
        remark: [{ max: 200, message: '不能超过200个字符', trigger: 'blur' }]
      },
      ownerTypeOptions: [
        {
          label: '企业',
          value: 1
        },
        {
          label: '个人',
          value: 2
        }
      ]
    }
  },
  methods: {
    validateForm () {
      this.$refs['ownerForm'].validate((valid) => {
        if (valid) {
          this.buildAtt()
          this.$emit('success', this.ownerDto)
        } else {
          this.$emit('error')
        }
      })
    },
    buildAtt () {
      this.ownerDto.organizationCodeAtt = []
      this.ownerDto.titleDeedAtt = []
      this.ownerDto.elseAtt = []
      this.syncFile(this.ownerDto.organizationCodeAtt, this.$refs.orgUpload.fileList)
      this.syncFile(this.ownerDto.titleDeedAtt, this.$refs.proUpload.fileList)
      this.syncFile(this.ownerDto.elseAtt, this.$refs.otherUpload.fileList)
    },
    syncFile (target, source) {
      if (source) {
        source.forEach(item => {
          if (item.response) {
            target.push(item.response.body)
          } else {
            target.push({
              attachmentImgUrl: item.url,
              attachmentName: item.name
            })
          }
        })
      }
    },
    addContractNo () {
      this.ownerDto.contractList.push({ ownerContractNo: '' })
    },
    deleteContractNo (i) {
      this.ownerDto.contractList.splice(i, 1)
    },
    handleOrgSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
        const list = this.$refs.orgUpload.fileList
        this.$refs.orgUpload.fileList.splice(list.indexOf(file), 1)
      }
    },
    handleProSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
        const list = this.$refs.proUpload.fileList
        this.$refs.proUpload.fileList.splice(list.indexOf(file), 1)
      }
    },
    handleOtherSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
        const list = this.$refs.otherUpload.fileList
        this.$refs.otherUpload.fileList.splice(list.indexOf(file), 1)
      }
    },
    handleError (err, file, fileList) {
      this.$Message.error('文件上传失败')
      console.info(err)
    },
    previewFile (file) {
      let url = file.url ? file.url : file.response.body.attachmentImgUrl
      window.open(url, '_blank')
    }
  },
  created () {
    if (this.owner) {
      this.ownerDto = this.owner
      if (this.ownerDto.organizationCodeAtt) {
        this.ownerDto.organizationCodeAtt.forEach(item => {
          this.defaultOrgList.push(
            {
              url: item.attachmentImgUrl,
              name: item.attachmentName
            }
          )
        })
      }
      if (this.ownerDto.titleDeedAtt) {
        this.ownerDto.titleDeedAtt.forEach(item => {
          this.defaultProList.push(
            {
              url: item.attachmentImgUrl,
              name: item.attachmentName
            }
          )
        })
      }
      if (this.ownerDto.elseAtt) {
        this.ownerDto.elseAtt.forEach(item => {
          this.defaultOtherList.push(
            {
              url: item.attachmentImgUrl,
              name: item.attachmentName
            }
          )
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .del-btn {
    color: #2db7f5;
  }

  .my-tip {
    color: #808695;
  }
</style>
