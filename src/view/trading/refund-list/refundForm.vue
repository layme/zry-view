<template>
  <Form :model="paramDto" :label-width="70">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="订单号">
          <Input v-model.trim="paramDto.orderNumber" placeholder="App/OTA" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="退款状态">
          <Select v-model="paramDto.refundStatus" placeholder="请选择" clearable>
            <Option v-for="x in refundStatusOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="申请日期">
          <DatePicker v-model="paramDto.refundTime" type="daterange" split-panels placeholder=""
                      class="my-date-picker"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="预订人">
          <Input v-model.trim="paramDto.customer" placeholder="姓名/手机号/身份证号" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住人">
          <Input v-model.trim="paramDto.stayPerson" placeholder="姓名/手机号/身份证号" clearable></Input>
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
      <Col span="12">
        <FormItem>
          <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
        </FormItem>
      </Col>
      <Col span="12" style="text-align: right">
        <FormItem>
          <Button type="warning" icon="ios-cloud-download-outline"> 导 出</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'orderForm',
  data () {
    return {
      paramDto: {
        orderNumber: '',
        refundStatus: '',
        refundTime: [],
        refundStartTime: '',
        refundEndTime: '',
        customer: '',
        stayPerson: '',
        checkInTime: [],
        checkInStartTime: '',
        checkInEndTime: ''
      },
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
      ]
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    }
  },
  watch: {
    'paramDto.checkInTime' (val) {
      this.paramDto.checkInStartTime = val[0]
      this.paramDto.checkInEndTime = val[1]
    },
    'paramDto.refundTime' (val) {
      this.paramDto.refundStartTime = val[0]
      this.paramDto.refundEndTime = val[1]
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
