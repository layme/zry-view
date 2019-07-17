<template>
  <Form :model="searchData" :label-width="70">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="创建日期">
          <DatePicker v-model="adjustDate" type="daterange" split-panels placeholder=""
                      class="my-date-picker" @on-change="handleAdjustDate" :clearable="false" :editable="false"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="价格日期">
          <DatePicker v-model="priceDate" type="daterange" split-panels placeholder=""
                      class="my-date-picker" @on-change="handlePriceDate" :clearable="false" :editable="false"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="价格类型">
          <Select placeholder="价格类型" v-model="searchData.channelCode">
            <Option value="">请选择</Option>
            <Option v-for="item in $store.state.price.priceTypeList" :key="item.code" :label="item.name" :value="item.code"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="24">
      <Col span="8">
        <FormItem label="调价原因">
          <Select placeholder="调价原因" v-model="searchData.adjustCode">
            <Option value="">请选择</Option>
            <Option v-for="(value, key, index) in $store.state.price.adjustType" :key="index" :label="value" :value="key"></Option>
          </Select>
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

export default {
  data () {
    return {
      adjustDate: [],
      priceDate: [],
      searchData: {
        createTimeStart: '',
        createTimeEnd: '',
        startDate: '',
        endDate: '',
        channelCode: '',
        adjustCode: ''
      }
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.searchData)
    },
    exportList () {
      this.$emit('exportList', this.searchData)
    },
    handleAdjustDate (val) {
      this.searchData.createTimeStart = val[0]
      this.searchData.createTimeEnd = val[1]
    },
    handlePriceDate (val) {
      this.searchData.startDate = val[0]
      this.searchData.endDate = val[1]
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
