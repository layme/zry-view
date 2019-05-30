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
            <span class="my-content">创建于: {{ group.createDate | dateFilter }}</span>
          </Col>
          <Col :span="6">
            <span class="my-content">人数限制: {{ group.maxusers }} 人</span>
          </Col>
          <Col :span="6">
            <span class="my-content">创建人: {{ group.opBid }}</span>
          </Col>
          <Col :span="6" style="text-align: right">
            <a class="my-btn">
              <Icon type="md-arrow-dropright" />
              详情
            </a>
            <a class="my-btn">
              <Icon type="md-settings" />
              设置
            </a>
            <a :style="{ color: '#ed4014' }">解散</a>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Card>
</template>
<script>
import { getDate } from '@/libs/tools'

export default {
  name: 'groupCard',
  props: {
    group: Object,
    index: Number
  },
  data () {
    return {}
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'all')
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
