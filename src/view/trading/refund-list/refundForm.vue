<template>
  <Form :model="paramDto" :label-width="70" @keydown.enter.native="submit">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="订单号">
          <Input v-model.trim="paramDto.orderNumber" placeholder="自如" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="退款状态">
          <Select v-model="paramDto.refoundStatusStr" placeholder="请选择" clearable>
            <Option v-for="x in refundStatusOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="申请日期">
          <DatePicker v-model="applyRefundTime" type="daterange" split-panels placeholder=""
                      class="my-date-picker"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="预订人">
          <Input v-model.trim="paramDto.customer" placeholder="姓名/手机号" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="发起方式">
          <Select v-model="paramDto.isOwnFlag" placeholder="请选择" clearable>
            <Option v-for="x in flagOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住日期">
          <DatePicker v-model="checkInTime" type="daterange" split-panels placeholder=""
                      class="my-date-picker"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="warning" icon="ios-cloud-download-outline" @click="exportList"> 导 出</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'orderForm',
  data () {
    return {
      paramDto: {
        orderNumber: '',
        refundStatusStr: '',
        refundStartTime: '',
        refundEndTime: '',
        customer: '',
        isOwnFlag: '',
        checkInStartTime: '',
        checkInEndTime: ''
      },
      applyRefundTime: [],
      checkInTime: [],
      refundStatusOptions: [
        {
          label: '待核实',
          value: 0
        },
        {
          label: '待打款',
          value: 1
        },
        {
          label: '打款成功',
          value: 2
        },
        {
          label: '打款异常',
          value: 3
        }
      ],
      flagOptions: [
        {
          label: '取消订单',
          value: 1
        },
        {
          label: '订单退租',
          value: 2
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    },
    exportList () {
      this.$emit('exportList', this.paramDto)
    }
  },
  watch: {
    checkInTime (val) {
      this.paramDto.checkInStartTime = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.checkInEndTime = val[1] ? getDate(val[1], 'date') : ''
    },
    applyRefundTime (val) {
      this.paramDto.applyRefundStartTime = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.applyRefundEndTime = val[1] ? getDate(val[1], 'date') : ''
    },
    '$store.state.user.currentProject' (val) {
      if (Object.keys(val).length) {
        this.submit()
      }
    }
  },
  created () {
    this.submit()
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
