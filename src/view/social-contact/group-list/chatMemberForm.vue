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
          <Select v-model="paramDto.memberRole" placeholder="请选择" clearable>
            <Option v-for="x in memberRoleOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="用户状态">
          <Select v-model="paramDto.memberStatus" placeholder="请选择" clearable>
            <Option v-for="x in memberStatusOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="primary" @click="join">加入群聊</Button>
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
        memberStatus: ''
      },
      memberRoleOptions: [
        {
          label: '普通成员',
          value: 0
        },
        {
          label: '管理员',
          value: 1
        },
        {
          label: '群主',
          value: 2
        }
      ],
      memberStatusOptions: [
        {
          label: '已入群',
          value: 0
        },
        {
          label: '已禁言',
          value: 1
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    },
    join () {
      this.$emit('join')
    }
  },
  created () {
    this.submit()
  }
}
</script>
<style lang="less" scoped>
</style>
