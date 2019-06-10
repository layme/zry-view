<template>
  <Form :model="paramDto" :label-width="80">
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="订单编号">
          <Input v-model.trim="paramDto.orderNumber" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="评价日期">
          <DatePicker v-model="paramDto.evaluateTime" type="daterange" split-panels placeholder=""
                      class="full-width" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="总分区间">
          <Select v-model="paramDto.totalScore" placeholder="" clearable>
            <Option
              v-for="item in totalScoreOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="回复状态">
          <RadioGroup v-model="paramDto.lowEvaluateManagerFeedbackStatus">
            <Radio label="" border>全部</Radio>
            <Radio :label="1" border>已回复</Radio>
            <Radio :label="0" border>未回复</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="屏蔽状态">
          <RadioGroup v-model="paramDto.evaluateStatus">
            <Radio label="" border>全部</Radio>
            <Radio :label="0" border>已屏蔽</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
          <Button type="primary" @click="search">查 询</Button>
      </Col>
      <Col :span="12" :style="{ textAlign: 'right' }">
        <count-to :end="totalScore" :count-class="countText" :decimals="1">
          <span class="slot-text" slot="left">项目总体评星:&nbsp;</span>
        </count-to>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
import countTo from '_c/count-to'
export default {
  name: 'evaluateForm',
  props: {
    totalScore: {
      type: Number,
      default: 5
    }
  },
  components: {
    countTo
  },
  data () {
    return {
      paramDto: {
        projectBid: this.$store.state.user.currentProject.bid,
        orderNumber: '',
        evaluateTime: [],
        startDate: '',
        endDate: '',
        lowEvaluateManagerFeedbackStatus: '',
        evaluateStatus: '',
        pageFlag: true
      },
      totalScoreOptions: [
        {
          value: 5,
          label: '4.5~5.0 (不含4.5)'
        },
        {
          value: 4,
          label: '4.0~4.5 (不含4.0)'
        },
        {
          value: 3,
          label: '3.5~4.0 (不含3.5)'
        },
        {
          value: 2,
          label: '3.5及其以下'
        }
      ],
      countText: {
        fontSize: '22px',
        color: '#2d8cf0',
        fontWeight: 'bold'
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.paramDto)
    }
  },
  watch: {
    'paramDto.evaluateTime' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    },
    '$store.state.user.currentProject' (to, from) {
      this.paramDto.projectBid = to.bid
    }
  }
}
</script>
<style lang="less" scoped>
  .full-width {
    width: 100%;
  }
  .slot-text{
    font-size: 18px;
  }
</style>
