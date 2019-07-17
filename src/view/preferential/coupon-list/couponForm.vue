<template>
  <Form :model="paramDto" :label-width="100" @keydown.enter.native="submit">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="手机号">
          <Input v-model.trim="paramDto.phone" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="优惠券号">
          <Input v-model.trim="paramDto.ticketNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="批次号">
          <Input v-model.trim="paramDto.batchNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="活动项目">
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
        <FormItem label="优惠活动编号">
          <Input v-model.trim="paramDto.activityNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="优惠活动名称">
          <Input v-model.trim="paramDto.activityName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="活动时间">
          <DatePicker v-model="paramDto.dateRange" type="daterange" split-panels placeholder=""
                      :editable="false" class="my-date-picker"></DatePicker>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="活动状态">
          <CheckboxGroup v-model="paramDto.activityState">
            <Checkbox v-for="(item, index) in activityStatusOptions" :key="index" :label="item.value">
              {{ item.label }}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="优惠券状态">
          <CheckboxGroup v-model="paramDto.couponState">
            <Checkbox v-for="(item, index) in couponStatusOptions" :key="index" :label="item.value">
              {{ item.label }}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="warning" icon="ios-cloud-download-outline" @click="exportData">导出</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'

export default {
  name: 'couponForm',
  props: {
    batchNumber: String,
    activityNumber: String
  },
  data () {
    return {
      paramDto: {
        phone: '',
        ticketNumber: '',
        batchNumber: this.batchNumber,
        projectBid: '',
        activityNumber: this.activityNumber,
        activityName: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        activityState: [],
        couponState: []
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
      ],
      couponStatusOptions: [
        {
          label: '初始态',
          value: 0
        },
        {
          label: '可使用',
          value: 1
        },
        {
          label: '已使用',
          value: 2
        },
        {
          label: '已关闭',
          value: 3
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.paramDto)
    },
    exportData () {
      this.$emit('export', this.paramDto)
    }
  },
  watch: {
    'paramDto.dateRange' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    },
    batchNumber (val) {
      this.paramDto.batchNumber = val
    },
    activityNumber (val) {
      this.paramDto.activityNumber = val
    }
  },
  created () {
    this.submit()
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
