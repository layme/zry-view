<template>
  <div>
    <Table stripe :columns="columns" :data="paymentDetail" :loading="loading">
      <template slot-scope="{ row }" slot="paymentDate">
        <div>{{ row.orderDate }}</div>
      </template>
      <template slot-scope="{ row }" slot="bedCode">
        <div>{{ row.bedCode | bedCodeFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="isConsume">
        <div>{{ row.isConsume | consumeFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageNum"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import { getOrderPayDetail } from '@/api/order'
export default {
  name: 'paymentDetail',
  props: {
    orderBid: String
  },
  data () {
    return {
      paramDto: {
        orderBid: this.orderBid,
        pageNum: 1,
        pageSize: 10
      },
      paymentDetail: [],
      total: 0,
      loading: false,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '日期',
          slot: 'paymentDate'
        },
        {
          title: '房型名称',
          key: 'houseName'
        },
        {
          title: '床位号',
          slot: 'bedCode'
        },
        {
          title: '支付金额/元',
          key: 'bedPrice'
        },
        {
          title: '是否消费',
          slot: 'isConsume'
        }
      ]
    }
  },
  methods: {
    handlePageChange () {
      this.loading = true
      getOrderPayDetail(this.paramDto).then(res => {
        if (res.code === 200) {
          this.paymentDetail = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.paramDto.pageNum = 1
    this.handlePageChange()
  },
  filters: {
    consumeFilter (val) {
      if (val === 0) {
        return '消费'
      } else {
        return '未消费'
      }
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
