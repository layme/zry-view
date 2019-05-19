<template>
  <Card>
    <p slot="title">
      退款金额操作 - {{ index }}
    </p>
    <div slot="extra">
      <span>编辑退订方式：
        <i-switch size="large" v-model="refundData.cancelExitWay" :true-value="1" :false-value="0"
                  :disabled="refundStatus !== 1" @on-change="handleSwitchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </span>
      <span :style="{ marginLeft: '20px' }">申请时间：{{ refundData.createTime | dateFilter }}</span>
    </div>
    <Row :gutter="20">
      <Col :span="12">
        <Table size="small" :columns="personColumns" :data="refundData.personVoList">
          <template slot-scope="{ row }" slot="status">
            <div>{{ row.status }}</div>
          </template>
        </Table>
      </Col>
      <Col :span="12">
        <Table size="small" :columns="detailColumns" :data="refundData.detailOperationVos">
          <template slot-scope="{ row }" slot="isTaken">
            <i-switch size="large" v-model="row.isTaken" :true-value="0" :false-value="1"
                      :disabled="refundData.cancelExitWay !== 1 || refundStatus !== 1" @on-change="handleTaken">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
        </Table>
      </Col>
    </Row>
  </Card>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'refundCard',
  props: {
    index: Number,
    refundStatus: Number,
    refund: Object
  },
  data () {
    return {
      refundData: this.refund,
      personColumns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '房型',
          key: 'houseTypeShowName'
        },
        {
          title: '床位号',
          key: 'bedCode'
        },
        {
          title: '床位状态',
          slot: 'status'
        }
      ],
      detailColumns: [
        {
          title: '日期',
          key: 'takenDate'
        },
        {
          title: '费用项',
          key: 'feeType'
        },
        {
          title: '是否收取',
          slot: 'isTaken'
        },
        {
          title: '金额/元',
          key: 'oldFeeAmount'
        }
      ]
    }
  },
  methods: {
    handleSwitchChange (val) {
      console.info('switch ', val)
    },
    handleTaken () {
    }
  },
  filters: {
    dateFilter (val) {
      return getDate(val / 1000, 'year')
    },
    bedStatusFilter (val) {
    },
    feeTypeFilter (val) {}
  }
}
</script>
<style lang="less" scoped>
</style>
