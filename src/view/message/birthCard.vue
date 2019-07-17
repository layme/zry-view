<template>
  <Card>
    <Row>
      <Col :span="4"><span>{{ birth.name }}</span></Col>
      <Col :span="4"><Tag :color="color">{{ birth.level }}</Tag></Col>
    </Row>
    <Row>
      <Col :span="4"><span>房间: {{ birth.roomNo }}</span></Col>
      <Col :span="4"><span>床位: {{ birth.bedNo }}</span></Col>
      <Col :span="4"><span>入住: {{ birth.checkInDate | dateFilter }}</span></Col>
      <Col :span="4"><span>生日: {{ birth.birth | dateFilter }}</span></Col>
      <Col :span="4"><a v-if="birth.isConfirm === 0" @click="confirmRemind">开始处理</a></Col>
    </Row>
  </Card>
</template>
<script>
import { confirmRemind } from '@/api/remind'
export default {
  name: 'birthCard',
  props: {
    birth: Object
  },
  data () {
    return {
      paramDto: {
        timerFid: '',
        description: ''
      }
    }
  },
  computed: {
    color () {
      if (this.birth.level === '新客') {
        return 'blue'
      } else if (this.birth.level === '回头客') {
        return 'green'
      }
    }
  },
  methods: {
    confirmRemind () {
      this.paramDto.timerFid = this.birth.timerFid
      confirmRemind(this.paramDto).then(() => {
        this.$Message.success('处理成功')
        this.$emit('refresh')
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
