<template>
  <div>
    <Card dis-hover>
      <Row :gutter="20">
        <Col :span="6">
          <Tag v-if="event.eventType === 1" class="my-tag" color="success">好评</Tag>
          <Tag v-else class="my-tag" color="warning">投诉</Tag>
          {{ event.eventDate | dateFilter }}
        </Col>
        <Col :span="18" style="text-align: right">
          <Button size="small" type="primary" icon="ios-create-outline" shape="circle"
                     class="my-btn" @click="update"></Button>
          <Button size="small" type="error" icon="ios-trash-outline" shape="circle"
                     @click="remove"></Button>
        </Col>
      </Row>
      <Row>
        <Col :span="18" class="content">
        {{ event.eventContent }}
        </Col>
      </Row>
      <div class="scene-row">
        {{ event.sceneName }}
      </div>
    </Card>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'guestEventCard',
  props: {
    event: Object,
    index: Number
  },
  data () {
    return {
    }
  },
  methods: {
    update () {
      this.$emit('update', this.index)
    },
    remove () {
      this.$emit('remove', this.index)
    }
  },
  created () {
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'all')
    }
  }
}
</script>
<style lane="less" scoped>
  .scene-row {
    text-align: right;
    /*vertical-align: bottom;*/
    width: 100%;
    position: absolute;
    bottom: 5px;
    right: 20px;
  }
  .my-btn {
    margin-right: 10px;
  }
  .my-tag {
    margin-right: 10px;
  }
  .content {
    margin-top: 10px;
  }
</style>
