<template>
  <Form :model="paramDto" :label-width="70" @keydown.enter.native="submit">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="订单号">
          <Input v-model.trim="paramDto.orderNumber" placeholder="自如/OTA" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="订单状态">
          <Select v-model="paramDto.orderStatus" placeholder="请选择" clearable>
            <Option v-for="x in orderStatusOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
            <Option :value="12">NoShow</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住日期">
          <DatePicker v-model="paramDto.checkInTime" type="daterange" split-panels placeholder=""
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
        <FormItem label="入住人">
          <Input v-model.trim="paramDto.stayPerson" placeholder="姓名/证件号" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="退房日期">
          <DatePicker v-model="paramDto.checkOutTime" type="daterange" split-panels placeholder=""
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
        orderStatus: '',
        checkInTime: [],
        checkInStartTime: '',
        checkInEndTime: '',
        customer: '',
        stayPerson: '',
        checkOutTime: [],
        checkOutStartTime: '',
        checkOutEndTime: ''
      },
      orderStatusOptions: [
        {
          label: '已支付',
          value: 1
        },
        {
          label: '已入住',
          value: 2
        },
        {
          label: '退款申请中',
          value: 3
        },
        {
          label: '已退款',
          value: 4
        },
        {
          label: '待支付',
          value: 5
        },
        {
          label: '已退房',
          value: 6
        },
        {
          label: '已取消',
          value: 7
        },
        {
          label: '已支付取消',
          value: 8
        },
        {
          label: '未入住取消',
          value: 9
        },
        {
          label: '未入住退房',
          value: 10
        },
        {
          label: '已退订',
          value: 11
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
    'paramDto.checkInTime' (val) {
      this.paramDto.checkInStartTime = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.checkInEndTime = val[1] ? getDate(val[1], 'date') : ''
    },
    'paramDto.checkOutTime' (val) {
      this.paramDto.checkOutStartTime = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.checkOutEndTime = val[1] ? getDate(val[1], 'date') : ''
    },
    '$store.state.user.currentProject' () {
      this.submit()
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
