<template>
  <Form :model="paramDto" :label-width="70">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="活动项目">
          <Select v-model="paramDto.projectBid" placeholder="" clearable>
            <Option
              v-for="item in $store.state.user.projectList"
              :key="item.bid"
              :label="item.projectName"
              :value="item.bid">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="活动标题">
          <Input v-model.trim="paramDto.title" placeholder="" clearable maxlength="30"></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="活动状态">
          <Select v-model="paramDto.isOnline" placeholder="" clearable>
            <Option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="primary" icon="" @click="create"> 新 增</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'marketingActivitySearchForm',
  data () {
    return {
      paramDto: {
        projectBid: '',
        title: '',
        isOnline: ''
      },
      statusOptions: [
        {
          label: '已上线',
          value: 1
        },
        {
          label: '已下线',
          value: 0
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    },
    create () {
      this.$emit('create')
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
