<template>
  <Form ref="chatForm" :model="paramDto" :label-width="100">
    <Row>
      <Col :span="8">
        <FormItem label="当前群聊">
          <Tag color="blue">{{ groupName }}</Tag>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="用户昵称">
          <Input v-model.trim="paramDto.nickName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="用户手机">
          <Input v-model.trim="paramDto.customerMobile" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="操作人">
          <Input v-model.trim="paramDto.opFid" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="用户角色">
          <Input v-model.trim="paramDto.memberRole" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="用户状态">
          <Input v-model.trim="paramDto.memberStatu" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="primary">加入群聊</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'chatMemberForm',
  props: {
    groupName: String
  },
  data () {
    return {
      paramDto: {
        nickName: '',
        customerMobile: '',
        opFid: '',
        memberRole: '',
        memberStatu: ''
      }
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
