<template>
  <div>
    <Table :columns="columns" :data="recordList" size="small" :loading="loading">
      <template slot-scope="{ row }" slot="orderNumber">
        <a @click="toOrderDetail(row)">{{ row.orderNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="checkInDate">
        <div>{{ row.checkInDate | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="checkOutDate">
        <div>{{ row.checkInDate | dateFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import { listRecord } from '@/api/guest'
import checkInRecordExpand from './checkInRecordExpand'

export default {
  name: 'checkInRecord',
  props: {
    guestFid: String
  },
  data () {
    return {
      paramDto: {
        guestFid: this.guestFid,
        pageIndex: 1,
        pageSize: 10
      },
      recordList: [],
      total: 0,
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(checkInRecordExpand, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '入住项目',
          key: 'projectName'
        },
        {
          title: '入住房型',
          key: 'houseName'
        },
        {
          title: '订单号',
          slot: 'orderNumber'
        },
        {
          title: '入住时间',
          slot: 'checkInDate',
          width: 150
        },
        {
          title: '退房时间',
          slot: 'checkOutDate',
          width: 150
        }
      ],
      loading: false
    }
  },
  methods: {
    toOrderDetail (row) {
      const orderNumber = row.orderNumber
      const route = {
        name: 'orderDetail',
        path: 'orderDetail',
        query: {
          orderNumber
        }
      }
      this.$router.push(route)
      this.$emit('close')
    },
    getRecordList () {
      this.paramDto.pageIndex = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      listRecord(this.paramDto).then(res => {
        if (res.code === 200) {
          this.recordList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getRecordList()
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'all')
    }
  }
}
</script>
<style lang="less" scoped>
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
