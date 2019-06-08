<template>
  <div>
    <Form :model="paramDto" :label-width="60">
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="业主名称">
            <Input v-model.trim="paramDto.ownerName" placeholder="业主名称" :maxlength="50" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <Button type="primary" icon="ios-search" @click="listOwner"> 查 询</Button>
        </Col>
        <Col :span="12" style="text-align: right">
          <Button type="primary" @click="addOwner">新增业主</Button>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="orderList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="orderNumber">
        <a @click="toOrderDetail(row)">{{ row.orderNumber }}</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="actionVisible"
      :title="title"
      :loading="actionLoading"
      width="1200"
      @on-ok="validOwner">
      <owner-form v-if="actionVisible"></owner-form>
    </Modal>
    <Modal
      v-model="detailVisible"
      title="业主详情">
    </Modal>
  </div>
</template>
<script>
import { getOwners, saveOwner, updateOwner, removeOwner } from '@/api/owner'
import ownerForm from './ownerForm.vue'
export default {
  name: 'ownerList',
  components: {
    ownerForm
  },
  data () {
    return {
      paramDto: {
        ownerName: '',
        page: 1,
        limit: 10
      },
      loading: false,
      total: 0,
      ownerList: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          minWidth: 50
        },
        {
          title: '合同号',
          key: 'contractList',
          render: (h, params) => {
            return h('div', params.row.contractList.length > 0 ? params.row.contractList[0].ownerContractNo : '-')
          }
        },
        {
          title: '业主名称',
          key: 'ownerName'
        },
        {
          title: '组织机构代码证/身份证',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.openDetailDialog(params.row)
                  }
                }
              }, '查看')
            ])
          }
        },
        {
          title: '法人/产权人',
          key: 'ownerLegalRepresent'
        },
        {
          title: '开户银行',
          key: 'ownerBankName'
        },
        {
          title: '银行账号',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.openDetailDialog(params.row)
                  }
                }
              }, '查看')
            ])
          }
        },
        {
          title: '财务联系人',
          key: 'financeUser'
        },
        {
          title: '联系电话',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.openDetailDialog(params.row)
                  }
                }
              }, '查看')
            ])
          }
        },
        {
          title: '经办人',
          key: 'ownerOperatorName'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.editOwner(params.row)
                  }
                }
              }, '修改'),
              h('a', {
                style: {
                  color: '#ed4014'
                },
                on: {
                  click: () => {
                    this.deleteOwnerConfirm(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      actionVisible: false,
      actionLoading: true,
      title: '',
      ownerVo: {},
      detailVisible: false
    }
  },
  methods: {
    listOwner () {
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      getOwners(this.paramDto).then(res => {
        if (res.code === 200) {
          this.ownerList = res.data.rows
          this.total = res.data.total
        }
      })
    },
    addOwner () {
      this.title = '新增业主'
      this.isAdd = true
      this.actionVisible = true
    },
    validOwner () {},
    saveOwner (dto) {
      saveOwner(dto).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('保存成功')
          this.listOwner()
        } else {
          this.$Message.warning(res.message)
        }
      })
    },
    editOwner (index, row) {
      this.title = '编辑业主'
      this.isAdd = false
      this.rowBak = row
      this.actionVisible = true
    },
    updateOwner (dto) {
      updateOwner(dto).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('保存成功')
          this.listOwner()
        } else {
          this.$Message.warning(res.message)
        }
      })
    },
    deleteOwnerConfirm (row) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该业主吗？</p>',
        onOk: () => {
          this.deleteOwner(row)
        },
        onCancel: () => {
        }
      })
    },
    deleteOwner (row) {
      removeOwner({ bid: row.bid, isDel: 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('删除成功')
          this.listOwner()
        } else {
          this.$Message.warning(res.message)
        }
      })
    },
    openDetailDialog (row) {
      this.ownerVo = row
      this.detailVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
