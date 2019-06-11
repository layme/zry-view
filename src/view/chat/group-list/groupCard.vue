<template>
  <Card>
    <Layout style="background-color: #ffffff;">
      <Sider hide-trigger style="background-color: #ffffff;" width="55">
        <Avatar :src="group.description.headUrl" shape="square" icon="ios-person" class="my-avatar"/>
      </Sider>
      <Content style="margin-left: 20px">
        <span class="my-name">{{ group.name }}</span>
        <Row :gutter="10" :style="{ marginTop: '5px' }">
          <Col :span="6">
            <span class="my-content">创建于: {{ group.createDate | dateTimeFilter }}</span>
          </Col>
          <Col :span="6">
            <span class="my-content">人数限制: {{ group.maxusers }} 人</span>
          </Col>
          <Col :span="6">
            <span class="my-content">创建人: {{ group.opBid }}</span>
          </Col>
          <Col :span="6" style="text-align: right">
            <a class="my-btn" @click="toDetail">
              <Icon type="md-arrow-dropright" />
              成员
            </a>
            <a class="my-btn" @click="toUpdate">
              <Icon type="md-settings" />
              设置
            </a>
            <a :style="{ color: '#ed4014' }" @click="remove">解散</a>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Card>
</template>
<script>

export default {
  name: 'groupCard',
  props: {
    group: Object,
    index: Number
  },
  data () {
    return {}
  },
  methods: {
    toDetail () {
      this.$emit('detail', this.index)
    },
    toUpdate () {
      this.$emit('update', this.index)
    },
    remove () {
      this.$emit('remove', this.index)
    }
  }
}
</script>
<style lang="less" scoped>
  .my-avatar {
    width: 55px;
    height: 55px;
  }

  .my-name {
    font-size: 20px;
    font-weight: bold;
  }
  .my-content {
    color: #808695;
  }

  .my-btn {
    margin-right: 20px;
  }
</style>
