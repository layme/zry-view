<template>
  <div>
    <Table :columns="columns" :data="recordList" size="small">
      <template slot-scope="{ row }" slot="orderNumber">
        <a href="#" @click="toOrderDetail(row)">{{ row.orderNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="checkInDate">
        <div>{{ row.checkInDate | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="checkOutDate">
        <div>{{ row.checkInDate | dateFilter }}</div>
      </template>
    </Table>
    <Page style="text-align: right; margin-top: 20px" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import checkInRecordExpand from './checkInRecordExpand'

export default {
  name: 'checkInRecord',
  props: {
    idNumber: String
  },
  data () {
    return {
      paramDto: {
        guestFid: '',
        page: 1,
        limit: 10
      },
      recordList: [
        {
          'projectName': '北京CBD自如驿',
          'houseName': '8人间',
          'orderNumber': 'BJ101170730067',
          'orderBid': 'da9097240e424c7784fb336fd3564836',
          'room': 'H房间',
          'bed': '06',
          'checkInDate': 1501603200000,
          'checkOutDate': 1501689600000,
          'bookDate': 1501423554000,
          'purpose': null,
          'channel': null,
          'impress': null,
          'suggestion': null
        }, {
          'projectName': '北京CBD自如驿',
          'houseName': '8人间',
          'orderNumber': 'BJ101170721016',
          'orderBid': '868e0b82b5fc48a28a376c0f1ef9a7d8',
          'room': 'H房间',
          'bed': '06',
          'checkInDate': 1501084800000,
          'checkOutDate': 1501603200000,
          'bookDate': 1500600193000,
          'purpose': null,
          'channel': null,
          'impress': null,
          'suggestion': null
        }
      ],
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
          slot: 'checkInDate'
        },
        {
          title: '退房时间',
          slot: 'checkOutDate'
        }
      ]
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
    },
    handlePageChange () {
      console.info('paramDto', this.paramDto)
    }
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'all')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
