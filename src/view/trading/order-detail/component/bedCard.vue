<template>
  <Card dis-hover :bordered="false">
    <p slot="title">
      床位分配
    </p>
    <Row v-for="(item, index) in bedDto.beds" :key="index" class="bed-row" :class="bedRow(index)">
      <Col :span="1">
        <Checkbox v-model="item.isSelect"></Checkbox>
      </Col>
      <Col :span="5">
        入住人：
      </Col>
      <Col :span="5">
        房型名称：
      </Col>
      <Col :span="4">
        房间号：
      </Col>
      <Col :span="4">
        床位号：
      </Col>
      <Col :span="3">
        <Tag color="blue">已排床</Tag>
      </Col>
      <Col :span="2">
        <Tooltip content="重制密码" placement="left">
          <Button shape="circle" size="small" icon="ios-key"></Button>
        </Tooltip>
      </Col>
    </Row>
  </Card>
</template>
<script>
export default {
  name: 'bedCard',
  data () {
    return {
      bedDto: {
        orderBid: '',
        beds: [
          {
            isSelect: false
          },
          {
            isSelect: false
          }
        ]
      }
    }
  },
  methods: {
    bedRow (index) {
      if (index > 0) {
        return 'bed-row-not-first'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .bed-row {
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    padding: 20px 20px 15px 20px;
    margin: 0 -16px;
    &-not-first {
      margin-top: 15px;
    }
  }
</style>
