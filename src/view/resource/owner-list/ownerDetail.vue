<template>
  <Form :model="owner" :label-width="120">
    <Row>
      <Col :span="8">
        <FormItem label="业主类型：">
          <span>{{ owner.ownerType | ownerTypeFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="业主名称：">
          <span>{{ owner.ownerName | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="经办人：">
          <span>{{ owner.ownerOperatorName | nullFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row v-if="owner.ownerType === 1">
      <Col :span="8">
        <FormItem label="法定代表人：">
          <span>{{ owner.ownerLegalRepresent | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="组织机构代码：">
          <a v-if="owner.ownerBusinessCode" @click="previewInfo('组织机构代码', owner.ownerBusinessCode)">查看</a>
          <span v-else>-</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="法人身份证号：">
          <a v-if="owner.ownerOperatorIdcard" @click="previewInfo('法人身份证号', owner.ownerOperatorIdcard)">查看</a>
          <span v-else>-</span>
        </FormItem>
      </Col>
    </Row>
    <Row v-else>
      <Col :span="8">
        <FormItem label="产权人：">
          <span>{{ owner.ownerLegalRepresent | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="业主身份证号：">
          <span>{{ owner.ownerBusinessCode | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="产权人身份证号：">
          <span>{{ owner.ownerOperatorIdcard | nullFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="业主联系人：">
          <span>{{ owner.ownerUser | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="业主联系电话：">
          <span>{{ owner.ownerPhone | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="开户银行：">
          <span>{{ owner.ownerBankName | nullFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8" v-if="owner.ownerType === 1">
        <FormItem label="组织机构代码附件：">
          <div v-for="(o, i) in owner.organizationCodeAtt" :key="i">
            <a @click="previewFile(o.attachmentImgUrl)">
              {{ o.attachmentName }}
            </a>
          </div>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="产权证附件：">
          <div v-for="(o, i) in owner.titleDeedAtt" :key="i">
            <a @click="previewFile(o.attachmentImgUrl)">
              {{ o.attachmentName }}
            </a>
          </div>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="其他附件：">
          <div v-for="(o, i) in owner.elseAtt" :key="i">
            <a @click="previewFile(o.attachmentImgUrl)">
              {{ o.attachmentName }}
            </a>
          </div>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="财务联系人：">
          <span>{{ owner.financeUser | nullFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="财务联系电话：">
          <a v-if="owner.financePhone" @click="previewInfo('财务联系电话', owner.financePhone)">查看</a>
          <span v-else>-</span>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="银行账号：">
          <span>{{ owner.ownerBankCard | nullFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row v-for="(item, i) in owner.contractList" :key="i">
      <Col :span="16">
        <FormItem :label="'合同号' + (i + 1) + '：'">
          <span>{{ item.ownerContractNo }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="24">
        <FormItem label="备注：">
          <span>{{ owner.remark | nullFilter }}</span>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'ownerDetail',
  props: {
    owner: Object
  },
  data () {
    return {}
  },
  methods: {
    previewInfo (title, content) {
      this.$Modal.info({
        title: title,
        content: content
      })
    },
    previewFile (url) {
      window.open(url, '_blank')
    }
  },
  filters: {
    ownerTypeFilter (val) {
      switch (val) {
        case 1:
          return '企业'
        case 2:
          return '个人'
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
