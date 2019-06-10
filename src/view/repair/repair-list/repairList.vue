<template>
  <div>
    <repair-form :area-options="areaOptions" :goods-options="goodsOptions" @search="listRepair"
                 @create="handleCreate"></repair-form>
    <Table stripe :columns="columns" :data="repairList" :loading="loadingTable" class="my-table">
      <template slot-scope="{ row }" slot="orderSn">
        <a @click="toRepairDetail(row)">{{ row.orderSn }}</a>
      </template>
      <template slot-scope="{ row }" slot="orderStatus">
        <div>{{ row.orderStatus | orderStatusFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="visitTimeFlag">
        <div>{{ row.visitTimeFlag | dateFilter }} {{ row.visitTime }}</div>
      </template>
      <template slot-scope="{ row }" slot="createTime">
        <div>{{ row.createTime | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a v-if="orderStatusCheck(row.orderStatus)" @click="openCancelModal(row)">取消</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="createVisible"
      title="新建维修单"
      :loading="createLoading"
      width="700"
      @on-ok="validSave">
      <create-repair-form v-if="createVisible" ref="createForm" :area-options="areaOptions"
                          :goods-options="goodsOptions" @submit="saveRepair"
                          @error="handleCreateError"></create-repair-form>
    </Modal>
    <Modal
      v-model="cancelVisible"
      title="取消维修单"
      :loading="cancelLoading"
      width="500"
      @on-ok="validCancel">
      <cancel-repair-form v-if="cancelVisible" :reasons="cancelReasons" :billNum="billNum" ref="cancelForm"
                          @submit="cancelRepair" @error="handleCancelError"></cancel-repair-form>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import repairForm from './repairForm.vue'
import createRepairForm from './createRepairForm.vue'
import cancelRepairForm from './cancelRepairForm.vue'
import { getRepair, saveRepair, getCancelReasons, cancelRepair, getAreas, getGoods } from '@/api/repair'

export default {
  name: 'repairList',
  components: {
    repairForm,
    createRepairForm,
    cancelRepairForm
  },
  data () {
    return {
      loadingTable: false,
      paramDto: {
        page: 1,
        limit: 10
      },
      total: 0,
      repairList: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '维修单号',
          slot: 'orderSn'
        },
        {
          title: '状态',
          slot: 'orderStatus'
        },
        {
          title: '项目',
          key: 'projectName'
        },
        {
          title: '区域',
          key: 'spaceName'
        },
        {
          title: '房间号',
          key: 'roomNum'
        },
        {
          title: '大类',
          key: 'categoryName'
        },
        {
          title: '物品',
          key: 'goodsName'
        },
        {
          title: '预约上门时间',
          slot: 'visitTimeFlag'
        },
        {
          title: '联系人',
          key: 'visitLinkman'
        },
        {
          title: '联系人手机',
          key: 'visitMobile'
        },
        {
          title: '创建时间',
          slot: 'createTime'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      createVisible: false,
      createLoading: true,
      cancelReasons: [],
      cancelVisible: false,
      cancelLoading: true,
      billNum: '',
      areaOptions: [],
      goodsOptions: []
    }
  },
  methods: {
    listRepair (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loadingTable = true
      getRepair(this.paramDto).then(res => {
        if (res.code === 200) {
          this.repairList = res.body.rows
          this.total = res.body.total
        }
        this.loadingTable = false
      }).catch(() => {
        this.loadingTable = false
      })
    },
    handleCreate () {
      this.createVisible = true
    },
    validSave () {
      this.$refs.createForm.validForm()
    },
    saveRepair (dto) {
      saveRepair(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
          this.createVisible = false
          this.loadingTable = true
          setTimeout(() => {
            this.handlePageChange()
          }, 500)
        } else {
          this.handleCreateError()
        }
      })
    },
    handleCreateError () {
      setTimeout(() => {
        this.createLoading = false
        this.$nextTick(() => {
          this.createLoading = true
        })
      }, 500)
    },
    openCancelModal (row) {
      this.cancelVisible = true
      this.billNum = row.orderSn
    },
    getCancelReasons () {
      getCancelReasons().then(res => {
        this.cancelReasons = res.body
      })
    },
    validCancel () {
      this.$refs.cancelForm.validForm()
    },
    cancelRepair (dto) {
      cancelRepair(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('取消成功')
          setTimeout(() => {
            this.handlePageChange()
          }, 600)
          this.cancelVisible = false
        } else {
          this.handleCancelError()
        }
      })
    },
    handleCancelError () {
      setTimeout(() => {
        this.cancelLoading = false
        this.$nextTick(() => {
          this.cancelLoading = true
        })
      }, 500)
    },
    toRepairDetail (row) {
      const orderSn = row.orderSn
      const route = {
        name: 'repairDetail',
        query: {
          orderSn
        }
      }
      this.$router.push(route)
    },
    orderStatusCheck (val) {
      switch (val) {
        case 'HAVE_ORDER':
          return true
        case 'TO_SEND':
          return true
        case 'TO_BE_ASSIGNED':
          return true
        case 'WAITING':
          return true
        case 'SIGN':
          return true
        case 'UPPER_DOOR':
          return true
        default:
          return false
      }
    },
    getAreas () {
      getAreas().then(res => {
        if (res.code === 200) {
          this.areaOptions = res.body
        }
      })
    },
    getGoods () {
      getGoods().then(res => {
        if (res.code === 200) {
          this.goodsOptions = res.body
        }
      })
    }
  },

  filters: {
    orderStatusFilter (val) {
      switch (val) {
        case 'HAVE_ORDER':
          return '已下单'
        case 'TO_SEND':
          return '待自如派单'
        case 'TO_BE_ASSIGNED':
          return '待供应商派工'
        case 'WAITING':
          return '待师傅接单'
        case 'SIGN':
          return '待师傅签到'
        case 'UPPER_DOOR':
          return '已上门'
        case 'GENERATE_PLAN':
          return '已生成维修方案'
        case 'COMPLETE':
          return '已完成'
        case 'CANCEL':
          return '已取消'
      }
    },
    dateFilter (val) {
      return getDate(val, 'date')
    }
  },
  created () {
    this.getCancelReasons()
    this.getAreas()
    this.getGoods()
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
