<template>
  <Form :model="paramDto" :label-width="100">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="优惠活动编号">
          <Input v-model.trim="paramDto.activityNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="优惠活动名称">
          <Input v-model.trim="paramDto.activityName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="优惠券号">
          <Input v-model.trim="paramDto.ticketNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="项目">
          <Select v-model="paramDto.projectBid">
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
        <FormItem label="活动时间">
          <DatePicker v-model="paramDto.dateRange" type="daterange" split-panels placeholder=""
                      class="my-date-picker"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="活动状态">
          <CheckboxGroup v-model="paramDto.activityStatus">
            <Checkbox v-for="(item, index) in activityStatusOptions" :key="index" :label="item.value">
              {{ item.label }}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem>
          <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
        </FormItem>
      </Col>
      <Col span="12" style="text-align: right">
        <FormItem>
          <Button type="warning" @click="addActivity">新建优惠活动</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'activityForm',
  data () {
    return {
      paramDto: {
        activityNumber: '',
        activityName: '',
        ticketNumber: '',
        projectBid: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        activityStatus: []
      },
      activityStatusOptions: [
        {
          label: '未开启',
          value: 0
        },
        {
          label: '进行中',
          value: 1
        },
        {
          label: '已关闭',
          value: 2
        },
        {
          label: '已结束',
          value: 3
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    },
    addActivity () {
      this.$emit('create')
    }
  },
  watch: {
    'paramDto.dateRange' (val) {
      this.paramDto.startDate = val[0]
      this.paramDto.endDate = val[1]
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
