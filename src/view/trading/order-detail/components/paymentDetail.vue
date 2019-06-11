<template>
  <div>
    <Table stripe :columns="columns" :data="paymentDetail" :loading="loading">
      <template slot-scope="{ row }" slot="paymentDate">
        <div>{{ row.date | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="isConsume">
        <div>{{ row.isConsume | consumeFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
export default {
  name: 'paymentDetail',
  props: {
    orderBid: String
  },
  data () {
    return {
      paramDto: {
        orderBid: this.orderBid,
        page: 1,
        limit: 10
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
          key: 'bedCoed'
        },
        {
          title: '支付价格',
          key: 'amount'
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
      console.info('paramDto', this.paramDto)
      this.loading = false
    }
  },
  created () {
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
