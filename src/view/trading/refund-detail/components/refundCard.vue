<template>
  <Card>
    <p slot="title">
      退款金额操作 - NO.{{ index }}
    </p>
    <div slot="extra">
      <span>编辑退款：
        <i-switch size="large" v-model="refundData.cancelExitWay" :true-value="1" :false-value="0"
                  :disabled="refundStatus !== 0" @on-change="handleSwitchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </span>
      <span :style="{ marginLeft: '20px' }">申请时间：{{ refundData.createTime | dateTimeFilter }}</span>
    </div>
    <Row :gutter="20">
      <Col :span="12">
        <Table size="small" :columns="personColumns" :data="refundData.personVoList">
          <template slot-scope="{ row }" slot="status">
            <div>{{ row.status | bedStatusFilter }}</div>
          </template>
        </Table>
      </Col>
      <Col :span="12">
        <Table size="small" :columns="detailColumns" :data="refundData.detailOperationVos">
          <template slot-scope="{ row }" slot="feeType">
            {{ row.feeType | feeTypeFilter }}
          </template>
          <template slot-scope="{ row }" slot="isTaken">
            <i-switch size="large" v-model="row.isTaken" :true-value="0" :false-value="1"
                      :disabled="refundData.cancelExitWay !== 1 || refundStatus !== 0" @on-change="handleTaken($event, row)">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
          <template slot-scope="{ row }" slot="feeAmount">
            <div v-if="refundStatus === 0 && refundData.cancelExitWay === 1 && row.isTaken === 0 && row.feeType === 2">
              <Input v-model.trim="row.feeAmount" placeholder="" class="my-input" clearable></Input>
              <Button type="primary" shape="circle" icon="md-checkmark" size="small" class="my-btn" @click="validFeeAmount(row)"></Button>
            </div>
            <div v-else>{{ row.feeAmount }}</div>
          </template>
        </Table>
      </Col>
    </Row>
  </Card>
</template>
<script>
import { updateRefundDetailByBid, editFeeAmount } from '@/api/refund'
export default {
  name: 'refundCard',
  props: {
    index: Number,
    refundStatus: Number,
    refund: Object,
    checkOutData: Array
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
          slot: 'feeType'
        },
        {
          title: '是否收取',
          slot: 'isTaken'
        },
        {
          title: '金额/元',
          slot: 'feeAmount'
        }
      ],
      upRefundDto: {
        orderBid: '',
        refundDetailList: []
      }
    }
  },
  methods: {
    handleSwitchChange (val) {
      if (val === 0) {
        this.upRefundDto.orderBid = this.$route.query.orderBid
        let dto = {
          bid: this.refundData.bid,
          refundBid: this.refundData.refundBid,
          cancelExitWay: val
        }
        this.upRefundDto.refundDetailList.push(dto)
        updateRefundDetailByBid(this.upRefundDto).then(() => {
          this.$Message.success('操作成功，数据已保存')
          this.$emit('refresh')
        })
      }
    },
    handleTaken (val, row) {
      editFeeAmount(row).then(res => {
        this.$Message.success('编辑成功')
        this.$emit('refreshFee')
      }).catch(() => {
        row.isTaken = val === 1 ? 0 : 1
      })
    },
    validFeeAmount (row) {
      if (!row.feeAmount) {
        this.$Message.error('请输入违约金收取金额')
      } else if (row.feeAmount > this.refundData.detailOperationVos.find(x => x.feeType === 2).oldFeeAmount) {
        this.$Message.error('不能大于原来的金额')
      } else {
        editFeeAmount(row).then(() => {
          this.$Message.success('编辑成功')
          this.$emit('refreshFee')
        })
      }
    }
  },
  filters: {
    feeTypeFilter (val) {
      if (val === 1) {
        return '房租'
      }
      if (val === 2) {
        return '违约金'
      }
    },
    bedStatusFilter (val) {
      switch (val) {
        case 1:
          return '未入住'
        case 2:
          return '已入住'
        case 3:
          return '已续租'
        case 4:
          return '已退租'
        case 5:
          return '已保存床位'
        case 6:
          return '已保存入住人信息'
        case 8:
          return '已支付取消'
        case 9:
          return '未入住取消'
        case 10:
          return '未入住退房'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .my-input {
    width: ~"calc(100% - 40px)";
  }
  .my-btn {
    margin-left: 6px;
  }
</style>
