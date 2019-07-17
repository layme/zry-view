<template>
  <Form :model="paramDto" :label-width="90" @keydown.enter.native="search">
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="订单号">
          <Input v-model.trim="paramDto.orderNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="入住人姓名">
          <Input v-model.trim="paramDto.name" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="入住人手机号">
          <Input v-model.trim="paramDto.phone" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="预定日期">
          <DatePicker v-model="paramDto.createTime" type="daterange" split-panels placeholder=""
                      class="my-date-picker" :editable="false"></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="入住日期">
          <DatePicker v-model="paramDto.actualStartDate" type="daterange" split-panels placeholder=""
                      class="my-date-picker" :editable="false"></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="退房日期">
          <DatePicker v-model="paramDto.actualEndDate" type="daterange" split-panels placeholder=""
                      class="my-date-picker" :editable="false"></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <Button type="primary" icon="ios-search" @click="search"> 查 询</Button>
      </Col>
      <Col :span="12" style="text-align: right">
        <Button type="warning" icon="ios-cloud-download-outline" @click="exportList"> 导 出</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'guestForm',
  data () {
    return {
      paramDto: {
        projectBid: '',
        orderNumber: '',
        name: '',
        phone: '',
        createTime: [],
        actualStartDate: [],
        actualEndDate: []
      }
    }
  },
  methods: {
    search () {
      this.paramDto.projectBid = this.$store.state.user.currentProject.bid
      this.$emit('search', this.paramDto)
    },
    exportList () {
      this.$emit('exportList', this.paramDto)
    }
  },
  created () {
    this.search()
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
