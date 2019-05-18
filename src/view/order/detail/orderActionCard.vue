<template>
  <Card dis-hover>
    <p slot="title">订单操作</p>
    <Row>
      <Col :span="1">
        <span style="line-height: 32px">收款</span>
      </Col>
      <Col :span="23">
        <Form ref="depositForm" :model="depositDto" inline>
          <FormItem>
            <Select v-model="depositDto.item" class="select">
              <Option value="1">押金</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Select v-model="depositDto.type" class="select">
              <Option value="1">现金</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input type="text" v-model.trim="depositDto.money"></Input>
          </FormItem>
          <FormItem>
            <Input type="text" v-model.trim="depositDto.remark"></Input>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Button type="primary" style="margin-left: 20px">取消订单</Button>
    <Button type="primary" style="margin-left: 20px">办理入住</Button>
    <Button type="primary" style="margin-left: 20px">退 租</Button>
  </Card>
</template>
<script>
export default {
  name: 'orderActionCard',
  props: {
    data: Object
  },
  data () {
    return {
      depositDto: {
        item: '1',
        type: '1',
        money: '',
        remark: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .select {
    width: 150px
  }
</style>
