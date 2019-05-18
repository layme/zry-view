<template>
  <Form :model="paramDto" :label-width="70">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="订单号">
          <Input v-model="paramDto.input" placeholder="App/OTA"></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="订单状态">
          <Input v-model="paramDto.input" placeholder=""></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住日期">
          <Input v-model="paramDto.input" placeholder=""></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="预订人">
          <Input v-model="paramDto.input" placeholder="姓名/手机号/身份证号"></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="入住人">
          <Input v-model="paramDto.input" placeholder="姓名/手机号/身份证号"></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="退房日期">
          <Input v-model="paramDto.input" placeholder=""></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem>
          <Button type="primary" icon="ios-search"> 查 询</Button>
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
      paramDto: {}
    }
  }
}
</script>
