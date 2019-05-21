<template>
  <Form :model="row" :label-width="120">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="入住项目：">
          <span>{{ row.projectName }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住房型：">
          <span>{{ row.houseName }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="订单号：">
          <span>{{ row.orderNumber }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="入住房间：">
          <span>{{ row.room }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住床位：">
          <span>{{ row.bed }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住时间：">
          <span>{{ row.checkInDate | dateFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="退房时间：">
          <span>{{ row.checkOutDate | dateFilter }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="预定时间：">
          <span>{{ row.bookDate | dateFilter }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="出行目的：">
          <span>{{ row.purpose }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="获知渠道：">
          <span>{{ row.channel }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="印象深刻：">
          <span>{{ row.impress }}</span>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="意见建议：">
          <span>{{ row.suggestion }}</span>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'checkInRecordExpand',
  props: {
    row: Object
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'date')
    }
  }
}
</script>
<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
